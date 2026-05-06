"use client";

import ReactCountryFlag from "react-country-flag";
import type { RoutePoint } from "@/src/api/cargo/cargo.types";

// ISO 2 → ISO 3 буква (для отображения)
const ISO2_TO_ISO3: Record<string, string> = {
  UZ: "UZB",
  RU: "RUS",
  KZ: "KAZ",
  KG: "KGZ",
  TJ: "TJK",
  TM: "TKM",
  AZ: "AZE",
  AM: "ARM",
  GE: "GEO",
  TR: "TUR",
  CN: "CHN",
  PK: "PAK",
  AF: "AFG",
  IR: "IRN",
  DE: "DEU",
  PL: "POL",
  LT: "LTU",
  LV: "LVA",
  EE: "EST",
  FI: "FIN",
  BY: "BLR",
  UA: "UKR",
  RO: "ROU",
  HU: "HUN",
};

function formatDateTime(isoString: string): string {
  const d = new Date(isoString);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}.${mm}.${yyyy} ${hh}:${min}`;
}

interface CityFlagProps {
  leg?: RoutePoint;
}

export function CityFlag({ leg }: CityFlagProps) {
  if (!leg) return null;

  const iso3 = ISO2_TO_ISO3[leg.country_code] ?? leg.country_code;

  return (
    <div className="flex items-start gap-2">
      {/* Флаг + ISO3 */}
      <div className="flex items-center gap-1 mt-0.5">
        {/* <ReactCountryFlag
          countryCode={leg.country_code}
          svg
          style={{ width: "1.25rem", height: "0.875rem", borderRadius: "3px" }}
          title={leg.country_code}
        /> */}

<div className="overflow-hidden rounded-[0.3rem] w-[1.2rem] h-[1.2rem]">
          <ReactCountryFlag
            countryCode={leg.country_code}
            svg
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            title={leg.country_code}
          />
        </div>
        <span className="text-[0.625rem] font-semibold text-zinc-400 uppercase tracking-wide leading-none">
          {iso3}
        </span>
      </div>

      {/* Город + дата */}
      <div className="flex flex-col">
        <span className="text-[0.9375rem] font-bold text-zinc-900 leading-tight">
          {leg.city_code}
        </span>
        <span className="text-[0.75rem] text-zinc-400 mt-0.5 tabular-nums">
          {leg.delivery_asap ? "ASAP" : formatDateTime(leg.date)}
        </span>
      </div>
    </div>
  );
}
