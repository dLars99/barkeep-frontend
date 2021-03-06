import { useState, useCallback, useEffect, useMemo } from "react";
import axios, { AxiosError } from "axios";
import { Drink, GetIngredientsParams } from "../../types";
import { createUseStyles } from "react-jss";
import DrinkCard from "./DrinkCard";
import Button from "../../components/Button";
import DrinkDetail from "../DrinkDetail";
import SearchBar from "./SearchBar";
import IngredientSearch from "./IngredientSearch";
import BackButton from "../../components/BackButton";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    flexDirection: "column",
    margin: [30, 8, 0],
    fontFamily: "'Reggae One', cursive",
    color: "#F2E30C",
    "@media (min-width: 480px)": {
      margin: [30, 16, 0],
    },
  },
  titleLine: {
    display: "flex",
    alignItems: "center",
    margin: [4, 0, 4],
  },
  title: {
    position: "relative",
    flex: 1,
    marginLeft: 8,
  },
  filters: {
    flex: 2,
  },
  drinkList: {
    display: "flex",
    flexFlow: "row wrap",
    width: "100%",
    justifyContent: "space-evenly",
  },
  drinkCard: {
    position: "relative",
    display: "flex",
    margin: 8,
    borderRadius: 10,
    backgroundColor: "rgba(252, 223, 135, 0.9)",
    color: "#0D0000",
    boxShadow: ["inset", 0, 0, 15, "#F99938"],
    fontFamily: "'Catamaran', sans-serif",
    lineHeight: 1.4,
    flexBasis: "calc(100% - 18px)",
    "@media (min-width: 512px)": {
      flexBasis: "calc(50% - 34px)",
    },
    "@media (min-width: 1024px)": {
      flexBasis: "calc(33% - 34px)",
    },
    "@media (min-width: 768px)": {
      margin: 16,
    },
  },
  paginator: {
    display: "flex",
    justifyContent: "flex-end",
    padding: [0, 8, 4, 0],
    boxSizing: "border-box",
    color: "#F2E30C",
    "@media (min-width: 768px)": {
      paddingRight: 16,
    },
  },
  pageButton: {
    margin: [0, 4],
  },
  pageDisplay: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: "rgba(13, 0, 0, 0.6)",
  },
});

const LIMIT = 10;
const API_URL = process.env.REACT_APP_API_URL;

const DrinkList = ({ byIngredients = false }: { byIngredients?: boolean }) => {
  const classes = useStyles();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectedDrink, setSelectedDrink] = useState<Drink>();

  const totalPages = useMemo<number>(
    () => Math.ceil(drinks.length / LIMIT),
    [drinks.length]
  );

  const getDrinks = useCallback(
    async (query?: string | Record<string, boolean>) => {
      try {
        const params: GetIngredientsParams = {
          limit: LIMIT,
          offset: page * LIMIT,
        };
        if (typeof query === "string") {
          params.query = query && query.length > 2 ? query : "";
        } else if (query) {
          params.ingredientId = Object.keys(query).filter(
            (key: string) => query[key]
          );
        }
        const drinksFromApi = await axios
          .get(`${API_URL}/drinks`, {
            params,
          })
          .catch((err: AxiosError) => {
            console.error(err);
          });
        if (!drinksFromApi) throw new Error("Could not retrieve drinks");
        setDrinks(drinksFromApi.data || []);
      } catch (err) {
        console.error(err);
      }
    },
    [page]
  );

  useEffect(() => {
    if (!selectedDrink) getDrinks();
  }, [getDrinks, selectedDrink]);

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.titleLine}>
          <BackButton />
          <h1 className={classes.title}>Find a Drink</h1>
        </div>
        {byIngredients ? (
          <IngredientSearch getDrinks={getDrinks} />
        ) : (
          <div className={classes.filters}>
            <SearchBar getDrinks={getDrinks} />
          </div>
        )}
      </header>
      <section className={classes.drinkList}>
        {drinks.map((drink) => (
          <div
            key={drink.id}
            className={classes.drinkCard}
            onClick={() => setSelectedDrink(drink)}
          >
            <DrinkCard key={drink.id} drink={drink} />
          </div>
        ))}
      </section>
      <footer className={classes.paginator}>
        {totalPages > 1 ? (
          <Button
            disabled={page === 1}
            className={classes.pageButton}
            onClick={() => setPage(page - 1)}
          >
            &minus;
          </Button>
        ) : null}
        <div
          className={classes.pageDisplay}
        >{`Page ${page} of ${totalPages}`}</div>
        {totalPages > 1 ? (
          <Button
            disabled={page === totalPages}
            className={classes.pageButton}
            onClick={() => setPage(page + 1)}
          >
            {"\u002B"}
          </Button>
        ) : null}
      </footer>
      {selectedDrink ? (
        <DrinkDetail
          drink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
          allowEdit={!byIngredients}
        />
      ) : null}
    </div>
  );
};

export default DrinkList;
