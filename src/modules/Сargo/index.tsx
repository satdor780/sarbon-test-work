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
      <div className="max-w-[90rem] mx-auto px-6 pt-6 pb-4">
        {/* Breadcrumb */}
        <nav className="text-[0.8125rem] text-zinc-400 mb-2">
          <span className="hover:text-zinc-600 cursor-pointer transition-colors">
            {t("breadcrumb.home")}
          </span>
          <span className="mx-1.5 text-blue">/</span>
          <span className="text-zinc-400">{t("breadcrumb.allCargoes")}</span>
        </nav>

        {/* Title + Search */}
        <div className="flex items-center justify-between">
  <h1 className="text-[1.75rem] font-bold text-blue tracking-tight">
    {t("title")}
  </h1>

  <div className="flex items-center w-[16rem] h-9 bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden">
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

      {/* ── Filters ── */}
      <div className="max-w-[90rem] mx-auto px-6 mb-5">
        <CargoFilters />
      </div>

      {/* ── Table ── */}
      <div className="max-w-[90rem] mx-auto px-6 pb-12">
        <CargoTable />
      </div>
    </div>
  );
}
