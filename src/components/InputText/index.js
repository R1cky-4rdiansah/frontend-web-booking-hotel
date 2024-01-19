import React, { useState } from "react";
import propTypes from "prop-types";

import './index.scss'

export default function InputText({
  type,
  placeholder,
  errorResponse,
  inputClassname,
  outerClassname,
  value,
  name,
  append,
  prepend,
  propsOnChange,
}) {
  const [hasError, setHasError] = useState(null);
  let pattern = "";
  if (type == "email") pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (type == "tel") pattern = "[0-9]*";

  const onChange = (e) => {
    const target = {
      target: {
        name: name,
        value: e.target.value,
      },
    };

    if (type == "email") {
      if (!pattern.test(e.target.value)) setHasError(errorResponse);
      else setHasError(null);
    }

    if (type == "tel") {
      if (e.target.validity.valid) propsOnChange(target);
    } else {
      propsOnChange(target);
    }
  };
  return (
    <div className={["input-text", outerClassname].join(" ")}>
      <div className="input-group-t">
        {prepend && <span className="input-group-text-t">{prepend}</span>}
        <input
          name={name}
          type={type}
          value={value}
          pattern={pattern}
          placeholder={placeholder}
          onChange={onChange}
          className={["form-control-t", inputClassname].join(" ")}
        />
        {append && <span className="input-group-text-t">{append}</span>}
      </div>
      {hasError && <span className="error-helper">{hasError}</span>}
    </div>
  );
}

InputText.defaultProps = {
  type: "text",
  pattern: "",
  placeholder: "Mohon masukkan inputan",
  errorResponse: "Format tidak sesuai dengan inputan",
};

InputText.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  append: propTypes.oneOfType([propTypes.string, propTypes.number]),
  prepend: propTypes.oneOfType([propTypes.string, propTypes.number]),
  propsOnChange: propTypes.func,
  type: propTypes.string,
  placeholder: propTypes.string,
  outerClassname: propTypes.string,
  inputClassname: propTypes.string,
};
