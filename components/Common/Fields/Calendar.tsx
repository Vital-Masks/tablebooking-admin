import React, { useEffect, useState } from "react";
import VanillaCalendar from "./VanillaCalendar";
import moment from "moment";

const Calendar = ({ name, values, setFieldValue, hasTime, hasError }: any) => {
  const [selectedDates, setSelectedDates] = useState<any[]>([new Date()]);
  const [selectedMonth, setSelectedMonth] = useState<any>([
    new Date().getMonth(),
  ]);
  const [selectedYear, setSelectedYear] = useState<any>([
    new Date().getFullYear(),
  ]);
  const [selectedTime, setSelectedTime] = useState<string>(
    moment().format("hh:mm A")
  );

  useEffect(() => {
    if (
      values &&
      moment(values[name], "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid()
    ) {
      setSelectedDates([moment(values[name]).format("YYYY-MM-DD")]);
      setSelectedMonth([moment(values[name]).get("month")]);
      setSelectedYear([moment(values[name]).get("year")]);
      setSelectedTime(moment(values[name]).format("HH:mm A"));
    } else {
      if (values && values[name] !== selectedDates[0]) {
        setSelectedDates([values[name]]);
        setSelectedMonth([new Date(values[name]).getMonth()]);
        setSelectedYear([new Date(values[name]).getFullYear()]);
      }
    }
  }, [values]);

  return (
    <div className="min-w-full w-full">
      <VanillaCalendar
        config={{
          type: "default",
          selectedDates: selectedDates,
          selectedMonth: selectedMonth,
          selectedYear: selectedYear,
          selectedTime: selectedTime,
          selectionTimeMode: 12,
          onClickDate(self) {
            const newDate = self.context.selectedDates;
            if (newDate[0] !== selectedDates[0]) {
              setFieldValue(name, newDate[0]);
            }
          },
          onChangeTime(self) {
            console.log("self >>", selectedDates[0]);
            console.log("self >>", self.context.selectedTime);
            const convertedDateTime = moment(
              selectedDates[0] + " " + self.context.selectedTime
            ).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
            setFieldValue(name, convertedDateTime);
          },
          selectedTheme: 'light',
        }}
        className={`w-full mx-auto border !min-w-full ${hasError ? "border-red-500" : ""} `}
      />
    </div>
  );
};

export default Calendar;
