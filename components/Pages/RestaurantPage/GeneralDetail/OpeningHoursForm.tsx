"use client";

import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateRestaurantGeneral } from "@/lib/actions/restaurant.actions";

interface OpeningHours {
  weekdays: {
    openTime: string;
    closeTime: string;
  };
  weekends: {
    openTime: string;
    closeTime: string;
  };
  customDays: {
    [key: string]: {
      enabled: boolean;
      openTime: string;
      closeTime: string;
    };
  };
}

interface OpeningTimeData {
  day: string;
  openTime: string;
  closeTime: string;
  _id?: string;
}

const weekDays = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const validationSchema = Yup.object().shape({
  weekdays: Yup.object().shape({
    openTime: Yup.string().required("Opening time is required"),
    closeTime: Yup.string().required("Closing time is required"),
  }),
  weekends: Yup.object().shape({
    openTime: Yup.string().required("Opening time is required"),
    closeTime: Yup.string().required("Closing time is required"),
  }),
  customDays: Yup.object().test(
    "custom-days-validation",
    "At least one custom day must be enabled",
    function (value) {
      if (!value) return true;
      const hasEnabledDay = Object.values(value).some(
        (day: any) => day.enabled
      );
      if (!hasEnabledDay) return true; // Allow if no custom days are enabled

      // Validate enabled custom days
      for (const [dayName, dayData] of Object.entries(value)) {
        if ((dayData as any).enabled) {
          if (!(dayData as any).openTime) {
            return this.createError({
              path: `customDays.${dayName}.openTime`,
              message: "Opening time is required for enabled custom days",
            });
          }
          if (!(dayData as any).closeTime) {
            return this.createError({
              path: `customDays.${dayName}.closeTime`,
              message: "Closing time is required for enabled custom days",
            });
          }
        }
      }
      return true;
    }
  ),
});

const initialValues: OpeningHours = {
  weekdays: {
    openTime: "",
    closeTime: "",
  },
  weekends: {
    openTime: "",
    closeTime: "",
  },
  customDays: weekDays.reduce((acc, day) => {
    acc[day.value] = {
      enabled: false,
      openTime: "",
      closeTime: "",
    };
    return acc;
  }, {} as any),
};

// Function to transform API data to form values
const transformApiDataToFormValues = (
  openingTimes: OpeningTimeData[]
): OpeningHours => {
  const formValues = { ...initialValues };

  if (!openingTimes || openingTimes.length === 0) {
    return formValues;
  }

  console.log("Transforming opening times:", openingTimes);

  // Create a map of the API data for easy lookup
  const apiDataMap = new Map();
  openingTimes.forEach((item) => {
    apiDataMap.set(item.day.toLowerCase(), {
      openTime: item.openTime.replace(".", ":"),
      closeTime: item.closeTime.replace(".", ":"),
    });
  });

  console.log("API data map:", apiDataMap);

  // Determine default weekday and weekend times
  const weekdaysList = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const weekendsList = ["saturday", "sunday"];

  // Find the most common weekday time by counting occurrences
  const weekdayTimes = weekdaysList
    .map((day) => apiDataMap.get(day))
    .filter(Boolean);
  console.log("Weekday times:", weekdayTimes);

  // Count occurrences of each weekday time
  const weekdayTimeCounts = new Map();
  weekdayTimes.forEach((time) => {
    const key = `${time.openTime}-${time.closeTime}`;
    weekdayTimeCounts.set(key, (weekdayTimeCounts.get(key) || 0) + 1);
  });

  // Find the most common weekday time
  let mostCommonWeekday = { openTime: "", closeTime: "" };
  let maxCount = 0;
  weekdayTimeCounts.forEach((count, key) => {
    if (count > maxCount) {
      maxCount = count;
      const [openTime, closeTime] = key.split("-");
      mostCommonWeekday = { openTime, closeTime };
    }
  });

  // Find the most common weekend time by counting occurrences
  const weekendTimes = weekendsList
    .map((day) => apiDataMap.get(day))
    .filter(Boolean);
  console.log("Weekend times:", weekendTimes);

  // Count occurrences of each weekend time
  const weekendTimeCounts = new Map();
  weekendTimes.forEach((time) => {
    const key = `${time.openTime}-${time.closeTime}`;
    weekendTimeCounts.set(key, (weekendTimeCounts.get(key) || 0) + 1);
  });

  // Find the most common weekend time
  let mostCommonWeekend = { openTime: "", closeTime: "" };
  maxCount = 0;
  weekendTimeCounts.forEach((count, key) => {
    if (count > maxCount) {
      maxCount = count;
      const [openTime, closeTime] = key.split("-");
      mostCommonWeekend = { openTime, closeTime };
    }
  });

  console.log("Most common weekday:", mostCommonWeekday);
  console.log("Most common weekend:", mostCommonWeekend);

  // Set default weekday and weekend times
  formValues.weekdays = mostCommonWeekday;
  formValues.weekends = mostCommonWeekend;

  // Set custom days for days that differ from the defaults
  weekDays.forEach((day) => {
    const dayKey = day.value;
    const apiData = apiDataMap.get(dayKey);

    if (apiData) {
      const isWeekday = weekdaysList.includes(dayKey);
      const isWeekend = weekendsList.includes(dayKey);

      if (isWeekday) {
        // Check if this weekday differs from the most common weekday time
        if (
          apiData.openTime !== mostCommonWeekday.openTime ||
          apiData.closeTime !== mostCommonWeekday.closeTime
        ) {
          formValues.customDays[dayKey] = {
            enabled: true,
            openTime: apiData.openTime,
            closeTime: apiData.closeTime,
          };
        }
      } else if (isWeekend) {
        // Check if this weekend differs from the most common weekend time
        if (
          apiData.openTime !== mostCommonWeekend.openTime ||
          apiData.closeTime !== mostCommonWeekend.closeTime
        ) {
          formValues.customDays[dayKey] = {
            enabled: true,
            openTime: apiData.openTime,
            closeTime: apiData.closeTime,
          };
        }
      }
    }
  });

  console.log("Final form values:", formValues);
  return formValues;
};

const OpeningHoursForm = ({ params, openingTimes }: any) => {
  const { restaurantId } = params;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formValues, setFormValues] = useState<OpeningHours>(initialValues);

  // Transform openingTimes to form values when component mounts or openingTimes changes
  useEffect(() => {
    if (openingTimes) {
      const transformedValues = transformApiDataToFormValues(openingTimes);
      setFormValues(transformedValues);
    }
  }, [openingTimes]);

  console.log("Opening times:", openingTimes);
  console.log("Form values:", formValues);

  const handleSubmit = async (values: OpeningHours) => {
    setIsSubmitting(true);
    try {
      // Transform the form data into the required format
      const openingTimes: Array<{
        day: string;
        openTime: string;
        closeTime: string;
      }> = [];

      // Create a map of custom days for easy lookup
      const customDaysMap = new Map();
      Object.entries(values.customDays).forEach(([dayKey, dayData]) => {
        if (dayData.enabled) {
          const dayName = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);
          customDaysMap.set(dayName, {
            openTime: dayData.openTime.replace(":", "."),
            closeTime: dayData.closeTime.replace(":", "."),
          });
        }
      });

      // Add weekdays (Monday - Friday) - use custom times if available
      const weekdaysList = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ];
      weekdaysList.forEach((day) => {
        const customDay = customDaysMap.get(day);
        if (customDay) {
          // Use custom time for this day
          openingTimes.push({
            day,
            openTime: customDay.openTime,
            closeTime: customDay.closeTime,
          });
        } else {
          // Use default weekday time
          openingTimes.push({
            day,
            openTime: values.weekdays.openTime.replace(":", "."),
            closeTime: values.weekdays.closeTime.replace(":", "."),
          });
        }
      });

      // Add weekends (Saturday - Sunday) - use custom times if available
      const weekendsList = ["Saturday", "Sunday"];
      weekendsList.forEach((day) => {
        const customDay = customDaysMap.get(day);
        if (customDay) {
          // Use custom time for this day
          openingTimes.push({
            day,
            openTime: customDay.openTime,
            closeTime: customDay.closeTime,
          });
        } else {
          // Use default weekend time
          openingTimes.push({
            day,
            openTime: values.weekends.openTime.replace(":", "."),
            closeTime: values.weekends.closeTime.replace(":", "."),
          });
        }
      });

      const body = {
        openingTimes,
      };

      await updateRestaurantGeneral(restaurantId, body);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving opening hours:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-r-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Opening Hours</h1>
        <p className="text-gray-600 mt-1">
          Configure your restaurant&apos;s opening hours for weekdays, weekends,
          and custom days.
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-md flex items-center">
          <svg
            className="w-5 h-5 text-green-600 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-green-800 font-medium">
            Opening hours saved successfully!
          </span>
        </div>
      )}

      {/* Form */}
      <div className="p-6">
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="space-y-8">
              {/* Weekdays Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Weekdays (Monday - Friday)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Time
                    </label>
                    <Field
                      type="time"
                      name="weekdays.openTime"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.weekdays?.openTime && touched.weekdays?.openTime
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="weekdays.openTime"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Time
                    </label>
                    <Field
                      type="time"
                      name="weekdays.closeTime"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.weekdays?.closeTime &&
                        touched.weekdays?.closeTime
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="weekdays.closeTime"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Weekends Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Weekends (Saturday - Sunday)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Time
                    </label>
                    <Field
                      type="time"
                      name="weekends.openTime"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.weekends?.openTime && touched.weekends?.openTime
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="weekends.openTime"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Time
                    </label>
                    <Field
                      type="time"
                      name="weekends.closeTime"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.weekends?.closeTime &&
                        touched.weekends?.closeTime
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                    />
                    <ErrorMessage
                      name="weekends.closeTime"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Custom Days Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Custom Days
                </h2>
                <p className="text-gray-600 mb-6">
                  Select specific days and set custom opening hours. Leave
                  unchecked to use default weekday/weekend times.
                </p>

                <div className="space-y-4">
                  {weekDays.map((day) => (
                    <div
                      key={day.value}
                      className={`p-4 border rounded-lg transition-all ${
                        values.customDays[day.value].enabled
                          ? "border-blue-300 bg-blue-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`custom-${day.value}`}
                            checked={values.customDays[day.value].enabled}
                            onChange={(e) => {
                              setFieldValue(
                                `customDays.${day.value}.enabled`,
                                e.target.checked
                              );
                              if (!e.target.checked) {
                                // Reset times when unchecked
                                setFieldValue(
                                  `customDays.${day.value}.openTime`,
                                  ""
                                );
                                setFieldValue(
                                  `customDays.${day.value}.closeTime`,
                                  ""
                                );
                              }
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`custom-${day.value}`}
                            className="ml-3 text-sm font-medium text-gray-900"
                          >
                            {day.label}
                          </label>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            values.customDays[day.value].enabled
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {values.customDays[day.value].enabled
                            ? "Custom"
                            : "Default"}
                        </span>
                      </div>

                      {values.customDays[day.value].enabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Opening Time
                            </label>
                            <Field
                              type="time"
                              name={`customDays.${day.value}.openTime`}
                              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.customDays?.[day.value]?.openTime &&
                                touched.customDays?.[day.value]?.openTime
                                  ? "border-red-300"
                                  : "border-gray-300"
                              }`}
                            />
                            <ErrorMessage
                              name={`customDays.${day.value}.openTime`}
                              component="div"
                              className="text-red-600 text-sm mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Closing Time
                            </label>
                            <Field
                              type="time"
                              name={`customDays.${day.value}.closeTime`}
                              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.customDays?.[day.value]?.closeTime &&
                                touched.customDays?.[day.value]?.closeTime
                                  ? "border-red-300"
                                  : "border-gray-300"
                              }`}
                            />
                            <ErrorMessage
                              name={`customDays.${day.value}.closeTime`}
                              component="div"
                              className="text-red-600 text-sm mt-1"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Opening Hours"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OpeningHoursForm;
