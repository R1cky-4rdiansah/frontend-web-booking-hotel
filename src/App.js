import "./assets/scss/style.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "pages/landingPage";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const router = createBrowserRouter([
  { path:"/", element: <LandingPage />},
]);

function App() {
  return (
    <RouterProvider router={router} />
    // <div className="App">

    // </div>
  );
}

export default App;
