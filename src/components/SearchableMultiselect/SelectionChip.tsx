import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  chip: {
    borderRadius: "8% 8% 8% 8% / 50% 50% 50% 50%",
    display: "flex",
    padding: [4, 8],
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
    <button className={classes.chip} onClick={() => handleRemove(index)}>
      <span className={classes.removeX}>&times;</span>
      <span className={classes.text}>{value}</span>
    </button>
  );
};

export default SelectionChip;
