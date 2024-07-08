import Footer from "parts/Footer";
import Header from "parts/Header";
import React, { Component } from "react";
import ListBooking from "parts/ListBooking";
import Cookies from "js-cookie";
import axios from "axios";
// import { submitRating } from "store/actions/checkOut";

//redux
import { connect } from "react-redux";
import { myProfile } from "store/actions/page";

// Toast js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withRouter from "./withRouter";
import Swal from "sweetalert2";
import RunningText from "components/RunningText";

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
      },
      dataStorie: null,
    };
  }

  componentDidMount() {
    document.title = "Halan Halan | Storie";
    window.scrollTo(0, 0);
    this.fetchPage();

    if (!this.props.page.profile) {
      if (Cookies.get("token")) {
        this.props.myProfile(
          `${process.env.REACT_APP_BACKEND}/api/v1/my-profile`,
          "profile",
          Cookies.get("token")
        );
      }
    }
  }

  fetchPage = async () => {
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .get(`${process.env.REACT_APP_BACKEND}/api/v1/storie-page`)
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
    const { foto, nilai, testimonial, itemId } = this.state.data;
    const formData = new FormData();
    formData.append("nilai", nilai);
    formData.append("gambar", foto);
    formData.append("testimonial", testimonial);
    formData.append("itemId", itemId);
    formData.append("methode", "post");
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .post(`${process.env.REACT_APP_BACKEND}/api/v1/post-rating`, formData, {
        headers: { contentType: "multipart/form-data" },
      })
      .then(() =>
        Swal.fire({
          title: "Terimakasih atas rating dan testimonialnya",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.fetchPage();
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
    const { foto, nilai, testimonial, itemId, testiId } = this.state.data;
    const formData = new FormData();
    formData.append("nilai", nilai);
    if (typeof foto === "object") {
      formData.append("gambar", foto);
    }
    formData.append("testimonial", testimonial);
    formData.append("itemId", itemId);
    formData.append("testiId", testiId);
    formData.append("methode", "update");
    const token = Cookies.get("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .post(`${process.env.REACT_APP_BACKEND}/api/v1/post-rating`, formData, {
        headers: { contentType: "multipart/form-data" },
      })
      .then(() =>
        Swal.fire({
          title: "Terimakasih atas rating dan testimonialnya",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.fetchPage();
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
    if (dataStorie && this.props.page.profile) {
      return (
        <>
          <Header {...this.props}></Header>
          <div className="frame-section full-height">
            <ToastContainer />
            <div className={`main ${dataStorie === 0 ? "mid" : ""} `}>
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
    } else {
      return (
        <div className="w-full h-screen flex justify-center items-center">
          <div role="status" className="mr-2">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin fill-prmary-blue"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only text-prmary-blue">Tunggu ya...</span>
          </div>
          <h5 className="text-prmary-blue m-0 p-0">
            Tunggu ya
            <RunningText text={"..."} />
          </h5>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  page: state.page,
});

export default connect(mapStateToProps, { myProfile })(storiePage);
