import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      default: "Aura Client",
      trim: true,
    },
    photoURL: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["client", "architect", "contractor", "admin"],
      default: "client",
    },
    city: {
      type: String,
      default: "",
    },
    preferences: {
      preferredStyle: {
        type: String,
        enum: ["Modern", "Luxury", "Traditional", "Minimalist", "Japandi", "Boho Chic"],
        default: "Modern",
      },
      budgetTier: {
        type: String,
        default: "₹18-25 Lakhs",
      },
      region: {
        type: String,
        default: "Bangalore",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
export default User;
