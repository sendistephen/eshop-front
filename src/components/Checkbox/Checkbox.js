import React from "react";
import { useState } from 'react';

export default function Checkbox({ categories, handleFilters }) {
  const [checked, setChecked] = useState([]);

  const handleToggle = (category) => () => {
    //   check if category is already in the state checked
    const currentCategoryId = checked.indexOf(category); // return 1st index or -1 if not found
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state -> push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(category);
    } else {
      // uncheck
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // update state
    setChecked(newCheckedCategoryId);
    // send array of category ids to parent component
    handleFilters(newCheckedCategoryId);
  };

  return (
    <>
      {categories.map((category) => (
        <div class='flex items-center  mb-2'>
          <input
            onChange={handleToggle(category._id)}
            value={checked.indexOf(category._id === -1)}
            id='checkbox-1'
            aria-describedby='checkbox-1'
            type='checkbox'
            class='bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded'
          />
          <label
            for='checkbox-1'
            class='text-sm ml-3 font-medium text-gray-900'
          >
            {category.name}
          </label>
        </div>
      ))}
    </>
  );
}
