import React, { useState } from "react";
import { Field } from "formik";
import IconLockDots from "@/components/Icons/IconLockDots";
import { IconEye, IconEyeOff } from "@/components/Icons";

interface ResetPasswordFormFieldsProps {
  errors: any;
  touched: any;
}

const ResetPasswordFormFields: React.FC<ResetPasswordFormFieldsProps> = ({
  errors,
  touched,
}) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div>
        <label htmlFor="newPassword">New Password</label>
        <div className="relative text-white-dark">
          <Field
            id="newPassword"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="form-input ps-10 pe-10 placeholder:text-white-dark"
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute end-4 top-1/2 -translate-y-1/2 text-white-dark hover:text-white-dark/80 focus:outline-none"
          >
            {showNewPassword ? (
              <IconEyeOff className="w-4 h-4" />
            ) : (
              <IconEye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.newPassword && touched.newPassword && (
          <small className="text-red-500">{errors.newPassword}</small>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="relative text-white-dark">
          <Field
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            className="form-input ps-10 pe-10 placeholder:text-white-dark"
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute end-4 top-1/2 -translate-y-1/2 text-white-dark hover:text-white-dark/80 focus:outline-none"
          >
            {showConfirmPassword ? (
              <IconEyeOff className="w-4 h-4" />
            ) : (
              <IconEye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <small className="text-red-500">{errors.confirmPassword}</small>
        )}
      </div>
    </>
  );
};

export default ResetPasswordFormFields;
