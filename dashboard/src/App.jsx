import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/Registration";
import OTPVerification from "./pages/OTPVerification";
import RootLayout from "../components/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResendVerify from "./pages/ResendVerify";
import LinkVerification from "./pages/LinkVerification";
import ForgotPassord from "./pages/ForgotPassword";
import UpdatePass from "./pages/UpdatePass";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/resendverify" element={<ResendVerify />}></Route>
        <Route
          path="/linkVerification/:token"
          element={<LinkVerification />}
        ></Route>
        <Route
          path="/otpverification/:email"
          element={<OTPVerification />}
        ></Route>
        <Route path="/forgotpassord" element={<ForgotPassord />}></Route>
        <Route path="/updatepass/:token" element={<UpdatePass />}></Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
