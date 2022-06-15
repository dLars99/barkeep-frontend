import React, { useCallback, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import axios, { AxiosError } from "axios";
import { Ingredient } from "../../types";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = createUseStyles({
  ingredientSelection: {
    border: [1, "solid", "black"],
    borderRadius: 10,
    padding: [8, 16],
    backgroundColor: "rgba(252, 223, 135, 0.9)",
    color: "#0D0000",
    boxShadow: ["inset", 0, 0, 15, "#F99938"],
    fontFamily: "'Catamaran', sans-serif",
    lineHeight: 1.4,
  },
  title: {},
  ingredientList: {
    display: "flex",
    flexFlow: "row wrap",
  },
  ingredient: {
    margin: 4,
  },
});

const IngredientSearch = ({
  getDrinks,
}: {
  getDrinks: (query?: Record<string, boolean>) => Promise<void>;
}): JSX.Element | null => {
  const classes = useStyles();
  const [ingredientList, setIngredientList] = useState<Ingredient[]>();
  const [selectedIngredients, setSelectedIngredients] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    try {
      (async () => {
        const ingredients = await axios
          .get<Ingredient[]>(`${API_URL}/ingredients`)
          .catch((err: AxiosError) => {
            throw err;
          });
        if (!ingredients)
          throw new Error("Could not retrieve ingredients from API!");
        setIngredientList(ingredients.data || []);
      })();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleCheckbox = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const currentSelections = selectedIngredients;
      currentSelections[e.currentTarget.id] =
        !currentSelections[e.currentTarget.id];
      setSelectedIngredients(currentSelections);
    },
    [selectedIngredients]
  );

  // Search bar
  if (ingredientList?.length)
    return (
      <div className={classes.ingredientSelection}>
        <div className={classes.title}>
          <h3>Select ingredients from your bar</h3>
          <p>We'll show you drinks you can make</p>
        </div>
        <div className={classes.ingredientList}>
          {ingredientList.map((ingredient: Ingredient) => (
            <div key={ingredient.id} className={classes.ingredient}>
              <Checkbox
                id={ingredient.id}
                checked={selectedIngredients[ingredient.id]}
                onChange={handleCheckbox}
                label={ingredient.ingredient_name}
              />
            </div>
          ))}
        </div>
        <Button type="button" onClick={() => getDrinks(selectedIngredients)}>
          Search
        </Button>
      </div>
    );
  return null;
};

export default React.memo(IngredientSearch);
