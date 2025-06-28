import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import imageUpload from "../../../assets/image-upload-icon.png";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../SocialLogin.jsx/SocialLogin";
import { useState } from "react";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const axiosInstance = useAxios();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;

        // update userinfo in the database
        const userInfo = {
          email: data.email,
          role: "user", //defult role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);

        // Update user profile with name
        updateUser({ displayName: data.name, photoURL: imageFile })
          .then(async () => {
            setUser({ ...user, displayName: data.name, photoURL: imageFile });
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
            console.log("User created successfully:", user);
            toast.success("User created successfully!");
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
            toast.error("Failed to update user profile. Please try again.");
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        toast.error("Failed to create user. Please try again.");
      });
  };

  const handelImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file); // actual file for uploading
      setSelectedImage(URL.createObjectURL(file)); // preview
      console.log("Selected image file:", file);
    } else {
      console.warn("No file selected");
    }

    const fromData = new FormData();
    fromData.append("image", file);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadUrl, fromData);

    setImageFile(res.data.data.url);
  };

  return (
    <div className="bg-white w-full">
      <h2 className="text-4xl md:text-[42px] inter font-bold md:font-extrabold text-[#000000] mb-2">
        Create an Account
      </h2>
      <p className="lxgw-marker-gothic text-[#0F172A] mb-6">
        Register with Profast
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Image Upload Field */}
        <div>
          <label className="label">
            <span className="label-text text-[#0F172A] font-medium lxgw-marker-gothic">
              Upload Profile Picture
            </span>
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handelImageUpload}
              className="file-input file-input-bordered file-input-sm"
            />
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Preview"
                className="w-14 h-14 object-cover rounded-full border"
              />
            ) : (
              <img
                src={imageUpload}
                alt="Upload icon"
                className="w-14 h-14 object-cover rounded-full"
              />
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="label">
            <span className="label-text text-[#0F172A] font-medium lxgw-marker-gothic">
              Name
            </span>
          </label>
          <input
            type="text"
            {...register("name", { required: true, maxLength: 50 })}
            placeholder="Email"
            className="input text-slate-400 lxgw-marker-gothic focus:border focus:border-[#E9ECF1] w-full"
          />
        </div>

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

        {/* Register Button */}
        <button className="btn bg-[#CAEB66] hover:bg-[#b3d455] w-full text-black font-semibold border-none">
          Register
        </button>
      </form>

      {/* Register Link */}
      <p className="text-center text-zinc-500 text-sm mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#8FA748] font-medium hover:underline"
        >
          Login
        </Link>
      </p>

      <SocialLogin />
    </div>
  );
};

export default Register;
