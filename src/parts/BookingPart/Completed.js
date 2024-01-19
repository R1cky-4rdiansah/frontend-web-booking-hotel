import React from "react";
import LogoSukses from "../../assets/image/Completed.png";

const Completed = () => {
  return (
    <section className=" my-4 flex flex-col gap-2 justify-center items-center">
      <figure className="overflow-hidden max-w-[400px] max-h-[400px]">
        <img src={LogoSukses} alt="logo_success" className="object-cover" />
      </figure>
      <p className=" text-sm text-secondary-gray text-center max-w-[400px] font-medium">
        Terimakasih telah memesan tempat kami Kita akan mengirim informasi lewat
        email kamu segera setelah transaksi disetujui. Selamat healing
      </p>
    </section>
  );
};

export default Completed;
