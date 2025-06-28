import React from "react";
import FormTemplate from "./auth/FormTemplate";
import GoogleLoginButton from "../components/GoogleLoginButton";

interface LoginProps {
  title: string;
  formType: "login" | "register";
}

const Login: React.FC<LoginProps> = () => {
  return (
    <>
      <FormTemplate title="Welcome Back" formType="login" />
      <GoogleLoginButton/>
    </>
  );
};

export default Login;
