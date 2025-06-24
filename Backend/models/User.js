import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // ✅ Ensure consistent storage
  },
  password: {
    type: String,
    trim: true,
    // ✅ Required only if provider is 'email'
    required: function () {
      return this.provider === "email";
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  contactNumber: {
    type: String, // ✅ Use string for phone numbers to support +91, etc.
    trim: true,
    default:""
  },
  dateOfBirth: {
    type: Date,
    default:null
  },
  profileImage: {
    type: String,
    default: "",
  },
  provider: {
    type: String,
    enum: ["email", "google", "facebook"],
    default: "email",
  },
}, {
  timestamps: true // ✅ Auto-manage createdAt and updatedAt
});

export default mongoose.model("User", userSchema);