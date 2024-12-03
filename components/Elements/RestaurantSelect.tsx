"use client";

import { getRestaurantsList } from "@/lib/actions/restaurant.actions";
import { Field } from "formik";
import { useEffect, useState } from "react";

// Define the interface for restaurant options
interface RestaurantOption {
  value: string;
  label: string;
}

const RestaurantSelect = ({ field, errors }: any) => {
  const [state, setState] = useState<RestaurantOption[]>([]);

  useEffect(() => {
    async function fetchData() {
      const results = await getRestaurantsList();
      if (results && results.length > 0) {
        setState(
          results.map((res: any) => ({
            value: res._id,
            label: res.restaurantName,
          }))
        );
      } else {
        setState([]);
      }
    }

    fetchData();
  }, []);

  return (
    <div key={field.id} className={`${errors[field.name] && "has-error"}`}>
      <label htmlFor={field.name}>{field.label}</label>

      <Field name={field.name} as="select" className="form-input">
        <option key="0">Select</option>
        {state.length > 0 &&
          state?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </Field>

      <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
    </div>
  );
};

export default RestaurantSelect;
