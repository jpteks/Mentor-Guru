"use client";
import { CircleArrowLeft, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Data = {
  phone: string;
};

const ForgetPassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Data>({
    phone: "",
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
    if (formData.phone === "" || isNaN(Number(formData.phone))) {
      return alert("Fill in all the inputs correctly!");
    }
    alert(["can Submit", JSON.stringify(formData)]);
    router.push("/resetpassword");
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-[600px] p-2 flex-1 sm:mx-5 mx-2 flex flex-col items-center justify-center'>
        <div className='w-full'>
          <h1 className='md:text-5xl sm:text-3xl text-xl font-medium text-[#155FA0]'>
            Forgot password ?
          </h1>

          <p className='text-xl font-medium w-[300px] pb-5 pt-3'>
            No worries we will send you reset instructions
          </p>
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

export default ForgetPassword;
