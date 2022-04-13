import { Drink } from "../../types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  drinkCard: {
    margin: 8,
    border: "1px solid black",
    borderRadius: 10,
    width: "100%",
    "@media (min-width: 480px)": {
      width: "50%",
    },
  },
  drinkTitle: {
    textAlign: "center",
  },
});

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

const DrinkCard = ({ drink }: { drink: Drink }) => {
  const classes = useStyles();
  return (
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
  );
};

export default DrinkCard;
