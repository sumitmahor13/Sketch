import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { googleAuth } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth/authSlice";

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
      <button
        onClick={() => login()}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Login with Google
      </button>
    </>
  );
};

export default GoogleLoginButton;
