import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock, FaGoogle, FaArrowRight } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Lottie from 'lottie-react';
import animationData from '../assets/annimation/login.json';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log('Sign In Data:', data);
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In triggered');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold text-[#68b5c2] text-center mb-4">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-6">Sign in to access your account</p>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition mb-4"
          >
            <FaGoogle className="mr-2 text-red-500" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#68b5c2] focus:outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#68b5c2] focus:outline-none ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 focus:outline-none"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-[#68b5c2] text-sm hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#68b5c2] text-white py-2 rounded-lg hover:bg-teal-600 transition flex items-center justify-center"
            >
              Sign In
              <FaArrowRight className="ml-2" />
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4 text-sm">
            Dont have an account?{' '}
            <a href="/signup" className="text-[#68b5c2] hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Lottie Animation Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-full max-w-md shadow-lg rounded-lg"
        />
      </div>
    </div>
  );
};

export default SignIn;