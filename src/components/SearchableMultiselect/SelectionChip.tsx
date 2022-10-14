import { createUseStyles } from "react-jss";
import Button from "../Button";

const useStyles = createUseStyles({
  chip: {
    borderRadius: "8% 8% 8% 8% / 50% 50% 50% 50%",
    display: "flex",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1rem",
    margin: [0, 4],
    padding: ["0.5rem", "1rem"],
    boxShadow: ["inset", 0, 0, 5, "#F99938"],
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(252, 240, 180, 0.5)",
    },
  },
  removeX: {
    width: 20,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
});

interface SelectionChipProps {
  index: number;
  value: string;
  handleRemove: (index: number) => void;
}

const SelectionChip = ({
  index,
  value,
  handleRemove,
}: SelectionChipProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Button className={classes.chip} onClick={() => handleRemove(index)}>
      <span className={classes.removeX}>&times;</span>
      <span className={classes.text}>{value}</span>
    </Button>
  );
};

export default SelectionChip;
