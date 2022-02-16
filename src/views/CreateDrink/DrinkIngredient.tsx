import { ArrayHelpers, Field } from "formik";
import { createUseStyles } from "react-jss";
import Button from "../../components/Button";
import { Ingredient } from "../../types";

const useStyles = createUseStyles({
  formField: {
    display: "flex",
    width: "100%",
  },
  ingredientSelection: {
    flex: 4,
  },
  quantityField: {
    flex: 2,
  },
  quantityType: {
    flex: 2,
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
  return (
    <div className={classes.formField}>
      <Button type="button" onClick={() => arrayHelpers.remove(index)}>
        {"\u2212"}
      </Button>
      <Field
        className={classes.ingredientSelection}
        as="select"
        name={`ingredients-${index}`}
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
      <Field className={classes.quantityField} name={`quantity-${index}`} />
      <Button type="button" onClick={() => arrayHelpers.push(index)}>
        {"\u002B"}
      </Button>
    </div>
  );
};

export default DrinkIngredient;
