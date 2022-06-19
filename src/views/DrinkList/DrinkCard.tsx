import { Drink } from "../../types";
import { createUseStyles } from "react-jss";
import IngredientList from "./IngredientList";

const useStyles = createUseStyles({
  card: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  drinkTitle: {
    textAlign: "center",
    marginBottom: 0,
  },
  ingredientList: {
    flexGrow: 1,
  },
  ingredientMatches: {
    textAlign: "right",
    margin: [0, "1rem", "1rem"],
  },
});

const DrinkCard = ({ drink }: { drink: Drink }) => {
  const classes = useStyles();
  return (
    <div key={drink.id} className={classes.card}>
      <h2 className={classes.drinkTitle}>{drink.drink_name}</h2>
      <div className={classes.ingredientList}>
        <IngredientList ingredients={drink.ingredients} />
      </div>
      {drink.matches ? (
        <p
          className={classes.ingredientMatches}
        >{`${drink.matches} of ${drink.ingredients.length} ingredients`}</p>
      ) : null}
    </div>
  );
};

export default DrinkCard;
