"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Heart, Share2, Weight, Box, Truck, ArrowDown } from "lucide-react";

import { CityFlag } from "./CityFlag";
import { BuyerAvatar } from "./BuyerAvatar";
import { GetAllCargoItem } from "../types";
import { TableCell, TableRow } from "@/src/shared/components/shadcn/ui";

interface CargoRowProps {
  cargo: GetAllCargoItem;
}

function getAvatarColor(name: string): string {
  const colors = [
    "#18181b",
    "#3f3f46",
    "#52525b",
    "#71717a",
    "#a1a1aa",
    "#27272a",
    "#09090b",
    "#44403c",
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
    ? (cargo.cargo_type[`name_${locale}` as LocaleKey] ?? cargo.cargo_type.name_ru)
    : null;

  const price = cargo.payment.price_request
    ? t("priceRequest")
    : cargo.payment.total_amount.toLocaleString("en-US");

  return (
    <TableRow className="group hover:bg-muted/40 transition-colors border-b border-border last:border-0">
      {/* From */}
      <TableCell className="px-4 py-3 border-r border-border">
        <CityFlag leg={fromPoint} />
      </TableCell>

      {/* To */}
      <TableCell className="px-4 py-3 border-r border-border">
        <CityFlag leg={toPoint} />
      </TableCell>

      {/* Price */}
      <TableCell className="px-4 py-3 whitespace-nowrap border-r border-border">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">${price}</span>
          <span className="text-xs text-muted-foreground">{t("cash")}</span>
        </div>
      </TableCell>

      {/* Cargo */}
      <TableCell className="px-4 py-3 border-r border-border">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 text-xs text-foreground">
            <span className="flex items-center gap-1">
              <Weight className="w-3 h-3 text-muted-foreground" />
              <span className="font-medium">{cargo.weight} {t("ton")}</span>
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1">
              <Box className="w-3 h-3 text-muted-foreground" />
              <span className="font-medium">{cargo.volume} {t("m3")}</span>
            </span>
          </div>
          {(cargoTypeName || cargo.shipment_type) && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {cargoTypeName && <span>{cargoTypeName}</span>}
              {cargoTypeName && cargo.shipment_type && <span>·</span>}
              {cargo.shipment_type && <span>{cargo.shipment_type}</span>}
            </div>
          )}
        </div>
      </TableCell>

      {/* Transport */}
      <TableCell className="px-4 py-3 border-r border-border">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <Truck className="w-3 h-3 text-muted-foreground shrink-0" />
            <span className="leading-snug font-medium">
              {[cargo.truck_type, cargo.trailer_plate_type, cargo.power_plate_type]
                .filter(Boolean)
                .join(" / ")}
            </span>
          </div>
          {cargo.loading_types.length > 0 && (
            <div className="flex items-center gap-1 pl-4 text-xs text-muted-foreground">
              <ArrowDown className="w-2.5 h-2.5 shrink-0" />
              <span>{cargo.loading_types.join(", ")}</span>
            </div>
          )}
          {cargo.unloading_types.length > 0 && (
            <div className="flex items-center gap-1 pl-4 text-xs text-muted-foreground">
              <ArrowDown className="w-2.5 h-2.5 shrink-0" />
              <span>{cargo.unloading_types.join(", ")}</span>
            </div>
          )}
        </div>
      </TableCell>

      {/* Buyer */}
      <TableCell className="px-4 py-3 border-r border-border">
        <div className="flex items-center gap-2.5">
          <BuyerAvatar
            initials={getInitials(cargo.contact_name)}
            color={getAvatarColor(cargo.contact_name)}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-foreground truncate">
              {cargo.contact_name}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {cargo.contact_phone}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLiked((p) => !p)}
            aria-label={t("favorite")}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              liked
                ? "text-rose-500 bg-rose-50 hover:bg-rose-100"
                : "text-muted-foreground hover:text-rose-500 hover:bg-muted"
            }`}
          >
            <Heart className="w-3.5 h-3.5" fill={liked ? "currentColor" : "none"} />
          </button>
          <button
            aria-label={t("share")}
            className="cursor-pointer p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}