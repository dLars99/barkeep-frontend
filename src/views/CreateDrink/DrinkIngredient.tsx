import { Field, FieldArrayRenderProps } from "formik";
import { createUseStyles } from "react-jss";
import { MinusButton, PlusButton } from "../../components/Buttons";
import { Ingredient } from "../../types";
import { QuantityFraction } from "../../helpers/lists";
import { fractions, quantityTypes } from "../../helpers/lists";

const useStyles = createUseStyles({
  formField: {
    display: "flex",
    width: "100%",
    margin: [5, 0],
  },
  button: {
    background: "transparent",
    border: "none",
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: "0.5rem",
    fontSize: 20,
    color: "#616161",
    cursor: "pointer",
    "&:hover": {
      color: "#0D0000",
    },
  },
  fieldLabel: {
    fontSize: "1rem",
    display: "flex",
    flexDirection: "column",
    padding: [0, 2],
  },
  fieldInput: {
    width: "100%",
    margin: [10, 0, 5],
    height: "2rem",
    borderRadius: 10,
    padding: [2, "0.25rem", 2, "0.75rem"],
    fontSize: 16,
    backgroundColor: "rgba(252, 240, 180, 0.8)",
    color: "#0D0000",
    border: 0,
    boxSizing: "border-box",
  },
  ingredientSelection: {
    flex: 4,
    composes: "$fieldLabel",
  },
  quantityField: {
    flex: 2,
    width: "100%",
    composes: "$fieldLabel",
  },
  numberBox: {
    width: "100%",
    flex: 2,
    fontSize: "16px",
    margin: [5, 0],
  },
  quantityFractions: {
    flex: 2,
    composes: "$fieldLabel",
    color: "transparent",
  },
  quantityType: {
    flex: 2,
    composes: "$fieldLabel",
  },
  selectBox: {
    height: "100%",
    color: "black",
    fontSize: "16px",
    margin: [5, 0],
  },
});

const DrinkIngredient = ({
  index,
  ingredientList,
  renderProps,
}: {
  index: number;
  ingredientList: Ingredient[];
  renderProps: FieldArrayRenderProps;
}) => {
  const classes = useStyles();
  const { remove, insert, form } = renderProps;
  const { values } = form;

  const handleAddIngredient = () => {
    insert(index + 1, {
      // Push next available ingredient id as default value
      id:
        ingredientList?.find((ingredient) =>
          values.ingredients.some(
            (selectedIngredients: Ingredient) =>
              selectedIngredients.id !== ingredient.id
          )
        )?.id ?? "",
      qty: 0,
      qtyFraction: "",
      qtyType: "",
    });
  };

  return (
    <div className={classes.formField}>
      <MinusButton onClick={() => remove(index)} />
      <label
        htmlFor={`ingredients[${index}].id`}
        className={classes.ingredientSelection}
      >
        Name
        <Field
          className={`${classes.fieldInput} ${classes.selectBox}`}
          as="select"
          name={`ingredients[${index}].id`}
          label="Ingredient"
        >
          {ingredientList?.length
            ? ingredientList
                .filter(
                  (ingredient: Ingredient) =>
                    // Filter out previous used ingredients
                    values.ingredients[index].id === ingredient.id ||
                    !values.ingredients.some(
                      (selectedIngredient: Ingredient) =>
                        ingredient.id === selectedIngredient.id
                    )
                )
                .map((ingredient: Ingredient, index: number) => (
                  <option key={`ingredient-${index}`} value={ingredient.id}>
                    {ingredient.ingredient_name}
                  </option>
                ))
            : "Could not retrieve ingredient list"}
        </Field>
      </label>
      <label
        htmlFor={`ingredients[${index}].qty`}
        className={classes.quantityField}
      >
        Qty
        <Field
          className={`${classes.fieldInput} ${classes.numberBox}`}
          type="number"
          name={`ingredients[${index}].qty`}
          min={0}
        />
      </label>
      <label
        htmlFor={`ingredients[${index}].qtyFraction`}
        className={classes.quantityFractions}
      >
        Pt
        <Field
          className={`${classes.fieldInput} ${classes.selectBox}`}
          as="select"
          name={`ingredients[${index}].qtyFraction`}
          label="Fraction"
        >
          {fractions.map((fraction: QuantityFraction) => (
            <option
              key={fraction.value || "noQtyFraction"}
              value={fraction.value}
            >
              {fraction.display}
            </option>
          ))}
        </Field>
      </label>
      <label
        htmlFor={`ingredients[${index}].qtyType`}
        className={classes.quantityType}
      >
        Unit
        <Field
          as="select"
          className={`${classes.fieldInput} ${classes.selectBox}`}
          name={`ingredients[${index}].qtyType`}
        >
          {quantityTypes.map((qtyType: string) => (
            <option key={qtyType || "noQtyType"} value={qtyType}>
              {qtyType && values.ingredients[index].qty > 1
                ? qtyType === "dash"
                  ? qtyType + "es"
                  : qtyType + "s"
                : qtyType}
            </option>
          ))}
        </Field>
      </label>
      <PlusButton onClick={handleAddIngredient} />
    </div>
  );
};

export default DrinkIngredient;
