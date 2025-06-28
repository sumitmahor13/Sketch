import React from "react";
import LoginForm from "../auth/LoginForm"
import RegisterForm from "../auth/RegisterForm";
import GoogleLoginButton from "../../components/GoogleLoginButton";

interface FormTemplateProps{
    title:string,
    formType:string
}

const FormTemplate: React.FC<FormTemplateProps> = ({title, formType}) => {
    return (
        <div className="w-full p-5 h-screen flex  gap-5">
            <div className="w-full md:w-[60%] lg:w-[40%] md:p-5 ">
                <div className="text-orange-500 text-2xl md:text-3xl font-bold">Sketch</div>
                <div className="flex flex-col px-3 lg:px-20 py-10 gap-5 items-center">
                    <div className="flex flex-col items-center gap-y-1">
                        <h1 className="text-3xl lg:text-4xl font-semibold">{title}</h1>
                        {formType === 'register' ? <p className="text-gray-500 text-sm text-center text-md">Join us for exclusive deals tailored just for you.</p>:
                        <p className="text-gray-500 text-sm text-center text-md">Welcome Back! Please fill details to login</p>}
                    </div>
                    <GoogleLoginButton/>
                    <div className="relative w-full border-t-2 border-gray-200 my-2">
                        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1.5 bg-white text-gray-300">OR</p>
                    </div>
                    {formType === "login" ? <LoginForm /> : <RegisterForm />}
                </div>
            </div>
            <div className="relative hidden md:block overflow-auto w-[60%] bg-black rounded-3xl">
                
            </div>
        </div>
    )
}

export default FormTemplate;