import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineArrowRight } from "react-icons/ai";
import Lottie from "lottie-react";
import animationData from "../assets/annimation/login.json";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate()
  const { signInWithGoogle, createUser, updateUserProfile, user, setUser } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target
    const email = form.email.value
    const pass = form.password.value

    const result = await createUser(email, pass)
    console.log(result.user);
    if (result.user) {

      const userData = {
        email: result.user.email,
        name: form.name.value,
        photo: result.user.photoURL || "https://i.ibb.co/ScLz5b5/pic1.jpg",
        createdAt: new Date().toISOString(),
        role : "user"
      };
      console.log(userData);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);

      if (response.data.insertedId) {
        console.log("User successfully added to the database:", response.data);
        navigate('/'); // Navigate after successful addition
      } else {
        console.error("Failed to add user to the database.");
      }
    } else {
      console.error("User creation failed, no user object returned.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Step 1: Sign in with Google
      const result = await signInWithGoogle();
      console.log("Signed-in User:", result.user);

      if (result.user) {
        // Step 2: Construct the user data
        const userData = {
          email: result.user.email,
          name: result.user.displayName,
          photo: result.user.photoURL || "https://i.ibb.co/ScLz5b5/pic1.jpg",
          createdAt: new Date().toISOString(),
          role : "user"
        };
        console.log("User Data:", userData);

        // Step 3: Post the user data to the database
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData);

        if (response.data.insertedId) {
          console.log("User successfully added to the database:", response.data);
          navigate('/'); // Navigate after successful addition
        } else {
          console.error("Failed to add user to the database.");
        }
      } else {
        console.error("Google sign-in failed, no user object returned.");
      }
    } catch (err) {
      console.error("Error during Google sign-in or data submission:", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Left Side Animation */}
      <div className="lg:w-1/2 flex items-center justify-center p-6">
        <Lottie animationData={animationData} loop={true} className="w-full max-w-lg" />
      </div>

      {/* Right Side Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 bg-white shadow-lg rounded-lg">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create an Account</h2>
          <p className="text-center text-gray-600 mb-6">Join us today!</p>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg p-2 mb-4 hover:bg-gray-50 transition"
          >
            <FaGoogle className="text-xl text-gray-500 mr-2" />
            <span className="text-gray-700">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2] transition"
                required
              />
            </div>

            {/* Email */}
            <div className="relative mb-4">
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2] transition"
                required
              />
            </div>

            {/* Mobile */}
            <div className="relative mb-4">
              <FaPhone className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2] transition"
                required
              />
            </div>

            {/* Password */}
            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-3 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2] transition"
                required
              />
              <div
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start mb-4">
              <input type="checkbox" required className="mt-1 mr-2" />
              <p className="text-gray-600 text-sm">
                I agree to the{" "}
                <a href="#" className="text-[#68b5c2] underline">
                  Terms and Conditions
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#68b5c2] text-white rounded-lg py-2 hover:bg-[#5aa1ad] transition flex items-center justify-center"
            >
              Sign Up
              <AiOutlineArrowRight className="ml-2" />
            </button>
          </form>

          {/* Already have an account */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/signin" className="text-[#68b5c2] underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;