import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import CTABtn from "../../components/common/CTABtn";
import { PiEye, PiEyeSlash, PiCheckCircleFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from '../../validations/formSchema'
import { useResetPasswordMutation } from "../../feature/auth/authApi";
import FormLayout from "../../layouts/FormLayouts";
import toast from "react-hot-toast";

const ResetPassword: React.FC = () => {
  const {register, watch, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(resetPasswordSchema), mode: "onTouched" });
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const { token } = useParams<{ token: string }>();  //get token from params
  
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Watch the password input
  const watchPassword = watch("newPassword", "");

  // Update local state to check individual criteria
  useEffect(() => {
    setNewPassword(watchPassword);
  }, [watchPassword]);

  // Validation checks
  const criteria = {
    minLength: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    specialChar: /[@$!%*?&#]/.test(newPassword),
  };


  const onSubmit = async(data:any) => {
    setNewPassword(data);
    const toastId = toast.loading("Loading...");
    try {
      const {newPassword} = data;
      const res = await resetPassword({newPassword, confirmPassword:newPassword, token}).unwrap();
      toast.success(res?.message , {id: toastId});  // isse purana loading toast replace ho jata hai
      navigate("/login");
    } catch (error:any) {
      toast.error(error?.data?.message, {id: toastId});
    }
  }

  const desc = "Please fill the details below to update your password"

  return (
    <>
      <FormLayout title="Reset your password" description={desc} formType="resetPassword">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Password Field */}
          <div className="mb-2 relative">
            <label className="block text-sm px-2 font-medium ">New Password<sup className="text-rose-500 p-0.5">*</sup></label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("newPassword")}
              className={`relative w-full border-2 outline-none border-gray-200 rounded-full px-3 py-2 ${errors.newPassword && "border-red-300"}`}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="text-red-400 text-sm px-2">{errors.newPassword.message}</p>
            )}
            <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-4 top-8 text-gray-500 z-[10] cursor-pointer">
                {showPassword ? <PiEye fontSize={20} /> : <PiEyeSlash fontSize={20} />}
            </span>
          </div>

        {/* Confirm Password Field */}
          <div className="mb-2 relative">
            <label className="block text-sm px-2 font-medium ">Confirm Password<sup className="text-rose-500 p-0.5">*</sup></label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={`relative w-full border-2 outline-none border-gray-200 rounded-full px-3 py-2 ${errors.confirmPassword && "border-red-300"}`}
              placeholder="Enter new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm px-2">{errors.confirmPassword.message}</p>
            )}
            <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-4 top-8 text-gray-500 z-[10] cursor-pointer">
                {showConfirmPassword ? <PiEye fontSize={20} /> : <PiEyeSlash fontSize={20} />}
            </span>
          </div>

        <label className="block text-sm px-2 font-medium ">Your password must contain:</label>
        <div className="text-sm mb-3 border-2 border-gray-200 rounded-2xl p-3">
            <p className={`${criteria.minLength ? "text-green-500" : "text-gray-400"} flex items-center gap-1`}>
              <PiCheckCircleFill size={15}/> Minimum 8 characters
            </p>
            <p className={`${criteria.uppercase ? "text-green-500" : "text-gray-400"} flex items-center gap-1`}>
              <PiCheckCircleFill size={15}/> Must include an uppercase letter
            </p>
            <p className={`${criteria.number ? "text-green-500" : "text-gray-400"} flex items-center gap-1`}>
              <PiCheckCircleFill size={15}/> Must include a number
            </p>
            <p className={`${criteria.specialChar ? "text-green-500" : "text-gray-400"} flex items-center gap-1`}>
              <PiCheckCircleFill size={15}/> Must include a special character
            </p>
        </div>

          {/* Submit Button */}
          <CTABtn title="Reset Password" icon={<LuArrowRight size={20}/>} bg="black" text="white" iconPosition="right"/>
          <p className="mt-2"><Link to="/login" className='flex items-center gap-1'><LuArrowLeft size={20}/>Back to login</Link></p>
        </form>
      </FormLayout>
    </>
  );
};

export default ResetPassword;
