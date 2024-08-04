import Footer from "parts/Footer";
import Header from "parts/Header";
import React, { Component } from "react";
import Hero from "parts/AboutMe/Hero";
import Skills from "parts/AboutMe/Skills";
import Service from "parts/AboutMe/Service";
import Edu from "parts/AboutMe/Edu";
import Contact from "parts/AboutMe/Contact";
import Cookies from "js-cookie";

//redux
import { connect } from "react-redux";
import { myProfile } from "store/actions/page";

class aboutPage extends Component {
  componentDidMount() {
    document.title = "Halan Halan | About Me";
    window.scrollTo(0, 0);

    if (!this.props.page.hasOwnProperty("profile")) {
      if (Cookies.get("token")) {
        this.props.myProfile(
          `${process.env.REACT_APP_BACKEND}/api/v1/my-profile`,
          "profile",
          Cookies.get("token")
        );
      }
    }
  }

  render() {
    return (
      <>
        <Header {...this.props}></Header>
        <div className="frame-section-about">
          <Hero />
          <Skills />
          <Service />
          <Edu />
          <Contact />
          <Footer refFooter={this.footer} />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
});

// export default withRouter(landingPage);
export default connect(mapStateToProps, { myProfile })(aboutPage);
