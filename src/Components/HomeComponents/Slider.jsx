import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Bubbles = () => {
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="absolute w-full h-full overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bg-[#68b5c2] rounded-full opacity-10 animate-float"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            animationDuration: `${bubble.duration}s`,
          }}
        ></div>
      ))}
    </div>
  );
};


const sliderData = [
  {
    image: "https://i.ibb.co.com/nkVv29n/new2.jpg",
    title: "Wheelchair",
    subtitle:
      "Wheelchairs, available in both manual and electric models, provide mobility support for individuals with limited or no ability to walk.",
    buttonLabel: "Learn More",
  },
  {
    image: "https://i.ibb.co.com/XkvFqdM/new1.jpg",
    title: "Walkers",
    subtitle:
      "Walkers and rollators are assistive devices that offer stability and balance for people who need support while walking.",
    buttonLabel: "Explore Products",
  },
  {
    image: "https://i.ibb.co.com/KKF7sQ5/new3.jpg",
    title: "Hearing Aids",
    subtitle:
      "Hearing aids amplify sound, helping people with hearing loss better understand speech and environmental sounds.",
    buttonLabel: "Get Started",
  },
  {
    image: "https://i.ibb.co.com/NtLQF88/new4.jpg",
    title: "Keyboards",
    subtitle:
      "Designed for individuals with limited hand mobility, these keyboards offer larger keys and alternative layouts.",
    buttonLabel: "Get Started",
  },
];

const EnhancedSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-[500px]">
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-500 ${
              index === currentSlide ? "translate-x-0 opacity-100" : "hidden"
            }`}
          >
            <Bubbles />
            <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-center gap-5 px-4 md:px-8">
              <div className="w-full flex items-center justify-center md:w-1/2 mb-4 md:mb-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="rounded-lg shadow-md w-80 h-80"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-2xl font-bold text-[#68b5c2] mb-4">
                  {slide.title}
                </h2>
                <p className="text-gray-600 mb-4">{slide.subtitle}</p>
                <button className="bg-[#68b5c2] text-white px-6 py-2 rounded-lg hover:bg-[#58a5b2]">
                  {slide.buttonLabel}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-[#68b5c2] p-2 rounded-full shadow-lg hover:bg-gray-100"
      >
        <FiArrowLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-[#68b5c2] p-2 rounded-full shadow-lg hover:bg-gray-100"
      >
        <FiArrowRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-8 h-2 rounded-full cursor-pointer ${
              index === currentSlide ? "bg-[#68b5c2]" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedSlider;
