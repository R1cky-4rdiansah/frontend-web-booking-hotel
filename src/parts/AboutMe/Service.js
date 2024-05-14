import React from "react";
import uiux from "../../assets/icon/icon_exp/icons8-design-100 (2).png";
import code from "../../assets/icon/icon_exp/icons8-programing-100.png";

const data = [
  {
    name: "UI UX Desinger",
    val: uiux,
    text: "Merancang antarmuka pengguna (UI) dan pengalaman pengguna (UX) dari produk digital pada situs web. Peran ini menggabungkan aspek desain visual dengan pemahaman mendalam tentang bagaimana pengguna berinteraksi dengan teknologi Figma, Canva, dan Whimsicel.",
  },
  {
    name: "Fullstack Developer",
    val: code,
    text: "Profesional dalam pengembangan perangkat lunak yang memiliki keterampilan dan pengetahuan untuk bekerja pada kedua sisi (front-end dan back-end) dari situs web. Saya memiliki pemahaman yang komprehensif tentang teknologi dan proses pengembangan perangkat lunak dalam membuat situs web.",
  },
];

const Service = () => {
  return (
    <section className="wrapper-flex-sevice">
      <h1 className="title-about font-semibold mx-auto">
        <span className="text-prmary-blue">My</span>{" "}
        <span className="text-primary-orange">Services</span>
      </h1>
      <div className="wrapper-service-card-text">
        {data.map((val, i) => (
          <div key={i} className="p-4 w-[300px] shadow-md rounded-lg">
            <div className="flex flex-col gap-2 justify-center items-center">
              <img
                className="mt-2 mx-auto w-24 h-24 object-cover"
                src={val.val}
              />
              <h4 className="text-xl text-primary-dark">{val.name}</h4>
            </div>
            <p className="text-base text-secondary-gray indent-4 text-justify mt-10 mb-0">
              {val.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
