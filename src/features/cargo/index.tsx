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
      {/* Page header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-4">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs text-muted-foreground gap-1.5">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              {t("breadcrumb.home")}
            </span>
            <span className="text-border">/</span>
            <span className="text-foreground font-medium">{t("breadcrumb.allCargoes")}</span>
          </nav>

          <div className="flex-1" />

          {/* Search */}
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
      </div>

      {/* Page content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              {t("title")}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t("breadcrumb.allCargoes")}
            </p>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md px-3 py-1.5 hover:bg-accent transition-colors">
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">{t('filters.name')}</span>
          </button>
        </div>

        {/* Filters */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          className={`
            overflow-hidden transition-all duration-600 ease-in-out
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
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