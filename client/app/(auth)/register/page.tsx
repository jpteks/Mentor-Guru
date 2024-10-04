"use client";
import { CircleChevronDown, Phone, UserRound } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import googleIcon from "../../images/google.svg";
import Image from "next/image";
import Icon from "@/components/Icon";

// ===========================================================
// === password and confirm password show icon setter

type Data = {
  name: string;
  phone: string;
  region: string;
  password: string;
  confirmPassword: string;
  term: string;
};

const Register = () => {
  const [showpassword, setShowpassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [formData, setFormData] = useState<Data>({
    name: "",
    phone: "",
    region: "",
    password: "",
    confirmPassword: "",
    term: "",
  });

  const HandleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const HandleSubmit: () => void = () => {
    // ===========================================================
    // === form validation before submit to upcoming API
    if (
      formData.name === "" ||
      isNaN(Number(formData.phone)) ||
      formData.phone === "" ||
      formData.region === "" ||
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.term === ""
    ) {
      return alert("Fill in all the inputs correctly!");
    }
    if (formData.password !== formData.confirmPassword) {
      return alert("password don't match!");
    }

    alert(["can Submit", JSON.stringify(formData)]);
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-[600px] p-2 flex-1 sm:mx-5 mx-2 flex flex-col items-center justify-center'>
        <h1 className='md:text-5xl sm:text-3xl text-xl text-center font-medium text-[#155FA0]'>
          Create an account
        </h1>
        <p className='text-sm pb-5 pt-3'>
          Already have an account?{" "}
          <Link href={"signin"} className='text-[#155FA0] underline'>
            SignIn
          </Link>
        </p>
        <label htmlFor='name' className='w-full px-1 pb-2 text-sm'>
          Name
        </label>

        {/* Name input */}
        <div className='flex border-2 rounded-xl w-full items-center pr-5 overflow-hidden'>
          <input
            type='text'
            placeholder='Enter your full name'
            className='w-full py-3 px-5 focus:outline-none'
            id='name'
            name='name'
            value={formData.name}
            onChange={HandleChange}
          />
          <UserRound
            color='#155FA0'
            absoluteStrokeWidth
            strokeWidth={1.5}
            size={17}
          />
        </div>

        <label htmlFor='phone' className='w-full px-1 pb-2 pt-3 text-sm'>
          Phone number
        </label>

        {/* Phone input */}
        <div className='flex border-2 rounded-xl w-full items-center pr-5 overflow-hidden'>
          <input
            type='tel'
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

        <label htmlFor='selectRegion' className='w-full px-1 pb-2 pt-3 text-sm'>
          Region
        </label>

        {/* Region select */}
        <div className='flex border-2 rounded-xl w-full items-center pr-5 overflow-hidden relative'>
          <select
            name='region'
            value={formData.region}
            onChange={HandleChange}
            id='selectRegion'
            className='w-full py-3 px-5 bg-transparent focus:outline-none '
          >
            <option value=''>Select region</option>
            <option value='Douala'>Douala</option>
            <option value='Bamenda'>Bamenda</option>
          </select>

          <CircleChevronDown
            color='#155FA0'
            absoluteStrokeWidth
            strokeWidth={1.5}
            size={17}
            className='absolute right-4 -z-10'
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
          className='bg-[#155FA0] w-full text-white py-4 rounded-xl my-5 active:scale-50'
          onClick={HandleSubmit}
        >
          Sign Up
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

        <div className='flex gap-x-3'>
          <input type='radio' id='term' name='term' onChange={HandleChange} />
          <label htmlFor='term' className='text-sm cursor-pointer'>
            I agree i have read and accept the
            <span className='underline hover:text-blue-400 '>
              {" "}
              guru’s terms and service
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Register;
