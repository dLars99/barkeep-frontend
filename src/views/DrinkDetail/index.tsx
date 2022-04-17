import { useState } from "react";
import CreateDrink from "../CreateDrink";
import Button from "../../components/Button";
import { Drink } from "../../types";
import IngredientList from "../DrinkList/IngredientList";

const DrinkDetail = ({ drink }: { drink: Drink }) => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <div>
      {edit ? (
        <CreateDrink />
      ) : (
        <div>
          <Button onClick={() => setEdit(true)}>Edit</Button>
          <h1>{drink.name}</h1>
          <IngredientList ingredients={drink.ingredients} />
          <h3>Instructions</h3>
          <p>{drink.instructions}</p>
          {drink.glass1 || drink.glass2 ? (
            <p>
              Glass:
              {drink.glass1 ? <span>{` ${drink.glass1}`}</span> : null}
              {drink.glass2 ? <span>{` ${drink.glass2}`}</span> : null}
            </p>
          ) : null}
          {Number(drink.rating) ? (
            <p>
              Rating:
              <span>{` ${drink.rating}`}</span>
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DrinkDetail;
