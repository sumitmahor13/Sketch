import type { ReactNode } from "react";

interface ButtonProps {
  title: string;
  icon?: ReactNode;
  bg: string;
  text: string;
  iconPosition?: "left" | "right";
} 

const Button: React.FC<ButtonProps> = ({title, icon, bg, text, iconPosition}) => {
  return (
    <div className="w-full">
        <button className={`w-full flex gap-2 justify-center items-center ${iconPosition === "right" ? "flex-row-reverse" : "flex-row"} py-2.5 rounded-full text-${text} bg-${bg} hover:scale-105 transition-all duration-300 ease-in-out`}>
          {icon}{title}
        </button>
    </div>
  );
};

export default Button;
