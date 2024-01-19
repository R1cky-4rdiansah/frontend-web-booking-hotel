'use client'
import React, { useEffect, useState } from "react";

const NotFound = ({ text }) => {
  const [textError, setTextError] = useState("");
  const [indexError, setIndexError] = useState(0);

  useEffect(() => {
    if (indexError <= text.length) {
      const timeOut = setTimeout(() => {
        setTextError((prev) => prev + text[indexError]);
        setIndexError((prev) => prev + 1);
      }, 500);
      

      return () => clearTimeout(timeOut);
    } else {
      setTextError('Data')
      setIndexError(4)
    }
  }, [text, indexError]);

  return <h1 className="text-primary-dark">{textError}</h1>;
};

export default NotFound;