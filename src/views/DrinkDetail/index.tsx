import { SyntheticEvent, useState } from "react";
import { createUseStyles } from "react-jss";
import CreateDrink from "../CreateDrink";
import Button from "../../components/Button";
import { Drink } from "../../types";
import IngredientList from "../DrinkList/IngredientList";
import { RiEdit2Line, RiCloseLine } from "react-icons/ri";

const useStyles = createUseStyles({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: "rgba(141, 137, 128, 0.7)",
    zIndex: 1,
    overflowY: "auto",
  },
  detailCard: {
    backgroundColor: "rgba(252, 223, 135, 0.9)",
    color: "#0D0000",
    boxShadow: ["inset", 0, 0, 15, "#F99938"],
    margin: [30, "auto"],
    padding: [12, 20],
    width: "50%",
    border: "1px solid black",
    borderRadius: 10,
    background: "#fff",
    zIndex: 2,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  editButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: 22,
    margin: [0, 4],
  },
});

const DrinkDetail = ({
  drink,
  setSelectedDrink,
  allowEdit,
}: {
  drink: Drink;
  setSelectedDrink: React.Dispatch<React.SetStateAction<Drink | undefined>>;
  allowEdit: boolean;
}) => {
  const classes = useStyles();
  const [edit, setEdit] = useState<boolean>(false);

  const handleClose = (): void => {
    setSelectedDrink(undefined);
  };

  return (
    <div className={classes.overlay} onClick={() => !edit && handleClose()}>
      <div className={classes.detailCard}>
        {edit ? (
          <CreateDrink editId={drink.id} handleBack={handleClose} />
        ) : (
          <div>
            <div className={classes.buttonWrapper}>
              {allowEdit ? (
                <Button
                  id="editButton"
                  type="button"
                  className={classes.editButton}
                  onClick={(e: SyntheticEvent | undefined) => {
                    e?.stopPropagation();
                    setEdit(true);
                  }}
                >
                  <RiEdit2Line />
                </Button>
              ) : null}
              <div className={classes.editButton}>
                <RiCloseLine />
              </div>
            </div>
            <h1 style={{ marginTop: 0 }}>{drink.drink_name}</h1>
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
            {drink.video_url ? (
              <a href={drink.video_url} target="_blank" rel="noreferrer">
                <p>{`Watch a video about making a ${drink.drink_name}`}</p>
              </a>
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
    </div>
  );
};

export default DrinkDetail;
