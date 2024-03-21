import Breadcrumb from "components/Breadcumb";
import Button from "components/Button";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BookingForm from "./BookingForm";

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
// import { Pagination } from "swiper/modules";

import "react-spring-bottom-sheet/dist/style.css";

const ImageDetails = ({ data, startBooking }) => {
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
          <LazyLoadImage
            src={`${process.env.REACT_APP_BACKEND}/${data.image_url[active].url}`}
            alt={data.image_url[active]._id}
            className={`item-image center`}
          />
          <div className="item-image side">
            <div className="vertical">
              <Swiper
                direction={"vertical"}
                slidesPerView={4}
                spaceBetween={24}
                pagination={{
                  clickable: true,
                }}
                className="mySwiper w-full h-full bg-white"
              >
                {data.image_url &&
                  data.image_url.map((val, i) => (
                    <SwiperSlide key={i} className="w-full h-full">
                      <figure
                        className={`block h-full w-full overflow-hidden rounded-lg cursor-pointer ${
                          i == active ? "border-primary-orange border-2" : ""
                        } `}
                        onClick={() => setImgActive(i)}
                      >
                        <img
                          className="h-full w-full object-cover"
                          src={`${process.env.REACT_APP_BACKEND}/${val.url}`}
                          alt={val._id}
                        />
                      </figure>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="horizontal">
              <Swiper
                slidesPerView={4}
                spaceBetween={24}
                pagination={{
                  clickable: true,
                }}
                className="mySwiper w-full h-full bg-white"
              >
                {data.image_url &&
                  data.image_url.map((val, i) => (
                    <SwiperSlide key={i} className="w-full h-full">
                      <figure
                        className={`block h-full w-full overflow-hidden rounded-lg cursor-pointer ${
                          i == active ? "border-primary-orange border-2" : ""
                        } `}
                        onClick={() => setImgActive(i)}
                      >
                        <img
                          className="h-full w-full object-cover"
                          src={`${process.env.REACT_APP_BACKEND}/${val.url}`}
                          alt={val._id}
                        />
                      </figure>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
          <figure className="item-image-main col-span-12 row-span-2">
            <LazyLoadImage
              src={`${process.env.REACT_APP_BACKEND}/${data.image_url[active].url}`}
              alt={data.image_url[active]._id}
            />
          </figure>
        </div>
        <div className="thumb-img">
          {data.image_url &&
            data.image_url.map((val, i) => (
              <LazyLoadImage
                key={i}
                src={`${process.env.REACT_APP_BACKEND}/${val.url}`}
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
            {data.feature.length === 0 ? (
              <div className="flex justify-center items-center">
                <h1 className="text-primary-dark">
                  Maaf ya, datannya belum ada nih...
                </h1>
              </div>
            ) : (
              data.feature.map((val, i) => (
                <div
                  className={`${
                    i === 3 || i === 7 ? "item-icon-end" : "item-icon-start"
                  }`}
                  key={val._id}
                >
                  <div className="icon-wrapper">
                    <img
                      src={`${process.env.REACT_APP_BACKEND}/${val.url_icon}`}
                      alt={val.name_icon}
                    />
                    <p className="text-icon">
                      <span className="font-medium text-primary-dark">
                        {val.qty}
                      </span>{" "}
                      {val.name_icon}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="pay-transaction">
          <BookingForm itemDetails={data} startBooking={startBooking} />
        </div>
      </div>
    </section>
  );
};
export default ImageDetails;
