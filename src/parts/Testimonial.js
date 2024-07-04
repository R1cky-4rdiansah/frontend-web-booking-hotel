import React, { useState } from "react";
import Button from "components/Button";
import Bintang from "components/Bintang";

const Testimonial = ({data}) => {
  const [onTruncate, setTruncate] = useState(true);
  const truncate = (testiText) => {
    return testiText.length > 120
      ? `${testiText.substring(0, 120)}...`
      : testiText;
  };

  return (
    <section>
      <h4 className="tag-category mb-3 md:hidden visible">
        Testimonial
      </h4>

      <div className="banner-grid lg:shadow-none shadow-[0_0_2px_0_rgba(0,0,0,0.20)] lg:p-0 md:p-3 p-[6px] rounded-lg">
        <img
          className="img-testimonial"
          alt="img-testimonial"
          src={`${process.env.REACT_APP_BACKEND}/${data.image_url}`}
        />
        <div className="wrapper-title-testimonial">
          <h1 className="">{data.name}</h1>
          <div className="flex flex-row md:mb-10 order-2">
            <Bintang value={data.rate} sizing="Besar" />
          </div>
          <p>
            {onTruncate ? truncate(data.content) : data.content}
            <Button
              type="button"
              className="inline ml-2 md:hidden text-secondary font-semibold text-base"
              onClick={() => setTruncate(!onTruncate)}
            >
              {onTruncate ? " Read More" : " Show Little"}
            </Button>
          </p>
          {/* <span className=" text-user-testi">
            {data.nameFamily}, {data.familyJobs}
          </span> */}
          <Button
            type="button"
            isPrimaryBg={true}
            className="px-5 py-4 shadow-primary rounded-[10px] w-fit md:block hidden order-last"
            onClick={() => setTruncate(!onTruncate)}
          >
            <span className="font-semibold text-[20px] text-white">
              {onTruncate ? " Read More" : " Show Little"}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
