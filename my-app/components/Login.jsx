import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

function Login () {
    const navigate = useNavigate();

    return (
        <Formik
        initialValues={{ email: "", password: ""}}
        validationSchema={Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().min(6, "Password too short!").required("Required"),
        })}
        onSubmit={(values) => {
            loginUser(values).then(() => navigate("/"));
        }}
        >
        <Form>
            <Field name="email" type="email" placeholder="email" />
            <ErrorMessage name="email" component="div" />
            <Field name="password" type="password" placeholder="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit">Login</button>
        </Form>
        </Formik>
    );
}

export default Login;