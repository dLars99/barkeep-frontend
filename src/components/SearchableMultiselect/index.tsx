import { FormEvent, useState } from "react";

type SearchableItem<T> = T & {
  [key: string]: string;
} & { id: string | number };

const SearchableMultiselect = <T,>({
  data,
  searchableProperty,
  displayProperty,
}: {
  data: SearchableItem<T>[];
  searchableProperty: string;
  displayProperty: string;
}): JSX.Element => {
  // full list, selections, search filter, use results
  const [selections, setSelections] = useState<SearchableItem<T>[]>([]);
  const [filteredData, setFilteredData] = useState<SearchableItem<T>[]>(data);

  const handleSearch = (evt: FormEvent<HTMLInputElement>): void => {
    const query = evt.currentTarget.value;
    if (!query) setFilteredData(data);
    const matches = data.filter((dataItem: SearchableItem<T>) =>
      dataItem[searchableProperty].includes(query)
    );
    setFilteredData(matches);
  };

  const handleSelection = (newIndex: number): void => {
    const newSelection = filteredData[newIndex];
    setSelections([...selections, newSelection]);
  };

  return (
    <div>
      <div>
        <input onChange={handleSearch} />
      </div>
      <div>
        {/* TO DO: Chip component */}
        {selections.map((selection: SearchableItem<T>, index: number) => (
          <p key={`selection-${index}`}>{selection[displayProperty]}</p>
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
