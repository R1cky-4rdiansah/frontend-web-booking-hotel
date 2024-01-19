import React from "react";
import { useRef } from "react";
import propTypes from "prop-types";
import "./index.scss";

export default function InputFile({
  placeholder,
  inputClassname,
  outerClassname,
  value,
  name,
  accept,
  append,
  prepend,
  propsOnChange,
}) {
  const refInputFile = useRef(null);
  return (
    <div className={["input-text", outerClassname].join(" ")}>
      <div className="input-group-t">
        {prepend && <span className="input-group-text-t">{prepend}</span>}
        <input
          accept={accept}
          ref={refInputFile}
          name={name}
          value={value}
          className="d-none"
          type="file"
          onChange={propsOnChange}
        />
        <input
          onClick={() => refInputFile.current.click()}
          defaultValue={value}
          placeholder={placeholder}
          className={["form-control-t", inputClassname].join(" ")}
        />
        {append && <span className="input-group-text-t">{append}</span>}
      </div>
    </div>
  );
}
InputFile.defaultProps = {
  placeholder: "Mohon masukkan file gambar",
};

InputFile.propTypes = {
  name: propTypes.string.isRequired,
  accept: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  append: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  prepend: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  propsOnChange: propTypes.func.isRequired,
  placeholder: propTypes.string,
  outerClassname: propTypes.string,
  inputClassname: propTypes.string,
};
