import React from "react";
import Me from "../../assets/image/Me.jpg";
import Button from "components/Button";
import { DocumentTextIcon } from "@heroicons/react/20/solid";

const Hero = () => {
  return (
    <section className="hero-about">
      <div className="hero-contact-wrapper">
        <figure className="h-[500px] w-[332px] relative m-0 p-0">
          <img
            className="object-cover w-full h-full rounded-tr-3xl rounded-bl-3xl"
            src={Me}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 -translate-x-7 translate-y-7 bg-primary-orange -z-10 rounded-bl-3xl"></div>
        </figure>
        <div>
          <div className="text-hero-wrapper">
            <h1 className="title-about font-semibold">
              <span className="text-prmary-blue">About</span>{" "}
              <span className="text-primary-orange">Me</span>
            </h1>
            <p className="text-secondary-gray text-base font-normal text-justify indent-4">
              Kulonuwun guys..., perkenalkan nama saya Ricky Ardiansah, 24 tahun
              seorang Full Stack Developer yang sudah berpengalaman lebih dari 2
              tahun. Website ini dibuat sebagai portofolio saya dengan
              menggunakan teknologi MERN (Mongo Express React Node) yang saya
              buat diwaktu senggang pada saat bekerja. Gratis gaes tanpa
              dipungut biaya wkwkwkwkw.
            </p>
            <Button
              type="link"
              isPrimaryBg={true}
              className="btn-cv"
              href="/docs/Ricky Ardiansah CV.pdf"
              download="ricky-ardiansah-cv"
              isExternal
            >
              <span className="font-semibold text-sm text-white flex justify-center items-center">
                Download CV{" "}
                <DocumentTextIcon className="w-4 h-4 ml-2 text-white" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
