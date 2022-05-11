import React, { useState } from "react";

const SearchBar = ({
  getDrinks,
}: {
  query?: string | undefined;
  setQuery?: React.Dispatch<React.SetStateAction<string | undefined>>;
  getDrinks: (query?: string) => Promise<void>;
}) => {
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
      <label>
        Search
        <input value={query} onChange={handleChange} />
      </label>
    </div>
  );
};

export default SearchBar;
