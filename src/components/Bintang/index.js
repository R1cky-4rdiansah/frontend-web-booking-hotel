import React, { useEffect, useState } from "react";
import "./index.scss";
import propTypes from "prop-types";

export default function Bintang({ className, value }) {
  const [div, setDiv] = useState();
  const [heightStar, setHeightStar] = useState(80);

  const StarIcon = () => {
    var size = window.outerWidth;
    var widthStar = 60;
    var heighStar = 60;
    var spacing = 32;
    if (size >= 768 && size < 1024) {
      widthStar = 30;
      heighStar = 30;
      spacing = 16;
    } else if (size < 768) {
      widthStar = 20;
      heighStar = 20;
      spacing = 4;
    }
    setHeightStar(heighStar);
    const decimal = Number(value) % 1;
    const star = [];
    let leftPos = 0;
    for (let index = 0; index < value - decimal; index++) {
      leftPos += widthStar + spacing;
      star.push(
        <div
          className="star"
          key={`star-${index}`}
          style={{
            width: widthStar,
            height: heighStar,
            left: index * widthStar + index * spacing,
            marginRight: spacing,
          }}
        ></div>
      );
    }

    if (decimal > 0 && decimal <= 1) {
      star.push(
        <div
          className="star"
          key={`star-decimal`}
          style={{
            width: decimal * widthStar,
            height: heighStar,
            left: leftPos,
          }}
        ></div>
      );
    }

    const placholderStar = [];
    for (let index = 0; index < 5; index++) {
      placholderStar.push(
        <div
          className="star placeholder"
          key={`starPlaceholder-${index}`}
          style={{
            width: widthStar,
            height: heighStar,
            left: index * widthStar + index * spacing,
            marginRight: spacing,
          }}
        ></div>
      );
    }

    setDiv(
      <>
        {star}
        {placholderStar}
      </>
    );
  };

  useEffect(() => {
    StarIcon();
    window.addEventListener("resize", StarIcon);
  }, []);

  return (
    <div
      className={["stars", className].join(" ")}
      style={{ height: heightStar }}
    >
      {div}
    </div>
  );
}

Bintang.propTypes = {
  className: propTypes.string,
  value: propTypes.number,
  height: propTypes.number,
};
