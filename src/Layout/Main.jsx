import { Outlet } from "react-router-dom";
import Navbar from "../Components/SharedComponets/Navbar";
import { Box } from "@mui/material";
import Footer from "../Components/SharedComponets/Footer";

const Main = () => {
    return (
        <div>
            <Navbar />
            <Box
                sx={{
                    width: '95%', // Set width to 95%
                    margin: '0 auto', // Centers the content horizontally
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh', // Optional: to ensure content stretches vertically if needed
                }}
            >

                <Outlet />
            </Box>
            <Footer />
        </div>
    );
};

export default Main;