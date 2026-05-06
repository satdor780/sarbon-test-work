"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "../../lib/utils";
import {
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../shadcn/ui";

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const t = useTranslations("cargo.filters.date");
  const [open, setOpen] = React.useState(false);
  const [internalRange, setInternalRange] = React.useState<
    DateRange | undefined
  >(value);

  const range = value ?? internalRange;
  const handleSelect = (r: DateRange | undefined) => {
    setInternalRange(r);
    onChange?.(r);
    // закрыть попап когда выбраны обе даты
    if (r?.from && r?.to) setOpen(false);
  };

  const fromLabel = range?.from ? format(range.from, "dd.MM.yyyy") : t("start");
  const toLabel = range?.to ? format(range.to, "dd.MM.yyyy") : t("end");

  return (
    <div className={cn("flex-1  w-full", className)}>
      {/* <label className="block text-[0.75rem] font-semibold text-zinc-500 mb-1.5">
        {t("label")}
      </label> */}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex items-center w-full gap-2 bg-white border border-zinc-200 rounded-lg px-3 h-9",
              "hover:border-zinc-300 transition-colors",
              "focus:outline-none focus:ring-1 focus:ring-blue-500 h-8",
            )}
          >
            {/* Boshlanish — прижат влево */}
            <span
              className={cn(
                "text-[0.8125rem]",
                range?.from ? "text-zinc-700" : "text-zinc-400",
              )}
            >
              {fromLabel}
            </span>

            {/* Стрелка + Tugash — растягиваются по центру */}
            <span className="flex flex-1 items-center justify-center gap-1.5 text-[0.8125rem]">
              <ArrowRight className="w-3 h-3 text-zinc-300 shrink-0" />
              <span
                className={cn(range?.to ? "text-zinc-700" : "text-zinc-400")}
              >
                {toLabel}
              </span>
            </span>

            {/* Иконка — прижата вправо */}
            <CalendarIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
