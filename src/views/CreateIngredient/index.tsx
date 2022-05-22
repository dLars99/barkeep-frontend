import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import { createUseStyles } from "react-jss";
import { IngredientType, IngredientFormValues } from "../../types";
import Button from "../../components/Button";

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
    margin: [0, 0, 5],
    alignSelf: "start",
  },
  formField: {
    width: "100%",
    margin: [5, 0, 25],
  },
});

const CreateIngredient = (): JSX.Element => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [typeList, setTypeList] = useState<IngredientType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      (async (): Promise<void> => {
        const types = await axios
          .get<IngredientType[]>(`${API_URL}/types`)
          .catch((err: AxiosError) => console.error(err));
        if (!types)
          throw new Error("Could not retrieve ingredient types from API!");
        setTypeList(types.data || []);
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
        <h1 className={classes.title}>Add a New Ingredient</h1>
      </header>
      {!loading ? (
        <Formik
          initialValues={{
            ingredient_name: "",
            ingredient_type_id: typeList?.[0]?.id,
            suggestions: "",
          }}
          validate={(
            values: IngredientFormValues
          ): FormikErrors<IngredientFormValues> => {
            const errors: FormikErrors<IngredientFormValues> = {};
            if (!values.ingredient_name) errors.ingredient_name = "Required";
            return errors;
          }}
          onSubmit={async (values, { resetForm }): Promise<void> => {
            const submitResponse = await axios.post(
              `${API_URL}/ingredients`,
              values
            );
            if (submitResponse?.status === 201) {
              resetForm({
                values: {
                  ingredient_name: "",
                  ingredient_type_id: typeList?.[0]?.id,
                  suggestions: "",
                },
              });
            } else {
              console.error("Error on ingredient save");
            }
          }}
        >
          <Form className={classes.formRoot}>
            <p className={classes.fieldLabel}>Name</p>
            <Field
              className={classes.formField}
              type="text"
              name="ingredient_name"
              label="Name"
            />
            <ErrorMessage name="ingredient_name" component="div" />
            <p className={classes.fieldLabel}>Type</p>
            <Field
              className={classes.formField}
              as="select"
              name="ingredient_type_id"
              label="Type"
            >
              {typeList?.length
                ? typeList.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.ingredient_type_name}
                    </option>
                  ))
                : "Could not retrieve type list"}
            </Field>
            <ErrorMessage name="ingredient_type_id" component="div" />
            <p className={classes.fieldLabel}>Suggestions</p>
            <Field
              className={classes.formField}
              type="textarea"
              name="suggestions"
              label="Suggestions"
              placeholder="Suggest some brands or items"
            />
            <Button type="submit">Submit</Button>
          </Form>
        </Formik>
      ) : null}
    </div>
  );
};

export default CreateIngredient;
