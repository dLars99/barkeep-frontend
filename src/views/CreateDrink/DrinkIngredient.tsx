import { ArrayHelpers, Field, useField } from "formik";
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
  ingredientSelection: {
    flex: 4,
    fontSize: "16px",
  },
  quantityField: {
    flex: 2,
    width: "100%",
    fontSize: "16px",
  },
  quantityFractions: {
    flex: 2,
    fontSize: "16px",
  },
  quantityType: {
    flex: 2,
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
  arrayHelpers: ArrayHelpers;
}) => {
  const classes = useStyles();
  const [field] = useField("ingredients");
  const { value } = field;

  return (
    <div className={classes.formField}>
      <Button
        type="button"
        onClick={() => arrayHelpers.remove(index)}
        className={classes.button}
      >
        {"\u2212"}
      </Button>
      <Field
        className={classes.ingredientSelection}
        as="select"
        name={`ingredients[${index}].name`}
        label="Ingredient"
      >
        {ingredientList?.length
          ? ingredientList.map((ingredient: Ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))
          : "Could not retrieve ingredient list"}
      </Field>
      <Field
        className={classes.quantityField}
        type="number"
        name={`ingredients[${index}].qty`}
        min={0}
      />
      <Field
        className={classes.quantityFractions}
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
      <Field
        as="select"
        className={classes.quantityType}
        name={`ingredinets[${index}].qtyType`}
      >
        {quantityTypes.map((qtyType: string) => (
          <option key={qtyType} value={qtyType}>
            {qtyType && value[index].qty > 1
              ? qtyType === "dash"
                ? qtyType + "es"
                : qtyType + "s"
              : qtyType}
          </option>
        ))}
      </Field>
      <Button
        type="button"
        onClick={() => arrayHelpers.push(index)}
        className={classes.button}
      >
        {"\u002B"}
      </Button>
    </div>
  );
};

export default DrinkIngredient;
