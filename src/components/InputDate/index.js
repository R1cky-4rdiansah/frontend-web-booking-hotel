import React, { useEffect, useRef, useState } from "react";
import propTypes from "prop-types";
import IconCalendar from "../../assets/icon/Icon Calendar.png";
import FormatDate from "utils/FormatDate";

import "./index.scss";

import { DateRange } from "@umakantp/react-date-range";

import "@umakantp/react-date-range/dist/styles.css"; // main style file
import "@umakantp/react-date-range/dist/theme/default.css"; // theme css file

export default function InputDate({
  value,
  placeholer,
  name,
  onChangeProps,
  className,
  min
}) {
  const [show, setShow] = useState(false);

  const datePickerChange = (value) => {
    const target = {
      target: {
        name: name,
        value: value.selection,
      },
    };
    onChangeProps(target);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const refData = useRef(null);
  const handleClickOutside = (e) => {
    if (refData && !refData.current.contains(e.target)) {
      setShow(false);
    }
  };

  const check = (focus) => {
    focus.indexOf(1) < 0 && setShow(false);
  };

  const displayDate = `${value.startDate ? FormatDate(value.startDate) : ""}${
    value.endDate ? " - " + FormatDate(value.endDate) : ""
  }`;

  return (
    <div ref={refData} className={["input-date", className].join(" ")}>
      <div className="input-group-t">
        {show && (
          <div className="date-range-wrapper">
            <DateRange
              editableDateInputs={true}
              onChange={datePickerChange}
              moveRangeOnFirstSelection={false}
              onRangeFocusChange={check}
              ranges={[value]}
              minDate={min}
            />
          </div>
        )}
        <input
          readOnly
          type="text"
          value={displayDate}
          placeholder={placeholer}
          onClick={() => setShow(true)}
          className="form-control-t"
        />
        <span className="input-group-text-t bg-white">
          <img src={IconCalendar} alt="Icon Calendar" className="w-5 h-5" />
        </span>
      </div>
    </div>
  );
}

InputDate.propTypes = {
  value: propTypes.object,
  className: propTypes.string,
  placeholer: propTypes.string,
  onChangeProps: propTypes.func,
};
