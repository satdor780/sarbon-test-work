"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/src/components/shadcn/ui/input";
import { CargoFilters } from "./components/CargoFilters";
import { CargoTable } from "./components/CargoTable";

export default function CargoDispatcher() {
  const t = useTranslations("cargo");

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans">
      {/* ── Header area ── */}
      <div className="mx-auto w-full px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
        {/* Breadcrumb */}
        <nav className="text-[0.8125rem] text-zinc-400 mb-2">
          <span className="hover:text-zinc-600 cursor-pointer transition-colors">
            {t("breadcrumb.home")}
          </span>
          <span className="mx-1.5 text-blue">/</span>
          <span className="text-zinc-400">{t("breadcrumb.allCargoes")}</span>
        </nav>

        {/* Title + Search
            Mobile:  stack vertically (flex-col), search full-width
            Tablet:  row, search fixed width
            Desktop: row, search fixed width (same as tablet+)
        */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-[1.375rem] sm:text-[1.75rem] font-bold text-blue tracking-tight">
            {t("title")}
          </h1>

          <div className="flex items-center w-full sm:w-[16rem] h-9 bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden">
            <Input
              placeholder={t("search.placeholder")}
              className="flex-1 h-full border-none shadow-none bg-transparent text-[0.875rem] px-3 focus-visible:ring-0 focus-visible:outline-none"
            />
            <div className="h-full px-2.5 flex items-center justify-center border-l border-zinc-200">
              <Search className="w-4 h-4 text-zinc-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters ──
          Horizontal scroll on mobile so filter chips never wrap awkwardly.
          On tablet+ they wrap naturally inside the normal flow.
      */}
      <div className="mx-auto w-full px-4 sm:px-6 mb-4 sm:mb-5">
        {/* Wrapper gives mobile a scrollable row without touching CargoFilters internals */}
        <div className="overflow-x-auto sm:overflow-x-visible -mx-4 px-4 sm:mx-0 sm:px-0">
          <CargoFilters />
        </div>
      </div>

      {/* ── Table ──
          On mobile the table gets a horizontal scroll container so columns
          never collapse. On larger screens it fills the width normally.
      */}
      <div className="mx-auto w-full px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="overflow-x-auto rounded-lg">
          <CargoTable />
        </div>
      </div>
    </div>
  );
}