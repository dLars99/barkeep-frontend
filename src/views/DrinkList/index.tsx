import { useState, useMemo, useCallback, useEffect } from "react";
import { useDrinks } from "../../api/drinks";
import { Drink } from "../../types";
import { createUseStyles } from "react-jss";
import DrinkCard from "./DrinkCard";
import DrinkDetail from "../DrinkDetail";
import SearchBar from "./SearchBar";
import IngredientSearch from "./IngredientSearch";
import BackButton from "../../components/BackButton";
import { MinusButton, PlusButton } from "../../components/Buttons";

const useStyles = createUseStyles({
  drinkListPage: {
    position: "relative",
    minHeight: "calc(100vh - 30px)",
    paddingBottom: 40,
  },
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
    position: "absolute",
    bottom: 10,
    right: 10,
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
    alignItems: "center",
    paddingBottom: 0,
    color: "#F2E30C",
    "&:disabled": {
      color: "#616161",
    },
    "&:hover": {
      color: "#F2E30CAA",
    },
  },
  pageDisplay: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: "rgba(13, 0, 0, 0.6)",
  },
});

const LIMIT = 10;

const DrinkList = ({ byIngredients = false }: { byIngredients?: boolean }) => {
  const classes = useStyles();
  const [query, setQuery] = useState<string | string[]>("");
  const [page, setPage] = useState<number>(1);
  const { data } = useDrinks(query, page);
  const drinks = data?.data;
  const count = data?.count;
  const [selectedDrink, setSelectedDrink] = useState<Drink>();

  const totalPages = useMemo<number>(() => {
    if (count) {
      return Math.ceil(count / LIMIT);
    } else {
      return 1;
    }
  }, [count]);

  // If a query change changes the number of pages, make sure we're not past the last page
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const updateQuery = useCallback(
    (updatedQuery: string | string[]) => {
      setQuery(updatedQuery);
    },
    [setQuery]
  );

  return (
    <div className={classes.drinkListPage}>
      <header className={classes.header}>
        <div className={classes.titleLine}>
          <BackButton />
          <h1 className={classes.title}>Find a Drink</h1>
        </div>
        {byIngredients ? (
          <IngredientSearch onChange={updateQuery} />
        ) : (
          <div className={classes.filters}>
            <SearchBar onChange={updateQuery} />
          </div>
        )}
      </header>
      <section className={classes.drinkList}>
        {drinks
          ? drinks.map((drink: Drink) => (
              <div
                key={drink.id}
                className={classes.drinkCard}
                onClick={() => setSelectedDrink(drink)}
              >
                <DrinkCard key={drink.id} drink={drink} />
              </div>
            ))
          : null}
      </section>
      <footer className={classes.paginator}>
        {totalPages > 1 ? (
          <MinusButton
            disabled={page === 1}
            className={classes.pageButton}
            onClick={() => setPage(page - 1)}
          />
        ) : null}
        <div
          className={classes.pageDisplay}
        >{`Page ${page} of ${totalPages}`}</div>
        {totalPages > 1 ? (
          <PlusButton
            disabled={page === totalPages}
            className={classes.pageButton}
            onClick={() => {
              handlePageChange(page + 1);
            }}
          />
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
