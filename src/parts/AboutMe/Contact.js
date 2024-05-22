import InputText from "components/InputText";
import TextArea from "components/TextArea";
import React from "react";
import gmail from "../../assets/icon/icon_contact/icons8-gmail-96.png";
import wa from "../../assets/icon/icon_contact/icons8-whatsapp-96.png";
import location from "../../assets/icon/icon_contact/icons8-location-96.png";
import github from "../../assets/icon/icon_contact/icons8-github-96.png";
import Button from "components/Button";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";

const data = [
  {
    title: "Gmail",
    src: gmail,
    link: "mailto:r1cky.ardi4nsah.14@gmail.com",
    name: "r1cky.ardi4nsah.14@gmail.com",
  },
  {
    title: "WhatsApp",
    src: wa,
    link: "https://wa.me/6285866123403",
    name: "r1cky.ardi4nsah.14@gmail.com",
  },
  {
    title: "Alamat",
    src: location,
    link: "https://maps.app.goo.gl/U3rdVnmdyJkjkTBs9",
    name: "Kedungsono, Bulu, Sukoharjo",
  },
  {
    title: "Github",
    src: github,
    link: "https://github.com/R1cky-4",
    name: "R1cky-4",
  },
];

const Contact = () => {
  return (
    <section className="wrapper-text-contact">
      <h1 className="title-about font-semibold mx-auto">
        <span className="text-prmary-blue">My</span>{" "}
        <span className="text-primary-orange">Contact</span>
      </h1>
      <div className="wrapper-contact">
        {/* <div className="form-contact">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="nama">Nama</label>
              <InputText
                name="nama"
                id="nama"
                value={""}
                type="text"
                placeholder="Input Nama"
                inputClassname="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <InputText
                name="email"
                id="email"
                value={""}
                type="email"
                placeholder="Input Email"
                inputClassname="w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="subjek">Subjek</label>
              <InputText
                name="subjek"
                id="subjek"
                value={""}
                type="text"
                placeholder="Iput Topikmu"
                inputClassname="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">No HP</label>
              <InputText
                name="phone"
                id="phone"
                value={""}
                type="tel"
                placeholder="Input No. HP"
                inputClassname="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="pesan">Pesan</label>
            <TextArea
              placeholder={"Tulis kesan dan pesan disini..."}
              rows={10}
              name="testimonial"
              className="w-full"
            />
          </div>
          <Button
            type="button"
            className="w-fit ml-auto rounded py-2.5 px-4 font-semibold bg-primary-orange text-white flex items-center"
          >
            Send
            <PaperAirplaneIcon className="ml-2 w-4 h-4 text-white" />
          </Button>
        </div>
        <div className="garis"></div> */}
        <div className="my-contact">
          {data.map((val, i) => (
            <div key={i} className="flex gap-2 items-center">
              <img className="w-12 h-12 object-cover" src={val.src} />
              <div className="flex justify-start flex-col">
                <span className="text-[10px] text-secondary-gray">
                  {val.title}
                </span>
                <a
                  href={val.link}
                  target="_blank"
                  className="text-xs text-primary-dark cursor-pointer text-decoration-none"
                >
                  {val.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
