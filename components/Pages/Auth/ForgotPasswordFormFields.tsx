import React from "react";
import { Field } from "formik";
import IconMail from "@/components/Icons/IconMail";

interface ForgotPasswordFormFieldsProps {
  errors: any;
  touched: any;
}

const ForgotPasswordFormFields: React.FC<ForgotPasswordFormFieldsProps> = ({
  errors,
  touched,
}) => {
  return (
    <div>
      <label htmlFor="Email">Email</label>
      <div className="relative text-white-dark">
        <Field
          id="Email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          className="form-input ps-10 placeholder:text-white-dark"
        />
        <span className="absolute start-4 top-1/2 -translate-y-1/2">
          <IconMail fill={true} />
        </span>
      </div>
      {errors.email && touched.email && (
        <small className="text-red-500">{errors.email}</small>
      )}
    </div>
  );
};

export default ForgotPasswordFormFields;
