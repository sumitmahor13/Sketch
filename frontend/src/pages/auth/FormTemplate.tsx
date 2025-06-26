import React from "react";

interface FormTemplateProps{
    title:string,
    formType:string
}

const FormTemplate: React.FC<FormTemplateProps> = ({title, formType}) => {
    return (
        <div className="w-full h-screen flex">
            <div className="w-[30%] m-5 bg-white">
                <div className="text-orange-500 text-3xl font-bold">Sketch</div>
                <h1 className="text-4xl font-bold">{title}</h1>
            </div>
            <div className="w-[70%] m-5 bg-black  rounded-3xl">
                
            </div>
        </div>
    )
}

export default FormTemplate;