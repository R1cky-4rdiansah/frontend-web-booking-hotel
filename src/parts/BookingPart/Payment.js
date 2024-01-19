import React from "react";

import Logo_Mandiri from "../../assets/logo/Logo Bank Mandiri.png";
import Logo_Jateng from "../../assets/logo/Logo Bank Jateng.png";
import RupiahFormat from "utils/RupiahFormat";
import InputFile from "components/InputFile";
import InputText from "components/InputText";

export default function Payment({
  data,
  itemDetails,
  checkOut,
  propsOnChange,
}) {
  const pajak = 10;
  const nilaiPajak = (itemDetails.price * pajak) / 100;
  const subTotal = itemDetails.price * checkOut.duration * 1000;
  const total = subTotal + (subTotal * pajak) / 100;

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
                    {RupiahFormat(itemDetails.price * 1000)}
                  </td>
                </tr>
                <tr>
                  <td className="text-sm text-secondary-gray ">
                    Pajak PPN {pajak}%
                  </td>
                  <td className="text-sm text-primary-dark text-end pr-1">
                    Rp
                  </td>
                  <td className="text-sm text-primary-dark text-end">
                    {RupiahFormat(nilaiPajak * 1000)}
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
              <div className="item-card">
                <figure>
                  <img
                    src={Logo_Mandiri}
                    alt="logo_bank_mandiri"
                    className="object-cover"
                  />
                </figure>
                <div className="wrapper-text-detail">
                  <h5>Bank Mandiri</h5>
                  <h5>1234 567 8910 1234</h5>
                  <h5>Ricky Ardiansah</h5>
                </div>
              </div>
              <div className="item-card">
                <figure>
                  <img
                    src={Logo_Jateng}
                    alt="logo_bank_jateng"
                    className="object-cover"
                  />
                </figure>
                <div className="wrapper-text-detail">
                  <h5>Bank Jateng</h5>
                  <h5>1234 567 8910 1234</h5>
                  <h5>Ricky Ardiansah</h5>
                </div>
              </div>
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
