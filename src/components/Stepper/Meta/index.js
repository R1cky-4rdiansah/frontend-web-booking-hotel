import React from "react";

export default function Meta({ data, current }) {
  return (
    <div className="text-center mt-8">
      <h2 className=" text-primary-dark font-medium ">
        {data[current] && data[current].title}
      </h2>
      <p className=" text-secondary-gray text-lg font-medium">
        {data[current] && data[current].description}
      </p>
    </div>
  );
}
