import Button from "components/Button";
import React from "react";
import Logo from "../assets/image/Logo_Halan2.png";

export default function Header(props) {
  const getActiveClassLink = (path) => {
    return props.location.pathname === path ? "active" : "";
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
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
