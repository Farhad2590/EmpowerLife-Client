import { Box } from "@mui/material";
import Slider from "../Components/HomeComponents/Slider";
import AssistiveEquipmentCategories from "../Components/HomeComponents/AssistiveEquipmentCategories";
import WhyChooseUs from "../Components/HomeComponents/WhyChooseUs";
import NewsletterSignup from "../Components/HomeComponents/NewsletterSignup";
import BestSellerCard from "../Components/HomeComponents/BestSellerCard";
import Coupons from "../Components/HomeComponents/Coupons";

const Home = () => {
    return (
        <Box
            sx={{
                width: '100%', // Set width to 95%
                margin: '0 auto', // Centers the content horizontally
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                mt: 5, // Optional: to ensure content stretches vertically if needed
            }}
        >
            <Slider />
            <AssistiveEquipmentCategories/>
            <Coupons/>
            <BestSellerCard/>
            <WhyChooseUs/>
            <NewsletterSignup/>
            
        </Box>
    );
};

export default Home;