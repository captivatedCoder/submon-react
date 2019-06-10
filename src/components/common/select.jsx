import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <div className="input-group-prepend">
          <span className="input-group-text">{label}</span>
        </div>
        <select name={name} id={name} {...rest} className="form-control">
          <option value="" />
          {options.map(option => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>    
  );
};

export default Select;
