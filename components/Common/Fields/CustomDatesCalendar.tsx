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
  const [selectedDates, setSelectedDates] = useState<any[]>([]);

  // Memoize the days array to avoid unnecessary re-creation on every render
  const days = useMemo(
    () => [
      { label: "Monday", value: "monday" },
      { label: "Tuesday", value: "tuesday" },
      { label: "Wednesday", value: "wednesday" },
      { label: "Thursday", value: "thursday" },
      { label: "Friday", value: "friday" },
      { label: "Saturday", value: "saturday" },
      { label: "Sunday", value: "sunday" },
    ],
    []
  );

  // Memoized function to avoid infinite update loops
  const renderSelectedDates = useCallback(() => {
    if (values["dateType"] === "customDate") {
      if (
        selectedDates.length !== 1 ||
        selectedDates[0] !== values["dateFrom"]
      ) {
        setSelectedDates([values["dateFrom"]]);
      }
    } else {
      const start = new Date(values["dateFrom"]);
      const end = new Date(values["dateTo"]);
      const dateArray: string[] = [];

      while (start <= end) {
        dateArray.push(start.toISOString().split("T")[0]);
        start.setDate(start.getDate() + 1);
      }

      if (JSON.stringify(dateArray) !== JSON.stringify(selectedDates)) {
        setSelectedDates(dateArray);
      }
    }
  }, [values["dateFrom"], values["dateTo"], values["dateType"], selectedDates]);

  useEffect(() => {
    renderSelectedDates(); // Call the memoized function
  }, [values, days, setFieldValue, renderSelectedDates]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor="dateType">Date Type</label>
        <Field
          name="dateType"
          component={SelectField}
          options={[
            { label: "Custom Date", value: "customDate" },
            { label: "Custom Dates", value: "customDates" },
            { label: "Custom Days", value: "customDays" },
          ]}
        ></Field>
      </div>

      {values["dateType"] === "customDays" && (
        <div>
          <label htmlFor={"dateFrom"}>Date Days</label>
          <Field
            name="days"
            component={SelectField}
            options={days}
            isMulti={true}
          ></Field>
        </div>
      )}

      <div className="w-full">
        <label htmlFor={field.name}>{field.label}</label>

        <VanillaCalendar
          config={{
            type: values["dateType"] === "customDate" ? "default" : "multiple",
            actions: {
              clickDay(e, self) {
                if (values["dateType"] === "customDate") {
                  setFieldValue("dateFrom", self.selectedDates.at(0));
                } else {
                  setFieldValue("dateFrom", self.selectedDates.at(0));
                  setFieldValue("dateTo", self.selectedDates.at(-1));
                }
              },
            },
            settings: {
              selection: {
                day:
                  values["dateType"] === "customDate"
                    ? "single"
                    : "multiple-ranged",
              },
              selected: {
                dates: selectedDates,
                month: 0,
                year: 2024,
              },
              visibility: {
                theme: "light",
              },
            },
          }}
          className={`w-full mx-auto border !min-w-full ${errors[field.name] ? 'border-red-500' : ''}`}
        />

        <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
      </div>
    </div>
  );
};

export default CustomDatesCalendar;
