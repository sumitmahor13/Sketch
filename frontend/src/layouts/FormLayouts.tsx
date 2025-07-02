import React from "react";
import { Link } from "react-router-dom";
import SketchLogo from "../../public/Assets/SketchLogo.svg";
import LoginBanner from "../../public/Assets/loginBg.jpg"
import RegisterBanner from "../../public/Assets/signupBg.jpg"
import ForgotrBanner from "../../public/Assets/fogotPassBg.jpg"
import VerifyOTPBanner from "../../public/Assets/verifyotpBg.jpg"
import resetPassBanner from "../../public/Assets/resetpassBg.jpg"
import { PiSealCheck, PiTruck } from "react-icons/pi";

interface FormTemplateProps {
  children: React.ReactNode;
  title: string;
  description: string;
  formType: string;
}

const banners: Record<string, string> = {
    login: LoginBanner,
    register: ForgotrBanner,
    forgetPassword: RegisterBanner,
    verifyOTP: VerifyOTPBanner,
    resetPass: resetPassBanner,
  }

const FormLayout: React.FC<FormTemplateProps> = ({
  children,
  title,
  description,
  formType,
}) => {
  return (
    <div className="w-full p-5 h-screen max-w-[1650px] mx-auto flex  gap-5">
      <div className="w-full md:w-[60%] lg:w-[40%] md:p-5 ">
        <div className="text-orange-500 text-2xl md:text-3xl font-bold">
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
      <div className="relative inverted-radius hidden md:block overflow-auto w-[60%] bg-black rounded-3xl">
        <img className="w-full h-full object-cover" src={banners[formType]} alt={`${formType} banner`}/>

        <div className="absolute bottom-0 left-0 right-0 h-96 lg:h-60 bg-gradient-to-t from-black to-transparent" />
        {/* Text */}
        <div className="absolute bottom-56 lg:bottom-32 left-6 right-8 text-white font-semibold z-10">
          <h1 className="text-5xl lg:text-6xl">Shoes That Move With You.</h1>
          <p className="absolute w-[88%] text-gray-200 text-md font-light z-10">We believe shoes should do more than just look good. That’s why every pair is built to support your journey step after step, day after</p>
        </div>
          <div className="absolute left-6 right-4 bottom-8 text-white flex md:flex-col lg:flex-row w-fit lg:items-center gap-2">
            <h1 className="border flex items-center gap-2 border-gray-200 text-xs px-4 py-2 rounded-full"><PiSealCheck size={20} />100% Guarantee</h1>
            <h1 className="border flex items-center gap-2 border-gray-200 text-xs px-4 py-2 rounded-full"><PiTruck size={20} />Free Delivery at Local</h1>
          </div>
      </div>
    </div>
  );
};

export default FormLayout;
