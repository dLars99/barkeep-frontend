import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Drink } from "../../types";
import { createUseStyles } from "react-jss";
import DrinkCard from "./DrinkCard";
import Button from "../../components/Button";

const useStyles = createUseStyles({
  header: {
    display: "flex",
    flexDirection: "column",
    margin: [30, 8, 0],
    "@media (min-width: 480px)": {
      flexDirection: "row",
      margin: [30, 16, 0],
    },
  },
  backButton: {
    background: "transparent",
    border: "none",
  },
  title: {
    position: "relative",
    flex: 1,
    textAlign: "center",
  },
  filters: {
    flex: 2,
  },
  drinkList: {
    display: "flex",
    width: "100%",
  },
  paginator: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 8,
    "@media (min-width: 768px)": {
      paddingRight: 16,
    },
  },
  pageButton: {
    margin: [0, 4],
  },
});

const LIMIT = 10;
const API_URL = process.env.REACT_APP_API_URL;

const DrinkList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [page, setPage] = useState<number>(1);

  const totalPages = useMemo<number>(
    () => Math.ceil(drinks.length / LIMIT),
    [drinks.length]
  );

  const getDrinks = useCallback(async () => {
    try {
      const drinksFromApi = await axios
        .get(`${API_URL}/recipes`, {
          params: { limit: LIMIT, offset: page * LIMIT },
        })
        .catch((err: AxiosError) => {
          console.error(err);
        });
      if (!drinksFromApi) throw new Error("Could not retrieve drinks");
      setDrinks(drinksFromApi.data || []);
    } catch (err) {
      console.error(err);
    }
  }, [page]);

  useEffect(() => {
    getDrinks();
  }, [getDrinks]);

  return (
    <div>
      <header className={classes.header}>
        <div>
          <button className={classes.backButton} onClick={() => navigate(-1)}>
            {"<< Back"}
          </button>
          <h1 className={classes.title}>Find a Drink</h1>
        </div>
        <div className={classes.filters}>{/* Search Bar */}</div>
      </header>
      <section className={classes.drinkList}>
        {drinks.map((drink) => (
          <DrinkCard key={drink.id} drink={drink} />
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
        <div>{`Page ${page} of ${totalPages}`}</div>
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
    </div>
  );
};

export default DrinkList;
