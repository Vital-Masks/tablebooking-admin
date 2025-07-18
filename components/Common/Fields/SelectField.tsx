'use client';

import { FieldProps } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";

interface Option {
  label: string;
  value: string;
}
interface CustomSelectProps extends FieldProps {
  options: Option[];
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
}

export const SelectField = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
  hasError = false,
  disabled = false
}: CustomSelectProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onChange = (option: Option | Option[]) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? Array.isArray(option)
          ? option.map((item: Option) => item.value)
          : []
        : (option as Option).value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value?.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };

  if (!isMounted) {
    return (
      <div className={`${className || ''} ${hasError ? '!border-red-500 !bg-red-50' : '!border-white-light'} border rounded-md p-2 min-h-[38px] flex items-center`}>
        <span className="text-gray-400">{placeholder || 'Loading...'}</span>
      </div>
    );
  }

  return (
    <Select
      instanceId={field.name}
      className={className}
      name={field.name}
      value={getValue()}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      isDisabled={disabled}
      classNames={{
        control: (state) =>
          state.isFocused
            ? "!border-primary !ring-transparent" :
            hasError ? "!border-red-500 !bg-red-50" :
             "!border-white-light",
        placeholder: (state) => hasError ? '!text-red-400' : ''
          
      }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          boxShadow: "0 !important",
        })
      }}
    />
  );
};

export default SelectField;
