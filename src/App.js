import "./assets/scss/style.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "pages/landingPage";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import DetailPage from "pages/detailPage";
import CheckOut from "pages/checkOut";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/details/:id", element: <DetailPage /> },
  { path: "/payment/:duration", element: <CheckOut /> },
]);

function App() {
  return (
    <RouterProvider router={router} />
    // <div className="App">

    // </div>
  );
}

export default App;
