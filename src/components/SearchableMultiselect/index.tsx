import { FormEvent, useState } from "react";
import SelectionChip from "./SelectionChip";

type SearchableItem<T> = T & {
  [P in keyof T]: string;
} & { id: string | number };

const SearchableMultiselect = <T,>({
  data,
  searchableProperty,
  displayProperty,
  onChange,
}: {
  data: SearchableItem<T>[];
  searchableProperty: keyof T;
  displayProperty: keyof T;
  onChange: (selections: SearchableItem<T>[]) => void;
}): JSX.Element => {
  // full list, selections, search filter, use results
  const [selections, setSelections] = useState<SearchableItem<T>[]>([]);
  const [filteredData, setFilteredData] = useState<SearchableItem<T>[]>(data);
  const [searchTouched, setSearchTouched] = useState<boolean>(false);

  const handleSearch = (evt: FormEvent<HTMLInputElement>): void => {
    const query = evt.currentTarget.value.toLowerCase();
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
    setFilteredData(unselectedMatches);
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
        <input onChange={handleSearch} />
      </div>
      <div>
        {selections.map((selection: SearchableItem<T>, index: number) => (
          <SelectionChip
            handleRemove={removeSelection}
            index={index}
            key={`selection-${index}`}
            value={selection[displayProperty]}
          />
        ))}
      </div>
      {searchTouched ? (
        <div>
          {filteredData.map((dataItem: SearchableItem<T>, index: number) => (
            <button
              key={dataItem.id}
              type="button"
              onClick={() => handleSelection(index)}
            >
              {dataItem[displayProperty]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchableMultiselect;
