"use client";

import { useTranslations } from "next-intl";
import { Search, SlidersHorizontal } from "lucide-react";
import { CargoFilters, CargoTable } from "./components";
import { Input } from "@/src/shared/components/shadcn/ui";
import { useState } from "react";

export default function CargoDispatcher() {
  const t = useTranslations("cargo");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-full bg-background font-sans">
      {/* Page header — sticky только на десктопе */}
      <div className="md:sticky md:top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        {/* Desktop layout */}
        <div className="hidden md:flex px-6 lg:px-8 h-14 items-center gap-4">
          <nav className="flex items-center text-sm text-muted-foreground gap-1.5">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              {t("breadcrumb.home")}
            </span>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">
              {t("breadcrumb.allCargoes")}
            </span>
          </nav>
          <div className="flex-1" />
          <div className="flex items-center w-full max-w-xs h-8 bg-muted border border-border rounded-md overflow-hidden">
            <div className="h-full px-2.5 flex items-center justify-center">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <Input
              placeholder={t("search.placeholder")}
              className="flex-1 h-full border-none shadow-none bg-transparent text-sm px-0 focus-visible:ring-0 focus-visible:outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        {/* Mobile layout — поиск отдельно, крупнее */}
        <div className="md:hidden px-4 pt-4 pb-3">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-muted-foreground gap-1.5 mb-3">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              {t("breadcrumb.home")}
            </span>
            <span className="text-border">/</span>
            <span className="text-foreground font-semibold">
              {t("breadcrumb.allCargoes")}
            </span>
          </nav>

          {/* Search — полная ширина, выше */}
          <div className="flex items-center w-full h-10 bg-muted border border-border rounded-lg overflow-hidden">
            <div className="h-full px-3 flex items-center justify-center">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <Input
              placeholder={t("search.placeholder")}
              className="flex-1 h-full border-none shadow-none bg-transparent text-sm px-0 focus-visible:ring-0 focus-visible:outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-5 pb-0">
        {/* Title row */}
        <div className="flex items-center justify-between mb-0">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              {t("title")}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t("breadcrumb.allCargoes")}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md px-3 py-1.5 hover:bg-accent transition-colors"
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">{t("filters.name")}</span>
          </button>
        </div>

        {/* Filters */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pt-4 pb-2">
              <CargoFilters />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg">
          <CargoTable />
        </div>
      </div>
    </div>
  );
}
