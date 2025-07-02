import React from 'react'
import FormLayout from '@/layouts/FormLayouts'
import CTABtn from "../../components/common/CTABtn"
import { Link, useNavigate } from 'react-router-dom';
import { useVerifyOtpMutation } from '@/feature/auth/authApi';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp"
import toast from 'react-hot-toast';

const VerifyOTP: React.FC = () => {
    const navigate = useNavigate();
    const [verifyOTP] = useVerifyOtpMutation();
    const [otp, setOtp] = React.useState("")
    
    var storedDetails = JSON.parse(sessionStorage.getItem('signupData'));  //get session for payload

    const submitHandler = async(e:any) => {
        e.preventDefault();
        const payload = {
            name:storedDetails.name,
            email: storedDetails.email,
            password:storedDetails.password,
            otp: otp  // enteredOtp from input field
        };

        const toastId = toast.loading("Loading...");
        try {
            const res = await verifyOTP(payload).unwrap();
            toast.success(res?.message , {id: toastId});
            navigate("/login");
            sessionStorage.clear();
        } catch (error:any) {
            toast.error(error?.data?.message , {id: toastId}); // loading hata ke error show
            navigate("/register");
            sessionStorage.clear();
        }
    }

    let desc = `We have send verification code to your email ${storedDetails.email}`

  return (
    <FormLayout title='Verify OTP' description={desc} formType='verifyOTP'>
        <form onSubmit={submitHandler} className='flex flex-col gap-y-5'>
            <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <InputOTPGroup className='flex gap-3'>
                    <InputOTPSlot index={0} className='rounded-lg p-6 border-2 border-gray-200 text-2xl' />
                    <InputOTPSlot index={1} className='rounded-lg p-6 border-2 border-gray-200 text-2xl' />
                    <InputOTPSlot index={2} className='rounded-lg p-6 border-2 border-gray-200 text-2xl' />
                    <InputOTPSlot index={3} className='rounded-lg p-6 border-2 border-gray-200 text-2xl' />
                    <InputOTPSlot index={4} className='rounded-lg p-6 border-2 border-gray-200 text-2xl' />
                    <InputOTPSlot index={5} className='rounded-lg p-6 border-2 border-gray-200 text-2xl' />
                </InputOTPGroup>
            </InputOTP>
            <div>
                <CTABtn title="Verify OTP" icon={<LuArrowRight size={20}/>} bg="black" text="white" iconPosition="right"/>
                <p className="mt-2"><Link to="/login" className='flex items-center gap-1'><LuArrowLeft size={20}/>Back to login</Link></p>
            </div>
        </form>

    </FormLayout>
  )
}

export default VerifyOTP;