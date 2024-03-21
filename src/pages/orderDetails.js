import React, { Component, createRef } from "react";
import axios from "axios";
import { bulan, hari, year } from "utils/formatDateOption";
import RupiahFormat from "utils/RupiahFormat";
// import { AuthContect } from "auth/authProvider";
import { connect } from "react-redux";
import { detailOrder } from "store/actions/checkOut";

class orderDetails extends Component {
  // static contextType = AuthContect;
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.PDFRef = createRef();
  }

  componentDidMount() {
    document.title = "Halan Halan | Order Details";
    window.scrollTo(0, 0);
    this.fetcPage();
  }

  fetcPage = async () => {
    // const { token } = this.context;
    const invoice = window.location.pathname.split("/")[2];

    await this.props
      .detailOrder(localStorage.getItem("token"), invoice)
      .then((resp) =>
        this.setState({
          data: resp.data.data,
        })
      );
  };

  // downloadPdf = () => {
  //   const width = this.PDFRef.current.offsetWidth + 100;
  //   const height = this.PDFRef.current.offsetHeight;
  //   const width2 = window.innerWidth;
  //   const height2 = window.innerHeight;
  //   const doc = new JSPdf({
  //     orientation: "p",
  //     unit: "mm",
  //     format: [width, height],
  //     putOnlyUsedFonts: true,
  //   });

  //   doc.setFont("Inter-Regular", "normal");
  //   doc.html(this.PDFRef.current, {
  //     async callback(doc) {
  //       doc.save("detail_payment_halan-halan");
  //     },
  //   });
  // };

  render() {
    const { data } = this.state;
    return (
      <>
        {data && (
          <div className="wrapper-order-details relative" ref={this.PDFRef}>
            <div className="header-wrapper">
              <h4 className="text-primary-dark font-bold">Order Details</h4>
              <h4 className="text-primary-orange font-bold">#{data.invoice}</h4>
            </div>
            <img
              src={`${process.env.REACT_APP_BACKEND}/${data.itemId._id.imageId[0].imageUrl}`}
            />
            <div className="wrapper-table">
              <div className="relative-table">
                <h6 className="text-primary-dark font-bold m-0">Hotel</h6>
                <table className="w-full text-sm text-left rtl:text-right text-secondary-gray">
                  <tbody>
                    <tr>
                      <td className="py-1 md:w-1/4 w-5/12">nama</td>
                      <td className="py-1">{data.itemId._id.title}</td>
                    </tr>
                    <tr>
                      <td className="py-1">lokasi</td>
                      <td className="py-1">
                        {data.itemId._id.city} {data.itemId._id.country}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">durasi</td>
                      <td className="py-1">
                        {hari(data.bookingStartDate)} -{" "}
                        {hari(data.bookingEndDate)} {bulan(data.bookingEndDate)}{" "}
                        {year(data.bookingEndDate)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">harga</td>
                      <td className="py-1">
                        Rp {RupiahFormat(data.total)} / {data.itemId.duration}{" "}
                        {data.itemId._id.unit}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">fitur</td>
                      <td className="py-1">
                        {data.itemId._id.featureId.map((val, i) => (
                          <span>
                            {val.qty} {val.name}{" "}
                            {i !== data.itemId._id.featureId.length - 1
                              ? ", "
                              : ""}
                          </span>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 align-top">deskripsi</td>
                      <td className="py-1">{data.itemId._id.description}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="relative-table">
                <h6 className="text-primary-dark font-bold m-0">Member</h6>
                <table className="w-full text-sm text-left rtl:text-right text-secondary-gray">
                  <tbody>
                    <tr>
                      <td className="py-1 md:w-1/4 w-5/12">nama</td>
                      <td className="py-1">
                        {data.memberId.firstName} {data.memberId.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">email</td>
                      <td className="py-1">{data.memberId.email}</td>
                    </tr>
                    <tr>
                      <td className="py-1">no hp</td>
                      <td className="py-1">{data.memberId.handphone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="relative-table">
                <h6 className="text-primary-dark font-bold m-0">Payment</h6>
                <table className="w-full text-sm text-left rtl:text-right text-secondary-gray">
                  <tbody>
                    <tr>
                      <td className="py-1 md:w-1/4 w-5/12">nama</td>
                      <td className="py-1">{data.payments.accountHolder}</td>
                    </tr>
                    <tr>
                      <td className="py-1">bank</td>
                      <td className="py-1">{data.payments.bankFrom}</td>
                    </tr>
                    <tr>
                      <td className="py-1 align-top">bukti pembayaran</td>
                      <td className="py-1">
                        <img
                          src={`${process.env.REACT_APP_BACKEND}/${data.payments.proofPayment}`}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* <Button
                className="px-2 py-1.5 bg-primary-orange text-white text-lg fixed bottom-4 right-4 rounded flex items-center gap-2"
                type="button"
                onClick={this.downloadPdf}
              >
                Download PDF
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </Button> */}
          </div>
        )}
      </>
    );
  }
}

export default connect(null, { detailOrder })(orderDetails);
