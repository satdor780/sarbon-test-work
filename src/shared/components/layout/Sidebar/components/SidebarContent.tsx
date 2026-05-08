"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SidebarNav } from "./SidebarNav";
import { SidebarBottom } from "./SidebarBottom";
import { SidebarContentProps } from "./types";

export function SidebarContent({
  mobile = false,
  locale,
  setMobileOpen,
}: SidebarContentProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={[
        "flex flex-col h-full bg-white border-r border-border transition-all duration-300",
        mobile ? "w-64" : collapsed ? "w-16" : "w-64",
      ].join(" ")}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center h-14 px-3 border-b border-border shrink-0 relative">
        <div
          className={`flex items-center transition-all duration-300 ${
            collapsed && !mobile ? "absolute left-1/2 -translate-x-1/2" : ""
          }`}
        >
          {(!collapsed || mobile) && (
            <Link
              href={`/${locale}/dashboard`}
              className="flex items-center gap-2"
            >
              <Image
                src="/logo.png"
                width={120}
                height={50}
                alt="sarbon logo"
              />
            </Link>
          )}
          {collapsed && !mobile && (
            <div
              className="w-8 h-8 flex items-center justify-center"
              onClick={() => setCollapsed((v) => !v)}
            >
              <Image
                src="/mini-logo.svg"
                width={45}
                height={41}
                alt="sarbon logo"
              />
            </div>
          )}
        </div>

        {!mobile && !collapsed && (
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="ml-auto w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors shrink-0"
          >
            <ChevronLeft size={14} />
          </button>
        )}

        {mobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <SidebarNav locale={locale} collapsed={collapsed} mobile={mobile} />
      <SidebarBottom collapsed={collapsed} mobile={mobile} />
    </div>
  );
}
