import { createUseStyles } from "react-jss";
import Button from "../../components/Button";
import TikiBar from "../../assets/images/tikibar.jpg";

const useStyles = createUseStyles({
  root: {
    padding: [0, 10],
    height: "100vh",
    backgroundImage: `url(${TikiBar})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    boxSizing: "border-box",
    paddingTop: 6,
  },
  title: {
    fontFamily: "'Reggae One', cursive",
    color: "#F2E30C",
    marginTop: 0,
    webKitbackgroundClip: "text",
  },
  buttonRow: {
    display: "flex",
    margin: [10, 0],
  },
  leftButton: {
    flex: "2",
    height: "40vh",
    marginRight: 10,
    backgroundColor: "rgba(13, 0, 0, 0.4)",
    color: "#F2E30C",
    borderColor: "rgba(242, 227, 12, 0.6)",
    borderRadius: 15,
    fontFamily: "'Catamaran', sans-serif",
    fontSize: 46,
    fontWeight: 600,
  },
  rightButton: {
    flex: "1",
    height: "40vh",
    backgroundColor: "rgba(13, 0, 0, 0.4)",
    color: "#F2E30C",
    borderColor: "rgba(242, 227, 12, 0.6)",
    borderRadius: 15,
    fontFamily: "'Catamaran', sans-serif",
    fontSize: 46,
    fontWeight: 600,
  },
});

const Homepage = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Barkeep</h1>
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
