import "./styles.css";

const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  width,
  textarea,
  type,
  required = true,
}) => {
  return (
    <div className="input-field-container" style={{ width: width || "100%" }}>
      <label className="subtitle black-color">
        {label}
        {required ? <span>*</span> : null}
      </label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;
