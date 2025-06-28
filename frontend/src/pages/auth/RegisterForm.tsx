import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import CTABtn from "../../components/common/CTABtn";
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from '../../validations/formSchema'
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../feature/auth/authApi";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, {isLoading}] = useRegisterMutation();
  
  const [formData, setFormData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema), mode: "onTouched" });

  const onSubmit = async(data:any) => {
    setFormData(data);
    try {
      const {name, email, password} = data;
      await registerUser({name, email, password}).unwrap();
      navigate("/")
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  }

  return (
    <>
       <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Name Field */}
        <div className="mb-2">
          <label className="block text-sm px-2 font-medium">Name<sup className="text-rose-500 p-0.5">*</sup></label>
          <input
            type="text"
            {...register("name")}
            className={`w-full border-2 outline-none border-gray-200 rounded-full px-3 py-2 ${errors.name && "border-red-300"}`}
            placeholder="Enter your name"
          />
          {/* Error message */}
          {errors.name && (
            <p className="text-red-400 text-sm px-2">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-2">
          <label className="block text-sm px-2 font-medium ">Email<sup className="text-rose-500 p-0.5">*</sup></label>
          <input
            type="email"
            {...register("email")}
            className={`w-full border-2 outline-none border-gray-200 rounded-full px-3 py-2 ${errors.email && "border-red-300"}`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-400 text-sm px-2">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-2 relative">
          <label className="block text-sm px-2 font-medium ">Password<sup className="text-rose-500 p-0.5">*</sup></label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`relative w-full border-2 outline-none border-gray-200 rounded-full px-3 py-2 ${errors.password && "border-red-300"}`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm px-2">{errors.password.message}</p>
          )}
          <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-4 top-8 text-gray-500 z-[10] cursor-pointer">
              {showPassword ? <PiEyeDuotone fontSize={20} /> : <PiEyeSlashDuotone fontSize={20} />}
          </span>
        </div>

        <div className="flex gap-2 mb-3 px-2 text-gray-500">
          <input type="checkbox" required/>
          <p className="text-sm">I agree all Term, Privacy Policy and Free</p>
        </div>

        {/* Submit Button */}
        <CTABtn title="Sign Up" icon={<LuArrowRight size={20}/>} bg="black" text="white" iconPosition="right"/>
        <p className="mt-2 text-center">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
      </form>
    </>
  );
};

export default Register;
