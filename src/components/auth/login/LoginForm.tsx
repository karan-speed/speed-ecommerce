import { Grid } from "@mui/material";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { object, string } from "yup";
import { useFormik } from "formik";
import {
  EMAIL_REQUIRED_MESSAGE,
  emailAddress,
  emailId,
  emailPlaceHolder,
  login,
  password,
  PASSWORD_LENGTH_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  passwordId,
  passwordPlaceHolder,
} from "../../messages";
import { handleLogin } from "../../constants";
function LoginForm() {
  const loginSchema = object({
    email: string().required(EMAIL_REQUIRED_MESSAGE).email(),
    password: string()
      .required(PASSWORD_REQUIRED_MESSAGE)
      .min(8, PASSWORD_LENGTH_MESSAGE),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    dirty,
    isValid,
    errors,
    touched,
  } = formik;
  const disabled = !isValid || !dirty;
  return (
    <>
      <Grid onSubmit={handleSubmit} component={"form"} mt={4}>
        <Input
          isError={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name={emailId}
          id={emailId}
          showLabel
          placeholder={emailPlaceHolder}
          label={emailAddress}
        />
        <Input
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          showLabel
          type="password"
          isPasswordVisible={true}
          name={passwordId}
          id={passwordId}
          placeholder={passwordPlaceHolder}
          label={password}
        />

        <Button
          customClass="login-button"
          icon="next"
          type="submit"
          label={login}
          disabled={disabled}
          iconPosition="end"
        ></Button>
      </Grid>
    </>
  );
}

export default LoginForm;
