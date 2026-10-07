import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'out');

// ============================================
// 1. Find the generated CSS file
// ============================================
const chunksDir = path.join(outDir, '_next', 'static', 'chunks');
let cssFileName = null;

if (fs.existsSync(chunksDir)) {
  const files = fs.readdirSync(chunksDir);
  cssFileName = files.find(f => f.endsWith('.css'));
}

if (!cssFileName) {
  console.log('⚠ No CSS file found in _next/static/chunks/');
  process.exit(0);
}

const cssHref = `/_next/static/chunks/${cssFileName}`;
console.log(`✓ Found CSS: ${cssHref}`);

// ============================================
// 2. Inject CSS <link> into ALL HTML files that are missing it
// ============================================
function processHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip _next directory
      if (entry.name === '_next') continue;
      processHtmlFiles(fullPath);
    } else if (entry.name.endsWith('.html')) {
      let html = fs.readFileSync(fullPath, 'utf8');
      // Check if this HTML already has a CSS stylesheet link
      if (!html.includes(cssFileName)) {
        const linkTag = `<link rel="stylesheet" href="${cssHref}" />`;
        html = html.replace('</head>', `${linkTag}\n</head>`);
        fs.writeFileSync(fullPath, html, 'utf8');
        console.log(`  + Injected CSS into: ${path.relative(outDir, fullPath)}`);
      } else {
        console.log(`  ✓ CSS already present: ${path.relative(outDir, fullPath)}`);
      }
    }
  }
}

console.log('\n--- Injecting CSS into HTML files ---');
processHtmlFiles(outDir);

// ============================================
// 3. Copy .htaccess into out/ directory
// ============================================
const htaccessContent = `#######################################
# CHARSET FIX (UTF-8)
#######################################
<IfModule mod_headers.c>
  <FilesMatch "\\.(html|htm)$">
    Header set Content-Type "text/html; charset=UTF-8"
  </FilesMatch>
</IfModule>

#######################################
# GZIP COMPRESSION (TEXT & ASSETS)
#######################################
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

#######################################
# BROWSER CACHING
#######################################
<IfModule mod_expires.c>
  ExpiresActive On

  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"

  # CSS & JS
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"

  # Fonts
  ExpiresByType font/woff2 "access plus 1 year"

  # Default
  ExpiresDefault "access plus 7 days"
</IfModule>

#######################################
# CACHE-CONTROL HEADERS (LCP BOOST)
#######################################
<IfModule mod_headers.c>
  <FilesMatch "\\.(css|js|woff2|png|jpg|jpeg|webp|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>

#######################################
# SECURITY HEADERS (SEO SAFE)
#######################################
<IfModule mod_headers.c>
  Header always unset X-Powered-By
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

#######################################
# ROUTING — CANONICAL HOST (non-www HTTPS) & NEXT.JS
#######################################
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 0. www → non-www (301, preserve path + query)
  RewriteCond %{HTTP_HOST} ^www\\.moroccanbeautywholesale\\.com$ [NC]
  RewriteRule ^ https://moroccanbeautywholesale.com%{REQUEST_URI} [R=301,L]

  # 0b. http → https on apex domain
  RewriteCond %{HTTPS} off
  RewriteCond %{HTTP_HOST} ^moroccanbeautywholesale\\.com$ [NC]
  RewriteRule ^ https://moroccanbeautywholesale.com%{REQUEST_URI} [R=301,L]

  # 1. Allow direct access to _next assets (CSS, JS, fonts, images)
  RewriteCond %{REQUEST_URI} ^/_next/ [NC]
  RewriteRule ^ - [L]

  # 2. Allow direct access to static files and directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # 3b. Blog redirects (301). Existing files/folders were already served above.
  # Old single-page blog had no per-post URLs; these are safety nets for any old links.
  RewriteRule ^blog/?$ /en/blog/ [R=301,L]
  RewriteRule ^(en|fr|ar)/blog/(argan-oil-hair|argan-oil-hair-growth|argan-oil-revitalizing|organic-argan-oil-know)/?$ /$1/blog/wholesale-argan-oil-guide/ [R=301,L]
  RewriteRule ^(en|fr|ar)/blog/where-to-buy/?$ /$1/blog/importing-moroccan-cosmetics/ [R=301,L]
  RewriteRule ^(en|fr|ar)/blog/(prickly-pear-choose|prickly-pear-vs-argan|how-to-use-prickly-pear|aker-fassi)/?$ /$1/blog/ [R=301,L]
  # Any other unknown blog post URL falls back to the blog index
  RewriteRule ^(en|fr|ar)/blog/[^/]+/?$ /$1/blog/ [R=301,L]

  # 4. Server 301 redirect root / to /en/
  RewriteRule ^$ /en/ [R=301,L]

  # 5. Try adding /index.html for directory-style URLs
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.*)$ $1/index.html [L]
</IfModule>

#######################################
# CUSTOM 404 PAGE
#######################################
ErrorDocument 404 /404.html
`;

fs.writeFileSync(path.join(outDir, '.htaccess'), htaccessContent, 'utf8');
console.log('\n✓ .htaccess written to out/ directory');

console.log('\n✅ Post-build complete! The out/ directory is ready for cPanel upload.');
