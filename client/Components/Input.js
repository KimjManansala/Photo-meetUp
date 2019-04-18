import React from "react";

const Input = ({ error, type, name, value, method, placeholder, pattern}) => {
  return (
    <div className="field">
      <label className="label">{name}</label>
      <div className="control">
        <input
          className={error ? "input is-danger" : "input"}
          type={type}
          placeholder={placeholder? placeholder:name}
          value={value}
          onChange={e => {
            method(e);
          }}
          pattern={pattern? pattern:null}
        />
      </div>
      {error ? <p className="help is-danger">This {name} is invalid</p> : null}
    </div>
  );
};

export default Input;
