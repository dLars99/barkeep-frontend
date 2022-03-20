export interface IngredientType {
  id: string;
  name: string;
}

export interface Ingredient {
  id: string;
  name: string;
  ingredient_type_id: string;
  suggestions?: string;
}

export interface IngredientFormValues {
  name: string;
  ingredient_type_id: string;
  suggestions: string;
}

export interface RecipeCategory {
  id: string;
  name: string;
}

export interface RecipeIngredient {
  name: string;
  qty?: number;
  qtyFraction?: string;
  qtyType?: string;
}

export interface RecipeFormValues {
  name: string;
  category_id: string;
  instructions: string;
  rating: string;
  glass1: string;
  glass2: string;
  ingredients: RecipeIngredient[];
}

export interface QuantityFraction {
  display: string;
  value: number;
}
