import React, { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
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
  DrinkCategory,
  DrinkFormValues,
  DrinkFormResetValues,
  Ingredient,
  DrinkIngredientModel,
  StructuredDrinkIngredient,
  Drink,
} from "../../types";
import Button from "../../components/Button";
import DrinkIngredient from "./DrinkIngredient";
import BackButton from "../../components/BackButton";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = createUseStyles({
  wrapper: {
    position: "absolute",
    backgroundColor: "rgba(13, 0, 0, 0.4)",
    width: "100%",
    height: "100%",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    fontFamily: "'Reggae One', cursive",
    color: "#F2E30C",
    alignItems: "center",
    paddingTop: 30,
    marginLeft: "20%",
  },
  backButton: {
    background: "transparent",
    border: "none",
    width: 80,
  },
  title: {
    position: "relative",
    width: "100%",
    marginLeft: "1rem",
  },
  formRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    margin: [0, "auto"],
    borderRadius: 10,
    backgroundColor: "rgba(252, 223, 135, 0.9)",
    color: "#0D0000",
    boxShadow: ["inset", 0, 0, 15, "#F99938"],
    fontFamily: "'Catamaran', sans-serif",
    padding: ["1rem", "2rem", "1rem"],
    boxSizing: "border-box",
  },
  fieldLabel: {
    fontSize: "1.3rem",
    margin: [0, 0, 15],
    alignSelf: "start",
    width: "100%",
  },
  formField: {
    width: "100%",
    margin: [10, 0, 5],
    height: "2rem",
    borderRadius: 10,
    padding: [2, "1rem"],
    fontSize: 16,
    backgroundColor: "rgba(252, 240, 180, 0.8)",
    color: "#0D0000",
    border: 0,
    boxSizing: "border-box",
  },
  errorMessage: {
    alignSelf: "flex-start",
    color: "#d93d1a",
    fontSize: "14px",
    paddingLeft: "0.5rem",
  },
  submitButton: {
    backgroundColor: "transparent",
    border: "none",
    borderRadius: 7,
    fontSize: 16,
    margin: [0, 4],
    padding: ["0.5rem", "1rem"],
    boxShadow: ["inset", 0, 0, 5, "#F99938"],
    display: "flex",
    alignItems: "center",
  },
});

const DrinkSchema = Yup.object().shape({
  drink_name: Yup.string().trim().required("Required"),
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
  video_url: Yup.string().url(),
});

const handleSubmit = async (
  editId: number | undefined,
  values: FormikValues,
  categoryList: DrinkCategory[],
  resetForm: (
    nextState?: Partial<FormikState<DrinkFormResetValues>> | undefined
  ) => void,
  handleBack: (() => void) | undefined
): Promise<void> => {
  // Assemble quantities
  const preppedValues = {
    ...values,
    ingredients: values.ingredients.map((ingredient: DrinkIngredientModel) => {
      const { id, qty, qtyFraction, qtyType } = ingredient;
      return {
        ingredient_id: id,
        quantity: `${(qty ?? 0) + Number(qtyFraction ?? 0)}`,
        quantity_type: qtyType,
      };
    }),
  };
  let submitResponse: void | AxiosResponse;
  if (editId) {
    submitResponse = await axios
      .put(`${API_URL}/drinks/${values.id}`, preppedValues)
      .catch((err: AxiosError) => console.error(err));
  } else {
    submitResponse = await axios
      .post(`${API_URL}/drinks`, preppedValues)
      .catch((err: AxiosError) => console.error(err));
  }
  if (
    submitResponse?.status &&
    submitResponse.status >= 200 &&
    submitResponse.status < 300
  ) {
    resetForm({
      values: {
        id: undefined,
        drink_name: "",
        category_id: categoryList?.[0]?.id,
        instructions: "",
        rating: 0,
        glass1: "",
        glass2: "",
        video_url: "",
        ingredients: [],
      },
    });
    if (handleBack) handleBack();
  } else {
    console.error("Error on drink save");
  }
};

const CreateDrink = ({
  editId,
  handleBack,
}: {
  editId?: number;
  handleBack?: () => void;
}): JSX.Element => {
  const classes = useStyles();
  const [drink, setDrink] = useState<Drink>();
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [categoryList, setCategoryList] = useState<DrinkCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Initial load
  useEffect(() => {
    try {
      (async (): Promise<void> => {
        if (editId) {
          const drink = await axios
            .get<Drink>(`${API_URL}/drinks`, {
              params: {
                id: editId,
              },
            })
            .catch((err: AxiosError) => console.error(err));
          if (!drink) throw new Error("Could not retrieve drink from API");
          setDrink(drink.data);
        }
        const ingredients = await axios
          .get<Ingredient[]>(`${API_URL}/ingredients`)
          .catch((err: AxiosError) => console.error(err));
        if (!ingredients)
          throw new Error("Could not retrieve ingredients from API!");
        setIngredientList(ingredients.data || []);

        const categories = await axios
          .get<DrinkCategory[]>(`${API_URL}/categories`)
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
  ): DrinkIngredientModel[] | undefined => {
    if (!drink) return;
    const formIngredients = drink.ingredients?.map(
      (ingredient: StructuredDrinkIngredient) => {
        const qty = Math.floor(ingredient.quantity);
        const qtyFraction = String(ingredient.quantity - qty);
        return {
          id: String(ingredient.id),
          name: ingredient.ingredient_name,
          qty,
          qtyFraction,
          qtyType: ingredient.quantity_type,
        };
      }
    );
    return formIngredients;
  };

  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <BackButton />
        <h1 className={classes.title}>Add a New Drink</h1>
      </header>
      {!loading ? (
        <Formik
          enableReinitialize
          initialValues={{
            id: drink?.id,
            drink_name: drink?.drink_name || "",
            category_id: drink?.category_id || categoryList?.[0]?.id,
            instructions: drink?.instructions || "",
            rating: drink?.rating || 0,
            glass1: drink?.glass1 || "",
            glass2: drink?.glass2 || "",
            video_url: drink?.video_url || "",
            ingredients: mappedIngredients(drink) ?? [],
          }}
          validationSchema={DrinkSchema}
          onSubmit={(values, { resetForm }): Promise<void> =>
            handleSubmit(editId, values, categoryList, resetForm, handleBack)
          }
        >
          {({ values, errors }: FormikProps<DrinkFormValues>): JSX.Element => (
            <Form className={classes.formRoot}>
              <label htmlFor="drink_name" className={classes.fieldLabel}>
                Name
                <Field
                  className={classes.formField}
                  type="text"
                  name="drink_name"
                  label="Name"
                />
                <ErrorMessage
                  name="drink_name"
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
                    ? categoryList.map((category: DrinkCategory) => (
                        <option key={category.id} value={category.id}>
                          {category.category_name}
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
              <label htmlFor="video_url" className={classes.fieldLabel}>
                Link to instructional video
                <Field
                  className={classes.formField}
                  type="text"
                  name="video_url"
                />
              </label>
              <label htmlFor="rating" className={classes.fieldLabel}>
                Rating
                <Field
                  className={classes.formField}
                  type="number"
                  name="rating"
                />
              </label>
              <Button className={classes.submitButton} type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      ) : null}
    </div>
  );
};

export default CreateDrink;
