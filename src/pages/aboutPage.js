import InputText from "components/InputText";
import Footer from "parts/Footer";
import Header from "parts/Header";
import React, { Component } from "react";
import axios from "axios";
import Hero from "parts/AboutMe/Hero";
import Skills from "parts/AboutMe/Skills";
import Service from "parts/AboutMe/Service";
import Edu from "parts/AboutMe/Edu";
import Contact from "parts/AboutMe/Contact";

export default class aboutPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Halan Halan | About Me";
    window.scrollTo(0, 0);
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
