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
import AddCategory from "../components/AddCategory";
import AddUser from "../components/AddUser";
import ViewUser from "../components/ViewUser";
import AddProduct from "../components/AddProduct";
import ViewProduct from "../components/ViewProduct";
import ViewCategory from "../components/ViewCategory";
import AddDiscount from "../components/AddDiscount";
import ViewDiscount from "../components/ViewDiscount";
import Setting from "../components/Setting";
import AddSubCategory from "../components/AddSubCategory";
import ViewSubCategory from "../components/ViewSubCategory";
import LoggedInUser from "./PrivateRoute/LoggedInUser";
import LoggedOutUser from "./PrivateRoute/LoggedOutUser";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={LoggedOutUser}>
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
        <Route element={<LoggedInUser />}>
          <Route path="/" element={<Home />}>
            <Route path="adduser" element={<AddUser />}></Route>
            <Route path="viewuser" element={<ViewUser />}></Route>
            <Route path="addproduct" element={<AddProduct />}></Route>
            <Route path="viewproduct" element={<ViewProduct />}></Route>
            <Route path="addcategory" element={<AddCategory />}></Route>
            <Route path="viewcategory" element={<ViewCategory />}></Route>
            <Route path="addsubcategory" element={<AddSubCategory />}></Route>
            <Route path="viewsubcategory" element={<ViewSubCategory />}></Route>
            <Route path="adddiscount" element={<AddDiscount />}></Route>
            <Route path="viewdiscount" element={<ViewDiscount />}></Route>
            <Route path="setting" element={<Setting />}></Route>
          </Route>
        </Route>
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
