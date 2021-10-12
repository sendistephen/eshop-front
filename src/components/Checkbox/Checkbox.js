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
        <li key={category.name} className='list-unstyled checkbox-list'>
          <input
            onChange={handleToggle(category._id)}
            value={checked.indexOf(category._id === -1)}
            type='checkbox'
            className='form-check-input me-2'
          />
          <label htmlFor='' className='form-check-label'>
            {category.name}
          </label>
        </li>
      ))}
    </>
  );
}
