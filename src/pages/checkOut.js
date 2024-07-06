import React, { Component } from "react";
import Header from "parts/Header";
import Button from "components/Button";
import Stepper from "components/Stepper";
import Numbering from "components/Stepper/Numbering";
import Meta from "components/Stepper/Meta";
import MainContent from "components/Stepper/MainContent";
import Controller from "components/Stepper/Controller";
import BookingInformation from "parts/BookingPart/BookingInformation";
import Completed from "parts/BookingPart/Completed";
import Payment from "parts/BookingPart/Payment";
import errorImage from "../assets/image/404.png";
import Cookies from "js-cookie";

import { toPng } from "html-to-image";

//redux
import { connect } from "react-redux";
import { submitBooking } from "../store/actions/checkOut";

// Toast js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class checkOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        proofPayment: undefined,
        bankName: "",
        bankHolder: "",
        invoice: "",
      },
    };
    this.imageRef = React.createRef();
  }

  onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidMount() {
    window.scroll(0, 0);
    document.title = "Halan Halan | Payment";
  }

  downloadImage = () => {
    toPng(this.imageRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "ticket-halan-halan.png";
        link.href = dataUrl;
        link.click();

        window.location.href = "/";
      })
      .catch((err) => {
        alert(err);
      });
  };

  submitForm = (nextStep) => {
    const { data } = this.state;
    const { page, checkout } = this.props;

    const formData = new FormData();
    formData.append("firstName", data.firstname);
    formData.append("lastName", data.lastname);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phone);
    formData.append("accountHolder", data.bankHolder);
    formData.append("bankFrom", data.bankName);
    formData.append("bookingStartDate", checkout.date.startDate);
    formData.append("bookingEndDate", checkout.date.endDate);
    formData.append("price", page.detailPage.price);
    formData.append("duration", checkout.duration);
    formData.append("gambar", data.proofPayment);
    formData.append("idItem", checkout._id);

    this.props
      .submitBooking(formData, Cookies.get("token"))
      .then((res) => {
        this.setState({
          data: {
            ...this.state.data,
            invoice: res.data.data.invoice,
          },
        });
        nextStep();
      })
      .catch((err) =>
        toast.error(`${err.message}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

  render() {
    const { data } = this.state;
    const { checkout, page } = this.props;

    if (!checkout) {
      return (
        <div className="container-error">
          <div
            className="wrapper"
            style={{ backgroundImage: `url(${errorImage})` }}
          >
            <Button isLarge type="link" href="/">
              Kembali
            </Button>
          </div>
        </div>
      );
    }

    const steps = {
      bookingInformation: {
        title: "Informasi Pesanan",
        description: "Mohon untuk mengisi formulir di bawah",
        content: (
          <BookingInformation
            data={data}
            checkout={checkout}
            itemDetails={page.detailPage}
            propsOnChange={this.onChange}
          />
        ),
      },
      payments: {
        title: "Informasi Pesanan",
        description: "Mohon untuk mengikuti intruksi di bawah",
        content: (
          <Payment
            data={data}
            checkOut={checkout}
            itemDetails={page.detailPage}
            propsOnChange={this.onChange}
          />
        ),
      },
      completed: {
        title: "Yeayyy Finish...",
        description: null,
        content: (
          <Completed
            imageRef={this.imageRef}
            invoice={this.state.data.invoice}
            data={this.state.data}
          />
        ),
      },
    };
    return (
      <>
        <Header isPayment />

        <Stepper steps={steps}>
          {(prevStep, nextStep, currentStep, steps) => (
            <>
              <ToastContainer />
              <Numbering className="mt-4" current={currentStep} data={steps} />

              <Meta current={currentStep} data={steps} />

              <MainContent current={currentStep} data={steps} />

              {currentStep === "bookingInformation" && (
                <Controller currentStep={currentStep}>
                  <Button
                    className="btn-booking-back"
                    type="link"
                    href={`/details/${page.detailPage._id}`}
                  >
                    Batalkan
                  </Button>
                  {(data.firstname &&
                    data.lastname &&
                    data.email &&
                    data.phone) !== "" && (
                    <Button
                      className="btn-booking-next"
                      type="button"
                      onClick={nextStep}
                    >
                      Lanjutkan
                    </Button>
                  )}
                </Controller>
              )}

              {currentStep === "payments" && (
                <Controller currentStep={currentStep}>
                  <Button
                    className="btn-booking-back"
                    type="button"
                    onClick={prevStep}
                  >
                    Kembali
                  </Button>
                  {(data.bankHolder && data.bankName) !== "" &&
                    data.proofPayment !== undefined && (
                      <Button
                        className="btn-booking-next"
                        type="button"
                        onClick={() => {
                          this.submitForm(nextStep);
                        }}
                      >
                        Lanjutkan
                      </Button>
                    )}
                </Controller>
              )}

              {currentStep === "completed" && (
                <Controller currentStep={currentStep}>
                  <Button
                    className=" btn-booking-next"
                    type="button"
                    onClick={this.downloadImage}
                  >
                    Kembali ke Beranda
                  </Button>
                </Controller>
              )}
            </>
          )}
        </Stepper>
      </>
    );
  }
}

const stateProps = (state) => ({
  checkout: state.checkOut,
  page: state.page,
});

// export default withRouter(checkOut);
export default connect(stateProps, { submitBooking })(checkOut);
