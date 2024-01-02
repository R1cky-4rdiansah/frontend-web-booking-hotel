import Breadcrumb from "components/Breadcumb";
import Button from "components/Button";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageDetails = ({ data }) => {
  return (
    <section className="mt-[80px]">
      <div className="wrapper-top-details">
        <div className="header-title">
          <div className="wrapper-breadcumb">
            <Breadcrumb
              data={[
                { name: "Home", href: "/" },
                { name: "Detail Pesanan", href: "" },
              ]}
            />
          </div>
          <div className="wrapper-title-details">
            <h2>{data.name}</h2>
            <h4>
              {data.city}, {data.country}
            </h4>
          </div>
        </div>
        <div className="header-image">
          {data.image_url &&
            data.image_url.map((val, i) => (
              <LazyLoadImage
                key={i}
                src={val.url}
                className={`item-image ${
                  i === 0 ? "col-span-7" : "col-span-5"
                } ${i === 0 ? "row-span-2" : "row-span-1"}`}
                alt={val._id}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
export default ImageDetails;
