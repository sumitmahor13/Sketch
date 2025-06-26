import React from "react";
import FormTemplate from "./auth/FormTemplate";

interface RegisterProps {
  title: string;
  formType: "login" | "register";
}

const Register: React.FC<RegisterProps> = () => {
  return (
    <>
      <FormTemplate title="Create an account" formType="register" />
    </>
  );
};

export default Register;
