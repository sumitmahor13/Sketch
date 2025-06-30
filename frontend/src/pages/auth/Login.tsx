import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import CTABtn from "../../components/common/CTABtn";
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from '../../validations/formSchema'
import { useLoginUserMutation } from "../../feature/auth/authApi";
import { setUser } from "../../feature/auth/authSlice";
import { useDispatch } from "react-redux";
import FormLayout from "../../layouts/formLayouts";
import toast from "react-hot-toast";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [formData, setFormData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onTouched" });

  const onSubmit = async(data:any) => {
    setFormData(data);
    const toastId = toast.loading("Loading...");
    try {
      const { email, password } = data;
      const res = await loginUser({ email, password }).unwrap();
      toast.success(res?.message , {id: toastId});
      navigate("/")
      dispatch(setUser(res?.user));
    } catch (error) {
      toast.error(error?.data?.message || 'Signup failed!', {id: toastId, // loading hata ke error show
      });
    }
  };

  return (
    <>
      <FormLayout title="Welcome Back" formType="login">
        <GoogleLoginButton/>
        <div className="relative w-full border-t-2 border-gray-200 my-2">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1.5 bg-white text-gray-300">OR</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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

          <div className="text-sm px-2 mb-2 text-gray-500 text-end"><Link to="/forget-password">Forgot Password</Link></div>

          {/* Submit Button */}
          <CTABtn title="Login" icon={<LuArrowRight size={20}/>} bg="black" text="white" iconPosition="right"/>
          <p className="mt-2 text-center">Don't have an account? <Link to="/register" className="text-blue-500">SignUp</Link></p>
        </form>
      </FormLayout>
    </>
  );
};

export default Login;
