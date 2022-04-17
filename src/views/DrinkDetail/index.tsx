import { useState } from "react";
import CreateDrink from "../CreateDrink";
import Button from "../../components/Button";
import { Drink } from "../../types";

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
        </div>
      )}
    </div>
  );
};

export default DrinkDetail;
