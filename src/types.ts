export interface IngredientType {
  id: string;
  name: string;
}

export interface IngredientFormValues {
  name: string;
  ingredient_type_id: string;
  suggestions: string;
}
