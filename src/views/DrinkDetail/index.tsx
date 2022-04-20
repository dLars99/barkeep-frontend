import { SyntheticEvent, useState } from "react";
import { createUseStyles } from "react-jss";
import CreateDrink from "../CreateDrink";
import Button from "../../components/Button";
import { Drink } from "../../types";
import IngredientList from "../DrinkList/IngredientList";

const useStyles = createUseStyles({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(141, 137, 128, 0.7)",
    zIndex: 1,
  },
  detailCard: {
    margin: [30, "auto"],
    padding: 12,
    width: "50%",
    border: "1px solid black",
    borderRadius: 10,
    background: "#fff",
    zIndex: 2,
  },
});

const DrinkDetail = ({
  drink,
  setSelectedDrink,
}: {
  drink: Drink;
  setSelectedDrink: React.Dispatch<React.SetStateAction<Drink | undefined>>;
}) => {
  const classes = useStyles();
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <div
      className={classes.overlay}
      onClick={() => !edit && setSelectedDrink(undefined)}
    >
      {edit ? (
        <CreateDrink />
      ) : (
        <div className={classes.detailCard}>
          <Button
            id="editButton"
            type="button"
            onClick={(e: SyntheticEvent | undefined) => {
              e?.stopPropagation();
              setEdit(true);
            }}
          >
            Edit
          </Button>
          <h1>{drink.name}</h1>
          <h2>{drink.category}</h2>
          <IngredientList ingredients={drink.ingredients} />
          <h3>Instructions</h3>
          <p>{drink.instructions}</p>
          {drink.glass1 || drink.glass2 ? (
            <p>
              Glass:
              {drink.glass1 ? <span>{` ${drink.glass1}`}</span> : null}
              {drink.glass2 ? <span>{`, ${drink.glass2}`}</span> : null}
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
