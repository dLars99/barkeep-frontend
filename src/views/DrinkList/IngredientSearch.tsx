import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Ingredient } from "../../types";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
// ingredient list, submit
const API_URL = process.env.REACT_APP_API_URL;
const IngredientSearch = ({
  getDrinks,
}: {
  getDrinks: (query?: Record<string, boolean>) => Promise<void>;
}): JSX.Element | null => {
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

  const handleCheckbox = (e: React.FormEvent<HTMLInputElement>) => {
    const currentSelections = selectedIngredients;
    currentSelections[e.currentTarget.id] =
      !currentSelections[e.currentTarget.id];
    setSelectedIngredients(currentSelections);
  };

  // Search bar, selectors
  if (ingredientList?.length)
    return (
      <div>
        {ingredientList.map((ingredient: Ingredient) => (
          <div key={ingredient.id}>
            <Checkbox
              id={ingredient.id}
              checked={selectedIngredients[ingredient.id]}
              onChange={handleCheckbox}
              label={ingredient.name}
            />
          </div>
        ))}
        <Button type="button" onClick={() => getDrinks(selectedIngredients)}>
          Search
        </Button>
      </div>
    );
  return null;
};

export default IngredientSearch;
