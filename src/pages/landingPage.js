import React, { Component } from "react";
import Header from "parts/Header";
import Hero from "parts/Hero";
import MostPicked from "parts/MostPicked";
import Category from "parts/Category";
import Testimonial from "parts/Testimonial";
import Footer from "parts/Footer";
import LoadingPage from "components/loadingPage";

//redux
import { connect } from "react-redux";
import { fetchPage } from "store/actions/page";
import { AuthContect } from "auth/authProvider";
class landingPage extends Component {
  static = AuthContect;
  constructor(props) {
    super(props);
    this.refMostpicked = React.createRef();
  }

  componentDidMount() {
    document.title = "Halan Halan | Home";
    window.scrollTo(0, 0);
    // const { token } = this.context;

    if (!this.props.page.landingPage) {
      this.props.fetchPage(
        `${process.env.REACT_APP_BACKEND}/api/v1/landing-page`,
        "landingPage"
      );
    }
  }

  render() {
    const { page } = this.props;

    if (!page.hasOwnProperty("landingPage"))
      return (
        <>
          <LoadingPage />
        </>
      );

    return (
      <>
        <Header {...this.props}></Header>
        <div className="frame-section">
          <Hero
            refMostpicked={this.refMostpicked}
            data={page.landingPage.hero}
          />
          <MostPicked
            refMostpicked={this.refMostpicked}
            data={page.landingPage.mostPicked}
          />
          <Category data={page.landingPage.category} />
          <Testimonial data={page.landingPage.testimonial} />
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
});

// export default withRouter(landingPage);
export default connect(mapStateToProps, { fetchPage })(landingPage);
