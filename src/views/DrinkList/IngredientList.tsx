import { StructuredDrinkIngredient } from "../../types";

const IngredientList = ({
  ingredients,
}: {
  ingredients: StructuredDrinkIngredient[];
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
    if (!measurement) return "";
    if (measurement === "dash") return "dashes";
    return measurement + "s";
  };

  return (
    <ul>
      {ingredients.map((ingredient: StructuredDrinkIngredient) => (
        <li key={ingredient.id}>{`${renderDecimalAsFraction(
          Number(ingredient.quantity)
        )} ${
          ingredient.quantity > 1
            ? plural(ingredient.quantity_type)
            : ingredient.quantity_type
        } ${ingredient.ingredient_name}`}</li>
      ))}
    </ul>
  );
};

export default IngredientList;
