import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

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
            {...register("email")}
            required
            placeholder="Email"
            className="input text-slate-400 lxgw-marker-gothic focus:border focus:border-[#E9ECF1] w-full"
          />
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
            {...register("password", {required: true, minLength: 6})}
            required
            placeholder="Password"
            className="input text-slate-400 lxgw-marker-gothic focus:border focus:border-[#E9ECF1] w-full"
          />
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

      {/* OR Divider */}
      <div className="divider my-4 text-sm">Or</div>

      {/* Google Login */}
      <button className="btn w-full border border-base-200">
        <FcGoogle size={20} className="mr-2" />
        Login with Google
      </button>
    </div>
  );
};

export default Login;
