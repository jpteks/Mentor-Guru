"use client";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Icon from "@/components/Icon";

type Data = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const [showpassword, setShowpassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<Data>({
    password: "",
    confirmPassword: "",
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
    if (formData.password === "" || formData.confirmPassword === "") {
      return alert("Fill in all the inputs correctly!");
    }
    if (formData.password !== formData.confirmPassword) {
      return alert("password don't match!");
    }
    if (formData.password.length < 8) {
      return alert("password not upto 8 characters!");
    }
    alert(["can Submit", JSON.stringify(formData)]);
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-[600px] p-2 flex-1 sm:mx-5 mx-2 flex flex-col items-center justify-center'>
        <h1 className='md:text-5xl sm:text-3xl text-xl text-center font-medium text-[#155FA0]'>
          Set new password
        </h1>

        <p className='text-xl font-medium pb-5 pt-3'>
          Must be 8 characters long
        </p>

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

        <label
          htmlFor='confirmPassword'
          className='w-full px-1 pb-2 pt-3 text-sm'
        >
          Confirm Password
        </label>

        {/* Password input */}
        <div className='flex border-2 rounded-xl w-full items-center pr-5 overflow-hidden'>
          <input
            type={`${showConfirmPassword ? "text" : "password"}`}
            placeholder='Confirm password'
            className='w-full py-3 px-5 focus:outline-none'
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={HandleChange}
          />
          <Icon
            handle={() => setShowConfirmPassword(prev => !prev)}
            value={showConfirmPassword}
          />
        </div>

        <button
          className='bg-[#155FA0] w-full text-white py-4 rounded-xl my-5 active:scale-95'
          onClick={HandleSubmit}
        >
          Reset password
        </button>

        <Link
          href={"signin"}
          className='flex gap-x-2 text-[#155FA0] font-medium text-lg items-center'
        >
          <CircleArrowLeft absoluteStrokeWidth strokeWidth={1.5} size={17} />
          <p>Login</p>
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
