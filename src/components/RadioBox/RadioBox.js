import { useState } from 'react';

export default function RadioBox({ prices, handleFilters }) {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return (
    <>
      {prices.map((price, index) => (
        <div class='flex items-center mb-2 -ml-4 mt-2'>
          <input
            onChange={handleChange}
            value={`${price._id}`}
            id='price'
            type='radio'
            name={price}
            class='h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300'
            aria-labelledby='price'
            aria-describedby='price'
          />
          <label
            for='price'
            class='text-sm font-medium text-gray-900 ml-2 block'
          >
            {price.name}
          </label>
        </div>
      ))}
    </>
  );
}
