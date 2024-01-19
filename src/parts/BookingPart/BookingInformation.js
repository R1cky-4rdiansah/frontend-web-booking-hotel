import React from "react";
import InputText from "components/InputText";

export default function BookingInformation({
  data,
  itemDetails,
  checkout,
  propsOnChange,
}) {
  return (
    <section className="my-4 gap-6">
      <div className="booking-main-container">
        <div className="content-booking-left">
          <figure>
            <img
              src={itemDetails.image_url[0].url}
              alt={itemDetails.name}
              className="object-cover"
            />
          </figure>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h4 className="text-primary-dark m-0 p-0 font-medium text-lg">
                {itemDetails.name}
              </h4>
              <span className="text-secondary-gray m-0 p-0 font-normal text-base">
                {itemDetails.city}, {itemDetails.country}
              </span>
            </div>
            <h4 className="text-prmary-blue m-0 p-0 font-medium text-lg">
              {itemDetails.price * checkout.duration}K / {checkout.duration}{" "}
              {itemDetails.unit}
            </h4>
          </div>
        </div>
        <div className="content-booking-right">
          <div className="rows">
            <div className="konten-input">
              <label htmlFor="firstname">Nama Depan</label>
              <InputText
                name="firstname"
                id="firstname"
                value={data.firstname}
                propsOnChange={propsOnChange}
              />
            </div>
            <div className="konten-input">
              <label htmlFor="lastname">Nama Belakang</label>
              <InputText
                name="lastname"
                id="lastname"
                value={data.lastname}
                propsOnChange={propsOnChange}
              />
            </div>
            <div className="konten-input">
              <label htmlFor="email">Email</label>
              <InputText
                name="email"
                id="email"
                type="email"
                value={data.email}
                propsOnChange={propsOnChange}
              />
            </div>
            <div className="konten-input">
              <label htmlFor="phone">No HP</label>
              <InputText
                name="phone"
                id="phone"
                type="tel"
                value={data.phone}
                propsOnChange={propsOnChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
