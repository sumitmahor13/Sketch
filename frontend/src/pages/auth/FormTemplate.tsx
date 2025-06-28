import React from "react";
import LoginForm from "../auth/LoginForm"
import RegisterForm from "../auth/RegisterForm";

interface FormTemplateProps{
    title:string,
    formType:string
}

const FormTemplate: React.FC<FormTemplateProps> = ({title, formType}) => {
    return (
        <div className="w-full h-screen flex">
            <div className="w-[50%] m-5 bg-white">
                <div className="text-orange-500 text-3xl font-bold">Sketch</div>
                <h1 className="text-4xl font-bold">{title}</h1>
                {formType === "login" ? <LoginForm /> : <RegisterForm />}
            </div>
            <div className="w-[50%] m-5 bg-black  rounded-3xl">
                
            </div>
        </div>
    )
}

export default FormTemplate;