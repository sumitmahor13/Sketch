import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { googleAuth } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth/authSlice";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (authResult) => {
      try {
        if(authResult['code']){
            const res = await googleAuth(authResult['code']);  //call googleAuth api
            dispatch(setUser(res?.data?.user));  //set user info in redux state
            navigate("/")  //after login navigate to home
        }
      } catch (err: any) {
        console.error(
          "Login Failed:",
          err.response?.data?.message || err.message
        );
      }
    },
    onError: (errorResponse) => {
      console.log("Google Login Error:", errorResponse);
    },
    flow: "auth-code",
  });
  return (
    <>
      <button onClick={() => login()} 
        className="w-full flex gap-2 border-2 border-gray-200 justify-center items-center px-3 py-2 rounded-full hover:scale-102 transition-all duration-500 ease-in-out">
       <FcGoogle size={25}/> Login with Google
      </button>
    </>
  );
};

export default GoogleLoginButton;
