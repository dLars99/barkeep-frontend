import { useState, useCallback, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Drink } from "../../types";
import { createUseStyles } from "react-jss";
import DrinkCard from "./DrinkCard";

const useStyles = createUseStyles({});

const LIMIT = 10;
const API_URL = process.env.REACT_APP_API_URL;

const DrinkList = () => {
  const classes = useStyles();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [page, setPage] = useState<number>(1);

  const getDrinks = useCallback(async () => {
    const drinksFromApi = await axios
      .get(`${API_URL}/recipes`, {
        params: { limit: LIMIT, offset: page * LIMIT },
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
    if (!drinksFromApi) throw new Error("Could not retrieve drinks");
    setDrinks(drinksFromApi.data || []);
  }, [page]);

  useEffect(() => {
    getDrinks();
  }, [getDrinks]);

  return (
    <>
      {drinks.map((drink) => (
        <DrinkCard key={drink.id} drink={drink} />
      ))}
    </>
  );
};

export default DrinkList;
