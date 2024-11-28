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
import ApartmentListing from "../Pages/ApartmentListing";
import ApartmentDetails from "../Components/ApartmentDetails";

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
                element: <ApartmentListing/>,
            },
            {
                path: "/product/:id",
                element: <ApartmentDetails/>,
            },
            {
                path: "/contactUs",
                element: <ContactUs />,
            },
            {
                path: "/blogs",
                element: <BlogPage />,
            },
            {
                path: "/signin",
                element: <SignIn />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            }
        ]
    }
]);