import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Bintang from "components/Bintang";
import React, { useState } from "react";
import propTypes from "prop-types";

export default function InputBintang({ name, propsOnChange, nilai }) {
  const [star, setStar] = useState(nilai);
  const minus = () => {
    if (star > 0.5) {
      setStar(star - 0.5);
      propsOnChange({
        target: {
          name: name,
          value: star - 0.5,
        },
      });
    }
  };
  const plus = () => {
    if (star < 5) {
      setStar(star + 0.5);
      propsOnChange({
        target: {
          name: name,
          value: star + 0.5,
        },
      });
    }
  };
  return (
    <div className="flex items-center gap-3">
      <button
        className="btn-star rounded flex justify-center items-center"
        style={{ background: "#F43F5E" }}
        onClick={() => minus()}
      >
        <MinusIcon className="w-6 h-6 text-white" />
      </button>
      <div className="m-0 p-0">
        <div className="sm:block hidden">
          <Bintang
            className="star-storie m-0 p-0"
            height={40}
            spacing={15}
            sizing="Kecil"
            value={star}
          />
        </div>
        <div className="sm:hidden block">
          <Bintang
            className="star-storie m-0 p-0"
            height={25}
            spacing={10}
            sizing="Kecil"
            value={star}
          />
        </div>
      </div>
      <button
        onClick={() => plus()}
        className="btn-star rounded flex justify-center items-center"
        style={{ background: "#14B8A6" }}
      >
        <PlusIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

InputBintang.defaultProps = {
  nilai: 5,
};

InputBintang.propTypes = {
  name: propTypes.string.isRequired,
  nilai: propTypes.number,
  propsOnChange: propTypes.func,
};
