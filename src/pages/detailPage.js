import Header from "parts/Header";
import ImageDetails from "parts/ImageDetails";
import React, { Component } from "react";
// import withRouter from "./withRouter";
// import detailPageApi from "../api/detailPageApi.json";
import Doing from "parts/Doing";
import Testimonial from "parts/Testimonial";
import Footer from "parts/Footer";
import LoadingPage from "components/loadingPage";

//redux
import { connect } from "react-redux";
import { checkOutBooking } from "../store/actions/checkOut";
import { fetchPage } from "store/actions/page";
import { AuthContect } from "auth/authProvider";
import Cookies from "js-cookie";

class detailPage extends Component {
  static contextType = AuthContect;

  componentDidMount() {
    document.title = "Detail Booking";
    window.scrollTo(0, 0);
    // const { token } = this.context;

    const params = window.location.pathname.split("/")[2];
    this.props.fetchPage(
      `${process.env.REACT_APP_BACKEND}/api/v1/detail-hotel/${params}`,
      "detailPage",
      Cookies.get("token")
    );
  }

  render() {
    const { page } = this.props;

    if (!page.hasOwnProperty("detailPage")) {
      return (
        <>
          <LoadingPage />
        </>
      );
    }
    return (
      <>
        <Header {...this.props} />
        <div className="frame-section">
          <ImageDetails
            data={page.detailPage}
            startBooking={this.props.checkOutBooking}
          />
          <Doing data={page.detailPage.doing} />
          {page.detailPage.testimonial && (
            <Testimonial data={page.detailPage.testimonial} />
          )}
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
});

// export default withRouter(detailPage);
export default connect(mapStateToProps, { checkOutBooking, fetchPage })(
  detailPage
);
