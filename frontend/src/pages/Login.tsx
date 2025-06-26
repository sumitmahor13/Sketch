import React from "react";
import FormTemplate from "./auth/FormTemplate";

interface LoginProps {
  title: string;
  formType: "login" | "register";
}

const Login: React.FC<LoginProps> = () => {
  return (
    <>
      <FormTemplate title="Welcome Back" formType="login" />
    </>
  );
};

export default Login;
