import './styles.css'
import React from 'react'

const InputField = ({ label, placeholder, value, onChange, width, textarea }) => {
  return (
    <div className="input-field-container" style={{ width: width || '100%' }}>
      <label className="subtitle black-color">{label}*</label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default InputField