/** Root `/` — real 301 is handled by Apache (.htaccess in postbuild). Minimal HTML fallback. */
export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0;url=/en/" />
        <link rel="canonical" href="https://moroccanbeautywholesale.com/en/" />
        <title>Moroccan Beauty Wholesale</title>
      </head>
      <body>
        <p>
          <a href="/en/">Moroccan Beauty Wholesale</a>
        </p>
      </body>
    </html>
  );
}
