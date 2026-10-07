"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = pathname.split("/")[1] || "en";

  const languages = [
    { code: "en", label: "English", flag: "gb" },
    { code: "fr", label: "Français", flag: "fr" },
    { code: "ar", label: "العربية", flag: "ma" },
  ];

  const handleLanguageChange = (lang: string) => {
    if (lang === currentLang) return;
    
    const segments = pathname.split("/");
    segments[1] = lang;
    const newPath = segments.join("/");
    
    setIsOpen(false);
    router.push(newPath);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguage = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Language: ${currentLanguage.label}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="inline-flex items-center justify-center w-11 h-11 rounded-lg hover:bg-[#F1EBE1] transition-colors bg-transparent"
      >
        <img
          src={`https://flagcdn.com/w40/${currentLanguage.flag}.png`}
          alt=""
          width={28}
          height={21}
          className="rounded-sm w-7 h-auto object-cover shadow-sm"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Choose language"
          className="absolute top-full end-0 mt-1.5 w-40 bg-background border border-border rounded-lg shadow-elevated z-50 overflow-hidden"
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                type="button"
                role="option"
                aria-selected={currentLang === lang.code}
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 text-sm text-start hover:bg-accent transition-colors ${
                  currentLang === lang.code ? "bg-accent/50 font-semibold text-foreground" : "font-medium text-muted-foreground hover:text-foreground"
                }`}
              >
                <img
                  src={`https://flagcdn.com/w20/${lang.flag}.png`}
                  alt={lang.label}
                  width="20"
                  className="rounded-sm shadow-sm"
                />
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
