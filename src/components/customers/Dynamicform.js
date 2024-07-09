import React, { useState } from 'react';

const DynamicForm = () => {
  const [fields, setFields] = useState([{ value: '' }, { value: '' }, { value: '' }]);

  const handleAddFields = () => {
    setFields([...fields, { value: '' }, { value: '' }, { value: '' }]);
  };

  const handleChange = (index, event) => {
    const values = [...fields];
    values[index].value = event.target.value;
    setFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Enter address"
            value={field.value}
            onChange={event => handleChange(index, event)}
          />
          <button type="button" onClick={() => handleRemoveFields(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddFields}>Add More Addresses</button>
    </div>
  );
};

export default DynamicForm;
