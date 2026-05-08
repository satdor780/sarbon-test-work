"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SidebarContent, MobileTopBar } from "./components";

interface SidebarProps {
  locale?: string;
}

export function Sidebar({ locale = "uz" }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex flex-col h-full shrink-0">
        <SidebarContent setMobileOpen={setMobileOpen} locale={locale} />
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden flex flex-col">
        <MobileTopBar onMenuClick={() => setMobileOpen(true)} />
      </div>

      {/* Overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <div
        className={[
          "fixed top-0 left-0 bottom-0 z-50 transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <SidebarContent mobile setMobileOpen={setMobileOpen} locale={locale} />
      </div>
    </>
  );
}
