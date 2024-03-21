import axios from "axios";
import { useContext, createContext, useState } from "react";

export const AuthContect = createContext();
import { useLocation, useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [pathname, setPathname] = useState("");

  const getPathname = () => {
    const { pathname } = location;
    setPathname(pathname);
  };

  const loginAction = async (data) => {
    await axios
      .post("http://localhost:3000/api/v1/login", data)
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
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
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <AuthContect.Provider
      value={{ token, loginAction, logoutAction, getPathname, pathname }}
    >
      {children}
    </AuthContect.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContect);
};
