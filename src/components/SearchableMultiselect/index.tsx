import { FormEvent, useState } from "react";
import SelectionChip from "./SelectionChip";

type SearchableItem<T> = T & {
  [P in keyof T]: string;
} & { id: string | number };

const SearchableMultiselect = <T,>({
  data,
  searchableProperty,
  displayProperty,
}: {
  data: SearchableItem<T>[];
  searchableProperty: keyof T;
  displayProperty: keyof T;
}): JSX.Element => {
  // full list, selections, search filter, use results
  const [selections, setSelections] = useState<SearchableItem<T>[]>([]);
  const [filteredData, setFilteredData] = useState<SearchableItem<T>[]>(data);

  const handleSearch = (evt: FormEvent<HTMLInputElement>): void => {
    const query = evt.currentTarget.value.toLowerCase();
    if (!query) setFilteredData(data);
    const matches = data.filter((dataItem: SearchableItem<T>) =>
      dataItem[searchableProperty].toLowerCase().includes(query)
    );
    setFilteredData(matches);
  };

  const handleSelection = (newIndex: number): void => {
    // TO DO: Avoid double-selection
    const newSelection = filteredData[newIndex];
    setSelections([...selections, newSelection]);
  };

  // TO DO: handle remove

  return (
    <div>
      <div>
        <input onChange={handleSearch} />
      </div>
      <div>
        {selections.map((selection: SearchableItem<T>, index: number) => (
          <SelectionChip
            key={`selection-${index}`}
            value={selection[displayProperty]}
          />
        ))}
      </div>
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
    </div>
  );
};

export default SearchableMultiselect;
