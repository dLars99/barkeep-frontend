import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  FormikProps,
  FieldArrayRenderProps,
  FormikValues,
  FormikState,
} from "formik";
import * as Yup from "yup";
import { createUseStyles } from "react-jss";
import {
  RecipeCategory,
  RecipeFormValues,
  RecipeFormResetValues,
  Ingredient,
  RecipeIngredient,
  StructuredRecipeIngredient,
  Drink,
} from "../../types";
import Button from "../../components/Button";
import DrinkIngredient from "./DrinkIngredient";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = createUseStyles({
  header: {
    display: "flex",
    marginTop: 30,
  },
  backButton: {
    background: "transparent",
    border: "none",
    width: 80,
  },
  title: {
    position: "relative",
    left: -20,
    width: "100%",
    textAlign: "center",
  },
  formRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    margin: [0, "auto"],
  },
  fieldLabel: {
    fontSize: "1.3rem",
    margin: [0, 0, 25],
    alignSelf: "start",
    width: "100%",
  },
  formField: {
    width: "100%",
    margin: [10, 0, 5],
    fontSize: "16px",
  },
  errorMessage: {
    alignSelf: "flex-start",
    color: "red",
    fontSize: "14px",
  },
});

const DrinkSchema = Yup.object().shape({
  name: Yup.string().trim().required("Required"),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        qty: Yup.number().when("qtyFraction", {
          is: (qtyFraction: string) => !qtyFraction,
          then: Yup.number().min(1, "Whole or fraction quantity required"),
        }),
        qtyFraction: Yup.string(),
        qtyType: Yup.string(),
      })
    )
    .required("Must have ingredients")
    .min(1, "Must have at least one ingredient"),
  category_id: Yup.number().required("Category required"),
  instructions: Yup.string(),
  glass1: Yup.string(),
  glass2: Yup.string(),
  rating: Yup.string(),
});

const handleSubmit = async (
  values: FormikValues,
  categoryList: RecipeCategory[],
  resetForm: (
    nextState?: Partial<FormikState<RecipeFormResetValues>> | undefined
  ) => void
): Promise<void> => {
  // Assemble quantities
  const preppedValues = {
    ...values,
    ingredients: values.ingredients.map((ingredient: RecipeIngredient) => {
      const { id, qty, qtyFraction, qtyType } = ingredient;
      return {
        ingredient_id: id,
        quantity: `${(qty ?? 0) + Number(qtyFraction ?? 0)}`,
        quantity_type: qtyType,
      };
    }),
  };
  const submitResponse = await axios
    .post(`${API_URL}/recipes`, preppedValues)
    .catch((err: AxiosError) => console.error(err));
  if (submitResponse?.status === 201) {
    resetForm({
      values: {
        name: "",
        category_id: categoryList?.[0]?.id,
        instructions: "",
        rating: 0,
        glass1: "",
        glass2: "",
        ingredients: [],
      },
    });
  } else {
    console.error("Error on recipe save");
  }
};

const CreateDrink = ({
  editId,
  handleBack,
}: {
  editId?: number;
  handleBack?: () => void;
}): JSX.Element => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [drink, setDrink] = useState<Drink>();
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [categoryList, setCategoryList] = useState<RecipeCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Initial load
  useEffect(() => {
    try {
      (async (): Promise<void> => {
        if (editId) {
          const drink = await axios
            .get<Drink[]>(`${API_URL}/recipes`, {
              params: {
                id: editId,
              },
            })
            .catch((err: AxiosError) => console.error(err));
          if (!drink) throw new Error("Could not retrieve drink from API");
          setDrink(drink.data[0]);
        }
        const ingredients = await axios
          .get<Ingredient[]>(`${API_URL}/ingredients`)
          .catch((err: AxiosError) => console.error(err));
        if (!ingredients)
          throw new Error("Could not retrieve ingredients from API!");
        setIngredientList(ingredients.data || []);

        const categories = await axios
          .get<RecipeCategory[]>(`${API_URL}/categories`)
          .catch((err: AxiosError) => console.error(err));
        if (!categories)
          throw new Error("Could not retrieve ingredient categories from API!");
        setCategoryList(categories.data || []);

        setLoading(false);
      })();
    } catch (err: any | unknown) {
      console.error(err);
    }
  }, [editId]);

  const mappedIngredients = (
    drink: Drink | undefined
  ): RecipeIngredient[] | undefined => {
    if (!drink) return;
    const formIngredients = drink.ingredients?.map(
      (ingredient: StructuredRecipeIngredient) => {
        const qty = Math.floor(ingredient.quantity);
        const qtyFraction = String(ingredient.quantity - qty);
        return {
          id: String(ingredient.id),
          name: ingredient.name,
          qty,
          qtyFraction,
          qtyType: ingredient.quantity_type,
        };
      }
    );
    return formIngredients;
  };

  return (
    <div>
      <header className={classes.header}>
        <button
          className={classes.backButton}
          onClick={() => (editId && handleBack ? handleBack() : navigate(-1))}
        >
          {"<< Back"}
        </button>
        <h1 className={classes.title}>Add a New Drink</h1>
      </header>
      {!loading ? (
        <Formik
          enableReinitialize
          initialValues={{
            name: drink?.name || "",
            category_id: drink?.category_id || categoryList?.[0]?.id,
            instructions: drink?.instructions || "",
            rating: drink?.rating || 0,
            glass1: drink?.glass1 || "",
            glass2: drink?.glass2 || "",
            ingredients: mappedIngredients(drink) ?? [],
          }}
          validationSchema={DrinkSchema}
          onSubmit={(values, { resetForm }): Promise<void> =>
            handleSubmit(values, categoryList, resetForm)
          }
        >
          {({ values, errors }: FormikProps<RecipeFormValues>): JSX.Element => (
            <Form className={classes.formRoot}>
              <label htmlFor="name" className={classes.fieldLabel}>
                Name
                <Field
                  className={classes.formField}
                  type="text"
                  name="name"
                  label="Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={classes.errorMessage}
                />
              </label>
              <label htmlFor="ingredients" className={classes.fieldLabel}>
                Ingredients
                <FieldArray name="ingredients">
                  {(renderProps: FieldArrayRenderProps): JSX.Element => (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {values.ingredients && values.ingredients.length > 0 ? (
                        values.ingredients.map((ingredient, index) => (
                          <React.Fragment key={index}>
                            <DrinkIngredient
                              index={index}
                              ingredientList={ingredientList}
                              renderProps={renderProps}
                            />
                            <ErrorMessage
                              name={`ingredients[${index}].qty`}
                              component="div"
                              className={classes.errorMessage}
                            />
                          </React.Fragment>
                        ))
                      ) : (
                        <Button
                          type="button"
                          onClick={() =>
                            renderProps.push({
                              id: ingredientList?.[0]?.id,
                              qty: 0,
                              qtyFraction: "",
                              qtyType: "",
                            })
                          }
                        >
                          Add an Ingredient
                        </Button>
                      )}
                    </div>
                  )}
                </FieldArray>
                {typeof errors.ingredients === "string" ? (
                  <ErrorMessage
                    name="ingredients"
                    component="div"
                    className={classes.errorMessage}
                  />
                ) : null}
              </label>
              <label htmlFor="category_id" className={classes.fieldLabel}>
                Category
                <Field
                  className={classes.formField}
                  as="select"
                  name="category_id"
                  label="Type"
                >
                  {categoryList?.length
                    ? categoryList.map((category: RecipeCategory) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                    : "Could not retrieve category list"}
                </Field>
              </label>
              <ErrorMessage name="category_id" component="div" />
              <label htmlFor="instructions" className={classes.fieldLabel}>
                Instructions
                <Field
                  className={classes.formField}
                  as="textarea"
                  rows={8}
                  name="instructions"
                  label="Instructions"
                  placeholder="Put more details here"
                />
              </label>
              <label htmlFor="glass1" className={classes.fieldLabel}>
                Suggested glass
                <Field
                  className={classes.formField}
                  type="text"
                  name="glass1"
                  label="Suggested glass"
                />
              </label>
              <label htmlFor="glass2" className={classes.fieldLabel}>
                Second suggested glass
                <Field
                  className={classes.formField}
                  type="text"
                  name="glass2"
                />
              </label>
              <label htmlFor="rating" className={classes.fieldLabel}>
                Rating
                <Field
                  className={classes.formField}
                  type="text"
                  name="rating"
                />
              </label>
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      ) : null}
    </div>
  );
};

export default CreateDrink;
