import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { Drink } from "../types";

interface GetIngredientsParams {
  limit: number;
  offset: number;
  query?: string;
  ingredientId?: string[];
}

const LIMIT = 10;

export const useDrinks = (query: string | string[], page: number = 0) => {
  return useQuery(["getDrinks", query], async (): Promise<Drink[]> => {
    const params: GetIngredientsParams = {
      limit: LIMIT,
      offset: page * LIMIT,
    };
    if (typeof query === "string") {
      params.query = query;
    } else if (query) {
      params.ingredientId = query;
    }

    const { data } = await api.get<Drink[]>("drinks", {
      params,
    });

    return data;
  });
};
