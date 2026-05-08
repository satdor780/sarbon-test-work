"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useRouter } from "@/src/shared/i18n/navigation";
import { LANGUAGES } from "./constants";

export function LanguageSelector({ collapsed }: { collapsed?: boolean }) {
  const router = useRouter();
  const currentLocale = useLocale();
  const fullPathname = usePathname();
  const [open, setOpen] = useState(false);

  const pathname = fullPathname.replace(`/${currentLocale}`, "") || "/";
  const current =
    LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];

  function handleSelect(code: string) {
    setOpen(false);
    router.replace(pathname, { locale: code });
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Select language"
      >
        <div className="overflow-hidden rounded w-4 h-4 shrink-0">
          <ReactCountryFlag
            countryCode={current.flag}
            svg
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{current.label}</span>
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-full bottom-0 ml-2 z-20 bg-popover border border-border rounded-lg shadow-md py-1 min-w-[110px]">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={[
                  "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                  lang.code === currentLocale
                    ? "text-primary font-semibold bg-accent"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                ].join(" ")}
              >
                <ReactCountryFlag
                  countryCode={lang.flag}
                  svg
                  style={{
                    width: "1.1em",
                    height: "1.1em",
                    borderRadius: "2px",
                  }}
                />
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
