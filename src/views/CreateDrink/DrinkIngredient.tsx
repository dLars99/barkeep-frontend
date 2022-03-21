import { Field, FieldArrayRenderProps } from "formik";
import { createUseStyles } from "react-jss";
import Button from "../../components/Button";
import { Ingredient, QuantityFraction } from "../../types";
import { fractions, quantityTypes } from "../../helpers/lists";

const useStyles = createUseStyles({
  formField: {
    display: "flex",
    width: "100%",
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
  },
});

const DrinkIngredient = ({
  index,
  ingredientList,
  arrayHelpers,
}: {
  index: number;
  ingredientList: Ingredient[];
  arrayHelpers: FieldArrayRenderProps;
}) => {
  const classes = useStyles();
  const { push, form } = arrayHelpers;
  const { values } = form;
  console.log(form);

  return (
    <div className={classes.formField}>
      <Button
        type="button"
        onClick={() => arrayHelpers.remove(index)}
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
                        ingredient.id !== selectedIngredient.id
                    )
                )
                .map((ingredient: Ingredient) => (
                  <option key={ingredient.id} value={ingredient.id}>
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
          className={classes.quantityField}
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
            <option key={fraction.value} value={fraction.value}>
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
            <option key={qtyType} value={qtyType}>
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
          push({
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
