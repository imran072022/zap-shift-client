import React, { useState } from "react";
import imageUploadIcon from "../../assets/image-upload-icon.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(true);
  const [firebaseError, setFirebaseError] = useState("");
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  /*zod schema */
  const schema = z.object({
    email: z.string().min(1, "Email is required."),
    password: z.string().min(1, "Password is required."),
  });
  /*useForm hook of React Hook Form */
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  /*send resolver obj as parameter */

  const handleLogin = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        const firebaseErrors =
          error.code === "auth/invalid-credential"
            ? "Email/Password is incorrect!"
            : error.code === "auth/user-not-found"
            ? "No account found with this email."
            : error.code === "auth/wrong-password"
            ? "Incorrect password."
            : error.code === "auth/too-many-requests"
            ? "Too many attempts. Try again later."
            : "Something went wrong!";
        setFirebaseError(firebaseErrors);
      });
  };
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="inter">
      <h2 className="font-extrabold text-4xl mb-0.5">Welcome Back</h2>
      <p>Login with ZapShift</p>

      <img src={imageUploadIcon} alt="" className="my-4" />

      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col">
        {firebaseError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{firebaseError}</p>
          </div>
        )}
        {/* Email */}
        <label className="font-medium text-sm text-[#0F172A] mb-1.5 mt-3">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-[375px] h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
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
            className="w-[375px] h-10 border border-[#CBD5E1] rounded-lg px-3 text-slate-800 focus:bg-[#f0f9ff] transition-all 0.3s ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
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
        <Link className="text-[#71717A] text-sm my-2.5 underline underline-offset-3 hover:text-[#293600] transition-colors 0.3 ease-out">
          Forget Password?
        </Link>
        <button
          type="submit"
          className="w-[375px] h-10 bg-[#CAEB66] flex items-center justify-center font-medium rounded-lg text-sm cursor-pointer"
        >
          Login
        </button>
      </form>

      <div className="text-[#71717A] mt-3">
        Don't have any account?{" "}
        <Link to="/register" className="text-[#8FA748]">
          Register
        </Link>
      </div>

      <p className="text-[#71717A] my-3 text-center">Or</p>

      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2.5 text-sm font-medium bg-[#E9ECF1] rounded-lg w-[375px] h-10 cursor-pointer"
      >
        <FcGoogle size={20} /> Login with Google
      </button>
    </div>
  );
};

export default Login;
