/* eslint-disable */
import axios from "axios";
import { useContext, createContext, useState } from "react";

export const AuthContect = createContext();
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [pathname, setPathname] = useState("");

  const getPathname = () => {
    const { pathname } = location;
    setPathname(pathname);
  };

  const loginAction = async (data) => {
    axios.defaults.withCredentials = true;
    await axios
      .post(`${process.env.REACT_APP_BACKEND}/api/v1/login`, data)
      .then((res) => {
        setToken(res.data.token);
        navigate(pathname);
      })
      .catch((err) => {
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

  const logoutAction = () => {
    setToken(null);
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <AuthContect.Provider
      value={{
        token,
        loginAction,
        logoutAction,
        getPathname,
        pathname,
      }}
    >
      <ToastContainer />
      {children}
    </AuthContect.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContect);
};
