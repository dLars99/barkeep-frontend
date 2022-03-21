import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
  FormikProps,
  FieldArrayRenderProps,
} from "formik";
import * as Yup from "yup";
import { createUseStyles } from "react-jss";
import { RecipeCategory, RecipeFormValues, Ingredient } from "../../types";
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

const CreateDrink = (): JSX.Element => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [categoryList, setCategoryList] = useState<RecipeCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Initial load
  useEffect(() => {
    try {
      (async (): Promise<void> => {
        const ingredients = await axios
          .get<Ingredient[]>(`${API_URL}/ingredients`)
          .catch((err: any) => console.error(err));
        if (!ingredients)
          throw new Error("Could not retrieve ingredients from API!");
        setIngredientList(ingredients.data || []);

        const categories = await axios
          .get<RecipeCategory[]>(`${API_URL}/categories`)
          .catch((err: any) => console.error(err));
        if (!categories)
          throw new Error("Could not retrieve ingredient categories from API!");
        setCategoryList(categories.data || []);

        setLoading(false);
      })();
    } catch (err: any | unknown) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <header className={classes.header}>
        <button className={classes.backButton} onClick={() => navigate(-1)}>
          {"<< Back"}
        </button>
        <h1 className={classes.title}>Add a New Drink</h1>
      </header>
      {!loading ? (
        <Formik
          initialValues={{
            name: "",
            category_id: categoryList?.[0]?.id,
            instructions: "",
            rating: "",
            glass1: "",
            glass2: "",
            ingredients: [],
          }}
          validationSchema={DrinkSchema}
          onSubmit={async (values, { resetForm }): Promise<void> => {
            console.log({ values });
            // const submitResponse = await axios.post(
            //   `${API_URL}/recipes`,
            //   values
            // );
            // if (submitResponse?.status === 201) {
            //   resetForm({
            //     values: {
            //       name: "",
            //       category_id: categoryList?.[0]?.id,
            //       instructions: "",
            //       rating: "",
            //       glass1: "",
            //       glass2: "",
            //       ingredients: [],
            //     },
            //   });
            // } else {
            //   console.error("Error on recipe save");
            // }
          }}
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
                  {(arrayHelpers: FieldArrayRenderProps): JSX.Element => (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {values.ingredients && values.ingredients.length > 0 ? (
                        values.ingredients.map((ingredient, index) => (
                          <>
                            <DrinkIngredient
                              key={index}
                              index={index}
                              ingredientList={ingredientList}
                              arrayHelpers={arrayHelpers}
                            />
                            <ErrorMessage
                              name={`ingredients[${index}].qty`}
                              component="div"
                              className={classes.errorMessage}
                            />
                          </>
                        ))
                      ) : (
                        <Button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
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
                  type="textarea"
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
