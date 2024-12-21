import { Outlet } from "react-router-dom";
import Navbar from "../Components/SharedComponets/Navbar";
import Footer from "../Components/SharedComponets/Footer";
import ChatBot from "../Components/SharedComponets/ChatBot";
// import ChatBot from "../Components/ChatBot";

const Main = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="w-[95%] mx-auto flex flex-col items-center flex-grow">
                <Outlet />
            </div>
            <Footer />
            <ChatBot />
        </div>
    );
};

export default Main;