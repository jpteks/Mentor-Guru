"use client";
import { Phone } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import googleIcon from "../../../images/google.svg";
import Image from "next/image";
import Icon from "@/components/Icon";
// ===========================================================
// === password and confirm password show icon setter

type Data = {
  phone: string;
  password: string;
};

const SignIn = () => {
  const [showpassword, setShowpassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<Data>({
    phone: "",
    password: "",
  });

  const HandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const HandleSubmit: () => void = () => {
    // ===========================================================
    // === form validation before submit to upcoming API
    if (
      formData.password === "" ||
      formData.phone === "" ||
      isNaN(Number(formData.phone))
    ) {
      return alert("Fill in all the inputs correctly!");
    }
    alert(["can Submit", JSON.stringify(formData)]);
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-[600px] p-2 flex-1 sm:mx-5 mx-2 flex flex-col items-center justify-center'>
        <h1 className='md:text-5xl sm:text-3xl text-xl text-center font-medium text-[#155FA0]'>
          Welcome Back
        </h1>
        <p className='text-sm pb-5 pt-3'>
          Don&apos;t have an account?{" "}
          <Link href={"register"} className='text-[#155FA0] underline'>
            SignUp
          </Link>
        </p>

        <label htmlFor='phone' className='w-full px-1 pb-2 pt-3 text-sm'>
          Phone number
        </label>

        {/* Phone input */}
        <div className='flex border-2 rounded-xl w-full items-center pr-5 overflow-hidden'>
          <input
            type='text'
            placeholder='+237 xxx xxx xxx'
            className='w-full py-3 px-5 focus:outline-none'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={HandleChange}
          />
          <Phone
            color='#155FA0'
            absoluteStrokeWidth
            strokeWidth={1.5}
            size={17}
          />
        </div>

        <label htmlFor='password' className='w-full px-1 pb-2 pt-3 text-sm'>
          Password
        </label>

        {/* Password input */}
        <div className='flex border-2 rounded-xl w-full items-center pr-5 overflow-hidden'>
          <input
            type={`${showpassword ? "text" : "password"}`}
            placeholder='password'
            className='w-full py-3 px-5 focus:outline-none'
            id='password'
            name='password'
            value={formData.password}
            onChange={HandleChange}
          />
          <Icon
            handle={() => setShowpassword(prev => !prev)}
            value={showpassword}
          />
        </div>

        <Link
          href={"forgotpassword"}
          className='cursor-pointer w-full text-right my-3 hover:underline'
        >
          ForgotPassword?
        </Link>

        <button
          className='bg-[#155FA0] w-full text-white py-4 rounded-xl mb-5 active:scale-95'
          onClick={HandleSubmit}
        >
          Sign In
        </button>

        <div className='my-5 border-t border-[#155FA0] text-[#155FA0] w-full relative'>
          <p className='absolute left-1/2 bottom-1/2 translate-y-1/2 -translate-x-1/2 bg-white px-4 pb-1'>
            or
          </p>
        </div>

        <div className='flex text-[#155FA0] gap-x-3 border w-full justify-center py-3 rounded-xl my-3'>
          <Image src={googleIcon} alt='google icon' className='w-auto h-auto' />
          <p>Sign Up with Google</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
