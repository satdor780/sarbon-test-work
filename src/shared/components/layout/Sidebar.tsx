"use client";

import { useState, useEffect, SetStateAction } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  Heart,
  Bell,
  ChevronDown,
  User,
  Menu,
  X,
  LayoutDashboard,
  Package,
  PackageCheck,
  Handshake,
  Route,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
} from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import { useRouter } from "../../i18n/navigation";

interface NavItem {
  key: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { key: "cargos", href: "/dispatcher/cargo", icon: <Package size={18} /> },
  { key: "myCargos", href: "/my-cargos", icon: <PackageCheck size={18} /> },
  { key: "offers", href: "/offers", icon: <Handshake size={18} /> },
  { key: "trips", href: "/trips", icon: <Route size={18} /> },
  { key: "driverManagers", href: "/driver-managers", icon: <Users size={18} /> },
  { key: "gpsTracking", href: "/gps-tracking", icon: <MapPin size={18} /> },
];

const LANGUAGES = [
  { code: "uz", label: "Uz", flag: "UZ" },
  { code: "ru", label: "Ru", flag: "RU" },
  { code: "en", label: "En", flag: "GB" },
];

export function LanguageSelector({ collapsed }: { collapsed?: boolean }) {
  const router = useRouter();
  const currentLocale = useLocale();
  const fullPathname = usePathname();
  const [open, setOpen] = useState(false);

  const pathname = fullPathname.replace(`/${currentLocale}`, "") || "/";
  const current = LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];

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
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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
                  style={{ width: "1.1em", height: "1.1em", borderRadius: "2px" }}
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

interface SidebarProps {
  locale?: string;
}

export const Sidebar = ({ locale = "uz" }: SidebarProps) => {
 
  const pathname = usePathname();
  
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-full shrink-0">
        <SidebarContent setMobileOpen={setMobileOpen} locale={locale}/>
      </div>

      {/* Mobile: top bar + drawer */}
      <div className="md:hidden flex flex-col">
        {/* Mobile top bar */}
        <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-border flex items-center px-4 gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <User size={14} />
          </div>
        </header>
        {/* Spacer for fixed header */}
        <div className="h-14" />
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div
        className={[
          "fixed top-0 left-0 bottom-0 z-50 transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <SidebarContent mobile setMobileOpen={setMobileOpen} locale={locale}/>
      </div>
    </>
  );
}


const SidebarContent = ({ mobile = false, locale, setMobileOpen }: { mobile?: boolean, locale: string, setMobileOpen: (value: SetStateAction<boolean>) => void }) => {
    const [collapsed, setCollapsed] = useState(false);
    const t = useTranslations("Header");
    const pathname = usePathname();
    return (

        <div
        className={[
          "flex flex-col h-full bg-white border-r border-border transition-all duration-300 ",
          mobile ? "w-64" : collapsed ? "w-16" : "w-64",
        ].join(" ")}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center h-14 px-3 border-b border-border shrink-0 relative">
          {/* Logo */}
          <div
            className={`flex items-center transition-all duration-300 ${
              collapsed && !mobile 
                ? "absolute left-1/2 -translate-x-1/2" 
                : ""
            }`}
          >
            {(!collapsed || mobile) && (
              <Link href={`/${locale}/dashboard`} className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  width={120}
                  height={50}
                  alt="sarbon logo"
                />
              </Link>
            )}
  
            {collapsed && !mobile && (
              <div className="w-8 h-8 flex items-center justify-center" onClick={() => setCollapsed((v) => !v)}>
                <Image
                  src="/mini-logo.svg"
                  width={45}
                  height={41}
                  alt="sarbon logo"
                />
              </div>
            )}
          </div>
  
          {/* Toggle Button */}
          {!mobile && !collapsed && (
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="ml-auto w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors shrink-0"
            >
              {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          )}
  
          {/* Mobile Close */}
          {mobile && (
            <button
              onClick={() => setMobileOpen(false)}
              className="ml-auto w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
  
        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5"> {/* ← добавил overflow-x-hidden */}
          {NAV_ITEMS.map((item) => {
            const active = pathname.includes(item.href);
            return (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors group relative", // px-3 вместо px-2.5
                  active
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                ].join(" ")}
                title={collapsed && !mobile ? t(item.key) : undefined}
              >
                <span className="shrink-0 w-5 flex justify-center">{item.icon}</span> {/* фиксированная ширина */}
                {(!collapsed || mobile) && (
                  <span className="truncate">{t(item.key)}</span>
                )}
  
                {/* Tooltip */}
                {collapsed && !mobile && (
                  <div className="absolute left-full ml-3 px-2 py-1 rounded-md bg-popover border border-border text-xs text-popover-foreground shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {t(item.key)}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

    {/* Bottom section */}
    <div className="border-t border-border p-2 space-y-0.5 shrink-0">
      {/* Notifications */}
      <button
        className="flex items-center gap-3 w-full px-2.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors relative"
      >
        <span className="relative shrink-0">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </span>
        {(!collapsed || mobile) && <span>{t("notifications")}</span>}
      </button>

      {/* Favourites */}
      <button
        className="flex items-center gap-3 w-full px-2.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Heart size={18} className="shrink-0" />
        {(!collapsed || mobile) && <span>{t("favourites")}</span>}
      </button>

      {/* Language */}
      <LanguageSelector collapsed={collapsed && !mobile} />

      {/* Settings */}
      <button
        className="flex items-center gap-3 w-full px-2.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Settings size={18} className="shrink-0" />
        {(!collapsed || mobile) && <span>{t("settings")}</span>}
      </button>

      {/* Divider */}
      <div className="h-px bg-border my-1" />

      {/* User */}
      <div
        className={[
          "flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-accent transition-colors cursor-pointer",
          collapsed && !mobile ? "justify-center" : "",
        ].join(" ")}
      >
        <div className="relative shrink-0">
          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <User size={14} />
          </div>
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full" />
        </div>
        {(!collapsed || mobile) && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-tight truncate">sandjey</p>
            <p className="text-xs text-muted-foreground leading-tight truncate">{t("role")}</p>
          </div>
        )}
        {(!collapsed || mobile) && (
          <LogOut size={14} className="text-muted-foreground shrink-0" />
        )}
      </div>
    </div>
  </div>
);
}
    