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
  id: string;
  qty?: number;
  qtyFraction?: string;
  qtyType?: string;
}

export interface RecipeFormValues {
  id: number | undefined;
  name: string;
  category_id: string;
  instructions: string;
  rating: number;
  glass1: string;
  glass2: string;
  ingredients: RecipeIngredient[];
}

export interface RecipeFormResetValues extends RecipeFormValues {
  ingredients: never[];
}
export interface QuantityFraction {
  display: string;
  value: number;
}

export interface StructuredRecipeIngredient {
  id: number;
  name: string;
  quantity: number;
  quantity_type: string;
}
export interface Drink {
  id: number;
  name: string;
  category_id?: string;
  category: string;
  instructions: string;
  rating: number;
  glass1: string;
  glass2: string;
  ingredients: StructuredRecipeIngredient[];
}
