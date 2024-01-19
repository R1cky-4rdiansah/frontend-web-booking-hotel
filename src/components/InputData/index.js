import React from "react";
import "./index.scss";
import propTypes from "prop-types";

export default function InputData({
  name,
  value,
  placheholder,
  className,
  min,
  max,
  prefix,
  suffix,
  onChangeProps,
  setMaxDateprops,
  maxDateProps,
}) {

  const onChange = (e) => {
    let value = String(e.target.value);

    //Menghilangkan nilai dengan preffix atau suffix agar nilai tetap terbaca number (nilai)
    // if (prefix) value = value.replace(prefix);
    // if (suffix) value = value.replace(suffix);

    // const patternNumber = new RegExp("[0-9]*");
    // const isNumber = patternNumber.test(value);

    if (Number(value) <= max && Number(value) >= min) {
      onChangeProps({
        target: {
          name: name,
          value: Number(value),
        },
      });
    }
  };

  const minus = () => {
    if (value > min) {
      onChange({
        target: {
          name: name,
          value: Number(value) - 1,
        },
      });
    }
  };

  const plus = () => {
    if (value < max) {
      onChange({
        target: {
          name: name,
          value: Number(value) + 1,
        },
      });
    }
  };

  return (
    <div className={["input-number", className].join(" ")}>
      <div className="input-group-t">
        <span onClick={minus} className="input-group-text-t minus">
          -
        </span>
        <input
          min={min}
          max={max}
          name={name}
          readOnly
          pattern="[0-9]*"
          className="form-control-t"
          placeholder={placheholder ? placheholder : "0"}
          value={`${prefix}${value}${suffix}`}
          onChange={onChange}
        />
        <span onClick={plus} className="input-group-text-t plus">
          +
        </span>
      </div>
    </div>
  );
}

InputData.defaultProps = {
  min: 1,
  max: 1,
  prefix: "",
  suffix: "",
};

InputData.propTypes = {
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChangeProps: propTypes.func,
  placheholder: propTypes.string,
  className: propTypes.string,
};
