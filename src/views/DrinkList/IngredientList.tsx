import { StructuredRecipeIngredient } from "../../types";

const IngredientList = ({
  ingredients,
}: {
  ingredients: StructuredRecipeIngredient[];
}) => {
  const renderDecimalAsFraction = (num: number): string => {
    const whole = Math.floor(num);
    const decimal = whole ? num % whole : num;
    let fraction = "";
    switch (decimal) {
      case 0.25:
        fraction = " 1/4";
        break;
      case 0.5:
        fraction = " 1/2";
        break;
      case 0.75:
        fraction = " 3/4";
        break;
    }
    return `${whole ? whole : ""}${fraction}`;
  };

  const plural = (measurement: string): string => {
    return (measurement = "dash" ? "dashes" : measurement + "s");
  };

  return (
    <ul>
      {ingredients.map((ingredient: StructuredRecipeIngredient) => (
        <li key={ingredient.id}>{`${renderDecimalAsFraction(
          Number(ingredient.quantity)
        )} ${
          ingredient.quantity > 1
            ? plural(ingredient.quantity_type)
            : ingredient.quantity_type
        } ${ingredient.name}`}</li>
      ))}
    </ul>
  );
};

export default IngredientList;
