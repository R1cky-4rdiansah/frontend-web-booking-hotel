import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import propTypes from "prop-types";

const qrcode = ({ url, imageRef, invoice, data }) => {
  const [qrcode, setQrCode] = useState("");

  useEffect(() => {
    QRCode.toDataURL(
      url,
      {
        width: 200,
        margin: 4,
      },
      (err, url) => {
        if (err) {
          return console.log(err);
        }
        setQrCode(url);
      }
    );
  }, [qrcode]);

  return (
    <div
      className="bg-white border rounded-lg w-fit flex flex-col mx-auto"
      ref={imageRef}
    >
      <div className="bg-primary-orange p-3 rounded-t-lg text-center border-white border-b border-dashed">
        <h2 className="text-white m-0">#{invoice}</h2>
      </div>
      <div className="p-4 flex justify-center items-center bg-transparent bg-primary-orange">
        <img src={qrcode ? qrcode : null} />
      </div>
      <div className="px-4 flex-1 flex items-center rounded-b-lg border-t border-dashed">
        <table className="border-spacing-y-2 border-separate">
          <tr>
            <td className="text-secondary-gray">Nama</td>
            <td className="text-secondary-gray">:</td>
            <td className="text-secondary-gray">
              {data.firstname} {data.lastname}
            </td>
          </tr>
          <tr>
            <td className="text-secondary-gray">Email</td>
            <td className="text-secondary-gray">:</td>
            <td className="text-secondary-gray">{data.email}</td>
          </tr>
          <tr>
            <td className="text-secondary-gray">No HP</td>
            <td className="text-secondary-gray">:</td>
            <td className="text-secondary-gray">{data.phone}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

qrcode.propTypes = {
  url: propTypes.string,
};

export default qrcode;
