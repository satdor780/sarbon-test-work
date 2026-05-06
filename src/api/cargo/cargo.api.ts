import { api } from "../client";
import { GetAllCargoResponse } from "./cargo.types";

export const getAllCargo = async (params?: {
  page?: number;
  limit?: number;
  sort?: string;
  status?: string;
}) => {
  const { data } = await api.get<GetAllCargoResponse>(
    "/dispatchers/cargo/all",
    {
      params: {
        page: 1,
        limit: 20,
        sort: "created_at:desc",
        status: "SEARCHING_ALL",
        ...params,
      },
    },
  );

  // data.data.items = [];

  return data;
};
