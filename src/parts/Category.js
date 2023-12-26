import React from "react";
import ImageBanner from "../assets/image/Hero IMage.jpg";
import Button from "components/Button";
import ReactOwlCarousel from "react-owl-carousel";
import RupiahFormat from "utils/RupiahFormat";

const Category = ({ data }) => {
  const responsive = {
    responsive: {
      0: {
        items: 2,
        margin: 8,
      },
      768: {
        items: 2,
        margin: 24,
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
    <>
      {data.map((val, i) => (
        <section key={i}>
          <h4 className="tag-category text-secondary mb-3" >{val.name}</h4>
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
            {val.items.map((val, i) => (
              <div key={i} className="card mb-[2px]">
                {val.populer && (
                  <div className="tag">
                    <span className="text-tag">Populer</span>
                  </div>
                )}
                <figure className="top-image">
                  <img
                    src={val.image_url}
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="body-text">
                  <Button
                    type="link"
                    href={`/details/${val._id}`}
                    className="text-price text-dark stretched-link"
                    onClick={() => alert("woke")}
                  >
                    Rp {RupiahFormat(val.price)}
                  </Button>
                  <div className="text-location">
                    <span className="name text-dark">{val.name}</span>
                    <span className="country text-secondary">
                      {val.city}, {val.country}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </ReactOwlCarousel>
        </section>
      ))}
    </>
  );
};

export default Category;
