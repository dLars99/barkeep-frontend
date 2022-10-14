import React, { useEffect, useState } from "react";
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
  const [query, setQuery] = useState<string>("");

  const handleChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    setQuery(evt.currentTarget.value);
    if (!debounce) onChange(query);
  };

  // Debounce query changes
  useEffect(() => {
    if (debounce) {
      const queryDebounce = setTimeout(() => {
        if (!query || query.length > 2) onChange(query || "");
      }, 500);

      return () => clearTimeout(queryDebounce);
    }
  }, [debounce, query, onChange]);

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
