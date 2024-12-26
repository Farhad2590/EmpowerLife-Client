import {
    createBrowserRouter,
} from "react-router-dom";

import Home from "../Pages/Home";
import Main from "../Layout/Main";
import SignIn from "../Pages/Signin";
import SignUp from "../Pages/Signup";
import Product from "../Pages/Product";
// import ContactUsPage from "../Pages/ContactUs";
import BlogPage from "../Pages/BlogPage";
import ContactUs from "../Pages/ContactUs";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Pages/AdminPages/Profile";
import ManageUser from "../Pages/AdminPages/ManageUser";
import ManageWriter from "../Pages/AdminPages/ManageWriter";
import AddProduct from "../Pages/AdminPages/AddProduct";
import ManageCoupons from "../Pages/AdminPages/ManageCoupons";
import MakeAnnouncement from "../Pages/AdminPages/MakeAnnouncement";
import ManageBlogs from "../Pages/WriterPages/ManageBlogs";
import PaymentFrom from "../Pages/PaymentFrom";
import MyOrders from "../Pages/UserPage/MyOrders";
import PaymentSummary from "../Pages/PaymentSummary";
import Payments from "../Pages/Payments";
import PaymentHistory from "../Pages/UserPage/PaymentHistory";
import PurchasedProducts from "../Pages/UserPage/PurchasedProducts";
import PrivateRoute from "../routes/PrivateRoute";
import PaymentForm from "../Pages/PaymentFrom";
import DeliveryStatus from "../Pages/UserPage/DeliveryStatus";
// import ApartmentDetails from "../Components/ApartmentDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/product",
                element: <PrivateRoute><Product /></PrivateRoute>,
            },
            {
                path: "/product/:id",
                element: <PrivateRoute><ProductDetails /></PrivateRoute>,
            },
            {
                path: "/contactUs",
                element: <PrivateRoute><ContactUs /></PrivateRoute>,
            },
            {
                path: "/cart",
                element: <PrivateRoute><Cart /></PrivateRoute>,
            },
            {
                path: "/blogs",
                element: <PrivateRoute><BlogPage /></PrivateRoute>,
            },
            {
                path: "/checkout",
                element: <PrivateRoute><PaymentForm /></PrivateRoute>,
            },
            {
                path: "/payments",
                element: <PrivateRoute><Payments /></PrivateRoute>,
            },
            {
                path: "/paymentSummary",
                element: <PrivateRoute><PaymentSummary /></PrivateRoute>,
            },

        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "adminProfile",
                element: <Profile />,
            },
            {
                path: "manageUsers",
                element: <ManageUser />,
            },
            {
                path: "manageWriter",
                element: <ManageWriter />,
            },
            {
                path: "addProduct",
                element: <AddProduct />,
            },
            {
                path: "manageCoupons",
                element: <ManageCoupons />,
            },
            {
                path: "makeAnnouncement",
                element: <MakeAnnouncement />,
            },
            //Writer
            {
                path: "writerProfile",
                element: <Profile />,
            },
            {
                path: "manageBlogs",
                element: <ManageBlogs />,
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory />,
            },
            {
                path: "purchasedProducts",
                element: <PurchasedProducts />,
            },
            {
                path: "deliveryStatus",
                element: <DeliveryStatus />,
            },
            

            //User
            {
                path: "userProfile",
                element: <Profile />,
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory />,
            },
            {
                path: "purchasedProducts",
                element: <PurchasedProducts />,
            },

        ]
    },
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    }
]);