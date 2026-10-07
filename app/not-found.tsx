import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-background">
      <h1 className="text-4xl font-serif font-bold mb-4">404</h1>
      <p className="text-muted-foreground mb-8">Page not found.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-forest shadow-soft"
      >
        Back to home
      </Link>
    </div>
  );
}
