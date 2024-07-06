import React from "react";
import RupiahFormat from "utils/RupiahFormat";
import Button from "components/Button";

const MostPicked = ({ data, refMostpicked }) => {
  return (
    <section ref={refMostpicked}>
      <h4 className="tag-category mb-3">Sering Dipesan</h4>
      <div className="grid-card-image">
        {data.length === 0 ? (
          <div className="flex justify-center items-center">
            <h1 className="text-primary-dark">
              Maaf ya, datannya belum ada nih...
            </h1>
          </div>
        ) :  data.map((val, i) => (
          <div
            key={i}
            className={`item ${
              i === 0
                ? "lg:col-span-6 col-span-12 row-span-2"
                : "lg:col-span-3 col-span-6 lg:row-span-1 row-span-2"
            }`}
          >
            <div className="card-image card-fitur">
              {i === 0 ? (
                <div className="md:tag-big-image tag-small-image">
                  <span className="text-tag">
                    Rp {RupiahFormat(val.price)} per {val.unit}
                  </span>
                </div>
              ) : (
                <div className="tag-small-image">
                  <span className="text-tag">
                    Rp {RupiahFormat(val.price)} per {val.unit}
                  </span>
                </div>
              )}
              <figure className="wrapper-image">
                <img
                  src={`${process.env.REACT_APP_BACKEND}/${val.image_url}`}
                  alt={val.name}
                  className="object-cover h-full w-full"
                />
              </figure>
              <div className="title-wrapper">
                <Button
                  type="link"
                  href={`/details/${val._id}`}
                  className="stretched-link d-block text-white text-left"
                >
                  <h5>{val.name}</h5>
                </Button>
                <span>
                  {val.city}, {val.country}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MostPicked;
