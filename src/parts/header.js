import Button from "components/Button";
import React from "react";
import Logo from "../assets/image/Logo_Halan2.png";
import { useAuth } from "auth/authProvider";

//Swal fire
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export default function Header(props) {
  const ConsumeContext = useAuth();
  const getActiveClassLink = (path) => {
    return window.location.pathname === path ? "active" : "";
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
                    href="/agents"
                    className={`nav-link ${getActiveClassLink("/agents")}`}
                  >
                    Agents
                  </Button>
                </li>
                <li className="nav-item">
                  {localStorage.getItem("token") ? (
                    <Button
                      onClick={logOutFunction}
                      type="button"
                      className={`nav-link`}
                      style={{
                        background: "#d33",
                        borderRadius: "10px",
                        color: "white",
                        padding: "10px 10px",
                      }}
                    >
                      Logout
                    </Button>
                  ) : (
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
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
