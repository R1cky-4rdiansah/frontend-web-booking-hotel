import React, { Children } from "react";
import propTypes from "prop-types";
import "./index.scss";

export default function TextArea({
  rows,
  placeholder,
  className,
  name,
  propsOnChange,
  children,
}) {
  return (
    <textarea
      name={name}
      className={className}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) =>
        propsOnChange({
          target: {
            name: name,
            value: e.target.value,
          },
        })
      }
    >
      {children}
    </textarea>
  );
}

TextArea.defaultProps = {};

TextArea.propTypes = {
  name: propTypes.string.isRequired,
  className: propTypes.string,
  rows: propTypes.number,
};
