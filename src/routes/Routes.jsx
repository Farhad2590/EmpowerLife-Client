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
                element: <Product />,
            },
            {
                path: "/product/:id",
                element: <ProductDetails />,
            },
            {
                path: "/contactUs",
                element: <ContactUs />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/blogs",
                element: <BlogPage />,
            },
            {
                path: "/checkout",
                element: <PaymentFrom />,
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

            //User
            {
                path: "userProfile",
                element: <Profile />,
            },
            {
                path: "myOrders",
                element: <MyOrders />,
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