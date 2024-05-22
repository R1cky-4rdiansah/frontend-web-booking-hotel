import Footer from "parts/Footer";
import Header from "parts/Header";
import React, { Component } from "react";
import ListBooking from "parts/ListBooking";
import Cookies from "js-cookie";
import axios from "axios";
// import { submitRating } from "store/actions/checkOut";
// import { connect } from "react-redux";

// Toast js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withRouter from "./withRouter";
import Swal from "sweetalert2";

export class storiePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        itemId: null,
        testiId: null,
        foto: null,
        nilai: 5,
        testimonial: "",
        userId: Cookies.get("userId").split('"')[1],
      },
      dataStorie: null,
    };
  }

  componentDidMount() {
    document.title = "Halan Halan | Storie";
    window.scrollTo(0, 0);
    this.fetchPage();
  }

  fetchPage = async () => {
    const token = Cookies.get("token");
    const userId = this.state.data.userId;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .post("http://localhost:3000/api/v1/storie-page", { userId })
      .then((res) => {
        this.setState({
          dataStorie: res.data.data,
        });
      });
  };

  onChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  onChangeEdit = (itemId, foto, nilai, testimonial, testiId) => {
    this.setState({
      data: {
        ...this.state.data,
        itemId: itemId,
        foto: foto,
        nilai: nilai,
        testimonial: testimonial,
        testiId: testiId,
      },
    });
  };

  sendTestionial = async () => {
    const { foto, nilai, testimonial, itemId, userId } = this.state.data;
    const formData = new FormData();
    formData.append("nilai", nilai);
    formData.append("gambar", foto);
    formData.append("testimonial", testimonial);
    formData.append("itemId", itemId);
    formData.append("userId", userId);
    formData.append("methode", "post");
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .post("http://localhost:3000/api/v1/post-rating", formData, {
        headers: { contentType: "multipart/form-data" },
      })
      .then(() =>
        Swal.fire({
          title: "Terimakasih atas rating dan testimonialnya",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.props.navigate(0);
        })
      )
      .catch((err) =>
        toast.error(`${err.message}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

  updateTestominail = async () => {
    const { foto, nilai, testimonial, itemId, userId, testiId } =
      this.state.data;
    const formData = new FormData();
    formData.append("nilai", nilai);
    if (typeof foto === "object") {
      formData.append("gambar", foto);
    }
    formData.append("testimonial", testimonial);
    formData.append("itemId", itemId);
    formData.append("userId", userId);
    formData.append("testiId", testiId);
    formData.append("methode", "update");
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .post("http://localhost:3000/api/v1/post-rating", formData, {
        headers: { contentType: "multipart/form-data" },
      })
      .then(() =>
        Swal.fire({
          title: "Terimakasih atas rating dan testimonialnya",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.props.navigate(0);
        })
      )
      .catch((err) =>
        toast.error(`${err.message}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

  render() {
    const { data, dataStorie } = this.state;
    if (dataStorie === null) {
      return null;
    } else {
      return (
        <>
          <Header {...this.props}></Header>
          <div className="frame-section full-height">
            <ToastContainer />
            <div className={`main ${dataStorie == 0 ? "mid" : ""} `}>
              <ListBooking
                propsOnChange={this.onChange}
                sendTestionial={this.sendTestionial}
                data={data}
                dataStorie={dataStorie}
                updateTestominail={this.updateTestominail}
                onChangeEdit={this.onChangeEdit}
              />
            </div>
            <Footer refFooter={this.footer} />
          </div>
        </>
      );
    }
  }
}

export default withRouter(storiePage);
// export default connect(null, { submitRating })(storiePage);
