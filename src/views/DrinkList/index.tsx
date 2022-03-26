import { useState, useCallback, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Drink } from "../../types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  drinkCard: {
    margin: 4,
    border: "1px solid black",
    borderRadius: 10,
    maxWidth: 400,
  },
  drinkTitle: {
    textAlign: "center",
  },
});

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

  const renderDecimalAsFraction = (num: number): string => {
    const whole = Math.floor(num);
    const decimal = whole ? num % whole : num;
    let fraction = "";
    switch (decimal) {
      case 0.25:
        fraction = " 1/4";
        break;
      case 0.5:
        fraction = " 1/2";
        break;
      case 0.75:
        fraction = " 3/4";
        break;
    }
    return `${whole ? whole : ""}${fraction}`;
  };

  const plural = (measurement: string): string => {
    return (measurement = "dash" ? "dashes" : measurement + "s");
  };

  return (
    <>
      {drinks.map((drink) => (
        <div key={drink.id} className={classes.drinkCard}>
          <h2 className={classes.drinkTitle}>{drink.name}</h2>
          <ul>
            {drink.ingredients.map((ingredient) => (
              <li key={ingredient.id}>{`${renderDecimalAsFraction(
                Number(ingredient.quantity)
              )} ${
                ingredient.quantity > 1
                  ? plural(ingredient.quantity_type)
                  : ingredient.quantity_type
              } ${ingredient.name}`}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default DrinkList;
