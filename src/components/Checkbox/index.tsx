import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  checkboxContainer: {
    display: "flex",
  },
  checkbox: {
    appearance: "none",
    margin: [0, 4, 0, 4],
    backgroundColor: "rgba(252, 240, 180, 0.8)",
    font: "inherit",
    color: "#8a8167",
    width: "1.25rem",
    height: "1.25rem",
    border: "0.15em solid black",
    borderRadius: "0.15em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&::before": {
      content: '"\xd7"',
      fontSize: 24,
      fontWeight: "bold",
      transform: "scale(0)",
      transition: "150ms transform ease-in-out",
      transformOrigin: "left",
    },
    "&:checked": {
      "&::before": {
        transform: "scale(1)",
      },
    },
  },
});

const Checkbox = ({
  id,
  label,
  onChange,
}: {
  id: string;
  label: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setChecked(!checked);
    onChange(e);
  };
  return (
    <label className={classes.checkboxContainer}>
      <input
        className={classes.checkbox}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
      />
      {label}
    </label>
  );
};

export default Checkbox;
