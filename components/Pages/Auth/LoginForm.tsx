"use client";

import { FormEvent, useRef, useState } from "react";
import IconLockDots from "@/components/Icons/IconLockDots";
import IconMail from "@/components/Icons/IconMail";
import { signInCognitoUser } from "@/lib/aws-auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });
  const [validationSchema, setValidationSchema] = useState(
    Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    })
  );

  const formikRef = useRef<FormikProps<any>>(null);

  const handleSubmit = async (values: any) => {
    try {
      const email = values.email;
      const password = values.password;

      const userLoggedInDetails = await signInCognitoUser(email, password);

      if (userLoggedInDetails.error) {
        toast.error("Invalid email or password");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <Formik
      ref={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={(values: any, actions) => {
        handleSubmit(values).then(() => {
          actions.setSubmitting(false);
          actions.resetForm();
        });
      }}
    >
      {({ handleSubmit, errors, touched, isSubmitting }: any) => {
        return (
          <Form onSubmit={handleSubmit} className="space-y-5">
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
                  type="password"
                  placeholder="Enter Password"
                  className="form-input ps-10 placeholder:text-white-dark"
                />
                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                  <IconLockDots fill={true} />
                </span>
              </div>
              {errors.password && touched.password && (
                <small className="text-red-500">{errors.password}</small>
              )}
            </div>
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
  );
};

export default LoginForm;
