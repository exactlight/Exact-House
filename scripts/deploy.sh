#!/usr/bin/env bash
# Deploy this repo to Netlify via the zip-upload build API.
# Usage: scripts/deploy.sh <netlify-mcp-proxy-url> [site-id]
# The proxy URL comes from the Netlify MCP deploy-site operation and embeds
# short-lived auth for this team. Site defaults to exacthouse-rebuild.
#
# Run this from the directory of the app you're deploying (repo root for
# exacthouse; sites/forwardhomebuyer for FHB).
set -euo pipefail

PROXY_URL="${1:?usage: deploy.sh <proxy-url> [site-id]}"
SITE_ID="${2:-de6d4fc4-c29f-4aba-8cc6-20af8507ef69}"

# The MCP hands back the proxy base as ".../app//proxy/<token>". That literal
# double slash makes Netlify 404 the route; collapse it to a single slash.
PROXY_URL="${PROXY_URL/app\/\/proxy/app/proxy}"

ZIP="$(mktemp -t deploy-XXXXXX.zip)"
trap 'rm -f "$ZIP"' EXIT
rm -f "$ZIP"  # zip(1) errors if the target exists but isn't a valid archive

# Never ship local build output or dependencies; Netlify builds from source.
# Exclude node_modules and build dirs at EVERY depth — a nested app (e.g.
# sites/forwardhomebuyer/node_modules) is not caught by a top-level pattern
# and balloons the upload to hundreds of MB.
rm -rf .next .netlify
zip -qr "$ZIP" . \
  -x "node_modules/*" "*/node_modules/*" \
  -x ".git/*" \
  -x ".next/*" "*/.next/*" \
  -x ".netlify/*" "*/.netlify/*"

# --path-as-is: keep the token path exactly; curl must not re-normalize it.
CURL=(curl -sS --path-as-is -H "user-agent: netlify-mcp")

RESP=$("${CURL[@]}" -X POST \
  -F "zip=@${ZIP};type=application/zip" \
  "${PROXY_URL}/api/v1/sites/${SITE_ID}/builds")
echo "$RESP"
DEPLOY_ID=$(echo "$RESP" | grep -o '"deploy_id":"[^"]*"' | cut -d'"' -f4)
[ -n "$DEPLOY_ID" ] || { echo "no deploy id — upload failed"; exit 1; }

echo "deploy: $DEPLOY_ID"
for i in $(seq 1 40); do
  sleep 8
  STATE=$("${CURL[@]}" "${PROXY_URL}/api/v1/deploys/${DEPLOY_ID}" | grep -o '"state":"[^"]*"' | head -1)
  echo "poll $i: $STATE"
  case "$STATE" in
    *ready*) exit 0 ;;
    *error*) echo "deploy failed"; exit 1 ;;
  esac
done
echo "timed out waiting for deploy"; exit 1
