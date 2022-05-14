import { Drink } from "../../types";
import { createUseStyles } from "react-jss";
import IngredientList from "./IngredientList";

const useStyles = createUseStyles({
  card: {
    width: "100%",
  },
  drinkTitle: {
    textAlign: "center",
  },
});

const DrinkCard = ({ drink }: { drink: Drink }) => {
  const classes = useStyles();
  return (
    <div key={drink.id} className={classes.card}>
      <h2 className={classes.drinkTitle}>{drink.name}</h2>
      <IngredientList ingredients={drink.ingredients} />
      {drink.matches ? (
        <p>{`${drink.matches} of ${drink.ingredients.length} ingredients`}</p>
      ) : null}
    </div>
  );
};

export default DrinkCard;
