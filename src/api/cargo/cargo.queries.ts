"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCargo } from "./cargo.api";

export const cargoKeys = {
  all: ["cargo"] as const,
  list: (params?: any) => [...cargoKeys.all, "list", params],
};

export const useCargoList = (params?: any) => {
  return useQuery({
    queryKey: cargoKeys.list(params),
    queryFn: () => getAllCargo(params),
  });
};
