import React, { useEffect, useState } from "react";
import LogoSukses from "../../assets/image/Completed.png";
import QRCode from "components/QRCode";

const Completed = ({ imageRef, invoice, data }) => {
  const [qrcode, setQrCode] = useState("");
  const [url, setUrl] = useState(
    `${window.location.origin}/order-details/${invoice}`
  );

  return (
    <section className="complete-wrapper">
      <div className="grid-complete">
        <QRCode data={data} invoice={invoice} imageRef={imageRef} url={url} />
        <div className="bg-image">
          <figure className="overflow-hidden max-w-[400px] max-h-[400px]">
            <img src={LogoSukses} alt="logo_success" className="object-cover" />
          </figure>
          <p className=" text-sm text-secondary-gray text-center max-w-[400px] font-medium m-0 p-0">
            Terimakasih telah memesan tempat kami Kita akan mengirim informasi
            lewat email kamu segera setelah transaksi disetujui. Selamat healing
          </p>
        </div>
      </div>
    </section>
  );
};

export default Completed;
