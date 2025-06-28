export interface User {
  _id: string;
  name: String;
  email: string;
  isVerified: boolean;
  dateOfBirth: Date;
  contactNumber: string;
  role: "user" | "admin";
  profileImage?: string;
}
