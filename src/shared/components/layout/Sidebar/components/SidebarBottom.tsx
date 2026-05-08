"use client";

import { useTranslations } from "next-intl";
import { Bell, Heart, Settings, User, LogOut } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";

interface SidebarBottomProps {
  collapsed: boolean;
  mobile: boolean;
}

export function SidebarBottom({ collapsed, mobile }: SidebarBottomProps) {
  const t = useTranslations("Header");
  const show = !collapsed || mobile;

  return (
    <div className="border-t border-border p-2 space-y-0.5 shrink-0">
      <button className="flex items-center gap-3 w-full px-2.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors relative">
        <span className="relative shrink-0">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </span>
        {show && <span>{t("notifications")}</span>}
      </button>

      <button className="flex items-center gap-3 w-full px-2.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
        <Heart size={18} className="shrink-0" />
        {show && <span>{t("favourites")}</span>}
      </button>

      <LanguageSelector collapsed={collapsed && !mobile} />

      <button className="flex items-center gap-3 w-full px-2.5 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
        <Settings size={18} className="shrink-0" />
        {show && <span>{t("settings")}</span>}
      </button>

      <div className="h-px bg-border my-1" />

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
        {show && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">
                sandjey
              </p>
              <p className="text-xs text-muted-foreground leading-tight truncate">
                {t("role")}
              </p>
            </div>
            <LogOut size={14} className="text-muted-foreground shrink-0" />
          </>
        )}
      </div>
    </div>
  );
}
