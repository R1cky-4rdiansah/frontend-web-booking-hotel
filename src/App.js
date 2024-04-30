import "./assets/scss/style.scss";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import LandingPage from "pages/landingPage";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import DetailPage from "pages/detailPage";
import CheckOut from "pages/checkOut";
import OrderDetails from "pages/orderDetails";
import LoginPage from "parts/Login/LoginPage";
import RegisterPage from "parts/Register/RegisterPage";
import AuthProvider, { useAuth } from "auth/authProvider";
import FindsPage from "pages/findsPage";
import StoriePage from "pages/storiePage";

// const router = createBrowserRouter([
//   { path: "/", element: <LandingPage /> },
//   { path: "/details/:id", element: <DetailPage /> },
//   { path: "/payment", element: <CheckOut /> },
//   { path: "/order-details/:invoice", element: <OrderDetails /> },
//   { path: "/login", element: <LoginPage /> },
//   { path: "/register", element: <RegisterPage /> },
// ]);

const PrivateRoute = () => {
  const consumer = useAuth();
  if (!consumer.token) {
    consumer.getPathname();
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

function App() {
  return (
    // <RouterProvider router={router} />
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/details/:id" element={<DetailPage />} />
            <Route path="/payment" element={<CheckOut />} />
            <Route path="/order-details/:invoice" element={<OrderDetails />} />
            <Route path="/find" element={<FindsPage />} />
            <Route path="/storie" element={<StoriePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
