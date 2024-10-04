"use client";
import { LockKeyhole } from "lucide-react";
import React, { useState } from "react";
import OTPInput from "react-otp-input";

const Otp = () => {
  const [otp, setOtp] = useState<string>("");

  const HandleSubmit: () => void = () => {
    // ===========================================================
    // === otp validation before submit to upcoming API
    if (otp.length < 6) {
      return alert("fill in the complete OTP!");
    }
    alert(["can Submit", JSON.stringify(otp)]);
  };
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-[600px] p-2 flex-1 sm:mx-5 mx-2 flex flex-col items-center justify-center'>
        <div className='bg-[#155FA0] flex items-center justify-center text-white w-28 h-28 p-5 rounded-full mb-6'>
          <LockKeyhole size={40} />
        </div>
        <h1 className='md:text-5xl sm:text-3xl text-xl text-center font-medium text-[#155FA0]'>
          OTP verification
        </h1>
        <p className='text-xl font-medium pb-5 pt-3'>
          Paste the Otp code sent to you
        </p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          containerStyle={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
          inputStyle={{
            width: "50px",
            height: "50px",
            borderRadius: "10px",
          }}
          renderInput={props => (
            <input
              {...props}
              placeholder='_'
              className='border-2 border-gray-300'
            />
          )}
        />

        <button
          className='bg-[#155FA0] w-full text-white py-4 rounded-xl my-5 active:scale-95'
          onClick={HandleSubmit}
        >
          Verify me
        </button>

        <p className='cursor-pointer'>
          Didn&apos;t receive code ?
          <span className='hover:underline text-blue-800'>Resend</span>
        </p>
      </div>
    </div>
  );
};

export default Otp;
