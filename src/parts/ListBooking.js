import Bintang from "components/Bintang";
import Button from "components/Button";
import InputBintang from "components/InputBintang";
import InputFile from "components/InputFile";
import ModalBS from "components/Modal";
import TextArea from "components/TextArea";
import React, { useState } from "react";
import RupiahFormat from "utils/RupiahFormat";
import { hari, year } from "utils/formatDateOption";
import FormatDate from "utils/FormatDate";
import axios from "axios";
import star from "../assets/icon/Stars.svg";
import RupiahFormatK from "utils/RupiahFormatK";
import NoOrder from "../assets/not_found/No orders.png";

const ListBooking = ({
  propsOnChange,
  sendTestionial,
  data,
  dataStorie,
  updateTestominail,
  onChangeEdit,
}) => {
  const [show, setShowModal] = useState(false);
  const [header, setHeaderTitle] = useState(null);
  const [updateStorie, setUpdateStorie] = useState(false);
  const showModal = async (header, itemId) => {
    setHeaderTitle(header);
    await axios
      .post(`${process.env.REACT_APP_BACKEND}/api/v1/my-storie`, {
        itemId: itemId,
      })
      .then((res) => {
        if (res.data.data !== null) {
          const { itemId, image_url, rate, content, _id } = res.data.data;
          onChangeEdit(itemId, image_url, rate, content, _id);
          setUpdateStorie(true);
        } else {
          onChangeEdit(itemId, null, 5, null, null);
          setUpdateStorie(false);
        }
        setShowModal(true);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <section className="mt-[80px]">
      {dataStorie.length !== 0 ? (
        <>
          <h3 className="text-base font-medium text-primary-dark header-storie">
            List Booking
          </h3>
          <ul className="grid w-full gap-6 grid-cols-1 m-0 p-0">
            {dataStorie.map((data, i) => (
              <li
                key={i}
                onClick={() => showModal(data._id.title, data._id.itemId)}
              >
                <input
                  type="radio"
                  id={data._id.itemId}
                  name="list-order"
                  value={data._id.itemId}
                  className="hidden peer"
                />
                <label htmlFor={data._id.itemId} className="storie-input">
                  <div className="mobile-order">
                    <span className="text-xs text-secondary-gray font-medium whitespace-nowrap">
                      Order tgl {hari(data.bookingStartDate)} -{" "}
                      {FormatDate(data.bookingEndDate)}{" "}
                      {year(data.bookingEndDate)}
                    </span>
                  </div>
                  <div className="flex items-stretch gap-3">
                    <img
                      alt="Gambar 1"
                      className="w-[200px] h-[140px] object-fill rounded"
                      src={`${process.env.REACT_APP_BACKEND}/${data._id.imageId[0]}`}
                    />
                    <div className="flex flex-col justify-between py-2">
                      <div className="flex flex-col">
                        <span className="text-base font-medium text-primary-dark">
                          {data._id.title}
                        </span>
                        <span className="text-xs font-medium text-secondary-gray">
                          {data._id.city}, {data._id.country}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-primary-dark web-price">
                        Rp {RupiahFormat(data._id.price)}
                      </span>
                      <div className="mobile-price">
                        <span className="text-sm font-medium text-primary-dark">
                          Rp {RupiahFormatK(data._id.price)}K
                        </span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-primary-dark">
                            {data._id.average
                              ? data._id.average.toFixed(1)
                              : "0"}
                          </span>
                          <img
                            alt="icon-star"
                            src={star}
                            style={{
                              width: 14,
                              height: 14,
                              marginLeft: 1,
                            }}
                          ></img>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-text">
                    <span className="text-xs text-secondary-gray font-medium absolute top-0 right-0 whitespace-nowrap">
                      Order tgl {hari(data.bookingStartDate)} -{" "}
                      {FormatDate(data.bookingEndDate)}{" "}
                      {year(data.bookingEndDate)}
                    </span>
                    <div className="flex gap-2 items-center">
                      <Bintang
                        value={
                          data._id.average ? data._id.average.toFixed(1) : 0
                        }
                        height={20}
                        sizing="Kecil"
                        side="Kanan"
                        spacing={4}
                      />
                      <span className="text-sm font-medium text-primary-dark">
                        ({data._id.count ? data._id.count : "0"})
                      </span>
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
          {show && (
            <ModalBS
              setShowModal={setShowModal}
              id="modal"
              show={show}
              size="lg"
              headerTitle={header}
            >
              <div className="flex gap-4 flex-col">
                <div className="w-fit flex flex-col gap-4">
                  <div className="w-full">
                    <label className="mb-2" htmlFor="foto">
                      Upload Fotomu
                    </label>
                    <InputFile
                      accept="image/*"
                      name="foto"
                      id="foto"
                      previewImage={
                        data.foto
                          ? `${process.env.REACT_APP_BACKEND}/${data.foto}`
                          : null
                      }
                      propsOnChange={propsOnChange}
                    />
                  </div>
                  <div className="w-fit">
                    <label className="mb-2" htmlFor="star">
                      Nilai
                    </label>
                    <InputBintang
                      nilai={data.nilai ? data.nilai : 5}
                      name={"nilai"}
                      propsOnChange={propsOnChange}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="mb-2" htmlFor="textArea">
                    Kritik & Saran
                  </label>
                  <TextArea
                    placeholder={"Tulis kesan dan pesan disini..."}
                    rows={10}
                    name="testimonial"
                    className="w-full"
                    propsOnChange={propsOnChange}
                  >
                    {data.testimonial && data.testimonial}
                  </TextArea>
                </div>
                {updateStorie
                  ? data.foto !== null &&
                    data.nilai !== 0 &&
                    data.testimonial !== "" && (
                      <Button
                        onClick={updateTestominail}
                        type="button"
                        className="rounded font-bold text-sm ml-auto py-3 px-6 bg-primary-orange text-white flex justify-center items-center"
                      >
                        Update
                      </Button>
                    )
                  : data.foto !== null &&
                    data.nilai !== 0 &&
                    data.testimonial !== "" && (
                      <Button
                        onClick={sendTestionial}
                        type="button"
                        className="rounded font-bold text-sm ml-auto py-3 px-6 bg-primary-orange text-white flex justify-center items-center"
                      >
                        Kirim
                      </Button>
                    )}
              </div>
            </ModalBS>
          )}
        </>
      ) : (
        <>
          <img
            alt="no-orders"
            src={NoOrder}
            className="object-cover w-[500px] h-auto mx-auto"
          />
          <h5 className="text-secondary-gray font-medium text-center">
            Belum ada hotel nih ?? <br />
            Yuk booking hotel dulu...
          </h5>
        </>
      )}
    </section>
  );
};

export default ListBooking;
