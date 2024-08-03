import Button from "components/Button";
import Logo from "../assets/image/Logo_Halan2.png";
import { useAuth } from "auth/authProvider";
import { useState } from "react";
import ModalBS from "components/Modal";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { updateUser } from "../store/actions/checkOut";
import { myProfile, deleteObject } from "store/actions/page";
import Cookies from "js-cookie";

//Swal fire
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import InputText from "components/InputText";

// Toast js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

function Header(props) {
  const ConsumeContext = useAuth();
  const [show, setShowModal] = useState(false);
  const [allValues, setAllValues] = useState({
    name: props.page.profile.data
      ? props.page.profile.data.firstName +
        " " +
        props.page.profile.data.lastName
      : "",
    email: props.page.profile.data ? props.page.profile.data.email : "",
    phone: props.page.profile.data ? props.page.profile.data.handphone : "",
  });
  const [isLoadingBtn, setIsloadingBtn] = useState(false);
  const getActiveClassLink = (path) => {
    return window.location.pathname === path ? "active" : "";
  };

  const handlerInput = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    setIsloadingBtn(true);
    props
      .updateUser(
        {
          name: allValues.name,
          email: allValues.email,
          phone: allValues.phone,
        },
        Cookies.get("token")
      )
      .then(() => {
        props.myProfile(
          `${process.env.REACT_APP_BACKEND}/api/v1/my-profile`,
          "profile",
          Cookies.get("token")
        );
        toast.success(`Berhasil, Akun telah diupdate`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          onClose: () => {
            setIsloadingBtn(false);
          },
        });
      })
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

  const logOutFunction = () => {
    Swal.fire({
      title: "Apakah anda yakin, ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A30B3",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteObject("profile");
        ConsumeContext.logoutAction();
      }
    });
  };

  if (props.isPayment) {
    return (
      <header>
        <div className="container-fluid m-0 p-0 shadow-navbar fixed top-0 z-50">
          <nav className="navbar navbar-expand-lg bg-white lg:mx-[80px] md:mx-[40px] my-1 p-0">
            <div className="container-fluid m-0 p-0">
              <img
                src={Logo}
                alt="Logo Halan2"
                className="object-contain w-[110px] mx-auto h-[30]"
              />
            </div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header>
      <ToastContainer />
      <div className="container-fluid m-0 p-0 shadow-navbar fixed top-0 z-50">
        <nav className="navbar navbar-expand-lg bg-white lg:mx-[80px] md:mx-[40px] my-1 p-0">
          <div className="container-fluid m-0 p-0">
            <img
              src={Logo}
              alt="Logo Halan2"
              className="object-contain w-[110px] h-[30]"
            />
            <button
              className="navbar-toggler mr-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navigasi"
              aria-controls="navigasi"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse mx-3" id="navigasi">
              <ul className="navbar-nav ms-auto flex md:gap-x-14 gap-x-2">
                <li className="nav-item">
                  <Button
                    type="link"
                    href="/"
                    className={`nav-link ${getActiveClassLink("/")}`}
                  >
                    Home
                  </Button>
                </li>
                <li className="nav-item">
                  <Button
                    type="link"
                    href="/find"
                    className={`nav-link ${getActiveClassLink("/find")}`}
                  >
                    Find
                  </Button>
                </li>
                <li className="nav-item">
                  <Button
                    type="link"
                    href="/storie"
                    className={`nav-link ${getActiveClassLink("/storie")}`}
                  >
                    Storie
                  </Button>
                </li>
                <li className="nav-item">
                  <Button
                    type="link"
                    href="/about"
                    className={`nav-link ${getActiveClassLink("/about")}`}
                  >
                    About
                  </Button>
                </li>
                {props.page.profile.data ? (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {props.page.profile.data.firstName +
                        " " +
                        props.page.profile.data.lastName}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item text-primary-dark font-semibold"
                          onClick={() => setShowModal(true)}
                        >
                          Pengaturan
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item font-semibold"
                          onClick={logOutFunction}
                          style={{ color: "#d33" }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Button
                      type="link"
                      className={`nav-link w-fit`}
                      style={{
                        background: "#F79613",
                        borderRadius: "10px",
                        color: "white",
                        padding: "10px 10px",
                      }}
                      href="/login"
                    >
                      Login / Register
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {show && props.page.profile.data && (
        <ModalBS setShowModal={setShowModal} id="modal" show={show} size="sm">
          <UserCircleIcon className="w-50 h-50 mx-auto" />
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Nama</label>
              <InputText
                name="name"
                id="name"
                value={allValues.name}
                type="text"
                inputClassname="w-full"
                propsOnChange={handlerInput}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <InputText
                name="email"
                id="email"
                value={allValues.email}
                type="email"
                inputClassname="w-full"
                propsOnChange={handlerInput}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">No HP</label>
              <InputText
                name="phone"
                id="phone"
                type="tel"
                value={allValues.phone}
                inputClassname="w-full"
                propsOnChange={handlerInput}
              />
            </div>
            <Button
              type="button"
              className="text-white mt-4 bg-primary2 py-2 px-3 rounded-md font-normal ml-auto"
              onClick={submitForm}
            >
              {isLoadingBtn ? (
                <>
                  <span className="spinner-border spinner-border-sm mx-3"></span>
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </ModalBS>
      )}
    </header>
  );
}

export default connect(null, { updateUser, myProfile, deleteObject })(Header);
