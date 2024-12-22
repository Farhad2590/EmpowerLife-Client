import { FaStar } from "react-icons/fa"; // React Icons (for Sparkle effect)

const DynamicHeader = ({ title }) => {
  return (
    <div className="relative py-8 px-4 md:px-8 overflow-hidden flex justify-center items-center  text-white">
      <div className="flex flex-col md:flex-row items-center relative">
        {/* Left Wave */}
        <div className="hidden md:block absolute left-[-80px] animate-wave">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <path
              d="M5 30 Q 15 20, 25 30 T 45 30"
              fill="none"
              stroke="#68b5c2"
              strokeWidth="2"
              opacity="0.4"
            />
            <path
              d="M0 35 Q 10 25, 20 35 T 40 35"
              fill="none"
              stroke="#68b5c2"
              strokeWidth="1.5"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Left Line with Dots */}
        <div className="relative flex flex-col items-center mr-3 mb-2 md:mr-0">
          <div className="w-20 md:w-32 h-0.5 bg-gradient-to-r from-transparent to-[#68b5c2] transition-all duration-300 transform hover:scale-x-110" />
          <div className="flex justify-end gap-2 mt-[-8px]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#68b5c2] animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="relative mx-4 group text-center md:text-left">
          <div className="absolute inset-[-2px] bg-[#68b5c2] opacity-10 rounded-lg blur-md scale-110 transition-all duration-300 group-hover:opacity-20 group-hover:scale-125" />
          <h1 className="relative px-6 py-3 text-lg md:text-xl font-bold text-white bg-gradient-to-r from-[#68b5c2] to-[#89c9d3] rounded-lg cursor-pointer transform group-hover:scale-105 group-hover:rotate-[-1deg] transition-all duration-300">
            {title}
          </h1>

          {/* Sparkles */}
          <div className="absolute top-1 left-1 animate-sparkle">
            <FaStar className="text-white opacity-30" />
          </div>
          <div className="absolute bottom-1 right-1 animate-sparkle" style={{ animationDelay: "0.5s" }}>
            <FaStar className="text-white opacity-30" />
          </div>
        </div>

        {/* Right Line with Dots */}
        <div className="relative flex flex-col items-center ml-3 mb-2 md:ml-0">
          <div className="w-20 md:w-32 h-0.5 bg-gradient-to-l from-transparent to-[#68b5c2] transition-all duration-300 transform hover:scale-x-110" />
          <div className="flex justify-start gap-2 mt-[-8px]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#68b5c2] animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Right Wave */}
        <div className="hidden md:block absolute right-[-80px] scale-x-[-1] animate-wave">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <path
              d="M5 30 Q 15 20, 25 30 T 45 30"
              fill="none"
              stroke="#68b5c2"
              strokeWidth="2"
              opacity="0.4"
            />
            <path
              d="M0 35 Q 10 25, 20 35 T 40 35"
              fill="none"
              stroke="#68b5c2"
              strokeWidth="1.5"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>

      {/* Floating Dots */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#68b5c2] opacity-20 animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default DynamicHeader;
