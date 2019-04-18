import React from "react";


const TextFieldInput = ({name, method, value, error, placeholder}) => {
  return (
    <div className="field">
      <label className="label">{name}</label>
      <div className="control">
        <textarea 
        className={error? "textarea is-danger": "textarea" }
        placeholder={placeholder} 
        onChange={(e)=>{method(e)}}
        value={value}
        />
      </div>
    </div>
  );
};



export default TextFieldInput;
