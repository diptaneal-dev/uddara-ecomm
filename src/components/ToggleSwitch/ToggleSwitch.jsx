import React from "react";
import PropTypes from "prop-types";
import "./toggle-switch-styles.css"; 

const ToggleSwitch = ({ checked, onChange, label, className }) => {
  return (
    <div className={`toggle-switch-wrapper ${className}`}>
      {label && <span className="toggle-label">{label}</span>}
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-label={label || "Toggle Switch"}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

// Define default props
ToggleSwitch.defaultProps = {
  label: "",
  className: "",
};

// Add prop types for validation
ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default ToggleSwitch;
