import React from "react";
import ReactOwlCarousel from "react-owl-carousel";

const Doing = ({ data }) => {
  const responsive = {
    responsive: {
      0: {
        items: 1,
        margin: 0,
      },
      768: {
        items: 2,
        margin: 12,
      },
      1024: {
        items: 3,
        margin: 24,
      },
      1280: {
        items: 4,
        margin: 24,
      },
    },
  };
  return (
    <section>
      <h4 className="tag-category text-secondary-gray mb-3">
        Hal - hal yang bisa anda lakukan
      </h4>
      <ReactOwlCarousel
        className="owl-theme"
        loop
        autoplay={true}
        dots={false}
        autoplaySpeed={2000}
        autoplayTimeout={5000}
        autoplayHoverPause={true}
        {...responsive}
      >
        {data.length === 0 ? (
          <div className="flex justify-center items-center">
            <h1 className="text-primary-dark">
              Maaf ya, datannya belum ada nih...
            </h1>
          </div>
        ) : (
          data.map((val, i) => (
            <div key={i} className="item-doing">
              <div className="card-image card-fitur">
                <figure className="wrapper-image">
                  <img
                    src={`${process.env.REACT_APP_BACKEND}/${val.image_url}`}
                    alt={val.name}
                    className="object-cover h-full w-full"
                  />
                </figure>
                <div className="title-wrapper">
                  <span>{val.name}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </ReactOwlCarousel>
    </section>
  );
};

export default Doing;
