import InputText from "components/InputText";
import Footer from "parts/Footer";
import Header from "parts/Header";
import ItemFind from "parts/ItemFind";
import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

//redux
import { connect } from "react-redux";
import { myProfile } from "store/actions/page";
import RunningText from "components/RunningText";

class findsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        nama: "",
        harga: "",
        kota: "",
      },
      search: "",
      data: [],
      city: [],
      page: 0,
      isLoading: true,
      isError: false,
      paginate: false,
      stopPaginate: false,
    };
    this.footer = React.createRef();
    this.content = React.createRef();
  }

  componentDidMount() {
    document.title = "Halan Halan | Find";
    window.scrollTo(0, 0);

    /* eslint-enable */
    this.fetchData();

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

  componentDidUpdate() {
    /* eslint-disable */
    const myCarouselElement = document.querySelector("#MyCarousel");
    new bootstrap.Carousel(myCarouselElement, {
      interval: 5000,
      touch: false,
    });
  }

  onChangeSearch = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.load()
    );
  };

  onChange = async (e) => {
    window.scrollTo({
      top: this.content.current.offsetTop - 240,
      behavior: "instant",
    });
    this.setState(
      {
        filter: {
          ...this.state.filter,
          [e.target.name]: e.target.value,
        },
      },
      () => this.load()
    );
  };

  load = () => {
    this.setState(
      {
        isLoading: true,
        page: 0,
        stopPaginate: false,
        paginate: false,
      },
      () => {
        this.fetchData();
        this.setState({ isLoading: false });
      }
    );
  };

  fetchData = async () => {
    const harga =
      this.state.filter.harga !== "" ? `&harga=${this.state.filter.harga}` : "";
    const kota =
      this.state.filter.kota !== "" ? `&kota=${this.state.filter.kota}` : "";
    const nama =
      this.state.filter.nama !== "" ? `&nama=${this.state.filter.nama}` : "";
    const search =
      this.state.search !== "" ? `&search=${this.state.search}` : "";

    await axios
      .get(
        `${process.env.REACT_APP_BACKEND}/api/v1/find-page?page=${this.state.page}${harga}${kota}${nama}${search}`
      )
      .then((res) => {
        if (this.state.paginate) {
          if (res.data.data.length === 0) {
            this.setState({
              stopPaginate: true,
              isLoading: false,
            });
          } else {
            this.setState({
              data: [...this.state.data, ...res.data.data],
              isLoading: false,
            });
          }
        } else {
          this.setState({ data: res.data.data, isLoading: false });
          let pushCity = [];
          for (let index = 0; index < res.data.city.length; index++) {
            pushCity.push(res.data.city[index]._id);
          }
          this.setState({
            city: pushCity,
          });
        }
      })
      .catch((res) => alert(res.message));
  };

  paginating = () => {
    if (!this.state.stopPaginate) {
      this.setState(
        {
          isLoading: true,
          page: this.state.page + 1,
          paginate: true,
        },
        () => {
          this.fetchData();
          this.setState({ isLoading: false });
        }
      );
    }
  };

  render() {
    const { nama, harga, kota } = this.state.filter;
    const { search, data, isLoading, isError, city } = this.state;
    if (this.props.page.profile) {
      return (
        <>
          <Header {...this.props}></Header>
          <div className="frame-section">
            <div
              id="MyCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-touch="true"
              data-bs-pause="false"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  disabled
                  data-bs-target="#MyCarousel"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  disabled
                  data-bs-target="#MyCarousel"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  disabled
                  data-bs-target="#MyCarousel"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner h-full">
                <div className="carousel-item active h-full">
                  <img
                    src="/assets/image/Apartemen%201.jpg"
                    className="h-full w-full object-fit-cover"
                    alt="..."
                  />
                  <div className="absolute bottom-[50%] translate-y-1/2 z-20 left-7 right-7 text-center text-white">
                    <h1 className="text-6xl text-white mb-4">
                      Cari Hotel Impianmu!
                    </h1>
                    <h4>
                      Gunakan input pencarian untuk menemukan hotel impianmu
                    </h4>
                  </div>
                </div>
                <div className="carousel-item h-full">
                  <img
                    src="/assets/image/Apartemen%202.jpg"
                    className="h-full w-full object-fit-cover"
                    alt="..."
                  />
                  <div className="absolute bottom-[50%] translate-y-1/2 z-20 left-7 right-7 text-center text-white">
                    <h1 className="text-6xl text-white mb-4">
                      Dari Termahal Hingga Termurah!
                    </h1>
                    <h4>Filter harga tersedia untuk meyesuaikan dompetmu</h4>
                  </div>
                </div>
                <div className="carousel-item h-full">
                  <img
                    src="/assets/image/Apartemen%203.jpg"
                    className="h-full w-full object-fit-cover"
                    alt="..."
                  />
                  <div className="absolute bottom-[50%] translate-y-1/2 z-20 left-7 right-7 text-center text-white">
                    <h1 className="text-6xl text-white mb-4">
                      Hotel Terdekat Hingga Terjauh{" "}
                    </h1>
                    <h4>Pencarian kota memudahkan mencari hotel dilokasimu</h4>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
              <InputText
                outerClassname="absolute z-[10px] bottom-[100px] w-[90%] mx-auto bg-transparent"
                name="search"
                id="search"
                type="text"
                value={search}
                propsOnChange={this.onChangeSearch}
                placeholder="Cari hotelmu disini..."
                load={this.load}
                search={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#F79613"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="white"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                }
              />
            </div>
            <section className="filter-search">
              <InputText
                outerClassname="w-full"
                name="search"
                id="search"
                type="text"
                value={search}
                propsOnChange={this.onChangeSearch}
                placeholder="Cari hotelmu disini..."
                load={this.load}
                search={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#F79613"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="white"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                }
              />
            </section>
            <ItemFind
              filterNama={nama}
              filterHarga={harga}
              filterKota={kota}
              propsOnChange={this.onChange}
              refFooter={this.footer}
              datas={data}
              paginating={this.paginating}
              isLoading={isLoading}
              isError={isError}
              refContent={this.content}
              city={city}
            />
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

export default connect(mapStateToProps, { myProfile })(findsPage);
