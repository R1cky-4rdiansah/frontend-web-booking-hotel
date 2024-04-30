import React, { useEffect, useState } from "react";
import "./index.scss";
import propTypes from "prop-types";

export default function Bintang({
  className,
  value,
  height,
  sizing,
  spacing,
  side,
}) {
  // const [div, setDiv] = useState();
  const [heightStar, setHeightStar] = useState(height);
  const [sizeStar, setSizeStar] = useState(height);
  const [spacingStar, setSpacing] = useState(spacing);

  const StarIcon = () => {
    var size = window.outerWidth;
    if (size >= 768 && size < 1024) {
      setSizeStar(30);
      setSpacing(16);
    } else if (size < 768) {
      setSizeStar(20);
      setSpacing(4);
    }
    setHeightStar(sizeStar);
  };

  useEffect(() => {
    if (sizing === "Besar") {
      StarIcon();
      window.addEventListener("resize", StarIcon);
    }
  }, []);

  const decimal = value % 1;
  let leftPos = 0;
  if (side == "Kiri") {
    return (
      <div
        className={["stars", className].join(" ")}
        style={{ height: heightStar }}
      >
        {Array.from({ length: value - decimal }).map((_, index) => {
          leftPos += sizeStar + spacingStar;
          return (
            <div
              className="star"
              key={`star-${index}`}
              style={{
                width: sizeStar,
                height: sizeStar,
                left: index * sizeStar + index * spacingStar,
                marginRight: spacingStar,
              }}
            ></div>
          );
        })}
        {decimal > 0 && decimal <= 1 && (
          <div
            className="star star-decimal"
            key={`star-decimal`}
            style={{
              width: decimal * sizeStar,
              height: sizeStar,
              left: leftPos,
            }}
          ></div>
        )}
        {Array.from({ length: 5 }, (_, index) => (
          <div
            className="star placeholder"
            key={`starPlaceholder-${index}`}
            style={{
              width: sizeStar,
              height: sizeStar,
              left: index * sizeStar + index * spacingStar,
              marginRight: spacingStar,
            }}
          ></div>
        ))}
      </div>
    );
  } else {
    return (
      <div
        className={["stars", className].join(" ")}
        style={{ height: heightStar }}
      >
        {Array.from({ length: value - decimal }, (_, index) => {
          leftPos += sizeStar + spacingStar;
          return (
            <div
              className="star"
              key={`star-${index}`}
              style={{
                width: sizeStar,
                height: sizeStar,
                right: index * sizeStar + index * spacingStar,
                marginRight: spacingStar,
              }}
            ></div>
          );
        })}
        {decimal > 0 && decimal <= 1 && (
          <div
            className="star star-decimal"
            key={`star-decimal`}
            style={{
              width: decimal * sizeStar,
              height: sizeStar,
              right: leftPos,
              transform: "scaleX(-1)",
              marginRight: spacingStar,
            }}
          ></div>
        )}
        {Array.from({ length: 5 }, (_, index) => (
          <div
            className="star placeholder"
            key={`starPlaceholder-${index}`}
            style={{
              width: sizeStar,
              height: sizeStar,
              right: index * sizeStar + index * spacingStar,
              marginRight: spacingStar,
            }}
          ></div>
        ))}
      </div>
    );
  }
}

Bintang.defaultProps = {
  height: 60,
  sizing: "Besar",
  spacing: 32,
  side: "Kiri",
  className: "min-w-[200px]",
};

Bintang.propTypes = {
  className: propTypes.string,
  value: propTypes.number,
  height: propTypes.number,
  spacing: propTypes.number,
  sizing: propTypes.string,
  side: propTypes.string,
};
