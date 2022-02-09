import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createUseStyles } from "react-jss";
import { IngredientType } from "../../types";

const API_URL = process.env.REACT_APP_API_URL;

const useStyles = createUseStyles({
  formRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const CreateIngredient = () => {
  const classes = useStyles();
  const [typeList, setTypeList] = useState<IngredientType[]>([]);

  useEffect(() => {
    try {
      (async (): Promise<void> => {
        const types = await axios
          .get<IngredientType[]>(`${API_URL}/types`)
          .catch((err: any) => console.error(err));
        if (!types)
          throw new Error("Could not retrieve ingredient types from API!");
        setTypeList(types.data || []);
      })();
    } catch (err: any | unknown) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
      <Formik
        initialValues={{ name: "", ingredient_type_id: "", suggestions: "" }}
        onSubmit={(values): void => {
          console.log(values);
        }}
      >
        <Form className={classes.formRoot}>
          <Field type="text" name="name" />
          <Field as="select" name="ingredient_type_id">
            {/* Map types to options */}
            {typeList?.length
              ? typeList.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))
              : "Could not retrieve type list"}
          </Field>
          <Field type="textarea" name="suggestions" />
        </Form>
      </Formik>
    </div>
  );
};

export default CreateIngredient;
