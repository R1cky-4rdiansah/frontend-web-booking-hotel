import Button from "components/Button";
import InputData from "components/InputData";
import InputDate from "components/InputDate";
import React, { useEffect, useState } from "react";
import BookingForm from "./BookingForm";

const TextDetsails = ({ data }) => {
  const [day, setDay] = useState("1");
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  //   const [maxDate, setMaxDate] = useState(new Date());

  const handleDay = (e) => {
    setDay(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  return (
    <section>
      <div className="details-grid">
        <div className="text-wrapper-details">
          <h6>Informasi Hotel</h6>
          <div
            className="detail-teks"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
          <div className="grid-icon">
            {data.feature &&
              data.feature.map((val, i) => (
                <div
                  className={`${
                    i === 3 || i === 7 ? "item-icon-end" : "item-icon-start"
                  }`}
                  key={val._id}
                >
                  <div className="icon-wrapper">
                    <img src={val.url_icon} alt={val.name_icon} />
                    <p className="text-icon">
                      <span className="font-medium text-primary">
                        {val.qty}
                      </span>{" "}
                      {val.name_icon}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="pay-transaction">
          {/* <div className="wrapper-pay">
            <h5 className="text-secondary-gray font-medium m-0">
              Tempat Pemesanan
            </h5>
            <h3 className="text-secondary-gray font-medium m-0">
              Mulai dari <span className="text-price">{data.price}K</span> /
              malam
            </h3>
            <div className="wrapper-input">
              <span className="text-xs text-primary-dark font-medium">
                Berapa lama kamu tinggal?
              </span>
              <InputData
                min={1}
                max={32}
                value={day}
                suffix=" hari"
                onChangeProps={handleDay}
            //     setMaxDateprops={setMaxDate}
            //     maxDateProps={maxDate}
              />
            </div>
            <div className="wrapper-input">
              <span className="text-xs text-primary-dark font-medium">
                Tanggal berapa saja?
              </span>
              <InputDate
                onChangeProps={handleDate}
                name="value"
            //     max={maxDate}
                value={date}
              />
            </div>
            <p className="total-price">
              Kamu akan membayar{" "}
              <span className="text-prmary-blue">{data.price * day}K</span> per{" "}
              <span className="text-prmary-blue"> {day} malam</span>
            </p>
            <Button type="button" isPrimaryBg className="py-3 text-white text-xl font-semibold rounded-lg mt-10 shadow-primary max-w-[280px]" >Lanjutkan</Button>
          </div> */}
          <BookingForm itemDetails={data} />
        </div>
      </div>
    </section>
  );
};

export default TextDetsails;
