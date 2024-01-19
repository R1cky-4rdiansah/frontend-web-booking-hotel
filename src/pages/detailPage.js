import Button from "components/Button";
import Header from "parts/Header";
import ImageDetails from "parts/ImageDetails";
import React, { Component } from "react";
import withRouter from "./withRouter";
import detailPageApi from "../api/detailPageApi.json";
import Doing from "parts/Doing";
import Testimonial from "parts/Testimonial";
import Footer from "parts/Footer";

class detailPage extends Component {
  constructor(props) {
    super(props);
    document.title = "Detail Booking";
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        <div className="frame-section">
          <ImageDetails data={detailPageApi} />
          <Doing data={detailPageApi.doing} />
          <Testimonial data={detailPageApi.testimonial} />
          <Footer />
        </div>
      </>
    );
  }
}

export default withRouter(detailPage);
