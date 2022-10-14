export interface IngredientType {
  id: string;
  ingredient_type_name: string;
}

export interface Ingredient {
  id: string;
  ingredient_name: string;
  ingredient_type_id: string;
  suggestions?: string;
}

export interface IngredientFormValues {
  ingredient_name: string;
  ingredient_type_id: string;
  suggestions: string;
}

export interface DrinkCategory {
  id: string;
  category_name: string;
}

export interface DrinkIngredientModel {
  id: string;
  qty?: number;
  qtyFraction?: string;
  qtyType?: string;
}

export interface DrinkFormValues {
  id: number | undefined;
  drink_name: string;
  category_id: string;
  instructions: string;
  rating: number;
  glass1: string;
  glass2: string;
  video_url: string;
  ingredients: DrinkIngredientModel[];
}

export interface DrinkFormResetValues extends DrinkFormValues {
  ingredients: never[];
}
export interface QuantityFraction {
  display: string;
  value: number;
}

export interface StructuredDrinkIngredient {
  id: number;
  ingredient_name: string;
  quantity: number;
  quantity_type: string;
}
export interface Drink {
  id: number;
  drink_name: string;
  category_id?: string;
  category: string;
  instructions: string;
  rating: number;
  glass1: string;
  glass2: string;
  video_url: string;
  ingredients: StructuredDrinkIngredient[];
  matches?: number;
}
