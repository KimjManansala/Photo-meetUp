import React from "react";

const TextFieldInput = ({
  name,
  method,
  value,
  error,
  placeholder,
  charNum
}) => {
  return (
    <div className="field">
      <label className="label">{name}</label>
      <div className="control">
        <textarea
          className={error ? "textarea is-danger" : "textarea"}
          placeholder={placeholder}
          onChange={e => {
            method(e);
          }}
          value={value}
        />
      </div>
      <label className="label">
        <h6 style={charNum === 150 ? { color: "red" } : null}>
          {charNum}/150</h6>
      </label>
    </div>
  );
};

export default TextFieldInput;
