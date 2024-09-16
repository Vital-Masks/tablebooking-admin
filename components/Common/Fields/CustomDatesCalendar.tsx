'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import VanillaCalendar from './VanillaCalendar';
import { MultiSelect } from 'primereact/multiselect';
import { Field } from 'formik';

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
      { name: 'Monday', code: 'monday' },
      { name: 'Tuesday', code: 'tuesday' },
      { name: 'Wednesday', code: 'wednesday' },
      { name: 'Thursday', code: 'thursday' },
      { name: 'Friday', code: 'friday' },
      { name: 'Saturday', code: 'saturday' },
      { name: 'Sunday', code: 'sunday' },
    ],
    []
  );

  // Memoized function to avoid infinite update loops
  const renderSelectedDates = useCallback(() => {
    if (values['dateType'] === 'customDate') {
      if (
        selectedDates.length !== 1 ||
        selectedDates[0] !== values['dateFrom']
      ) {
        setSelectedDates([values['dateFrom']]);
      }
    } else {
      const start = new Date(values['dateFrom']);
      const end = new Date(values['dateTo']);
      const dateArray: string[] = [];

      while (start <= end) {
        dateArray.push(start.toISOString().split('T')[0]);
        start.setDate(start.getDate() + 1);
      }

      if (JSON.stringify(dateArray) !== JSON.stringify(selectedDates)) {
        setSelectedDates(dateArray);
      }
    }
  }, [values['dateFrom'], values['dateTo'], values['dateType'], selectedDates]);

  useEffect(() => {
    // Only update 'days' if they are strings (avoid unnecessary updates)
    if (typeof values['days'][0] === 'string') {
      const newArr = values['days']
        .map((day: string) => days.find((x) => x.code === day))
        .filter(Boolean);

      if (JSON.stringify(newArr) !== JSON.stringify(values['days'])) {
        setFieldValue('days', newArr);
      }
    }

    renderSelectedDates(); // Call the memoized function
  }, [values, days, setFieldValue, renderSelectedDates]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor="dateType">Date Type</label>
        <Field
          as="select"
          name="dateType"
          className="form-input"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFieldValue('dateType', e.target.value);
          }}
        >
          <option value="customDate">Custom Date</option>
          <option value="customDates">Custom Dates</option>
          <option value="customDays">Custom Days</option>
        </Field>
      </div>

      {values['dateType'] === 'customDays' && (
        <div>
          <label htmlFor={'dateFrom'}>Date Days</label>
          <MultiSelect
            value={values['days']}
            onChange={(e) => setFieldValue('days', e.value)}
            options={days}
            optionLabel="name"
            display="chip"
            placeholder="Select Days"
            className="w-full form-input max-w-[480px] p-0 outline-none"
          />
        </div>
      )}

      <div>
        <label htmlFor={field.name}>{field.label}</label>
        <VanillaCalendar
          config={{
            type: values['dateType'] === 'customDate' ? 'default' : 'multiple',
            actions: {
              clickDay(e, self) {
                if (values['dateType'] === 'customDate') {
                  setFieldValue('dateFrom', self.selectedDates.at(0));
                } else {
                  setFieldValue('dateFrom', self.selectedDates.at(0));
                  setFieldValue('dateTo', self.selectedDates.at(-1));
                }
              },
            },
            settings: {
              selection: {
                day:
                  values['dateType'] === 'customDate'
                    ? 'single'
                    : 'multiple-ranged',
              },
              selected: {
                dates: selectedDates,
                month: 0,
                year: 2024,
              },
              visibility: {
                theme: 'light',
              },
            },
          }}
          className="border"
        />

        <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
      </div>
    </div>
  );
};

export default CustomDatesCalendar;
