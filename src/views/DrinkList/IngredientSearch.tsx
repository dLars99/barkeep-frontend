import { createUseStyles } from "react-jss";
import { Ingredient } from "../../types";
import SearchableMultiselect from "../../components/SearchableMultiselect";
import { useIngredients } from "../../api/ingredients";

const useStyles = createUseStyles({
  ingredientSelection: {
    border: [1, "solid", "black"],
    borderRadius: 10,
    padding: [8, 16],
    backgroundColor: "rgba(252, 223, 135, 0.9)",
    color: "#0D0000",
    boxShadow: ["inset", 0, 0, 15, "#F99938"],
    fontFamily: "'Catamaran', sans-serif",
    lineHeight: 1.4,
  },
  title: {
    "& h3": {
      margin: [".5rem", 0],
    },
    "& p": {
      margin: [0, 0, ".25rem"],
    },
  },
  ingredientList: {
    display: "flex",
    flexFlow: "row wrap",
  },
  ingredient: {
    margin: 4,
  },
  searchButton: {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: 7,
    fontSize: 16,
    margin: [0, 4],
    padding: [4, 8],
    boxShadow: ["inset", 0, 0, 5, "#F99938"],
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    fontSize: 22,
  },
});

const IngredientSearch = ({
  onChange,
}: {
  onChange: (query: string[]) => void;
}): JSX.Element | null => {
  const classes = useStyles();
  const { data, isFetching } = useIngredients();

  const handleSelectionChange = (selections: Ingredient[]) => {
    const selectedIds = selections.map((selection: Ingredient) => selection.id);
    onChange(selectedIds);
  };

  // Search bar
  if (!isFetching && data?.length)
    return (
      <div className={classes.ingredientSelection}>
        <div className={classes.title}>
          <h3>Select ingredients from your bar</h3>
          <p>We'll show you drinks you can make</p>
        </div>
        <SearchableMultiselect
          data={data}
          displayProperty="ingredient_name"
          onChange={handleSelectionChange}
          searchableProperty="ingredient_name"
        />
      </div>
    );
  return null;
};

export default IngredientSearch;
