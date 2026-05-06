"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Heart, Bell, ChevronDown, User, Menu, X } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import { useRouter } from "../../i18n/navigation";

interface NavItem {
  key: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", href: "/dashboard" },
  { key: "cargos", href: "/dispatcher/cargo" },
  { key: "myCargos", href: "/my-cargos" },
  { key: "offers", href: "/offers" },
  { key: "trips", href: "/trips" },
  { key: "driverManagers", href: "/driver-managers" },
  { key: "gpsTracking", href: "/gps-tracking" },
];

const LANGUAGES = [
  { code: "uz", label: "Uz", flag: "UZ" },
  { code: "ru", label: "Ru", flag: "RU" },
  { code: "en", label: "En", flag: "GB" },
];

function SarbonLogo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-1 shrink-0">
      <Image src="/logo.png" width={120} height={50} alt="logo" />
    </Link>
  );
}

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "text-sm font-medium whitespace-nowrap transition-colors duration-150",
        active ? "text-green font-semibold" : "text-blue hover:text-green",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export function LanguageSelector() {
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
        className="flex items-center gap-1.5 text-sm font-medium text-blue hover:text-blue transition-colors"
        aria-label="Select language"
      >
        <div className="overflow-hidden rounded-md w-[1.2rem] h-[1.2rem]">
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
        <span className="text-sm font-medium text-zinc-900">
          {current.label}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-20 bg-white border border-gray-100 rounded-lg shadow-lg py-1 min-w-[100px]">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={[
                  "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                  lang.code === currentLocale
                    ? "text-green font-semibold bg-green-50"
                    : "text-blue hover:bg-gray-50",
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

function UserMenu({ name, role }: { name: string; role: string }) {
  return (
    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center">
          <User size={16} />
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green border-2 border-white rounded-full" />
      </div>
      {/* Имя и роль скрыты на mobile, видны с sm+ */}
      <div className="text-left hidden sm:block">
        <p className="text-sm font-semibold leading-tight">{name}</p>
        <p className="text-xs text-gray-400 leading-tight">{role}</p>
      </div>
    </button>
  );
}

interface HeaderProps {
  locale?: string;
}

export default function Header({ locale = "uz" }: HeaderProps) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Закрывать мобильное меню при смене роута
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Блокировать скролл страницы когда меню открыто
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 h-14 flex items-center gap-3 md:gap-6">
          {/* ── Logo ─────────────────────────────────────────── */}
          <SarbonLogo />

          {/* ── Nav (скрыта на mobile, горизонтальный скролл на tablet, полная на desktop) ── */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-5 flex-1 overflow-x-auto scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const active = pathname.includes(item.href);
              return (
                <NavLink
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  label={t(item.key)}
                  active={active}
                />
              );
            })}
          </nav>

          {/* ── Spacer (mobile only, чтобы прижать иконки вправо) ── */}
          <div className="flex-1 md:hidden" />

          {/* ── Right actions ────────────────────────────────── */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {/* Favourites — скрыт на mobile */}
            <button
              className="hidden md:inline-flex text-blue hover:text-red-400 transition-colors"
              aria-label="Favourites"
            >
              <Heart size={20} />
            </button>

            {/* Notifications */}
            <button
              className="relative text-blue hover:text-blue-600 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Language */}
            <LanguageSelector />

            {/* Divider — скрыт на mobile */}
            <div className="hidden md:block h-6 w-px bg-gray-200" />

            {/* User */}
            <UserMenu name="sandjey" role={t("role")} />

            {/* ── Hamburger (только mobile) ────────────────── */}
            <button
              className="md:hidden flex items-center justify-center w-8 h-8 text-blue hover:text-green transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      {/* Overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={[
          "fixed top-14 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg",
          "transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        <nav className="flex flex-col px-4 py-3">
          {NAV_ITEMS.map((item) => {
            const active = pathname.includes(item.href);
            return (
              <div
                key={item.key}
                className="border-b border-gray-50 last:border-0"
              >
                <NavLink
                  href={`/${locale}${item.href}`}
                  label={t(item.key)}
                  active={active}
                  onClick={() => setMobileMenuOpen(false)}
                />
                {/* Добавляем вертикальный паддинг через обёртку, не трогая NavLink */}
              </div>
            );
          })}
        </nav>

        {/* Favourites — доступен в мобильном меню */}
        <div className="px-4 pb-4 pt-1 border-t border-gray-100">
          <button
            className="flex items-center gap-2 text-sm text-blue hover:text-red-400 transition-colors"
            aria-label="Favourites"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Heart size={18} />
            <span className="font-medium">{t("favourites")}</span>
          </button>
        </div>
      </div>
    </>
  );
}
