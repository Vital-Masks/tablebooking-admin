'use client';
import React, { useEffect, useState } from 'react';
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
  const [selectedDates, setSelectedDates] = useState<any>([]);

  const days = [
    { name: 'Monday', code: 'monday' },
    { name: 'Tuesday', code: 'tuesday' },
    { name: 'Wednesday', code: 'wednesday' },
    { name: 'Thursday', code: 'thursday' },
    { name: 'Friday', code: 'friday' },
    { name: 'Saturday', code: 'saturday' },
    { name: 'Sunday', code: 'sunday' },
  ];

  const renderSelectedDates = () => {
    if (values['dateType'] === 'Custom Date') {
      setSelectedDates([values['dateFrom']]);
    } else {
      const start = new Date(values['dateFrom']);
      const end = new Date(values['dateTo']);
      const dateArray = [];

      while (start <= end) {
        dateArray.push(start.toISOString().split('T')[0]);
        start.setDate(start.getDate() + 1);
      }

      setSelectedDates(dateArray);
    }
  };

  useEffect(() => {
    if (typeof values['days'][0] === 'string') {
      const newArr:any = [];
      values['days'].map((day: any) => {
        newArr.push(days.find((x) => x.code === day));
      });
      setFieldValue('days', newArr);
    }
    renderSelectedDates();
  }, [values]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor="dateType">Date Type</label>
        <Field
          as="select"
          name="dateType"
          className="form-input"
          onChange={(e: any) => {
            setFieldValue('dateType', e.target.value);
          }}
        >
          <option value="customDate">Custom Date</option>
          <option value="customDates">Custom Dates</option>
          <option value="customDays">Custom Days</option>
        </Field>
      </div>

      {values['dateType'] === 'customDays' && (
        <div className="">
          <label htmlFor={'dateFrom'}>Date Days</label>
          <MultiSelect
            value={values['days']}
            onChange={(e) => setFieldValue('days', e.value)}
            options={days}
            optionLabel="name"
            display="chip"
            placeholder="Select Days"
            // maxSelectedLabels={3}
            className="w-full form-input max-w-[480px] p-0 outline-none"
          />
        </div>
      )}

      <div>
        <label htmlFor={field.name}>{field.label}</label>
        <Field
          name="dateFrom"
          component={() => (
            <VanillaCalendar
              config={{
                type:
                  values['dateType'] === 'customDate' ? 'default' : 'multiple',
                actions: {
                  clickDay(e, self) {
                    values['dateType'] === 'customDate'
                      ? setFieldValue('dateFrom', self.selectedDates.at(0))
                      : setFieldValue('dateFrom', self.selectedDates.at(0)),
                      setFieldValue('dateTo', self.selectedDates.at(-1));
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
          )}
        />

        <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
      </div>
    </div>
  );
};

export default CustomDatesCalendar;
