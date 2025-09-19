import * as Yup from "yup";

export const LOGIN_FORM_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const LOGIN_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const OTP_TIMEOUT = 300; // 5 minutes in seconds
export const OTP_LENGTH = 6;

export const FORGOT_PASSWORD_FORM_INITIAL_VALUES = {
  email: "",
};

export const FORGOT_PASSWORD_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const RESET_PASSWORD_FORM_INITIAL_VALUES = {
  newPassword: "",
  confirmPassword: "",
};

export const RESET_PASSWORD_VALIDATION_SCHEMA = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});
