import React from "react";
import { useForm } from "react-hook-form";
import { useUserLoginMutation } from "../redux/features/baseApi/baseApi";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [userLogin] = useUserLoginMutation();
  const navigate = useNavigate(); // Fixed typo

  const onSubmit = async (userData) => {
    console.log("Submitting Data:", userData);

    try {
      const loggedInUser = await userLogin(userData).unwrap();
      console.log("Login Response:", loggedInUser);

      if (loggedInUser?.accessToken) {
        localStorage.setItem("accessToken", loggedInUser.accessToken); // Fixed typo
      }

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/path-to-your-image.jpg')", // Replace with a valid image path
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Account LOG IN</h2>
        <p className="text-center mb-6 text-gray-600">
          Become a member and enjoy exclusive promotions.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-red-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              className="checkbox checkbox-primary mr-2"
              {...register("remember")}
            />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            LOG IN
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="#" className="text-primary font-medium hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
