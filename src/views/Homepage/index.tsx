import { createUseStyles } from "react-jss";
import Button from "../../components/Button";

const useStyles = createUseStyles({
  root: {
    padding: [0, 10],
    height: "100vh",
  },
  buttonRow: {
    display: "flex",
    margin: [10, 0],
  },
  leftButton: {
    flex: "2",
    height: "40vh",
    marginRight: 10,
  },
  rightButton: {
    flex: "1",
    height: "40vh",
  },
});

const Homepage = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Barkeep</h1>
      <div className={classes.buttonRow}>
        <Button linkUrl="/drinks" className={classes.leftButton}>
          Find a Drink
        </Button>
        <Button linkUrl="/newdrink" className={classes.rightButton}>
          Add a Drink
        </Button>
      </div>
      <div className={classes.buttonRow}>
        <Button linkUrl="/ingredients" className={classes.leftButton}>
          Match Ingredients
        </Button>
        <Button linkUrl="/newingredient" className={classes.rightButton}>
          Add an Ingredient
        </Button>
      </div>
    </div>
  );
};

export default Homepage;
