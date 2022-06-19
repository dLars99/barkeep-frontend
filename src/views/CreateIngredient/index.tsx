import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import { createUseStyles } from "react-jss";
import { IngredientType, IngredientFormValues } from "../../types";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = createUseStyles({
  wrapper: {
    position: "absolute",
    backgroundColor: "rgba(13, 0, 0, 0.4)",
    width: "100%",
    height: "100%",
  },
  header: {
    display: "flex",
    fontFamily: "'Reggae One', cursive",
    color: "#F2E30C",
    alignItems: "center",
    paddingTop: 30,
    marginLeft: "20%",
  },
  title: {
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
    padding: [0, "2rem", "1rem"],
    boxSizing: "border-box",
  },
  fieldLabel: {
    fontSize: "1.3rem",
    margin: [15, 0, 5],
    alignSelf: "start",
  },
  formField: {
    width: "100%",
    margin: [5, 0, 10],
    height: "2rem",
    borderRadius: 10,
    padding: [2, "1rem"],
    fontSize: 16,
    backgroundColor: "rgba(252, 240, 180, 0.8)",
    color: "#0D0000",
    border: 0,
    boxSizing: "border-box",
  },
  formError: {
    color: "#d93d1a",
    alignSelf: "flex-start",
    paddingLeft: "0.5rem",
  },
});

const CreateIngredient = (): JSX.Element => {
  const classes = useStyles();
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
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <BackButton />
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
            <label htmlFor="ingredient_name" className={classes.fieldLabel}>
              Name
            </label>
            <Field
              className={classes.formField}
              type="text"
              name="ingredient_name"
              label="Name"
            />
            <ErrorMessage
              className={classes.formError}
              name="ingredient_name"
              component="div"
            />
            <label htmlFor="ingredient_type_id" className={classes.fieldLabel}>
              Type
            </label>
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
            <ErrorMessage
              className={classes.formError}
              name="ingredient_type_id"
              component="div"
            />
            <label htmlFor="suggestions" className={classes.fieldLabel}>
              Suggestions
            </label>
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
