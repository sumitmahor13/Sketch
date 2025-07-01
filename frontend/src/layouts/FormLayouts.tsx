import React from "react";
import { Link } from "react-router-dom";
import SketchLogo from "../../public/Assets/SketchLogo.svg";

interface FormTemplateProps {
  children: React.ReactNode;
  title: string;
  description: string;
  formType: string;
}

const FormLayout: React.FC<FormTemplateProps> = ({
  children,
  title,
  description,
  formType,
}) => {
  return (
    <div className="w-full p-5 h-screen flex  gap-5">
      <div className="w-full md:w-[60%] lg:w-[40%] md:p-5 ">
        <div className="text-orange-500 text-2xl md:text-3xl px-5 font-bold">
          <Link to="/">
            <img src={SketchLogo} className="w-24 h-10" />
          </Link>
        </div>
        <div className="flex flex-col px-3 lg:px-20 py-10 gap-5 items-center">
          <div className="flex flex-col items-center gap-y-1">
            <h1 className="text-3xl lg:text-4xl font-semibold">{title}</h1>
            <p className="text-gray-500 text-sm text-center text-md">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
      <div className="relative inverted-radius hidden md:block overflow-auto w-[60%] bg-black rounded-3xl"></div>
    </div>
  );
};

export default FormLayout;
