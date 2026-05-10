"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Checkbox,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/shadcn/ui";
import { DateRangePicker } from "@/src/shared/components/ui";
import { SortValue } from "../types";

export function CargoFilters({
  sort,
  onSortChange,
}: {
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
}) {
  const t = useTranslations("cargo.filters");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const triggerClass =
    "w-full h-10 sm:h-8 text-[13px] sm:text-[0.8125rem] border-border rounded-md bg-background hover:bg-accent focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none transition-colors";

  const labelClass =
    "block text-[12px] sm:text-[0.6875rem] font-medium text-muted-foreground mb-1 tracking-wide";

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-4 md:p-5">
      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        {/* From city */}
        <div>
          <label className={labelClass}>{t("fromCity.label")}</label>
          <Select>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder={t("fromCity.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tas">Toshkent</SelectItem>
              <SelectItem value="mos">Moskva</SelectItem>
              <SelectItem value="tur">Turkiston</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* To city */}
        <div>
          <label className={labelClass}>{t("toCity.label")}</label>
          <Select>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder={t("toCity.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buk">Buxoro</SelectItem>
              <SelectItem value="tas">Toshkent</SelectItem>
              <SelectItem value="lah">Lahore</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transport */}
        <div>
          <label className={labelClass}>{t("transport.label")}</label>
          <Select>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder={t("transport.placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tentli">
                {t("transport.options.tentli")}
              </SelectItem>
              <SelectItem value="ref">{t("transport.options.ref")}</SelectItem>
              <SelectItem value="box">{t("transport.options.box")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Weight */}
        <div>
          <label className={labelClass}>{t("weight.label")}</label>
          <div className="flex">
            <Input
              placeholder={t("weight.min")}
              className="h-10 sm:h-8 text-[13px] sm:text-[0.8125rem] border-border bg-background rounded-tr-none rounded-br-none focus-visible:ring-0 focus-visible:z-10"
            />
            <Input
              placeholder={t("weight.max")}
              className="h-10 sm:h-8 text-[13px] sm:text-[0.8125rem] border-border bg-background rounded-tl-none rounded-bl-none -ml-px focus-visible:ring-0 focus-visible:z-10"
            />
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
        {/* Date range */}
        <div className="sm:col-span-1">
          <label className={labelClass}>{t("date.label")}</label>
          <DateRangePicker value={dateRange} onChange={setDateRange} />
        </div>

        {/* Sort */}
        <div>
          <label className={labelClass}>{t("sort.default")}</label>
          <Select
            defaultValue="created_at:desc"
            onValueChange={(v) => onSortChange(v as SortValue)}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="created_at:desc">
                {t("sort.newest")}
              </SelectItem>
              <SelectItem value="created_at:asc">{t("sort.oldest")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center pb-0.5 mt-3 sm:mt-5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <Checkbox className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground rounded" />
            <span className="text-[13px] sm:text-[0.8125rem] text-muted-foreground font-medium">
              {t("hasOffers")}
            </span>
          </label>
        </div>

        {/* Favorite */}
        <div className="flex items-center pb-0.5 mt-0 sm:mt-5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <Checkbox className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground rounded" />
            <span className="text-[13px] sm:text-[0.8125rem] text-muted-foreground font-medium">
              {t("favorite")}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
