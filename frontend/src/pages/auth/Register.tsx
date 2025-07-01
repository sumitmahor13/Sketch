import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import CTABtn from "../../components/common/CTABtn";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from '../../validations/formSchema'
import { useRegisterMutation } from "../../feature/auth/authApi";
import FormLayout from "../../layouts/FormLayouts";
import toast from "react-hot-toast";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema), mode: "onTouched" });

  const onSubmit = async(data:any) => {
    sessionStorage.setItem("signupData", JSON.stringify(data)); //set details in session storage for next page
    const toastId = toast.loading("Loading...");
    try {
      const {name, email, password} = data;
      const res = await registerUser({name, email, password}).unwrap();
      toast.success(res?.message , {id: toastId});  // isse purana loading toast replace ho jata hai
      navigate("/verify-otp");
    } catch (error:any) {
      toast.error(error?.data?.message || 'Signup failed!', {
        id: toastId, // loading hata ke error show
      });
    }
  }

  const desc = "Join us for exclusive deals tailored just for you"
  
  return (
    <>
      <FormLayout title="Create your account" description={desc} formType="register">
        <GoogleLoginButton/>
        <div className="relative w-full border-t-2 border-gray-200 my-2">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1.5 bg-white text-gray-300">OR</p>
        </div>
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
                {showPassword ? <PiEye fontSize={20} /> : <PiEyeSlash fontSize={20} />}
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
      </FormLayout>
    </>
  );
};

export default Register;
