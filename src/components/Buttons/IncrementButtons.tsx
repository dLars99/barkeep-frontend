import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { createUseStyles } from "react-jss";
import Button, { ButtonProps } from "./Button";

const useStyles = createUseStyles({
  plusButton: {
    background: "transparent",
    border: "none",
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: "0.5rem",
    fontSize: 20,
    color: "#616161",
    cursor: "pointer",
    "&:hover": {
      color: "#0D0000",
    },
  },
});

export const MinusButton = ({ className, ...rest }: ButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      type="button"
      className={`${classes.plusButton} ${className}`}
      {...rest}
    >
      <MdRemoveCircleOutline />
    </Button>
  );
};

export const PlusButton = ({ className, ...rest }: ButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      type="button"
      className={`${classes.plusButton} ${className}`}
      {...rest}
    >
      <MdAddCircleOutline />
    </Button>
  );
};
