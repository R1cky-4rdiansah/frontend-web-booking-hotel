"use client";
import React, { useEffect, useState } from "react";

const RunningText = ({ text, className }) => {
  const [runningText, setRunningText] = useState("");
  const [indexError, setIndexError] = useState(0);

  useEffect(() => {
    if (indexError <= text.length) {
      const timeOut = setTimeout(() => {
        setRunningText((prev) => prev + text[indexError]);
        setIndexError((prev) => prev + 1);
      }, 500);

      return () => clearTimeout(timeOut);
    } else {
      setRunningText("");
      setIndexError(0);
    }
  }, [text, indexError]);

  return <span className={className}>{runningText}</span>;
};

export default RunningText;
