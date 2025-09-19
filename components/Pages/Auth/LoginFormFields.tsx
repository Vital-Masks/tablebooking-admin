import React from "react";
import { Field } from "formik";
import IconLockDots from "@/components/Icons/IconLockDots";
import IconMail from "@/components/Icons/IconMail";
import { IconEye, IconEyeOff } from "@/components/Icons";

interface LoginFormFieldsProps {
  showPassword: boolean;
  onTogglePassword: () => void;
  errors: any;
  touched: any;
}

const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  showPassword,
  onTogglePassword,
  errors,
  touched,
}) => {
  return (
    <>
      <div>
        <label htmlFor="Email">Email</label>
        <div className="relative text-white-dark">
          <Field
            id="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
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
      
      <div>
        <label htmlFor="Password">Password</label>
        <div className="relative text-white-dark">
          <Field
            id="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="form-input ps-10 pe-10 placeholder:text-white-dark"
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute end-4 top-1/2 -translate-y-1/2 text-white-dark hover:text-white-dark/80 focus:outline-none"
          >
            {showPassword ? (
              <IconEyeOff className="w-4 h-4" />
            ) : (
              <IconEye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && touched.password && (
          <small className="text-red-500">{errors.password}</small>
        )}
      </div>
    </>
  );
};

export default LoginFormFields;
