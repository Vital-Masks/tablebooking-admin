"use client";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import VanillaCalendar from "./VanillaCalendar";
import { Field } from "formik";
import SelectField from "./SelectField";

// ============================================================================
// TYPES
// ============================================================================

interface Props {
  field: {
    name: string;
    label?: string;
  };
  errors: Record<string, string>;
  setFieldValue: (field: string, value: any) => void;
  values: Record<string, any>;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DATE_TYPE_OPTIONS = [
  { label: "Custom Date", value: "Custom Date" },
  { label: "Custom Dates", value: "Custom Dates" },
  { label: "Custom Days", value: "Custom Days" },
] as const;

const DAYS_OPTIONS = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
] as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatDateForCalendar = (date: Date | string): string => {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "";
    return dateObj.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

const getDateRangeString = (startDate: string, endDate: string): string => {
  try {
    const start = formatDateForCalendar(startDate);
    const end = formatDateForCalendar(endDate);
    if (!start || !end) return "";
    return `${start}:${end}`;
  } catch (error) {
    console.error("Error creating date range string:", error);
    return "";
  }
};

// ============================================================================
// COMPONENT
// ============================================================================

const CustomDatesCalendar: React.FC<Props> = ({
  field,
  errors,
  values,
  setFieldValue,
}) => {
  // ============================================================================
  // STATE
  // ============================================================================

  const [isClient, setIsClient] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  // ============================================================================
  // REFS
  // ============================================================================

  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastValuesRef = useRef<Record<string, any>>({});
  const setFieldValueRef = useRef(setFieldValue);

  // Update the ref when setFieldValue changes
  useEffect(() => {
    setFieldValueRef.current = setFieldValue;
  }, [setFieldValue]);

  // ============================================================================
  // MEMOIZED VALUES
  // ============================================================================

  const days = useMemo(() => DAYS_OPTIONS, []);

  const currentDateType = values.dateType || "Custom Date";
  const currentDateFrom = values.dateFrom;
  const currentDateTo = values.dateTo;

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    setSelectedDates([formatDateForCalendar(today)]);
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
  }, []);

  // Handle date type and date changes
  useEffect(() => {
    if (!isClient || isUpdating) return;

    // Check if values have actually changed to prevent infinite loops
    const currentValues = {
      dateType: currentDateType,
      dateFrom: currentDateFrom,
      dateTo: currentDateTo,
    };
    const lastValues = lastValuesRef.current;

    const hasChanged =
      lastValues.dateType !== currentValues.dateType ||
      lastValues.dateFrom !== currentValues.dateFrom ||
      lastValues.dateTo !== currentValues.dateTo;

    if (!hasChanged) return;

    // Update last values immediately to prevent duplicate processing
    lastValuesRef.current = currentValues;

    // Check if this is a form reset (all values are empty/undefined)
    const isFormReset = (!currentDateFrom || currentDateFrom === '' || currentDateFrom === null || currentDateFrom === undefined) && 
                       (!currentDateTo || currentDateTo === '' || currentDateTo === null || currentDateTo === undefined);
    console.log(">> reset detection:", { currentDateFrom, currentDateTo, isFormReset });
    if (isFormReset) {
      console.log(">> form reset detected, incrementing counter");
      setResetCounter(prev => prev + 1);
      // Immediately clear selected dates when form is reset
      setSelectedDates([]);
      return; // Skip the rest of the update logic
    }

    // Clear any pending updates
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Debounce the update to prevent rapid state changes
    updateTimeoutRef.current = setTimeout(() => {
      try {
        setIsUpdating(true);

        if (currentDateType === "Custom Date") {
          const formattedDate = formatDateForCalendar(currentDateFrom);
          if (formattedDate) {
            setSelectedDates([formattedDate]);
            const dateObj = new Date(currentDateFrom);
            setSelectedMonth(dateObj.getMonth());
            setSelectedYear(dateObj.getFullYear());
          } else {
            // Clear selections if no valid date
            console.log(">> clearing selections for Custom Date");
            setSelectedDates([]);
          }
        } else {
          // Custom Dates or Custom Days
          const formattedDate = formatDateForCalendar(currentDateFrom);
          if (formattedDate) {
            if (currentDateTo) {
              const rangeString = getDateRangeString(
                currentDateFrom,
                currentDateTo
              );
              setSelectedDates(rangeString ? [rangeString] : [formattedDate]);
            } else {
              setSelectedDates([formattedDate]);
            }

            const dateObj = new Date(currentDateFrom);
            setSelectedMonth(dateObj.getMonth());
            setSelectedYear(dateObj.getFullYear());
          } else {
            // Clear selections if no valid date
            console.log(">> clearing selections for Custom Dates/Days");
            setSelectedDates([]);
          }
        }
      } catch (error) {
        console.error("Error updating calendar dates:", error);
      } finally {
        setIsUpdating(false);
      }
    }, 100);

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [isClient, isUpdating, currentDateType, currentDateFrom, currentDateTo]);

  // Separate effect to handle form resets
  useEffect(() => {
    if (!isClient) return;
    
    // Check if form values are empty (form reset)
    const isFormReset = (!currentDateFrom || currentDateFrom === '' || currentDateFrom === null || currentDateFrom === undefined) && 
                       (!currentDateTo || currentDateTo === '' || currentDateTo === null || currentDateTo === undefined);
    
    if (isFormReset && selectedDates.length > 0) {
      console.log(">> form reset detected in separate effect, clearing selectedDates");
      setSelectedDates([]);
      setResetCounter(prev => prev + 1);
    }
  }, [isClient, currentDateFrom, currentDateTo, selectedDates.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      // Clear all selections on unmount
      setSelectedDates([]);
      setSelectedMonth(0);
      setSelectedYear(new Date().getFullYear());
    };
  }, []);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleDateClick = useCallback(
    (self: any) => {
      try {
        if (!self?.context?.selectedDates) return;

        const selectedDates = self.context.selectedDates;

        if (currentDateType === "Custom Date") {
          const newDate = selectedDates[0];
          if (newDate) {
            setFieldValueRef.current("dateFrom", newDate);
          }
        } else {
          // Custom Dates or Custom Days
          const startDate = selectedDates[0];
          const endDate = selectedDates[1];

          if (startDate) {
            setFieldValueRef.current("dateFrom", startDate);
          }

          if (endDate) {
            setFieldValueRef.current("dateTo", endDate);
          }
        }
      } catch (error) {
        console.error("Error handling date click:", error);
      }
    },
    [currentDateType]
  );

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!isClient) {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="dateType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date Type
          </label>
          <div className="w-full p-4 text-gray-500 border border-gray-300 rounded bg-gray-50">
            Loading calendar...
          </div>
        </div>
      </div>
    );
  }

  const calendarConfig = {
    type: currentDateType === "Custom Date" ? "default" : "multiple",
    selectionDatesMode:
      currentDateType === "Custom Date" ? "single" : "multiple-ranged",
    selectedDates,
    selectedMonth: selectedMonth as
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11,
    selectedYear,
    onClickDate: handleDateClick,
    selectedTheme: "light",
    dateMin:  new Date().toISOString().split('T')[0],
  } as any;

  console.log(">> calendar config:", { selectedDates, resetCounter, currentDateFrom, currentDateTo });

  return (
    <div className="flex flex-col gap-5">
      {/* Date Type Selection */}
      <div>
        <label
          htmlFor="dateType"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Date Type
        </label>
        <Field
          name="dateType"
          component={SelectField}
          options={DATE_TYPE_OPTIONS}
        />
      </div>

      {/* Days Selection for Custom Days */}
      {currentDateType === "Custom Days" && (
        <div className={`${errors.days ? "has-error" : ""}`}>
          <label
            htmlFor="days"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Days
          </label>
          <Field
            id="days"
            name="days"
            component={SelectField}
            options={days}
            isMulti={true}
            hasError={errors.days}
          />
          {errors.days && (
            <div className="text-red-500 mt-1 text-xs">{errors.days}</div>
          )}
        </div>
      )}

      {/* Calendar Component */}
      <div className="w-full">
        <label
          htmlFor={field.name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {field.label || field.name}
        </label>

        <div
          className={`relative ${isUpdating ? "opacity-50 pointer-events-none" : ""}`}
        >
          <VanillaCalendar
            key={`calendar-${resetCounter}`}
            config={calendarConfig}
            className={`w-full mx-auto border !min-w-full ${
              errors[field.name] ? "border-red-500" : "border-gray-300"
            } z-[0]`}
          />

          {isUpdating && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
              <div className="text-sm text-gray-500">Updating...</div>
            </div>
          )}
        </div>

        {errors[field.name] && (
          <div className="text-red-500 mt-1 text-xs">{errors[field.name]}</div>
        )}
      </div>
    </div>
  );
};

export default CustomDatesCalendar;
