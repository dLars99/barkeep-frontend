import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createUseStyles } from "react-jss";
import TikiBar from "./assets/images/tikibar.jpg";

// Route targets
import Homepage from "./views/Homepage";
import CreateDrink from "./views/CreateDrink";
import CreateIngredient from "./views/CreateIngredient";
import DrinkList from "./views/DrinkList";

const useStyles = createUseStyles({
  mainApp: {
    height: "100vh",
    width: "100vw",
    overflow: "auto",
    backgroundImage: `url(${TikiBar})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
});

const Main = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.mainApp}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/drinks" element={<DrinkList />} />
          <Route path="/ingredients" element={<DrinkList byIngredients />} />
          <Route path="/newdrink" element={<CreateDrink />} />
          <Route path="/newingredient" element={<CreateIngredient />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
