export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/" />
        <link rel="canonical" href="https://www.moroccanbeautywholesale.com/en/" />
        <title>Moroccan Beauty Wholesale</title>
      </head>
      <body>
        <p>
          Redirecting to <a href="/en/">Moroccan Beauty Wholesale</a>...
        </p>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace('/en/');`,
          }}
        />
      </body>
    </html>
  );
}
