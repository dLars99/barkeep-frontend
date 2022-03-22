import { QuantityFraction } from "../types";

export const fractions: QuantityFraction[] = [
  { display: "", value: 0 },
  { display: "1/4", value: 0.25 },
  { display: "1/2", value: 0.5 },
  { display: "3/4", value: 0.75 },
];

export const quantityTypes = [
  "", // Default = raw item
  "ounce",
  "barspoon",
  "dash",
  "handful",
  "teaspoon",
  "tablespoon",
  "cup",
];
