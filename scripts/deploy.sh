#!/usr/bin/env bash
# Deploy this repo to Netlify via the zip-upload build API.
# Usage: scripts/deploy.sh <netlify-mcp-proxy-url> [site-id]
# The proxy URL comes from the Netlify MCP deploy-site operation and embeds
# short-lived auth for this team. Site defaults to exacthouse-rebuild.
set -euo pipefail

PROXY_URL="${1:?usage: deploy.sh <proxy-url> [site-id]}"
SITE_ID="${2:-de6d4fc4-c29f-4aba-8cc6-20af8507ef69}"
ZIP="$(mktemp -t deploy-XXXXXX.zip)"
trap 'rm -f "$ZIP"' EXIT
rm -f "$ZIP"  # zip(1) errors if the target exists but isn't a valid archive

# Never ship local build output or dependencies; Netlify builds from source.
rm -rf .next .netlify
zip -qr "$ZIP" . -x "node_modules/*" -x ".git/*"

RESP=$(curl -sS -X POST -H "user-agent: netlify-mcp" \
  -F "zip=@${ZIP};type=application/zip" \
  "${PROXY_URL}/api/v1/sites/${SITE_ID}/builds")
echo "$RESP"
DEPLOY_ID=$(echo "$RESP" | grep -o '"deploy_id":"[^"]*"' | cut -d'"' -f4)
[ -n "$DEPLOY_ID" ] || { echo "no deploy id — upload failed"; exit 1; }

echo "deploy: $DEPLOY_ID"
for i in $(seq 1 30); do
  sleep 8
  STATE=$(curl -sS "${PROXY_URL}/api/v1/deploys/${DEPLOY_ID}" | grep -o '"state":"[^"]*"' | head -1)
  echo "poll $i: $STATE"
  case "$STATE" in
    *ready*) exit 0 ;;
    *error*) echo "deploy failed"; exit 1 ;;
  esac
done
echo "timed out waiting for deploy"; exit 1
