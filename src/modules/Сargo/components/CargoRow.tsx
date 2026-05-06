"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Heart, Share2, Weight, Box, Truck, ArrowDown } from "lucide-react";
import { TableCell, TableRow } from "@/src/components/shadcn/ui/table";
import { CityFlag } from "./CityFlag";
import { BuyerAvatar } from "./BuyerAvatar";
import { GetAllCargoItem } from "@/src/api/cargo/cargo.types";

interface CargoRowProps {
  cargo: GetAllCargoItem;
}

function getAvatarColor(name: string): string {
  const colors = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#ef4444",
    "#14b8a6",
  ];
  return colors[name.charCodeAt(0) % colors.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

type LocaleKey = "name_uz" | "name_ru" | "name_en" | "name_tr" | "name_zh";

export function CargoRow({ cargo }: CargoRowProps) {
  const t = useTranslations("cargo.row");
  const locale = useLocale();
  const [liked, setLiked] = useState(cargo.is_liked);

  const fromPoint = cargo.route_points.find((p) => p.is_main_load);
  const toPoint = cargo.route_points.find((p) => p.is_main_unload);

  const cargoTypeName = cargo.cargo_type
    ? (cargo.cargo_type[`name_${locale}` as LocaleKey] ??
      cargo.cargo_type.name_ru)
    : null;

  const price = cargo.payment.price_request
    ? t("priceRequest")
    : cargo.payment.total_amount.toLocaleString("en-US");

  return (
    <TableRow className="group hover:bg-zinc-50/70 transition-colors h-[5.3rem]">
      {/* From */}
      <TableCell className="px-5 py-3.5 border-r border-zinc-200">
        <CityFlag leg={fromPoint} />
      </TableCell>

      {/* To */}
      <TableCell className="px-5 py-3.5 border-r border-zinc-200">
        <CityFlag leg={toPoint} />
      </TableCell>

      {/* Price */}
      <TableCell className="px-5 py-3.5 whitespace-nowrap border-r border-zinc-200">
        <span className="text-[0.9375rem] font-bold text-blue">${price}</span>
        <span className="ml-1 text-[0.875rem] font-medium text-blue">
          {t("cash")}
        </span>
      </TableCell>

      {/* Cargo */}
      <TableCell className="px-5 py-3.5 border-r border-zinc-200">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 text-[0.8125rem] text-zinc-600">
            <span className="flex items-center gap-1 font-semibold">
              <Weight className="w-3.5 h-3.5 text-zinc-400" />
              {cargo.weight} {t("ton")}
            </span>
            <span className="flex items-center gap-1 font-semibold">
              <Box className="w-3.5 h-3.5 text-zinc-400" />
              {cargo.volume} {t("m3")}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[0.75rem] text-zinc-500">
            {cargoTypeName && <span>{cargoTypeName}</span>}
            {cargoTypeName && cargo.shipment_type && (
              <span className="text-zinc-300">•</span>
            )}
            {cargo.shipment_type && <span>{cargo.shipment_type}</span>}
          </div>
        </div>
      </TableCell>

      {/* Transport */}
      <TableCell className="px-5 py-3.5 border-r border-zinc-200">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-[0.8125rem] text-zinc-700">
            <Truck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="leading-snug font-semibold">
              {[
                cargo.truck_type,
                cargo.trailer_plate_type,
                cargo.power_plate_type,
              ]
                .filter(Boolean)
                .join(" / ")}
            </span>
          </div>
          {cargo.loading_types.length > 0 && (
            <div className="flex items-center gap-1 pl-5 text-[0.75rem] text-zinc-400">
              <ArrowDown className="w-3 h-3 shrink-0" />
              <span>{cargo.loading_types.join(", ")}</span>
            </div>
          )}
          {cargo.unloading_types.length > 0 && (
            <div className="flex items-center gap-1 pl-5 text-[0.75rem] text-zinc-400">
              <ArrowDown className="w-3 h-3 shrink-0" />
              <span>{cargo.unloading_types.join(", ")}</span>
            </div>
          )}
        </div>
      </TableCell>

      {/* Buyer */}
      <TableCell className="px-5 py-3.5 border-r border-zinc-200">
        <div className="flex items-center gap-2.5">
          <BuyerAvatar
            initials={getInitials(cargo.contact_name)}
            color={getAvatarColor(cargo.contact_name)}
          />
          <div className="flex flex-col">
            <span className="text-[0.8125rem] font-semibold text-zinc-800">
              {cargo.contact_name}
            </span>
            <span className="text-[0.75rem] text-zinc-400">
              {cargo.contact_phone}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell className="px-5 py-3.5 border-r border-zinc-200">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLiked((p) => !p)}
            aria-label={t("favorite")}
            className={`p-1.5 rounded-full transition-colors ${
              liked ? "text-rose-500" : "text-blue hover:text-rose-400"
            }`}
          >
            <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
          </button>
          <button
            aria-label={t("share")}
            className="p-1.5 rounded-full text-blue  transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
