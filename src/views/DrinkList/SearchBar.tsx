import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  label: {
    padding: 8,
    display: "flex",
    alignContent: "center",
    lineHeight: "1.7rem",
  },
  input: {
    marginLeft: "1rem",
    width: "100%",
    height: "1.5rem",
    borderRadius: 10,
    padding: [2, "1rem"],
    fontSize: 16,
  },
});

const SearchBar = ({
  getDrinks,
}: {
  query?: string | undefined;
  setQuery?: React.Dispatch<React.SetStateAction<string | undefined>>;
  getDrinks: (query?: string) => Promise<void>;
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState<string>();
  let queryDebounce: NodeJS.Timeout;
  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    clearTimeout(queryDebounce);
    const newQuery = evt.currentTarget.value;
    setQuery(newQuery);
    queryDebounce = setTimeout(() => {
      if (!newQuery || newQuery.length > 2) getDrinks(newQuery);
    }, 500);
  };
  return (
    <div>
      <label className={classes.label}>
        Search
        <input
          value={query}
          onChange={handleChange}
          className={classes.input}
        />
      </label>
    </div>
  );
};

export default SearchBar;
