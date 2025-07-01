import React from 'react'
import FormLayout from '../../layouts/FormLayouts'
import { useForm } from 'react-hook-form';
import CTABtn from "../../components/common/CTABtn"
import { yupResolver } from '@hookform/resolvers/yup';
import { forgetPasswordSchema } from '@/validations/formSchema';
import { Link, useNavigate } from 'react-router-dom';
import { useForgetPasswordMutation } from '@/feature/auth/authApi';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import toast from 'react-hot-toast';

const ForgetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [forgetPassword] = useForgetPasswordMutation();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ resolver: yupResolver(forgetPasswordSchema), mode: "onTouched" });
  
    const onSubmit = async(data:any) => {
      const toastId = toast.loading("Loading...")
      try {
        const { email } = data;
        const res = await forgetPassword({ email }).unwrap();
        toast.success(res?.message, {id:toastId})
      } catch (error:any) {
        toast.success(error?.data?.message, {id:toastId})
        navigate("/login")
      }
    };

    const desc = "No worries, we'll send you reset instructions"

  return (
    <FormLayout title='Forgot Password?' description={desc} formType='forget-password'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-1'>
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
          <CTABtn title="Reset Password" icon={<LuArrowRight size={20}/>} bg="black" text="white" iconPosition="right"/>
          <p className="mt-2"><Link to="/login" className='flex items-center gap-1'><LuArrowLeft size={20}/>Back to login</Link></p>
      </form>
    </FormLayout>
  )
}

export default ForgetPassword
