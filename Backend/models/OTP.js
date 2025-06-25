import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js"
import otpEmailTemplate from "../emailTemplates/emailVerificationTemplate.js"

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // Auto delete after 5 min (300 sec)
  },
});


async function sendVerificationEmail(email, otp) {
    try {
        const res = await mailSender(email, 'Email Varification', otpEmailTemplate(otp));
        console.log("✅ Email send")
    } catch (error) {
        console.log("❌ Mail error");
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});


const OTP = mongoose.model("OTP", otpSchema);
export default OTP;