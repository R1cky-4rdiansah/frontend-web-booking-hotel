import React from "react";
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
      {data.length === 0 ? (
        <div className="flex justify-center items-center">
          <h1 className="text-primary-dark">
            Maaf ya, datannya belum ada nih...
          </h1>
        </div>
      ) : (
        data.map((val, i) => (
          <section key={i}>
            <h4 className="tag-category mb-3">{val.name}</h4>
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
              {val === 0 ? (
                <div className="flex justify-center items-center">
                  <h1 className="text-primary-dark">
                    Maaf ya, datannya belum ada nih...
                  </h1>
                </div>
              ) : (
                val.itemId.map((val, i) => (
                  <Button key={i} type="link" href={`/details/${val._id}`}>
                    <div className="card mb-[2px]">
                      {val.isPopular && (
                        <div className="tag">
                          <span className="text-tag">Populer</span>
                        </div>
                      )}
                      <figure className="top-image">
                        <img
                          alt={`img-${i}`}
                          src={`${process.env.REACT_APP_BACKEND}/${val.imageId[0].imageUrl}`}
                          className="object-cover w-full h-full"
                        />
                      </figure>
                      <div className="body-text">
                        <span className="text-price">
                          Rp {RupiahFormat(val.price)}
                        </span>

                        <div className="text-location">
                          <span className="name text-dark">{val.title}</span>
                          <span className="country text-secondary">
                            {val.city}, {val.country}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Button>
                ))
              )}
            </ReactOwlCarousel>
          </section>
        ))
      )}
    </>
  );
};

export default Category;
