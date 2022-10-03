import React, { useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  searchBarRoot: {
    fontFamily: "'Catamaran', sans-serif",
  },
  label: {
    alignContent: "center",
    display: "flex",
    lineHeight: "1.7rem",
    padding: 8,
  },
  input: {
    backgroundColor: "rgba(252, 240, 180, 0.8)",
    border: 0,
    borderRadius: 10,
    color: "#0D0000",
    fontFamily: "'Catamaran', sans-serif",
    fontSize: 16,
    height: "1.5rem",
    marginLeft: "1rem",
    padding: [2, "1rem"],
    width: "100%",
    "&:focus-visible": {
      outline: "2px solid #fdffe8",
    },
  },
});

const SearchBar = ({
  debounce = true,
  onChange,
}: {
  debounce?: boolean;
  onChange: (query: string) => void;
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState<string>();

  let queryDebounce: NodeJS.Timeout;
  const handleChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    const newQuery = evt.currentTarget.value;
    setQuery(newQuery);
    if (debounce) {
      clearTimeout(queryDebounce);
      queryDebounce = setTimeout(() => {
        if (!newQuery || newQuery.length > 2) onChange(newQuery);
      }, 500);
    } else {
      onChange(newQuery);
    }
  };

  return (
    <div className={classes.searchBarRoot}>
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
