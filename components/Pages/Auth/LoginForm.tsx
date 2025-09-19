"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Form, Formik, FormikProps } from "formik";
import { login } from "@/lib/actions/auth.action";
import OTPForm from "./OTPForm";
import LoginFormFields from "./LoginFormFields";
import {
  LOGIN_FORM_INITIAL_VALUES,
  LOGIN_VALIDATION_SCHEMA,
} from "@/constants/authConstants";
import { LoginFormData, LoginResponse, LoginErrorResponse } from "@/types/auth";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isOTPForm, setIsOTPForm] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [userId, setUserId] = useState("");
  const formikRef = useRef<FormikProps<LoginFormData>>(null);

  const handleOTPVerifySuccess = () => {
    router.push("/dashboard");
  };

  const handleBackToLogin = () => {
    setIsOTPForm(false);
    setOtpMessage("");
    setUserId("");
  };

  const handleSubmit = async (values: LoginFormData): Promise<boolean> => {
    try {
      const userLoggedInDetails: LoginResponse | LoginErrorResponse =
        await login(values);

      if (
        "success" in userLoggedInDetails &&
        userLoggedInDetails.success &&
        userLoggedInDetails.result
      ) {
        setIsOTPForm(true);
        setOtpMessage(userLoggedInDetails.result.message || "");
        setUserId(userLoggedInDetails.result.userId || "");
        return true;
      } else {
        const errorMessage =
          "error" in userLoggedInDetails
            ? userLoggedInDetails.error
            : "Invalid email or password";
        toast.error(errorMessage || "Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password.");
      return false;
    }
  };

  return (
    <div className="flex flex-col">
      {isOTPForm ? (
        <OTPForm
          userId={userId}
          otpMessage={otpMessage}
          onBackToLogin={handleBackToLogin}
          onVerifySuccess={handleOTPVerifySuccess}
        />
      ) : (
        <Formik
          ref={formikRef}
          initialValues={LOGIN_FORM_INITIAL_VALUES}
          validationSchema={LOGIN_VALIDATION_SCHEMA}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values: LoginFormData, actions) => {
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
                <LoginFormFields
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  errors={errors}
                  touched={touched}
                />
                <button
                  type="submit"
                  className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </Form>
            );
          }}
        </Formik>
      )}
      <Link
        href="/forgot-password"
        className="text-primary hover:text-primary/80 text-sm text-center w-full mt-5"
      >
        Forgot Password
      </Link>
    </div>
  );
};

export default LoginForm;
