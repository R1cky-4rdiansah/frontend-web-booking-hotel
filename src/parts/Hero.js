import React from "react";

import Pools from "../assets/image/Pools.jpg";
import IconTraveler from "../assets/icon/Icon Bag Traveler.png";
import IconCity from "../assets/icon/Icon Bag City.png";
import IconDiamond from "../assets/icon/Icon Diamond Wonderfull.png";
import Button from "components/Button";
import RupiahFornat from "utils/RupiahFormat";
import ReactOwlCarousel from "react-owl-carousel";
import Hotels from "../assets/image/Hotel2.png";
import Best from '../assets/image/Best.png'
import Kolam from "../assets/image/Kolam.png"
import Desa from "../assets/image/Desa.png"

const Hero = ({ data, refMostpicked }) => {
  const showPage = () => {
    console.log("woke");
    window.scrollTo({
      top: refMostpicked.current.offsetTop - 80,
      behavior: "smooth",
    });
  };

  const responsive = {
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  return (
    <section className="mt-[80px]">
      <div className="banner-grid">
        <div className="image-banner">
          <figure className="banner-image mb-0">
            <ReactOwlCarousel
              className="owl-theme"
              loop
              autoplay={true}
              dots={false}
              autoplaySpeed={2000}
              autoplayTimeout={5000}
              autoplayHoverPause={true}
              animateOut="fadeOut"
              {...responsive}
            >
              <img
                className="object-cover w-full h-full"
                src={Pools}
                alt="Gambar Banner 1"
              />
              <img
                className="object-cover w-full h-full"
                src={Desa}
                alt="Gambar Banner 2"
              />
              <img
                className="object-cover w-full h-full"
                src={Kolam}
                alt="Gambar Banner 3"
              />
              <img
                className="object-cover w-full h-full"
                src={Hotels}
                alt="Gambar Banner 4"
              />
            </ReactOwlCarousel>
          </figure>
        </div>
        <div className="wrapper-title">
          <h1 className="text-dark">
            Lupakan <span className="text-primary">Kesibukanmu</span>,{" "}
            <br className="br-dinamic" />
            Mari <span className="text-primary2">Liburan</span> Bersamaku!
          </h1>
          <p>
            Kami menyediakan apa yang anda butuhkan{" "}
            <br className="br-dinamic" /> untuk menikmati liburan anda bersama
            keluarga <br className="br-dinamic" /> dengan harga terjangkau dan
            berkualitas.
          </p>
          <Button
            type="button"
            isPrimaryBg={true}
            className="px-5 py-4 shadow-primary rounded-[10px] w-fit sm:block hidden mb-[60px]"
            onClick={showPage}
          >
            <span className="font-semibold text-[20px] text-white">
              Ayo Mulai
            </span>
          </Button>
          <div className="grid-icon">
            <div className="icon-wrapper">
              <img
                src={IconTraveler}
                className="md:w-[49px] md:h-[54px] w-[30px] h-[35px]"
                alt={`data.traveler `}
              />
              <span className="text-icon">
                {RupiahFornat(data.traveler)} Traveler
              </span>
            </div>
            <div className="icon-wrapper">
              <img
                src={IconCity}
                className="md:w-[50px] md:h-[54px] w-[31px] h-[35px]"
                alt={`data.kota `}
              />
              <span className="text-icon">{RupiahFornat(data.kota)} Kota</span>
            </div>
            <div className="icon-wrapper">
              <img
                src={IconDiamond}
                className="md:w-[49px] md:h-[54px] w-[30px] h-[35px]"
                alt={`data.keajaiban `}
              />
              <span className="text-icon">
                {RupiahFornat(data.keajaiban)} Keajaiban
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
