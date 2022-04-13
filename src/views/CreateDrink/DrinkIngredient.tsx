import { Field, FieldArrayRenderProps } from "formik";
import { createUseStyles } from "react-jss";
import Button from "../../components/Button";
import { Ingredient, QuantityFraction } from "../../types";
import { fractions, quantityTypes } from "../../helpers/lists";

const useStyles = createUseStyles({
  formField: {
    display: "flex",
    width: "100%",
    margin: [5, 0],
  },
  button: {
    margin: [3, 6],
  },
  fieldLabel: {
    fontSize: "16px",
    display: "flex",
    flexDirection: "column",
    padding: [0, 2],
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
    color: "#fff",
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

  return (
    <div className={classes.formField}>
      <Button
        type="button"
        onClick={() => remove(index)}
        className={classes.button}
      >
        {"\u2212"}
      </Button>
      <label
        htmlFor={`ingredients[${index}].id`}
        className={classes.ingredientSelection}
      >
        Name
        <Field
          className={classes.selectBox}
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
                    {ingredient.name}
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
          className={classes.numberBox}
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
          className={classes.selectBox}
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
          className={classes.selectBox}
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
      <Button
        type="button"
        onClick={() => {
          insert(index + 1, {
            // Push next available ingredient id
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
        }}
        className={classes.button}
      >
        {"\u002B"}
      </Button>
    </div>
  );
};

export default DrinkIngredient;
