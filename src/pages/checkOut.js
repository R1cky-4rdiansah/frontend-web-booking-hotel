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
import { useParams } from "react-router-dom";

import itemDetails from "../api/detailPageApi.json";
import withRouter from "./withRouter";

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
      },
    };
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

  render() {
    const { data } = this.state;
    const checkout = {
      duration: this.props.params.duration,
    };
    const steps = {
      bookingInformation: {
        title: "Informasi Pesanan",
        description: "Mohon untuk mengisi formulir di bawah",
        content: (
          <BookingInformation
            data={data}
            checkout={checkout}
            itemDetails={itemDetails}
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
            itemDetails={itemDetails}
            propsOnChange={this.onChange}
          />
        ),
      },
      completed: {
        title: "Yeayyy Finish...",
        description: null,
        content: <Completed />,
      },
    };
    return (
      <>
        <Header isPayment />

        <Stepper steps={steps}>
          {(prevStep, nextStep, currentStep, steps) => (
            <>
              <Numbering className="mt-4" current={currentStep} data={steps} />

              <Meta current={currentStep} data={steps} />

              <MainContent current={currentStep} data={steps} />

              {currentStep == "bookingInformation" && (
                <Controller currentStep={currentStep}>
                  <Button
                    className="btn-booking-back"
                    type="link"
                    href={`/details/${itemDetails._id}`}
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

              {currentStep == "payments" && (
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
                        onClick={nextStep}
                      >
                        Lanjutkan
                      </Button>
                    )}
                </Controller>
              )}

              {currentStep == "completed" && (
                <Controller currentStep={currentStep}>
                  <Button className=" btn-booking-next" type="link" href="/">
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

export default withRouter(checkOut);
