import { object, string } from "yup";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import Input from "../../common/Input";
import {
  EMAIL_REQUIRED_MESSAGE,
  emailAddress,
  emailId,
  emailPlaceHolder,
  FIRST_NAME_REQUIRED_MESSAGE,
  firstName,
  firstNameId,
  firstNamePlaceHolder,
  LAST_NAME_REQUIRED_MESSAGE,
  lastName,
  lastNameId,
  lastNamePlaceHolder,
  password,
  PASSWORD_LENGTH_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  passwordId,
  phone,
  PHONE_LENGTH_MESSAGE,
  PHONE_REQUIRED_MESSAGE,
  phoneNumberId,
  phonePlaceHolder,
  register,
} from "../../messages";
import Button from "../../common/Button";
import { handleRegister } from "../../constants";
import { useNavigate } from "react-router-dom";
import type { RegisterFormValues } from "../../../types";

function RegisterForm() {
  const navigate = useNavigate();
  const registerSchema = object({
    first_name: string().required(FIRST_NAME_REQUIRED_MESSAGE),
    last_name: string().required(LAST_NAME_REQUIRED_MESSAGE),
    phone_number: string()
      .required(PHONE_REQUIRED_MESSAGE)
      .min(10, PHONE_LENGTH_MESSAGE),
    email: string().required(EMAIL_REQUIRED_MESSAGE).email(),
    password: string()
      .required(PASSWORD_REQUIRED_MESSAGE)
      .min(8, PASSWORD_LENGTH_MESSAGE),
  });
  const afterRegisterRedirect = async (values: RegisterFormValues) => {
    try {
      await handleRegister(values);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: afterRegisterRedirect,
  });
  const { handleSubmit, handleChange, handleBlur, values, dirty, isValid } =
    formik;
  const disabled = !isValid || !dirty;
  return (
    <Grid component={"form"} onSubmit={handleSubmit} mt={4}>
      <Input
        id={firstNameId}
        name={firstNameId}
        showLabel
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.first_name}
        placeholder={firstNamePlaceHolder}
        label={firstName}
        customClass="login-input"
      />
      <Input
        showLabel
        id={lastNameId}
        name={lastNameId}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.last_name}
        placeholder={lastNamePlaceHolder}
        label={lastName}
        customClass="login-input"
      />
      <Input
        id={phoneNumberId}
        name={phoneNumberId}
        showLabel
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.phone_number}
        placeholder={phonePlaceHolder}
        label={phone}
        customClass="login-input"
      />

      <Input
        id={emailId}
        name={emailId}
        showLabel
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        placeholder={emailPlaceHolder}
        label={emailAddress}
        customClass="login-input"
      />
      <Input
        id={passwordId}
        name={passwordId}
        showLabel
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        type="password"
        isPasswordVisible
        placeholder="Enter password"
        label={password}
        customClass="login-input"
      />

      <Button icon="next" type="submit" disabled={disabled} iconPosition="end">
        {register}
      </Button>
    </Grid>
  );
}

export default RegisterForm;
