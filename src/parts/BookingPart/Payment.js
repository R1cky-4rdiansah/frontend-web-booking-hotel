import React, { useState } from "react";

import Logo_Mandiri from "../../assets/logo/Logo Bank Mandiri.png";
import Logo_Jateng from "../../assets/logo/Logo Bank Jateng.png";
import RupiahFormat from "utils/RupiahFormat";
import InputFile from "components/InputFile";
import InputText from "components/InputText";
import SelectOption from "components/SelectOption";

export default function Payment({
  data,
  itemDetails,
  checkOut,
  propsOnChange,
}) {
  const pajak = 0.1;
  const subTotal = itemDetails.price * checkOut.duration;
  const nilaiPajak = subTotal * pajak;
  const total = subTotal + subTotal * pajak;

  return (
    <section className="my-4 gap-6">
      <div className="payment-main-container">
        <div className="content-payment-left">
          <div id="ringkasan_pembayaran" className="ringkasan-pembayaran">
            <h5 className="font-medium text-primary-dark text-left">
              Ringkasan Pemesanan :
            </h5>
            <table>
              <tbody>
                <tr>
                  <td className="text-sm text-secondary-gray w-full">
                    Sub Total
                  </td>
                  <td className="text-sm text-primary-dark text-end pr-1">
                    Rp
                  </td>
                  <td className="text-sm text-primary-dark text-end">
                    {RupiahFormat(subTotal)}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm text-secondary-gray ">
                    Pajak PPN {pajak * 100}%
                  </td>
                  <td className="text-sm text-primary-dark text-end pr-1">
                    Rp
                  </td>
                  <td className="text-sm text-primary-dark text-end">
                    {RupiahFormat(nilaiPajak)}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm text-secondary-gray font-semibold">
                    Total
                  </td>
                  <td className="text-sm text-primary-dark text-end font-semibold pr-1">
                    Rp
                  </td>
                  <td className="text-sm text-primary-dark text-end font-bold">
                    {RupiahFormat(total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="transfer_pembayaran" className="transfer-pembayaran">
            <h5 className="font-medium text-primary-dark text-left">
              Transfer Pembayaran :
            </h5>
            <div className="payment-card">
              {itemDetails.bank.map((val, i) => (
                <div key={i} className="item-card">
                  <figure>
                    <img
                      src={`${process.env.REACT_APP_BACKEND}/${val.imageUrl}`}
                      alt={val.imageUrl}
                      className="object-cover"
                    />
                  </figure>
                  <div className="wrapper-text-detail">
                    <h5>{val.nameBank}</h5>
                    <h5>{val.noRekening}</h5>
                    <h5>{val.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="content-payment-right">
          <h5>Form Pembayaran :</h5>
          <div className="rows">
            <div className="konten-input">
              <label htmlFor="proofPayment">Upload Bukti Pembayaran</label>
              <InputFile
                accept="image/*"
                name="proofPayment"
                id="proofPayment"
                propsOnChange={propsOnChange}
              />
            </div>
            <div className="konten-input">
              <label htmlFor="bankName">Nama Bank</label>
              <InputText
                name="bankName"
                id="bankName"
                value={data.bankName}
                propsOnChange={propsOnChange}
                type="text"
              />
            </div>
            <div className="konten-input">
              <label htmlFor="bankHolder">Nama Pengirim</label>
              <InputText
                name="bankHolder"
                id="bankHolder"
                type="text"
                value={data.bankHolder}
                propsOnChange={propsOnChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
