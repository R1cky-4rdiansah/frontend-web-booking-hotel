import React from "react";
import propTypes from "prop-types";

import './index.scss'

export default function Numbering({ style, data, className, current }) {
  const keysOfData = Object.keys(data);

  return (
    <ol className={[className, "stepper"].join(" ")} style={style}>
      {keysOfData.map((list, index) => {
        let isActive = list === current ? "active" : "";
        if (index + 1 === keysOfData.length) {
          isActive = null;
          return null;
        }

        return (
          <li key={`list-${index}`} className={[isActive, className].join(" ")}>
            {index + 1}
          </li>
        );
      })}
    </ol>
  );
}

Numbering.propTypes = {
  data: propTypes.object,
  current: propTypes.string,
  className: propTypes.string,
};
