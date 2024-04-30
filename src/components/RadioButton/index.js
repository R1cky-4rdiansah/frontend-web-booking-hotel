import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import "./index.scss";

export default function RadioButton({
  inputClassname,
  outerClassname,
  value,
  name,
  valueRadioBtn,
  nameValueRadioBtn,
  propsOnChange,
}) {
  const onChange = () => {
    propsOnChange({
      target: {
        name: nameValueRadioBtn,
        value: value,
      },
    });
  };

  return (
    <>
      <label className={["radio-button-label", outerClassname].join(" ")}>
        <input
          value={value}
          className={["input-radio-button", inputClassname].join(" ")}
          type="radio"
          name={name}
          checked={valueRadioBtn === value}
          onChange={onChange}
        />
        <span className="radio-button-span">{name}</span>
      </label>
    </>
  );
}

RadioButton.propTypes = {
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  propsOnChange: propTypes.func,
  outerClassname: propTypes.string,
  inputClassname: propTypes.string,
  valueRadioBtn: propTypes.string,
  nameValueRadioBtn: propTypes.string,
};
