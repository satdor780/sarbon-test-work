"use client";

import { useTranslations } from "next-intl";
import { Calendar, ArrowRight } from "lucide-react";
import { Input } from "@/src/components/shadcn/ui/input";
import { Checkbox } from "@/src/components/shadcn/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/shadcn/ui/select";
import { DateRangePicker } from "@/src/components/ui";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function CargoFilters() {
  const t = useTranslations("cargo.filters");

  // CargoFilters.tsx
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-5">
      {/* Row 1 */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        {/* From city */}
        <div>
          <label className="block text-[0.75rem] font-semibold text-zinc-500 mb-1.5">
            {t("fromCity.label")}
          </label>
          <Select>
          <SelectTrigger className="w-full! h-9! text-[0.875rem] border-zinc-200 rounded-md bg-zinc-50 data-placeholder:text-gray-400! focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none">
              <SelectValue
                style={{ color: "red !important" }}
                className="w-full text-red!"
                placeholder={t("fromCity.placeholder")}
              />
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
          <label className="block text-[0.75rem] font-semibold text-zinc-500 mb-1.5">
            {t("toCity.label")}
          </label>
          <Select>
          <SelectTrigger className="w-full! h-9! text-[0.875rem] border-zinc-200 rounded-md bg-zinc-50 data-placeholder:text-gray-400! focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none">              <SelectValue placeholder={t("toCity.placeholder")} />
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
          <label className="block text-[0.75rem] font-semibold text-zinc-500 mb-1.5">
            {t("transport.label")}
          </label>
          <Select>
          <SelectTrigger className="w-full! h-9! text-[0.875rem] border-zinc-200 rounded-md bg-zinc-50 data-placeholder:text-gray-400! focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none">              <SelectValue placeholder={t("transport.placeholder")} />
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
          <label className="block text-[0.75rem] font-semibold text-zinc-500 mb-1.5">
            {t("weight.label")}
          </label>
          <div className="flex">
            <Input
              placeholder={t("weight.min")}
              className="h-9 text-[0.875rem] border-zinc-200  bg-zinc-50 rounded-tr-none rounded-br-none"
            />
            <Input
              placeholder={t("weight.max")}
              className="h-9 text-[0.875rem] border-zinc-200 bg-zinc-50 rounded-tl-none rounded-bl-none"
            />
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <DateRangePicker value={dateRange} onChange={setDateRange} />

        {/* </div> */}

        {/* Checkboxes */}
        <div className="flex items-center gap-6 mt-5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <Checkbox className="border-zinc-300 data-[state=checked]:bg-[#2563eb] data-[state=checked]:border-[#2563eb]" />
            <span className="text-[0.875rem] text-gray-500 font-semibold">
              {t("hasOffers")}
            </span>
          </label>
        </div>

        <div className="flex items-center mt-5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <Checkbox className="border-zinc-300 data-[state=checked]:bg-[#2563eb] data-[state=checked]:border-[#2563eb]" />
            <span className="text-[0.875rem] text-gray-500 font-semibold">
              {t("favorite")}
            </span>
          </label>
        </div>

        {/* Sort */}
        <div className="mt-5 max-w-[80%]">
          <Select defaultValue="newest">
          <SelectTrigger className="w-full! h-9! text-[0.875rem] border-zinc-200 rounded-md bg-zinc-50 data-placeholder:text-gray-400! focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none">              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">{t("sort.newest")}</SelectItem>
              <SelectItem value="price_asc">{t("sort.priceAsc")}</SelectItem>
              <SelectItem value="price_desc">{t("sort.priceDesc")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
