import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  chip: {
    borderRadius: "10% 10% 10% 10% / 50% 50% 50% 50%",
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

const SelectionChip = ({ value }: { value: string }): JSX.Element => {
  const classes = useStyles();
  // TO DO: Handle remove
  return (
    <button className={classes.chip}>
      <span className={classes.removeX}>&times;</span>
      <span className={classes.text}>{value}</span>
    </button>
  );
};

export default SelectionChip;
