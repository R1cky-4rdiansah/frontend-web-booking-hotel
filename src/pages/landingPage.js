import React, { Component, useRef } from "react";

import LandingPageApi from "api/landingPageApi.json";

import Header from "parts/Header";
import Hero from "parts/Hero";
import MostPicked from "parts/MostPicked";
import Category from "parts/Category";
import Testimonial from "parts/Testimonial";
import Footer from "parts/Footer";
export default class landingPage extends Component {
  constructor(props) {
    super(props);
    this.refMostpicked = React.createRef();
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
        {/* <Fullpage>
          <FullpageNavigation />
          <FullPageSections>
            <FullpageSection>
              <div className="h-screen overflow-y-auto">
                <Header {...this.props}></Header>
                <Hero data={LandingPageApi.hero} />
              </div>
            </FullpageSection>
            <FullpageSection>
              <MostPicked data={LandingPageApi.most_picked} />
            </FullpageSection>
            {/* <FullpageSection>
              <h1>Screen 3</h1>
            </FullpageSection>
            <FullpageSection>
              <h1>Screen 4</h1>
            </FullpageSection>
          </FullPageSections>
        </Fullpage> */}
      </>
    );
  }
}
