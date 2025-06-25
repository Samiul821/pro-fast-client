import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });

        console.log("Google Sign In User:", user);
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
