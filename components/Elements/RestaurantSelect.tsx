"use client";

import { getRestaurantsList } from "@/lib/actions/restaurant.actions";
import { Field } from "formik";
import { useEffect, useState } from "react";
import SelectField from "../Common/Fields/SelectField";

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
      <Field
        name={field.name}
        component={SelectField}
        options={state}
        disabled={state.length === 0}
        hasError={errors[field.name]}
      />
      <div className="text-danger mt-1 text-xs">{errors[field.name]}</div>
    </div>
  );
};

export default RestaurantSelect;
