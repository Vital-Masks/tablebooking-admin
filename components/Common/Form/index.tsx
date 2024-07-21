import { Field, Form, Formik } from 'formik';
import { IconPhoto, IconXCircle } from '@/components/Icons';

const options = [
  { value: 'orange', label: 'Orange' },
  { value: 'white', label: 'White' },
  { value: 'purple', label: 'Purple' },
];
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
  closeForm,
}: any) => {
  return (
    <div className="panel">
      <div className="mb-5 flex items-start justify-between">
        <h5 className="text-lg font-semibold dark:text-white-light">{title}</h5>
        {closeForm && (
          <button onClick={() => closeForm()}>
            <IconXCircle />
          </button>
        )}
      </div>
      <div className="mb-5">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
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
              {fields.length > 0 &&
                fields?.map((field: FormField) => (
                  <div
                    key={field.id}
                    className={`grid ${
                      field.name === 'grid'
                        ? 'grid-cols-2 gap-4'
                        : 'grid-cols-1'
                    }`}
                  >
                    {field.name === 'grid' ? (
                      field.fields?.map((subField) => (
                        <RenderField
                          key={subField.id}
                          field={subField}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      ))
                    ) : (
                      <RenderField
                        key={field.id}
                        field={field}
                        errors={errors}
                        setFieldValue={setFieldValue}
                      />
                    )}
                  </div>
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

interface RenderFieldProps {
  field: FormField;
  errors: any;
  setFieldValue: any;
}

const RenderField: React.FC<RenderFieldProps> = ({
  field,
  errors,
  setFieldValue,
}) => {
  switch (field.type) {
    case 'select':
      return (
        <div key={field.id} className={`${errors[field.name] && 'has-error'}`}>
          <label htmlFor={field.name}>{field.label}</label>

          <Field name={field.name} as="select" className="form-input">
            <option key="0">Select</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field>

          <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
        </div>
      );

    case 'switch':
      return (
        <div key={field.id}>
          <label htmlFor={field.name}>{field.label}</label>
          <label className="relative h-6 w-12">
            <Field
              type="checkbox"
              className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
              id={field.name}
              name={field.name}
            />
            <span className="outline_checkbox block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary dark:border-white-dark dark:before:bg-white-dark"></span>
          </label>
        </div>
      );

    case 'textarea':
      return (
        <div key={field.id}>
          <label htmlFor={field.name}>{field.label}</label>
          <Field
            id={field.name}
            name={field.name}
            as="textarea"
            className="form-textarea"
          />
        </div>
      );

    case 'file':
      return (
        <div key={field.id} className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Cover photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <IconPhoto
                aria-hidden="true"
                className="mx-auto h-7 w-7 text-gray-300"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      );

    default:
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
