import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import CTABtn from "../../components/common/CTABtn";
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from '../../validations/formSchema'
import { useLoginUserMutation } from "../../feature/auth/authApi";
import { setUser } from "../../feature/auth/authSlice";
import { useDispatch } from "react-redux";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onTouched" });

  const [formData, setFormData] = useState([]);
  const onSubmit = async(data:any) => {
    setFormData(data);
    try {
      const { email, password } = data;
      const res = await loginUser({ email, password }).unwrap();
      navigate("/")
      dispatch(setUser(res?.user));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

console.log(formData)
  return (
    <>
       <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>

        <GoogleLoginButton/>
      </form>
    </>
  );
};

export default Login;
