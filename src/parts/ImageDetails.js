import Breadcrumb from "components/Breadcumb";
import Button from "components/Button";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BookingForm from "./BookingForm";

import "react-spring-bottom-sheet/dist/style.css";

const ImageDetails = ({ data }) => {
  const [active, setImgActive] = useState(0);

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
                  i === 0 ? "xl:col-span-7 col-span-12" : "xl:col-span-5 col-span-6"
                } ${i === 0 ? "row-span-2" : "row-span-1"}`}
                alt={val._id}
              />
            ))}
          <figure className="item-image-main col-span-12 row-span-1">
            <LazyLoadImage
              src={data.image_url[active].url}
              alt={data.image_url[active]._id}
            />
          </figure>
        </div>
        <div className="thumb-img">
          {data.image_url &&
            data.image_url.map((val, i) => (
              <LazyLoadImage
                key={i}
                src={val.url}
                className={`item-image ${
                  i == active ? "active" : ""
                } col-span-2 row-span-1`}
                alt={val._id}
                onClick={() => setImgActive(i)}
              />
            ))}
        </div>
      </div>
      <div className="details-grid">
        <div className="text-wrapper-details">
          <h6>Informasi Hotel</h6>
          <div
            className="detail-teks"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
          <div className="grid-icon">
            {data.feature &&
              data.feature.map((val, i) => (
                <div
                  className={`${
                    i === 3 || i === 7 ? "item-icon-end" : "item-icon-start"
                  }`}
                  key={val._id}
                >
                  <div className="icon-wrapper">
                    <img src={val.url_icon} alt={val.name_icon} />
                    <p className="text-icon">
                      <span className="font-medium text-primary-dark">
                        {val.qty}
                      </span>{" "}
                      {val.name_icon}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="pay-transaction">
          <BookingForm itemDetails={data} />
        </div>
      </div>
    </section>
  );
};
export default ImageDetails;
