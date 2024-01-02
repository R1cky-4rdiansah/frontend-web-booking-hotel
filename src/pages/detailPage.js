import Button from "components/Button";
import Header from "parts/Header";
import ImageDetails from "parts/ImageDetails";
import React, { Component } from "react";
import withRouter from "./withRouter";
import detailPageApi from "../api/detailPageApi.json";
import TextDetsails from "parts/TextDetsails";
import NotFound from "components/NotFound";

class detailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      paramsId: this.props.params.id,
    };
  }

  componentDidMount() {
    this.setState({ data: detailPageApi[this.state.paramsId] });
    document.title = "Details Page";
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <Header {...this.props} />
        {typeof this.state.data !== "undefined" ? (
          <>
            <ImageDetails data={this.state.data} />
            <TextDetsails data={this.state.data} />
          </>
        ) : (
          <div className="h-screen w-full flex justify-center items-center">
            <NotFound text={'Data not found...'} />
          </div>
        )}
      </>
    );
  }
}

export default withRouter(detailPage);
