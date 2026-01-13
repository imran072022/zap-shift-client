import React, { useState } from "react";
import imageUploadIcon from "../../assets/image-upload-icon.png";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { update } from "lodash";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// --------------- Fixed Zod Schema ---------------
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required") // Only show "Password is required" error
    .refine((val) => val.length >= 6, "At least 6 characters")
    .refine((val) => /[A-Z]/.test(val), "Must include uppercase letter")
    .refine((val) => /[a-z]/.test(val), "Must include lowercase letter")
    .refine((val) => /\d/.test(val), "Must include a number")
    .refine(
      (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
      "Must include a special character"
    ),
  upload: z
    .any()
    .refine(
      (files) => files && files.length === 1,
      "Profile picture is required."
    )
    .refine(
      (files) => files[0]?.size <= 2 * 1024 * 1024,
      "Max file size is 2MB"
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type),
      "Only .jpg, .png, .webp formats are allowed"
    ),
});

const Register = () => {
  const { signUp, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const password = watch("password") || "";

  // Live hints
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 6;

  const handleRegister = (data) => {
    console.log("Registered Data:", data);

    const profilePic = data.upload[0];

    signUp(data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        /*Storing profile pic in form data, sending them to imgbb store to save and get the url */
        const formData = new FormData();
        formData.append("image", profilePic);
        const img_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_hosted_img_apiKey
        }`;
        axios.post(img_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          /*Send users data to db */
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user data has been sent to db");
            }
          });

          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("profile picture updated successfully");
              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="inter">
      <h2 className="font-extrabold text-4xl mb-0.5">Create an Account</h2>
      <p>Register with ZapShift</p>
      <img src={imageUploadIcon} alt="" className="my-4" />

      <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col">
        {/*file upload */}
        <label className="font-medium text-sm text-[#0F172A] mb-1.5 block">
          Upload Image
        </label>
        <input
          type="file"
          {...register("upload")}
          className=" border border-[#CBD5E1] rounded-lg file:mr-4 text-sm file:py-2 file:px-4  file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
        />
        {errors.upload && (
          <p className="text-red-500 text-sm">{errors.upload.message}</p>
        )}
        {/* Name */}
        <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-2.5">
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-[375px] h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* Email */}
        <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-[375px] h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="w-[375px] h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <AiFillEyeInvisible size={20} />
            ) : (
              <AiFillEye size={20} />
            )}
          </button>
        </div>

        {/* Only show "Password is required" error when field is empty */}
        {errors.password && password.length === 0 && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Live password hints */}
        {password.length > 0 && (
          <div className="text-xs mt-1 space-y-0.5">
            <p className={hasUpperCase ? "text-green-500" : "text-gray-500"}>
              • Include at least 1 uppercase letter
            </p>
            <p className={hasLowerCase ? "text-green-500" : "text-gray-500"}>
              • Include at least 1 lowercase letter
            </p>
            <p className={hasNumber ? "text-green-500" : "text-gray-500"}>
              • Include at least 1 number
            </p>
            <p className={hasSpecialChar ? "text-green-500" : "text-gray-500"}>
              • Include at least 1 special character
            </p>
            <p className={hasMinLength ? "text-green-500" : "text-gray-500"}>
              • At least 6 characters
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-[375px] h-10 bg-[#CAEB66] font-medium rounded-lg text-sm cursor-pointer mt-3"
        >
          Register
        </button>
      </form>

      <div className="text-[#71717A] mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-[#8FA748]">
          Login
        </Link>
      </div>

      <p className="text-[#71717A] my-3 text-center">Or</p>

      <button className="flex items-center justify-center gap-2.5 text-sm font-medium bg-[#E9ECF1] rounded-lg w-[375px] h-10 cursor-pointer">
        <FcGoogle size={20} /> Register with Google
      </button>
    </div>
  );
};

export default Register;
