import { SITE_URL } from "@/lib/siteUrl";

/**
 * Fallback page for URLs that Apache normally 301-redirects (see .htaccess written by postbuild.mjs).
 * Valid HTML with a canonical to the real page, so it is harmless if the redirect rules are not active.
 */
export function StaticRedirect({ to, title, indexable = false }: { to: string; title: string; indexable?: boolean }) {
  const target = `${SITE_URL}${to}`;
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content="Moroccan Beauty Wholesale: Moroccan beauty products for shops, spas and hotels. Minimum order: 50 pieces." />
        <meta httpEquiv="refresh" content={`0;url=${to}`} />
        <link rel="canonical" href={target} />
        {!indexable && <meta name="robots" content="noindex,follow" />}
      </head>
      <body>
        <h1>{title}</h1>
        <p>
          <a href={to}>{title}</a>
        </p>
        <ul>
          <li>
            <a href="/en/">English</a>
          </li>
          <li>
            <a href="/fr/">Français</a>
          </li>
          <li>
            <a href="/ar/">العربية</a>
          </li>
        </ul>
      </body>
    </html>
  );
}
