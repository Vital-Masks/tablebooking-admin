import { Field, Form, Formik } from 'formik';
import { IconPhoto, IconXCircle } from '@/components/Icons';
import IconLoading from '@/components/Icons/IconLoading';
import FilePicker from '../Fields/FilePicker';

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
  content?: string;
  fields?: FormField[];
  options?: [{ value: string; label: string }];
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
    <div className="panel shadow-none">
      {title || closeForm &&
        <div className="mb-5 flex items-start justify-between">
          <h5 className="text-lg font-semibold">{title}</h5>
          <button onClick={() => closeForm()}>
            <IconXCircle />
          </button>
        </div>
      }
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
                    className={`grid ${field.name === 'grid'
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
                    ) : field.type === 'header' ? (
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
                        setFieldValue={setFieldValue}
                      />
                    )}
                  </div>
                ))}

              <button
                type="submit"
                className="btn btn-primary !mt-6 shadow-none"
              >
                <IconLoading
                  className={`w-4 h-4 me-3 transition-opacity duration-300 animate-spin  ${isSubmitting ? 'opacity-100 inline' : 'opacity-0 hidden'
                    }`}
                />
                <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
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
            {field.options
              ? field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
              : options.map((option) => (
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
          <FilePicker />
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
