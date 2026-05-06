// utils/city.ts

// Если есть точные соответствия — задаём вручную
const CITY_ABBREVIATIONS: Record<string, string> = {
  tashkent: "TAS",
  moscow: "MOC",
};

// Фоллбек: берём первые 3 буквы
export function formatCityName(city?: string): string {
  if (!city) return "";

  const key = city.toLowerCase();

  if (CITY_ABBREVIATIONS[key]) {
    return CITY_ABBREVIATIONS[key];
  }

  return city.slice(0, 3).toUpperCase();
}
