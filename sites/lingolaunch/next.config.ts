import type { NextConfig } from "next";

/*
 * LingoLaunch is built as a fully static export so it can be hosted on any
 * plain web server (a district intranet, IIS/Apache/Nginx, or a folder of
 * files) with no Node.js server, no database, and no build service running
 * in production. `next build` writes a self-contained `out/` folder.
 *
 * See PRIVACY-AND-IT.md for the district IT/security fact sheet.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Emit /speaking/index.html (not /speaking.html) so directory-style URLs
  // work on any static host without special rewrite rules.
  trailingSlash: true,
  // No server means no on-the-fly image optimization; serve images as-is.
  images: { unoptimized: true },
};

export default nextConfig;
