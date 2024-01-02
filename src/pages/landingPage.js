import React, { Component, useRef } from "react";

import LandingPageApi from "api/landingPageApi.json";

import Header from "parts/Header";
import Hero from "parts/Hero";
import MostPicked from "parts/MostPicked";
import Category from "parts/Category";
import Testimonial from "parts/Testimonial";
import Footer from "parts/Footer";
import withRouter from "./withRouter";
class landingPage extends Component {
  constructor(props) {
    super(props);
    this.refMostpicked = React.createRef();
  }
 
  componentDidMount() {
    document.title = "Halan Halan | Home";
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header {...this.props}></Header>
        <div className="frame-section">
          <Hero refMostpicked={this.refMostpicked} data={LandingPageApi.hero} />
          <MostPicked
            refMostpicked={this.refMostpicked}
            data={LandingPageApi.most_picked}
          />
          <Category data={LandingPageApi.category} />
          <Testimonial data={LandingPageApi.testimonial} />
          <Footer />
        </div>
      </>
    );
  }
}

export default withRouter(landingPage);
