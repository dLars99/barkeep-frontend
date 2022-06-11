import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";

const useStyles = createUseStyles({
  backButton: {
    background: "transparent",
    border: "none",
    color: "#F2E30C",
    fontSize: 28,
  },
});

const BackButton = (): JSX.Element => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <button className={classes.backButton} onClick={() => navigate(-1)}>
      <TiArrowBackOutline />
    </button>
  );
};

export default BackButton;
