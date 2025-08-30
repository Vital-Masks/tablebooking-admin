import React, { useRef, useState, useEffect } from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import { IconXCircle, IconEye, IconEyeOff } from "@/components/Icons";
import IconLoading from "@/components/Icons/IconLoading";
import CustomDatesCalendar from "../Fields/CustomDatesCalendar";
import RestaurantSelect from "@/components/Elements/RestaurantSelect";
import DiningSelect from "@/components/Elements/DiningSelect";
import DiningAreaSelect from "@/components/Elements/DiningAreaSelect";
import Calendar from "../Fields/Calendar";
import SelectField from "../Fields/SelectField";
import FilePicker from "../Fields/FilePicker";

const options = [{ value: "select", label: "Select" }];

interface FormField {
  isMulti: boolean;
  id: string;
  name: string;
  label?: string;
  type?: string;
  content?: string;
  fields?: FormField[];
  options?: [{ value: string; label: string }];
  dependant?: string;
  ifRender?: any;
  hasTime?: boolean;
  maxFiles: number;
  placeholder?: string;
  disabled?: boolean;
}

const FormComponent = ({
  title,
  fields,
  initialValues,
  validationSchema,
  handleSubmit,
  closeForm,
  children,
  onFormChange,
}: any) => {
  const formikRef = useRef<FormikProps<any>>(null);
  const resetFormRef = useRef<(() => void) | null>(null);
  const previousValuesRef = useRef(initialValues);

  const onCloseForm = () => {
    // Reset the form to initial values
    if (formikRef.current) {
      formikRef.current.resetForm();
    }

    if (resetFormRef.current) {
      resetFormRef.current();
    }

    // Use a timeout to ensure the reset happens after state updates
    setTimeout(() => {
      closeForm();
    }, 0);
  };

  return (
    <div className="panel shadow-none">
      {(title || closeForm) && (
        <div className="mb-5 flex items-start justify-between">
          <h5 className="text-lg font-semibold">{title}</h5>
          <button onClick={() => onCloseForm()}>
            <IconXCircle />
          </button>
        </div>
      )}
      <div className="mb-5">
        <Formik
          ref={formikRef}
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values, actions) => {
            try {
              const result = await handleSubmit(values);
              actions.setSubmitting(false);

              // Only reset form if the result indicates success
              if (result && result.success !== false) {
                actions.resetForm();
              }
            } catch (error) {
              actions.setSubmitting(false);
              // Error is already handled in the handleSubmit function
              console.error("Form submission error:", error);
            }
          }}
        >
          {({
            handleSubmit,
            errors,
            values,
            touched,
            isSubmitting,
            isValidating,
            isValid,
            setFieldValue,
            dirty,
            resetForm,
          }) => {
            // Store the resetForm function in ref
            resetFormRef.current = resetForm;

            // Call onFormChange when values change
            if (onFormChange && JSON.stringify(values) !== JSON.stringify(previousValuesRef.current)) {
              onFormChange(values);
              previousValuesRef.current = values;
            }

            return (
              // warn user when leaving the page without saving
              // {WarnIfUnsaved(Object.keys(touched).some((v) => v !== '') && dirty)}
              <Form onSubmit={handleSubmit} className="space-y-7">
                {fields?.length > 0 &&
                  fields?.map((field: FormField) => (
                    <div
                      key={field.id}
                      className={`grid ${
                        field.name === "grid"
                          ? "grid-cols-2 gap-5"
                          : "grid-cols-1"
                      }`}
                    >
                      {field.name === "grid" ? (
                        field.fields?.map((subField) => (
                          <RenderField
                            key={subField.id}
                            field={subField}
                            errors={errors}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        ))
                      ) : field.type === "header" ? (
                        <p
                          key={field.id}
                          className="text-md font-bold mt-2 border-t pt-3"
                        >
                          {field.content}
                        </p>
                      ) : (
                        <RenderField
                          key={field.id}
                          field={field}
                          errors={errors}
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                      )}
                    </div>
                  ))}
                <div>{children}</div>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary !mt-6 shadow-none"
                >
                  <IconLoading
                    className={`w-4 h-4 me-3 transition-opacity duration-300 animate-spin  ${
                      isSubmitting ? "opacity-100 inline" : "opacity-0 hidden"
                    }`}
                  />
                  <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

interface PasswordFieldProps {
  field: FormField;
  errors: any;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ field, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div key={field.id} className={`${errors[field.name] && "has-error"}`}>
      <label
        htmlFor={field.name}
        className={field.disabled ? "text-gray-500" : ""}
      >
        {field.label}
      </label>
      <div className="relative">
        <Field
          id={field.name}
          name={field.name}
          type={showPassword ? "text" : "password"}
          placeholder={field.placeholder}
          className={`form-input pr-10 ${field.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed opacity-60" : ""}`}
          disabled={field.disabled}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          disabled={field.disabled}
        >
          {showPassword ? (
            <IconEyeOff className="w-4 h-4" />
          ) : (
            <IconEye className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
    </div>
  );
};

interface RenderFieldProps {
  field: FormField;
  errors: any;
  setFieldValue: any;
  values: any;
}

const RenderField: React.FC<RenderFieldProps> = ({
  field,
  errors,
  setFieldValue,
  values,
}) => {
  switch (field.type) {
    case "select":
      if (!field.ifRender) {
        return (
          <div
            key={field.id}
            className={`${errors[field.name] && "has-error"}`}
          >
            <label
              htmlFor={field.name}
              className={field.disabled ? "text-gray-500" : ""}
            >
              {field.label}
            </label>
            <Field
              name={field.name}
              component={SelectField}
              options={field.options}
              isMulti={field.isMulti}
              hasError={errors[field.name]}
              disabled={field.disabled}
            />
            <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
          </div>
        );
      } else {
        if (values[field.ifRender[0]] === field.ifRender[1]) {
          return (
            <div
              key={field.id}
              className={`${errors[field.name] && "has-error"}`}
            >
              <label
                htmlFor={field.name}
                className={field.disabled ? "text-gray-500" : ""}
              >
                {field.label}
              </label>
              <Field
                name={field.name}
                component={SelectField}
                options={field.options}
                isMulti={field.isMulti}
                hasError={errors[field.name]}
                disabled={field.disabled}
              />

              <div className="text-danger mt-1 text-xs">
                {errors[field.name]}
              </div>
            </div>
          );
        }
        return <></>;
      }

    case "restaurant-select":
      return (
        <div key={field.id}>
          <RestaurantSelect field={field} errors={errors} />
        </div>
      );

    case "dining-select":
      return (
        <DiningSelect
          field={field}
          errors={errors}
          restaurantId={values["restaurant"]}
        />
      );

    case "dining-area-select":
      return (
        <DiningAreaSelect
          field={field}
          errors={errors}
          restaurantId={values["restaurant"]}
        />
      );

    case "switch":
      return (
        <div key={field.id}>
          <label
            htmlFor={field.name}
            className={field.disabled ? "text-gray-500" : ""}
          >
            {field.label}
          </label>
          <label
            className={`relative h-6 w-12 ${field.disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <Field
              type="checkbox"
              className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
              id={field.name}
              name={field.name}
              disabled={field.disabled}
            />
            <span className="outline_checkbox block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary dark:border-white-dark dark:before:bg-white-dark"></span>
          </label>
        </div>
      );

    case "textarea":
      return (
        <div key={field.id} className={`${errors[field.name] && "has-error"}`}>
          <label
            htmlFor={field.name}
            className={field.disabled ? "text-gray-500" : ""}
          >
            {field.label}
          </label>
          <Field
            id={field.name}
            name={field.name}
            as="textarea"
            className={`form-textarea mb-0 ${field.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed opacity-60" : ""}`}
            disabled={field.disabled}
          />
          <div className="text-danger text-xs">{errors[field.name]}</div>
        </div>
      );

    case "file":
      return (
        <div key={field.id}>
          <FilePicker
            name={field.name}
            label={field.label}
            files={values[field.name]}
            setFiles={(v: any) => setFieldValue(field.name, v)}
            hasError={errors[field.name]}
            maxFiles={field.maxFiles}
          />
        </div>
      );

    case "calendar":
      return (
        <div
          key={field.id}
          className={`w-full min-w-full ${errors[field.name] && "has-error"}`}
        >
          <label htmlFor={field.name}>{field.label}</label>
          <Calendar
            name={field.name}
            values={values}
            setFieldValue={setFieldValue}
            hasTime={field?.hasTime}
            hasError={errors[field.name]}
          />
          <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
        </div>
      );
    case "customDateCalendar":
      return (
        <CustomDatesCalendar
          field={field}
          errors={errors}
          values={values}
          setFieldValue={setFieldValue}
        />
      );
    case "password":
      return <PasswordField field={field} errors={errors} />;
    case "number":
      return (
        <div key={field.id} className={`${errors[field.name] && "has-error"}`}>
          <label htmlFor={field.name}>{field.label}</label>
          <Field
            type="number"
            {...field}
            className={`form-input ${field.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed opacity-60" : ""}`}
            disabled={field.disabled}
          />
        </div>
      );
    default:
      // Check if field should be conditionally rendered
      if (field.ifRender) {
        if (values[field.ifRender[0]] === field.ifRender[1]) {
          return (
            <div
              key={field.id}
              className={`${errors[field.name] && "has-error"}`}
            >
              <label
                htmlFor={field.name}
                className={field.disabled ? "text-gray-500" : ""}
              >
                {field.label}
              </label>
              <Field
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className={`form-input ${field.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed opacity-60" : ""}`}
                disabled={field.disabled}
              />
              <div className="text-danger mt-1 text-xs">
                {errors[field.name]}
              </div>
            </div>
          );
        }
        return <></>; // Don't render the field if condition is not met
      }

      // Default rendering for fields without conditional logic
      if (field.type === "password") {
        return <PasswordField field={field} errors={errors} />;
      }

      return (
        <div key={field.id} className={`${errors[field.name] && "has-error"}`}>
          <label
            htmlFor={field.name}
            className={field.disabled ? "text-gray-500" : ""}
          >
            {field.label}
          </label>
          <Field
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            className={`form-input ${field.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed opacity-60" : ""}`}
            disabled={field.disabled}
          />
          <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
        </div>
      );
  }
};

export default FormComponent;
