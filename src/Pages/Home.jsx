import Slider from "../Components/HomeComponents/Slider";
import AssistiveEquipmentCategories from "../Components/HomeComponents/AssistiveEquipmentCategories";
import WhyChooseUs from "../Components/HomeComponents/WhyChooseUs";
import NewsletterSignup from "../Components/HomeComponents/NewsletterSignup";
import BestSellerCard from "../Components/HomeComponents/BestSellerCard";
import Coupons from "../Components/HomeComponents/Coupons";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center min-h-screen mt-5 mx-auto">
      <Slider />
      <AssistiveEquipmentCategories />
      <Coupons />
      <BestSellerCard />
      <WhyChooseUs />
      <NewsletterSignup />
    </div>
  );
};

export default Home;
