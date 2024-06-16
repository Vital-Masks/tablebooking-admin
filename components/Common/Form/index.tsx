import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface FormField {
  id: string;
  name: string;
  label?: string;
  type?: string;
  fields?: FormField[];
}

const FormComponent = ({
  title,
  fields,
  initialValues,
  validationSchema,
  handleSubmit,
}: any) => {
  const formSchema = Yup.object().shape(validationSchema);

  return (
    <div className="panel">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold dark:text-white-light">{title}</h5>
      </div>
      <div className="mb-5">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={formSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            handleSubmit(values).then(() => {
              actions.setSubmitting(false);
              actions.resetForm();
            });
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
          }) => (
            // warn user when leaving the page without saving
            // {WarnIfUnsaved(Object.keys(touched).some((v) => v !== '') && dirty)}
            <Form onSubmit={handleSubmit} className="space-y-5">
              {fields.map((field: FormField) => (
                <FormGroup key={field.id} field={field} errors={errors} />
              ))}

              <button
                type="submit"
                className="btn btn-primary !mt-6 shadow-none"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

interface FormGroupProps {
  field: FormField;
  errors: any;
}

const FormGroup: React.FC<FormGroupProps> = ({ field, errors }) => {
  return (
    <div
      className={`grid ${
        field.name === 'grid' ? 'grid-cols-2 gap-4' : 'grid-cols-1'
      }`}
    >
      {field.name === 'grid' ? (
        field.fields?.map((subField) => (
          <RenderField key={subField.id} field={subField} errors={errors} />
        ))
      ) : (
        <RenderField key={field.id} field={field} errors={errors} />
      )}
    </div>
  );
};

interface RenderFieldProps {
  field: FormField;
  errors: any;
}

const RenderField: React.FC<RenderFieldProps> = ({ field, errors }) => {
  if (field.type === 'select') {
    return (
      <div key={field.id} className={`${errors[field.name] && 'has-error'}`}>
        <label htmlFor={field.name}>{field.label}</label>
        <Field as="select" name={field.name} className="form-select">
          <option value="">Select</option>
          <option value="One">One</option>
          <option value="Two">Two</option>
          <option value="Three">Three</option>
        </Field>
        <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
      </div>
    );
  } else {
    return (
      <div key={field.id} className={`${errors[field.name] && 'has-error'}`}>
        <label htmlFor={field.name}>{field.label}</label>
        <Field
          id={field.name}
          name={field.name}
          type={field.type}
          placeholder={`Enter ${field.label}`}
          className="form-input"
        />
        <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
      </div>
    );
  }
};

export default FormComponent;
