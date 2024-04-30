import InputText from "components/InputText";
import Footer from "parts/Footer";
import Header from "parts/Header";
import ItemFind from "parts/ItemFind";
import React, { Component } from "react";
import axios from "axios";

export default class findsPage extends Component {
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

    const myCarouselElement = document.querySelector("#MyCarousel");
    new bootstrap.Carousel(myCarouselElement, {
      interval: 4000,
      touch: false,
    });
    this.fetchData();
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
        `http://localhost:3000/api/v1/find-page?page=${this.state.page}${harga}${kota}${nama}${search}`
      )
      .then((res) => {
        if (this.state.paginate) {
          if (res.data.data.length == 0) {
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
                data-bs-target="#MyCarousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#MyCarousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#MyCarousel"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner h-full">
              <div className="carousel-item active h-full">
                <img
                  src="http://localhost:3001/assets/image/Apartemen%201.jpg"
                  className="h-full w-full"
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
                  src="http://localhost:3001/assets/image/Apartemen%202.jpg"
                  className="h-full w-full"
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
                  src="http://localhost:3001/assets/image/Apartemen%203.jpg"
                  className="h-full w-full"
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
  }
}
