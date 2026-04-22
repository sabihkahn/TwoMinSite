 import { Schema, model } from "mongoose";
import { Usertype } from "../types/userType"; // Import your interface

// 1. Nested Product Schema
const productSchema = new Schema({
  productname: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  productdescription: { type: String },
  productmainphoto: { type: String },
  productextraphotos: [{ imagesproduct: String }],
  reviews: [{ name: String, message: String }],
});

// 2. Nested Website Schema
const websiteSchema = new Schema({
  theme: { type: String, default: "default" },
  shopname: { type: String, required: true },
  shopdescription: { type: String },
  shoplogo: { type: String },
  shopemail: { type: String },
  shoplinks: [{ link: String }],
  shopadress: { type: String },
  shophomepageimg: { type: String },
  shopProducts: [productSchema], // Reference the product schema
});

// 3. Main User Schema
const userSchema = new Schema<Usertype>(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true 
    },
    password: { type: String, required: true, select: false },
    websites: [websiteSchema], // Reference the website schema
  },
  { 
    timestamps: true // This automatically handles createdAt and updatedAt
  }
);

// 4. Create and Export Model
const User = model<Usertype>("User", userSchema);
export default User;
