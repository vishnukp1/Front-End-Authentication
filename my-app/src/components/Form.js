// Form.js
import React, { useState } from 'react';

const Form = ({ onSubmit, fields }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="mb-3" key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type || 'text'}
            className="form-control"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(e, field.name)}
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
