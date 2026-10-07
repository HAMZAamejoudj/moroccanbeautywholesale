/** Local flag icons for the language switcher (no external CDN). */
export function LocaleFlag({
  code,
  className = "w-7 h-auto rounded-sm shadow-sm",
  decorative = false,
}: {
  code: "en" | "fr" | "ar";
  className?: string;
  /** When true, alt is empty (label shown beside the flag). */
  decorative?: boolean;
}) {
  const alt =
    decorative ? "" : code === "en" ? "English" : code === "fr" ? "Français" : "العربية";

  if (code === "en") {
    return (
      <svg className={className} viewBox="0 0 60 30" aria-hidden={decorative || undefined} role="img">
        {!decorative && <title>{alt}</title>}
        <clipPath id="gb-clip">
          <path d="M0 0v30h60V0z" />
        </clipPath>
        <g clipPath="url(#gb-clip)">
          <path fill="#012169" d="M0 0h60v30H0z" />
          <path stroke="#fff" strokeWidth="6" d="M0 0l60 30M60 0L0 30" />
          <path stroke="#C8102E" strokeWidth="4" d="M0 0l60 30M60 0L0 30" />
          <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" />
          <path stroke="#C8102E" strokeWidth="6" d="M30 0v30M0 15h60" />
        </g>
      </svg>
    );
  }

  if (code === "fr") {
    return (
      <svg className={className} viewBox="0 0 3 2" aria-hidden={decorative || undefined} role="img">
        {!decorative && <title>{alt}</title>}
        <rect width="1" height="2" fill="#002395" />
        <rect x="1" width="1" height="2" fill="#fff" />
        <rect x="2" width="1" height="2" fill="#ED2939" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 3 2" aria-hidden={decorative || undefined} role="img">
      {!decorative && <title>{alt}</title>}
      <rect width="3" height="2" fill="#C1272D" />
      <polygon fill="none" stroke="#006233" strokeWidth="0.08" points="1.5,0.35 1.65,0.85 2.15,0.85 1.75,1.15 1.9,1.65 1.5,1.35 1.1,1.65 1.25,1.15 0.85,0.85 1.35,0.85" />
    </svg>
  );
}
