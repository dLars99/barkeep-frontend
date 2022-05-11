import React from "react";

const SearchBar = ({
  query,
  setQuery,
}: {
  query: string | undefined;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const handleChange = (evt: React.FormEvent<HTMLInputElement>) => {
    setQuery(evt.currentTarget.value);
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
