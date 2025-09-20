"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Form, Formik, FormikProps } from "formik";
import { forgotPassword, resetPassword } from "@/lib/actions/auth.action";
import ForgotPasswordFormFields from "./ForgotPasswordFormFields";
import ResetPasswordFormFields from "./ResetPasswordFormFields";
import {
  FORGOT_PASSWORD_FORM_INITIAL_VALUES,
  FORGOT_PASSWORD_VALIDATION_SCHEMA,
  RESET_PASSWORD_FORM_INITIAL_VALUES,
  RESET_PASSWORD_VALIDATION_SCHEMA,
} from "@/constants/authConstants";
import {
  ForgotPasswordFormData,
  ForgotPasswordResponse,
  ForgotPasswordErrorResponse,
  ResetPasswordFormData,
  ResetPasswordResponse,
  ResetPasswordErrorResponse,
} from "@/types/auth";
import Link from "next/link";
import OTPForm from "./OTPForm";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const formikRef = useRef<FormikProps<ForgotPasswordFormData>>(null);
  const resetFormikRef = useRef<FormikProps<ResetPasswordFormData>>(null);

  const handleSubmit = async (
    values: ForgotPasswordFormData
  ): Promise<boolean> => {
    try {
      const response: any = await forgotPassword(values);

      if (response.success) {
        setIsEmailSent(true);
        setEmailMessage(
          response.result.message || "Password reset email sent successfully!"
        );
        setUserName(values["email"]);
        setUserId(response.result.userId);
        return true;
      } else {
        const errorMessage =
          "error" in response ? response.error : "Failed to send reset email";
        toast.error(errorMessage || "Failed to send reset email");
        return false;
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Failed to send reset email. Please try again.");
      return false;
    }
  };

  const handleOTPVerifySuccess = () => {
    setShowResetPassword(true);
    setIsEmailSent(false);
  };

  const handleResetPasswordSubmit = async (
    values: ResetPasswordFormData
  ): Promise<boolean> => {
    try {
      const resetData = {
        userName: userName,
        newPassword: values.newPassword,
      };

      const response: ResetPasswordResponse | ResetPasswordErrorResponse =
        await resetPassword(resetData);

      if ("success" in response && response.success && response.result) {
        setIsPasswordReset(true);
        toast.success(
          response.result.message || "Password reset successfully!"
        );
        return true;
      } else {
        const errorMessage =
          "error" in response ? response.error : "Failed to reset password";
        toast.error(errorMessage || "Failed to reset password");
        return false;
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Failed to reset password. Please try again.");
      return false;
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  if (isEmailSent) {
    return (
      <OTPForm
        userId={userId}
        otpMessage={emailMessage}
        onBackToLogin={handleBackToLogin}
        onVerifySuccess={handleOTPVerifySuccess}
        purpose="forgot-password"
      />
    );
  }

  if (isPasswordReset) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-black mb-2">
            Password Reset Successfully!
          </h3>
          <p className="text-white-dark mb-6">
            Your password has been reset successfully. You can now log in with
            your new password.
          </p>
        </div>
        <button
          onClick={handleBackToLogin}
          className="btn btn-gradient w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
        >
          Back to Login
        </button>
      </div>
    );
  }

  if (showResetPassword) {
    return (
      <div className="flex flex-col">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black mb-2">Reset Password</h2>
          <p className="text-white-dark">Enter your new password below.</p>
        </div>

        <Formik
          ref={resetFormikRef}
          initialValues={RESET_PASSWORD_FORM_INITIAL_VALUES}
          validationSchema={RESET_PASSWORD_VALIDATION_SCHEMA}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values: ResetPasswordFormData, actions) => {
            const success = await handleResetPasswordSubmit(values);
            actions.setSubmitting(false);
            if (success) {
              actions.resetForm();
            }
          }}
        >
          {({ handleSubmit, errors, touched, isSubmitting }) => {
            return (
              <Form onSubmit={handleSubmit} className="space-y-5">
                <ResetPasswordFormFields errors={errors} touched={touched} />
                <button
                  type="submit"
                  className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
              </Form>
            );
          }}
        </Formik>

        <Link
          href="/login"
          className="text-primary hover:text-primary/80 text-sm text-center w-full mt-5"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black mb-2">Forgot Password?</h2>
        <p className="text-white-dark">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      <Formik
        ref={formikRef}
        initialValues={FORGOT_PASSWORD_FORM_INITIAL_VALUES}
        validationSchema={FORGOT_PASSWORD_VALIDATION_SCHEMA}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values: ForgotPasswordFormData, actions) => {
          const success = await handleSubmit(values);
          actions.setSubmitting(false);
          if (success) {
            actions.resetForm();
          }
        }}
      >
        {({ handleSubmit, errors, touched, isSubmitting }) => {
          return (
            <Form onSubmit={handleSubmit} className="space-y-5">
              <ForgotPasswordFormFields errors={errors} touched={touched} />
              <button
                type="submit"
                className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </Form>
          );
        }}
      </Formik>

      <Link
        href="/login"
        className="text-primary hover:text-primary/80 text-sm text-center w-full mt-5"
      >
        Back to Login
      </Link>
    </div>
  );
};

export default ForgotPasswordForm;
