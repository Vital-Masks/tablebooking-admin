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
    return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
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
  const isInitializingRef = useRef(true);

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

  // Compute the correct selected dates for the calendar based on form values
  const computedSelectedDates = useMemo(() => {
    if (!isClient) return selectedDates;

    console.log("Computing selected dates:", {
      currentDateType,
      currentDateFrom,
      currentDateTo,
      selectedDates
    });

    // If we have form values, use them to compute the selected dates
    if (currentDateFrom) {
      if (currentDateType === "Custom Date") {
        const formattedDate = formatDateForCalendar(currentDateFrom);
        console.log("Custom Date formatted:", formattedDate);
        return formattedDate ? [formattedDate] : [];
      } else {
        // Custom Dates or Custom Days
        const formattedDate = formatDateForCalendar(currentDateFrom);
        console.log("Custom Dates formatted:", formattedDate);
        if (formattedDate) {
          if (currentDateTo) {
            const rangeString = getDateRangeString(currentDateFrom, currentDateTo);
            console.log("Range string:", rangeString);
            return rangeString ? [rangeString] : [formattedDate];
          } else {
            return [formattedDate];
          }
        }
      }
    }

    // Fall back to the state value
    console.log("Falling back to selectedDates:", selectedDates);
    return selectedDates;
  }, [isClient, currentDateType, currentDateFrom, currentDateTo, selectedDates]);

  // Compute the correct month and year based on form values
  const computedSelectedMonth = useMemo(() => {
    if (currentDateFrom) {
      try {
        const dateObj = new Date(currentDateFrom);
        if (!isNaN(dateObj.getTime())) {
          return dateObj.getMonth();
        }
      } catch (error) {
        console.error("Error parsing date for month:", error);
      }
    }
    return selectedMonth;
  }, [currentDateFrom, selectedMonth]);

  const computedSelectedYear = useMemo(() => {
    if (currentDateFrom) {
      try {
        const dateObj = new Date(currentDateFrom);
        if (!isNaN(dateObj.getTime())) {
          return dateObj.getFullYear();
        }
      } catch (error) {
        console.error("Error parsing date for year:", error);
      }
    }
    return selectedYear;
  }, [currentDateFrom, selectedYear]);

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

    // Skip the first render to prevent unnecessary updates during initialization
    if (isInitializingRef.current) {
      isInitializingRef.current = false;
      return;
    }

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

    if (isFormReset) {
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



  // Force calendar update when computed values change
  useEffect(() => {
    if (isClient && computedSelectedDates.length > 0) {
      // Force a re-render by updating the reset counter
      setResetCounter(prev => prev + 1);
    }
  }, [isClient, computedSelectedDates]);

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
    selectedDates: computedSelectedDates,
    selectedMonth: computedSelectedMonth as
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
    selectedYear: computedSelectedYear,
    onClickDate: handleDateClick,
    selectedTheme: "light",
    dateMin:  new Date().toISOString().split('T')[0],
  } as any;

  // Only log when we have meaningful changes, not during initialization
  if (isClient && computedSelectedDates.length > 0) {
    console.log(">>", computedSelectedDates);
    console.log(">>", calendarConfig);
  }
  
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
            key={`calendar-${resetCounter}-${JSON.stringify(computedSelectedDates)}-${computedSelectedMonth}-${computedSelectedYear}`}
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
