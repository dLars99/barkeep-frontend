import { useState } from "react";
import { createUseStyles } from "react-jss";
import SearchBar from "../../views/DrinkList/SearchBar";
import SelectionChip from "./SelectionChip";

const useStyles = createUseStyles({
  resultRow: {
    display: "flex",
    flexFlow: "row wrap",
    margin: ["0.5rem", 0, "1rem", "4rem"],
  },
  searchResult: {
    background: "transparent",
    border: "none",
    color: "#0D0000",
    cursor: "pointer",
    fontFamily: "'Catamaran', sans-serif",
    fontSize: "1rem",
    margin: [".25rem", 0],
    padding: "1px 0.75rem",
    width: "max-content",
  },
  searchResultSeparator: {
    borderRight: "1px solid #0D0000",
  },
  selectionHeader: {
    color: "#0D0000",
    fontFamily: "'Catamaran', sans-serif",
    fontSize: "1rem",
    margin: [0, "0.5rem"],
  },
  selectionRow: {
    alignItems: "center",
    display: "flex",
    flexFlow: "row wrap",
    marginBottom: "0.5rem",
  },
});

type SearchableItem<T> = T & {
  [key in keyof T]: string;
} & { id: string | number };

interface SearchableMultiselectProps<T> {
  data: SearchableItem<T>[];
  searchableProperty: keyof T;
  displayProperty: keyof T;
  onChange: (selections: SearchableItem<T>[]) => void;
}

const SearchableMultiselect = <T,>({
  data,
  searchableProperty,
  displayProperty,
  onChange,
}: SearchableMultiselectProps<T>): JSX.Element => {
  const classes = useStyles();

  const [selections, setSelections] = useState<SearchableItem<T>[]>([]);
  const [filteredData, setFilteredData] = useState<SearchableItem<T>[]>(data);
  const [searchTouched, setSearchTouched] = useState<boolean>(false);

  const handleSearch = (rawQuery: string): void => {
    const query = rawQuery.toLowerCase();
    let matches = data;

    if (query) {
      matches = data.filter((dataItem: SearchableItem<T>) =>
        dataItem[searchableProperty].toLowerCase().includes(query)
      );
    }
    const unselectedMatches = matches.filter(
      (dataItem: SearchableItem<T>) =>
        !selections.some(
          (selectedItem: SearchableItem<T>) => selectedItem.id === dataItem.id
        )
    );
    // Impose maximum matches
    const limitedMatches = unselectedMatches.slice(0, 20);
    setFilteredData(limitedMatches);
    if (!searchTouched) setSearchTouched(true);
  };

  const handleSelection = (newIndex: number): void => {
    const updateFilteredData = [...filteredData];
    const newSelection = updateFilteredData[newIndex];
    if (newSelection) {
      updateFilteredData.splice(newIndex, 1);
      const updatedSelections = [...selections, newSelection];
      setSelections(updatedSelections);
      setFilteredData(updateFilteredData);
      onChange(updatedSelections);
    }
  };

  const removeSelection = (index: number): void => {
    const arrayWithoutItem = [...selections];
    const removedItem = arrayWithoutItem.splice(index, 1);
    if (removedItem) {
      setSelections(arrayWithoutItem);
      setFilteredData([...filteredData, removedItem[0]]);
      onChange(arrayWithoutItem);
    }
  };

  return (
    <div>
      <div>
        <SearchBar debounce={false} onChange={handleSearch} />
      </div>
      {searchTouched && filteredData.length ? (
        <div className={classes.resultRow}>
          {filteredData.map(
            (
              dataItem: SearchableItem<T>,
              index: number,
              allData: SearchableItem<T>[]
            ) => (
              <button
                className={`${classes.searchResult} ${
                  index !== allData.length - 1 && classes.searchResultSeparator
                }`}
                key={dataItem.id}
                type="button"
                onClick={() => handleSelection(index)}
              >
                {dataItem[displayProperty]}
              </button>
            )
          )}
        </div>
      ) : null}
      {selections.length ? (
        <div className={classes.selectionRow}>
          <h4 className={classes.selectionHeader}>Selected Ingredients:</h4>
          {selections.map((selection: SearchableItem<T>, index: number) => (
            <SelectionChip
              handleRemove={removeSelection}
              index={index}
              key={`selection-${index}`}
              value={selection[displayProperty]}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchableMultiselect;
