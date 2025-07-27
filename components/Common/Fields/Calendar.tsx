import React, { useEffect, useState } from 'react';
import VanillaCalendar from './VanillaCalendar';
import moment from 'moment';

const Calendar = ({ name, values, setFieldValue, hasTime, hasError }: any) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedDates, setSelectedDates] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<any>([]);
  const [selectedYear, setSelectedYear] = useState<any>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');

  useEffect(() => {
    setIsClient(true);
    setSelectedDates([new Date()]);
    setSelectedMonth([new Date().getMonth()]);
    setSelectedYear([new Date().getFullYear()]);
    setSelectedTime(moment().format('hh:mm A'));
  }, []);

  useEffect(() => {
    if (!isClient || !values || !values[name]) return;
    
    const currentValue = values[name];
    const formattedCurrentDate = moment(currentValue).format('YYYY-MM-DD');
    const currentSelectedDate = selectedDates[0];
    
    // Only update if the values have actually changed
    if (moment(currentValue, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true).isValid()) {
      if (formattedCurrentDate !== currentSelectedDate) {
        setSelectedDates([formattedCurrentDate]);
        setSelectedMonth([moment(currentValue).get('month')]); 
        setSelectedYear([moment(currentValue).get('year')]);
        setSelectedTime(moment(currentValue).format('HH:mm A'));
      }
    } else if (currentValue !== currentSelectedDate) {
      setSelectedDates([currentValue]);
      setSelectedMonth([new Date(currentValue).getMonth()]);
      setSelectedYear([new Date(currentValue).getFullYear()]);
    }
  }, [values, name, isClient]);

  if (!isClient) {
    return (
      <div className="min-w-full w-full border rounded-lg">
        <div className="w-full mx-auto border !min-w-full p-4 text-gray-500">
          Loading calendar...
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-full w-full border rounded-lg">
      <VanillaCalendar
        config={{
          type: 'default',
          selectedDates: selectedDates,
          selectedMonth: selectedMonth,
          selectedYear: selectedYear,
          selectedTime: selectedTime,
          onClickDate(self) {
            const newDate = self.context.selectedDates;
            if (newDate[0] !== selectedDates[0]) {
              setFieldValue(name, newDate[0]);
            }
          },
          onChangeTime(self) {
            const convertedDateTime = moment(
              selectedDates[0] + ' ' + self.context.selectedTime
            ).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
            setFieldValue(name, convertedDateTime);
          },
          selectedTheme: 'light',
        }}
        className={`w-full mx-auto border !min-w-full ${hasError ? 'border-red-500' : ''} `}
      />
    </div>
  );
};

export default Calendar;
