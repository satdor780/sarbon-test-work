"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { NAV_ITEMS } from "./constants";

interface SidebarNavProps {
  locale: string;
  collapsed: boolean;
  mobile: boolean;
}

export function SidebarNav({ locale, collapsed, mobile }: SidebarNavProps) {
  const pathname = usePathname();
  const t = useTranslations("Header");

  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5">
      {NAV_ITEMS.map((item) => {
        const active = pathname.includes(item.href);
        return (
          <Link
            key={item.key}
            href={`/${locale}${item.href}`}
            className={[
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors group relative",
              active
                ? "bg-accent text-accent-foreground font-semibold"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            ].join(" ")}
            title={collapsed && !mobile ? t(item.key) : undefined}
          >
            <span className="shrink-0 w-5 flex justify-center">
              {item.icon}
            </span>
            {(!collapsed || mobile) && (
              <span className="truncate">{t(item.key)}</span>
            )}
            {collapsed && !mobile && (
              <div className="absolute left-full ml-3 px-2 py-1 rounded-md bg-popover border border-border text-xs text-popover-foreground shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                {t(item.key)}
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
