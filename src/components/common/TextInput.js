import React from "react";

const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
}) => {
  let wrapperClass = "form-group mb-3";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          role="textbox"
          name={name}
          id={name}
          className="form-control"
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
        />
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
