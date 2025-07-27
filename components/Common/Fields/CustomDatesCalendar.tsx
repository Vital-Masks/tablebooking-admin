"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import VanillaCalendar from "./VanillaCalendar";
import { Field } from "formik";
import SelectField from "./SelectField";

type Props = {
  field: any;
  errors: any;
  setFieldValue: any;
  values: any;
};

const CustomDatesCalendar = ({
  field,
  errors,
  values,
  setFieldValue,
}: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedDates, setSelectedDates] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<any>([]);
  const [selectedYear, setSelectedYear] = useState<any>([]);

  // Memoize the days array to avoid unnecessary re-creation on every render
  const days = useMemo(
    () => [
      { label: "Monday", value: "Monday" },
      { label: "Tuesday", value: "Tuesday" },
      { label: "Wednesday", value: "Wednesday" },
      { label: "Thursday", value: "Thursday" },
      { label: "Friday", value: "Friday" },
      { label: "Saturday", value: "Saturday" },
      { label: "Sunday", value: "Sunday" },
    ],
    []
  );

  useEffect(() => {
    setIsClient(true);
    setSelectedDates([new Date()]);
    setSelectedMonth([new Date().getMonth()]);
    setSelectedYear([new Date().getFullYear()]);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    if (values["dateType"] === "Custom Date") {
      setSelectedDates([values["dateFrom"]]);
      setSelectedMonth([new Date(values["dateFrom"]).getMonth()]);
      setSelectedYear([new Date(values["dateFrom"]).getFullYear()]);
    } else {
      setSelectedDates([values["dateFrom"]]);
      setSelectedMonth([new Date(values["dateFrom"]).getMonth()]);
      setSelectedYear([new Date(values["dateFrom"]).getFullYear()]);
      if (values["dateTo"]) {
        setSelectedDates([`${values["dateFrom"]}:${values["dateTo"]}`]);
      }
    }
  }, [values, isClient]);

  if (!isClient) {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="dateType">Date Type</label>
          <div className="w-full p-4 text-gray-500 border border-gray-300 rounded">
            Loading calendar...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor="dateType">Date Type</label>
        <Field
          name="dateType"
          component={SelectField}
          options={[
            { label: "Custom Date", value: "Custom Date" },
            { label: "Custom Dates", value: "Custom Dates" },
            { label: "Custom Days", value: "Custom Days" },
          ]}
        ></Field>
      </div>

      {values["dateType"] === "Custom Days" && (
        <div className={`${errors["days"] && "has-error"}`}>
          <label htmlFor={"days"}>Days</label>
          <Field
            id={"days"}
            name={"days"}
            component={SelectField}
            options={days}
            isMulti={true}
            hasError={errors["days"]}
          />
          <div className="text-danger mt-1 text-xs">{errors["days"]}</div>
        </div>
      )}

      <div className="w-full">
        <label htmlFor={field.name}>{field.label}</label>

        <VanillaCalendar
          config={{
            type: values["dateType"] === "Custom Date" ? "default" : "multiple",
            selectionDatesMode:
              values["dateType"] === "Custom Date"
                ? "single"
                : "multiple-ranged",
            selectedDates: selectedDates,
            selectedMonth: selectedMonth,
            selectedYear: selectedYear,
            onClickDate(self) {
              if (values["dateType"] === "Custom Date") {
                const newDate = self.context.selectedDates;
                setFieldValue("dateFrom", newDate[0]);
              } else {
                setFieldValue("dateFrom", self.context.selectedDates[0]);
                if (self.context.selectedDates[1]) {
                  setFieldValue("dateTo", self.context.selectedDates[1]);
                }
              }
            },
            selectedTheme: 'light',
          }}
          className={`w-full mx-auto border !min-w-full ${errors[field.name] ? "border-red-500" : "border-gray-300"}`}
        />

        <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
      </div>
    </div>
  );
};

export default CustomDatesCalendar;
