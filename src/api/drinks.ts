import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { Drink } from "../types";

interface GetDrinksParams {
  limit: number;
  offset: number;
  query?: string;
  ingredientId?: string[];
}

type GetDrinksResponse = {
  count: number;
  data: Drink[];
};

const LIMIT = 10;

export const useDrinks = (query: string | string[], page: number = 1) => {
  return useQuery(
    ["getDrinks", query, page],
    async (): Promise<GetDrinksResponse> => {
      const params: GetDrinksParams = {
        limit: LIMIT,
        offset: (page - 1) * LIMIT,
      };
      if (typeof query === "string") {
        params.query = query;
      } else if (query) {
        params.ingredientId = query;
      }

      const { data } = await api.get<GetDrinksResponse>("drinks", {
        params,
      });

      return data;
    }
  );
};
