import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { Ingredient } from "../types";

export const useIngredients = () =>
  useQuery(["allIngredients"], async (): Promise<Ingredient[]> => {
    const { data } = await api.get<Ingredient[]>("ingredients");
    return data;
  });
