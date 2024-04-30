import React, { useState } from "react";
import propTypes from "prop-types";
import "./indexInputText.scss";
import { XMarkIcon } from "@heroicons/react/20/solid";

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
  secure,
  search,
  load,
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
      <div className={`input-group-t ${search ? "" : "common"}`}>
        {prepend && <span className="input-group-text-t">{prepend}</span>}
        <input
          name={name}
          type={type}
          value={value}
          pattern={pattern}
          placeholder={placeholder}
          onChange={onChange}
          className={[
            `form-control-t relative ${
              search ? "text-left search" : "text-center common"
            } `,
            inputClassname,
          ].join(" ")}
        />
        {append && <span className="input-group-text-t">{append}</span>}
        {secure && <button className="input-group-button">{secure}</button>}
        {search && value.length == 0 ? (
          <button className="input-group-button-search">{search}</button>
        ) : search && value.length != 0 ? (
          <button
            onClick={() =>
              propsOnChange({
                target: {
                  name: name,
                  value: "",
                },
              })
            }
            className="input-group-button-search"
          >
            <XMarkIcon
              className="h-4 w-4 bg-primary-orange text-white"
              aria-hidden="true"
            />
          </button>
        ) : null}
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
  load: propTypes.func,
  type: propTypes.string,
  placeholder: propTypes.string,
  outerClassname: propTypes.string,
  inputClassname: propTypes.string,
};
