import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin.jsx/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        toast.success("User logged in successfully!");
        // Redirect to the previous page or home page
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });

        console.log("User logged in successfully:", user);
      })
      .catch((error) => {
        toast.error("Failed to log in. Please check your credentials.");
        console.error("Error logging in:", error);
      });
  };

  return (
    <div className="bg-white w-full">
      <h2 className="text-4xl md:text-[42px] inter font-bold md:font-extrabold text-[#000000] mb-2">
        Welcome Back
      </h2>
      <p className="lxgw-marker-gothic text-[#0F172A] mb-6">
        Login with Profast
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text text-[#0F172A] font-medium lxgw-marker-gothic">
              Email
            </span>
          </label>
          <input
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Email"
            className="input text-slate-400 lxgw-marker-gothic focus:border focus:border-[#E9ECF1] w-full"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              {errors.email.type === "required"
                ? "Email is required"
                : "Invalid email address"}
            </span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="label">
            <span className="label-text text-[#0F172A] font-medium lxgw-marker-gothic">
              Password
            </span>
          </label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            })}
            placeholder="Password"
            className="input text-slate-400 lxgw-marker-gothic focus:border focus:border-[#E9ECF1] w-full"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.type === "required"
                ? "Password is required"
                : errors.password.type === "minLength"
                ? "Password must be at least 6 characters"
                : errors.password.type === "pattern"
                ? "Password must contain at least one letter and one number"
                : "Invalid password"}
            </span>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right text-sm">
          <Link
            to="/forgot-password"
            className="text-zinc-500
           hover:underline"
          >
            Forget Password?
          </Link>
        </div>

        {/* Login Button */}
        <button className="btn bg-[#CAEB66] hover:bg-[#b3d455] w-full text-black font-semibold border-none">
          Login
        </button>
      </form>

      {/* Register Link */}
      <p className="text-center text-zinc-500 text-sm mt-4">
        Don’t have any account?{" "}
        <Link
          to="/register"
          className="text-[#8FA748] font-medium hover:underline"
        >
          Register
        </Link>
      </p>

      {/* Social Login */}
      <SocialLogin />
    </div>
  );
};

export default Login;
