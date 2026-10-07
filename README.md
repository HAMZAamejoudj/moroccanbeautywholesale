# Moroccan Beauty Wholesale — source project

Next.js source for [moroccanbeautywholesale.com](https://www.moroccanbeautywholesale.com). Edit content in `app/lib/site.ts`, run locally, then deploy the `out/` folder to cPanel.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Deploy to Namecheap / cPanel

1. Run `npm run build`
2. Upload everything inside `out/` to the domain folder (e.g. `moroccanbeautywholesale.com/`)
3. Keep `.htaccess` at the site root

## Where to edit

| What | File |
|------|------|
| Text, links, phone, email | `app/lib/site.ts` |
| Layout / sections | `app/components/` |
| Colors / fonts | `app/globals.css` |
| SEO metadata | `app/layout.tsx` |
