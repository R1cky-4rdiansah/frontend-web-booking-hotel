import React, { Component } from "react";
import propTypes from "prop-types";
import InputData from "components/InputData";
import InputDate from "components/InputDate";
import Button from "components/Button";

export default class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        duration: 1,
        date: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      },
    };
  }

  updateData = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state;

    if (prevState.data.date !== data.date) {
      const startDate = new Date(data.date.startDate);
      const endDate = new Date(data.date.endDate);
      const countDuration = new Date(endDate - startDate).getDate();
      this.setState({
        data: {
          ...this.state.data,
          duration: countDuration,
        },
      });
    }

    if (prevState.data.duration !== data.duration) {
      const startDate = new Date(data.date.startDate);
      const endDate = new Date(
        startDate.setDate(startDate.getDate() + Number(data.duration) - 1)
      );
      this.setState({
        data: {
          ...this.state.data,
          date: {
            ...this.state.data.date,
            endDate: endDate,
          },
        },
      });
    }
  }

  render() {
    const { data } = this.state;
    const { itemDetails, startBooking } = this.props;
    return (
      <div className="wrapper-pay">
        <h5 className="text-secondary-gray font-medium m-0">
          Tempat Pemesanan
        </h5>
        <h3 className="text-secondary-gray font-medium m-0">
          Mulai dari <span className="text-price">{itemDetails.price}K</span> /
          {itemDetails.unit}
        </h3>
        <div className="wrapper-input">
          <span className="text-xs text-primary-dark font-medium w-fit">
            Berapa lama kamu tinggal?
          </span>
          <InputData
            max={31}
            suffix={` malam`}
            onChangeProps={this.updateData}
            name="duration"
            value={data.duration}
          />
        </div>
        <div className="wrapper-input">
          <span className="text-xs text-primary-dark font-medium w-fit">
            Tanggal berapa saja?
          </span>
          <InputDate
            onChangeProps={this.updateData}
            name="date"
            value={data.date}
            min={new Date()}
          />
        </div>
        <p className="total-price">
          Kamu akan membayar{" "}
          <span className="text-prmary-blue">
            {itemDetails.price * data.duration}K
          </span>{" "}
          per{" "}
          <span className="text-prmary-blue">
            {" "}
            {data.duration} {itemDetails.unit}
          </span>
        </p>
        <Button
          type="link"
          href={`/payment/${data.duration}`}
          isPrimaryBg
          className="py-3 text-white flex justify-center text-xl font-semibold rounded-lg mt-10 shadow-primary md:max-w-[280px] w-full"
        >
          Lanjutkan
        </Button>
      </div>
    );
  }
}

BookingForm.propTypes = {
  startBooking: propTypes.func,
};
