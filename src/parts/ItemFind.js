import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import Button from "components/Button";
import ComboBox from "components/ComboBox";
import RadioButton from "components/RadioButton";
import React, { useEffect, useState } from "react";
import RupiahFormat from "utils/RupiahFormat";

const ItemFind = ({
  filterNama,
  filterHarga,
  filterKota,
  propsOnChange,
  refFooter,
  paginating,
  datas,
  isLoading,
  isError,
  refContent,
  city,
}) => {
  // const [modal, setModal] = useState(0);
  const [nama, setNama] = useState(1);
  const [harga, setHarga] = useState(1);
  const [namaShow, setNamaShow] = useState(false);
  const [hargaShow, sethargaShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const heightFooter = refFooter.current.clientHeight;
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - heightFooter + 20) {
        paginating();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="find-wrapper">
      <Button
        type="button"
        onClick={() => window.scrollTo(0, 0)}
        className="button-upper"
      >
        <ArrowUpIcon className="h-5 w-5 text-white " aria-hidden="true" />
      </Button>
      {/* <div
        className={`slider-modal relative ${
          modal == 1 ? "show" : modal == 2 ? "close" : ""
        }  p-4`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-primary-dark font-medium m-0 p-0">Filter</h3>
          <XMarkIcon
            className="h-7 w-7 text-secondary-gray"
            aria-hidden="true"
            onClick={() => setModal(2)}
          />
        </div>
      </div> */}
      <div className="filter-mobile">
        <Button
          type="button"
          className={`p-2 bg-primary-orange text-white rounded-full flex items-center justify-center`}
          onClick={() => {
            propsOnChange({
              target: {
                name: "harga",
                value: harga === 1 ? "Termurah" : "Termahal",
              },
            });
            sethargaShow(true);
            setHarga(harga === 1 ? 0 : 1);
          }}
        >
          Harga{" "}
          {hargaShow && harga === 1 ? (
            <ArrowDownIcon
              className="h-4 w-4 ml-1 text-white"
              aria-hidden="true"
            />
          ) : hargaShow && harga === 0 ? (
            <ArrowUpIcon
              className="h-4 w-4 ml-1 text-white"
              aria-hidden="true"
            />
          ) : null}
        </Button>
        <Button
          type="button"
          className={`p-2 bg-primary-orange text-white rounded-full flex items-center justify-center`}
          onClick={() => {
            propsOnChange({
              target: {
                name: "nama",
                value: nama === 1 ? "Ascending" : "Descending",
              },
            });
            setNamaShow(true);
            setNama(nama === 1 ? 0 : 1);
          }}
        >
          Nama{" "}
          {namaShow && nama === 1 ? (
            <ArrowDownIcon
              className="h-4 w-4 ml-1 text-white"
              aria-hidden="true"
            />
          ) : namaShow && nama === 0 ? (
            <ArrowUpIcon
              className="h-4 w-4 ml-1 text-white"
              aria-hidden="true"
            />
          ) : null}
        </Button>
        <ComboBox
          city={city}
          className="col-span-2"
          name="kota"
          value={filterKota}
          propsOnChange={propsOnChange}
        />
      </div>
      <div className="filter-card-find">
        <div className="flex flex-col gap-2">
          <span className="font-medium m-0 text-sm text-primary-dark">
            Nama
          </span>
          <RadioButton
            nameValueRadioBtn={"nama"}
            valueRadioBtn={filterNama}
            propsOnChange={propsOnChange}
            name="Ascending"
            value={"Ascending"}
          />
          <RadioButton
            nameValueRadioBtn={"nama"}
            valueRadioBtn={filterNama}
            propsOnChange={propsOnChange}
            name="Descending"
            value={"Descending"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-medium m-0 text-sm text-primary-dark">
            Harga
          </span>
          <RadioButton
            nameValueRadioBtn={"harga"}
            valueRadioBtn={filterHarga}
            propsOnChange={propsOnChange}
            name="Termahal"
            value={"Termahal"}
          />
          <RadioButton
            nameValueRadioBtn={"harga"}
            valueRadioBtn={filterHarga}
            propsOnChange={propsOnChange}
            name="Termurah"
            value={"Termurah"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-medium m-0 text-sm text-primary-dark">
            Kota
          </span>
          <ComboBox
            city={city}
            name="kota"
            value={filterKota}
            propsOnChange={propsOnChange}
          />
        </div>
      </div>
      <div className="card-content-find" ref={refContent}>
        <div className="grid-card-image-find">
          {datas.length !== 0 && isLoading == false ? (
            datas.map((val, i) => (
              <Button type="link" href={`/details/${val._id}`}>
                <div key={i} className="card mb-[2px]">
                  {val.isPopular && (
                    <div className="tag">
                      <span className="text-tag">Populer</span>
                    </div>
                  )}
                  <figure className="top-image">
                    <img
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
                        <span>
                          {val.city}, {val.country}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Button>
            ))
          ) : datas.length == 0 && isLoading == false ? (
            <div className="col-span-3 align-middle flex justify-center items-center h-full">
              <h6 className="text-primary-dark font-medium">
                Maaf, Hotel belum ada nih...
              </h6>
            </div>
          ) : isLoading ? (
            <div className="col-span-3 align-middle flex justify-center items-center h-full">
              <div role="status" className="mr-2">
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-gray-200 animate-spin fill-primary-orange"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <span className="text-base text-primary-orange">
                Tunggu ya...
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ItemFind;
