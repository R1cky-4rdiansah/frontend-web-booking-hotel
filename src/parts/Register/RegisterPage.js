import React, { useState } from "react";
import "./register.scss";
import InputText from "components/InputText";
import Button from "components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Toast js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoadingBtn, setIsloadingBtn] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [type, setType] = useState("password");
  document.title = "Halan Halan | Register";

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    setIsloadingBtn(true);
    // const formdata = new FormData();

    // formdata.append("username", data.username);
    // formdata.append("password", data.password);
    // formdata.append("email", data.email);

    await axios
      .post(`${process.env.REACT_APP_BACKEND}/api/v1/register`, data)
      .then(() => {
        toast.success(`Berhasil, Akun telah dibuat silahkan login`, {
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
            navigate("/login");
          },
        });
      })
      .catch((err) => {
        setIsloadingBtn(false);
        toast.error(`${err.response.data.message}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <div className="container-register">
      <ToastContainer />
      <div className="wrapper-register">
        <div className="left-wrapper">
          <div className="wrapper">
            <div>
              <h1 className="text-white font-medium">Buat Akun</h1>
              <p className="mt-10 text-lg text-white font-medium">
                Masukkan data pribadi Anda untuk membuat akun pribadi dan
                mulailah perjalanan bersama kami
              </p>
            </div>
          </div>
        </div>
        <div className="right-wrapper">
          <div className="content flex justify-center items-center flex-col">
            <h1 className="text-secondary-gray mb-20">Register_</h1>
            <InputText
              name="username"
              id="username"
              type="text"
              value={data.username}
              propsOnChange={onChange}
              inputClassname="w-full"
              outerClassname="username"
            />
            <InputText
              name="email"
              id="email"
              type="email"
              value={data.email}
              propsOnChange={onChange}
              inputClassname="w-full"
              outerClassname="email mt-10"
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
                (data.email && data.username && data.password) !== ""
                  ? false
                  : true
              }
              onClick={submitForm}
              className="bg-prmary-blue text-center text-white py-2 w-full mt-20 rounded"
            >
              {isLoadingBtn ? (
                <>
                  <span className="spinner-border spinner-border-sm mx-5"></span>
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                "Register"
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
                href="/login"
                className="text-primary-orange font-medium"
              >
                Login
              </Button>{" "}
              disini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
