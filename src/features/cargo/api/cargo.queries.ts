"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCargo } from "./cargo.api";
import { getCargoParams } from "../types";

export const cargoKeys = {
  all: ["cargo"] as const,
  list: (params?: getCargoParams) => [...cargoKeys.all, "list", params],
};

export const useCargoList = (params?: getCargoParams) => {
  return useQuery({
    queryKey: ["cargo", params?.page, params?.limit, params?.sort],
    queryFn: () => getAllCargo(params),
  });
};
