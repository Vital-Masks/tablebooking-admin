import React, { useEffect, useState } from "react";
import VanillaCalendar from "./VanillaCalendar";

const Calendar = ({ name, values, setFieldValue }: any) => {
  const [selectedDates, setSelectedDates] = useState<any[]>([new Date()]);

  useEffect(() => {
    if (values && values[name] !== selectedDates[0]) {
      setSelectedDates([values[name]]);
    }
  }, [values]);

  return (
    <div>
      <VanillaCalendar
        config={{
          type: "default",
          actions: {
            clickDay(e, self) {
              const newDate = self.selectedDates.at(0);
              if (newDate !== selectedDates[0]) {
                setFieldValue(name, newDate);
              }
            },
          },
          settings: {
            selection: {
              day: "single",
            },
            selected: {
              dates: selectedDates,
              month: new Date(selectedDates[0]).getMonth(),
              year: new Date(selectedDates[0]).getFullYear(),
            },
            visibility: {
              theme: "light",
            },
          },
        }}
        className="border"
      />
    </div>
  );
};

export default Calendar;
