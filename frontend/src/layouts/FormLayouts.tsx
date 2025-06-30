import GoogleLoginButton from "@/components/GoogleLoginButton";
import React from "react";
import { Link } from "react-router-dom";

interface FormTemplateProps{
    children:React.ReactNode;
    title:string;
    formType:string;
}

const FormLayout: React.FC<FormTemplateProps> = ({children, title, formType}) => {
    return (
        <div className="w-full p-5 h-screen flex  gap-5">
            <div className="w-full md:w-[60%] lg:w-[40%] md:p-5 ">
                <div className="text-orange-500 text-2xl md:text-3xl font-bold"><Link to="/">Sketch</Link></div>
                <div className="flex flex-col px-3 lg:px-20 py-10 gap-5 items-center">
                    <div className="flex flex-col items-center gap-y-1">
                        <h1 className="text-3xl lg:text-4xl font-semibold">{title}</h1>
                        {formType === 'register' && <p className="text-gray-500 text-sm text-center text-md">Join us for exclusive deals tailored just for you.</p>}
                        {formType === 'login' && <p className="text-gray-500 text-sm text-center text-md">Welcome Back! Please fill details to login</p>}
                        {formType === 'verify-otp' && <p className="text-gray-500 text-sm text-center text-md">We have send verification code to your email sumitmahor13@gmail.com.</p>}
                        {formType === 'forget-password' && <p className="text-gray-500 text-sm text-center text-md">Have no fear. We'll email you instructions to reset your password</p>}
                        {formType === 'reset-password' && <p className="text-gray-500 text-sm text-center text-md">Please fill the details below to update your password</p>}
                    </div>
                    {children}
                </div>
            </div>
            <div className="relative hidden md:block overflow-auto w-[60%] bg-black rounded-3xl">
                
            </div>
        </div>
    )
}

export default FormLayout;