import React, { useState } from "react";
import "./login.scss";
import InputText from "components/InputText";
import Button from "components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Toast js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "auth/authProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const ConsumeContext = useAuth();
  const [isLoadingBtn, setIsloadingBtn] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [type, setType] = useState("password");
  document.title = "Halan Halan | Login";

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    setIsloadingBtn(true);
    await ConsumeContext.loginAction(data);
    setIsloadingBtn(false);
    return;
  };

  return (
    <div className="container-login">
      <ToastContainer />
      <div className="wrapper-login">
        <div className="left-wrapper">
          <div className="wrapper">
            <div>
              <h1 className="text-white font-medium">Selamat Datang</h1>
              <p className="mt-10 text-lg text-white font-medium">
                Untuk tetap terhubung dengan kami, silakan login dengan
                informasi pribadi Anda
              </p>
            </div>
          </div>
        </div>
        <div className="right-wrapper">
          <form
            className="content flex justify-center items-center flex-col"
          >
            <h1 className="text-secondary-gray mb-20">Login_</h1>
            <InputText
              name="username"
              id="username"
              value={data.username}
              propsOnChange={onChange}
              inputClassname="w-full"
              outerClassname="username"
              type="text"
            />
            <InputText
              name="password"
              id="password"
              value={data.password}
              propsOnChange={onChange}
              inputClassname="w-full"
              outerClassname="password mt-10"
              type={type}
              secure={
                type === "password" ? (
                  <button onClick={() => setType("text")} type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#718096"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  </button>
                ) : (
                  <button onClick={() => setType("password")} type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#718096"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  </button>
                )
              }
            />
            <Button
              type="button"
              isDisabled={
                (data.username && data.password) !== "" ? false : true
              }
              onClick={submitForm}
              className="bg-primary-orange text-center text-white py-2 w-full mt-20 rounded"
            >
              {isLoadingBtn ? (
                <>
                  <span className="spinner-border spinner-border-sm mx-5"></span>
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
            <span className="text-sm text-secondary-gray mt-2 font-medium mb-0">
              Or
            </span>
            <p className="text-sm text-secondary-gray font-medium mt-2 mb-0">
              Belum punya akun,{" "}
              <Button
                type="link"
                target="_blank"
                href="/register"
                className="text-prmary-blue font-medium"
              >
                Register
              </Button>{" "}
              disini.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
