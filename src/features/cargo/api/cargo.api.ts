import { api } from "@/src/shared/api";
import { GetAllCargoResponse, getCargoParams } from "../types";

export const getAllCargo = async (params?: getCargoParams) => {
  const { data } = await api.get<GetAllCargoResponse>(
    "/dispatchers/cargo/all",
    {
      params: {
        page: 1,
        limit: 20,
        sort: params?.sort,
        status: "SEARCHING_ALL",
        ...params,
      },
    },
  );

  // data.data.items = [];

  return data;
};
