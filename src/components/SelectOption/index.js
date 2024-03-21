import React, { useState } from "react";
import propTypes from "prop-types";

import './index.scss'

export default function SelectOption({
  outerClassname,
  value,
  name,
  propsOnChange,
  children,
  inputClassname,
  defaultValue
}) {
  const onChange = (e) => {
    propsOnChange({
      target: {
        name: name,
        value: e.target.value,
      },
    });
  };

  return (
    <div className={["input-option", outerClassname].join(" ")}>
      <div className="input-group-t">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={["form-control-t", inputClassname].join(" ")}
        >
          {children}
        </select>
      </div>
    </div>
  );
}

SelectOption.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.string,
  propsOnChange: propTypes.func.isRequired,
  outerClassname: propTypes.string,
  inputClassname: propTypes.string,
  defaultValue: propTypes.string
};
