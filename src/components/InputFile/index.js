import React, { useState } from "react";
import { useRef } from "react";
import propTypes from "prop-types";
import "./index.scss";

export default function InputFile({
  placeholder,
  inputClassname,
  outerClassname,
  // value,
  name,
  accept,
  append,
  prepend,
  propsOnChange,
}) {
  const refInputFile = useRef(null);
  const [valueText, setValueText] = useState("");
  const [prevImg, setPrevImage] = useState();

  const onChange = (e) => {
    const img = document.getElementById("prevImage");
    propsOnChange({
      target: {
        name: name,
        value: e.target.files[0],
      },
    });
    setValueText(e.target.value);
    if (refInputFile.current.files[0]) {
      img.removeAttribute("hidden");
      setPrevImage(URL.createObjectURL(e.target.files[0]));
    } else {
      img.setAttribute("hidden", true);
    }
  };

  return (
    <div className={["input-text", outerClassname].join(" ")}>
      <img
        id="prevImage"
        hidden
        src={prevImg}
        alt="prev-image"
      />
      <div className="input-group-t">
        {prepend && <span className="input-group-text-t">{prepend}</span>}
        <input
          accept={accept}
          ref={refInputFile}
          name={name}
          value={valueText}
          className="d-none"
          type="file"
          onChange={onChange}
        />
        <input
          onClick={() => refInputFile.current.click()}
          defaultValue={valueText}
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
  // value: propTypes.string.isRequired,
  append: propTypes.oneOfType([propTypes.string, propTypes.number]),
  prepend: propTypes.oneOfType([propTypes.string, propTypes.number]),
  propsOnChange: propTypes.func.isRequired,
  placeholder: propTypes.string,
  outerClassname: propTypes.string,
  inputClassname: propTypes.string,
};
