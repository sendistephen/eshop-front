import { useState } from 'react';

export default function RadioBox({ prices, handleFilters }) {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return (
    <>
      {prices.map((price, index) => (
        <div key={index}>
          <input
            onChange={handleChange}
            value={`${price._id}`}
            name={price}
            type='radio'
            className='form-check-input'
          />
          <label htmlFor='name' className='form-check-label'>
            {price.name}
          </label>
        </div>
      ))}
    </>
  );
}
