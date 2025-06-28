import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });

        console.log("Google Sign In User:", user);
        const userInfo = {
          email: user.email,
          role: "user", //defult role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const res = await axiosInstance.post("/users", userInfo);
        console.log('user update info', res.data);

        toast.success("Logged in successfully with Google!");
        // Redirect to the previous page or home page
      })
      .catch((error) => {
        console.error("Google Sign In Error:", error);
        toast.error("Failed to log in with Google. Please try again.");
      });
  };

  return (
    <div>
      {/* OR Divider */}
      <div className="divider my-4 text-sm">Or</div>

      {/* Google Login */}
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full border border-base-200"
      >
        <FcGoogle size={20} className="mr-2" />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
