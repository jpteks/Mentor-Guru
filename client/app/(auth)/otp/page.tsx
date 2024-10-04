"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import OtpWrapper from "@/components/OtpWrapper";
import { Button } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";
import React from "react";
import OTPInput from "react-otp-input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  otp: z.string().min(6, { message: "fill in the complete OTP!" }),
});

const Otp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className='max-w-md w-full mx-auto gap-4 min-h-screen flex flex-col items-center justify-center'>
      <div className='bg-[#155FA0] flex items-center justify-center text-white w-28 h-28 p-5 rounded-full'>
        <LockKeyhole size={40} />
      </div>
      <OtpWrapper
        title=' OTP verification'
        text='Paste the Otp code sent to you'
        href=''
        link=''
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=' max-w-md w-full md:text-xl '
          >
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <OTPInput
                      value={field.value}
                      onChange={field.onChange}
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full mt-3 bg-[#155FA0] hover:bg-[#155FA0]'
            >
              Verify me
            </Button>

            <p className='cursor-pointer text-sm text-slate-600 text-center'>
              Didn&apos;t receive code ?
              <span className='hover:underline text-blue-800'>Resend</span>
            </p>
          </form>
        </Form>
      </OtpWrapper>
    </div>
  );
};

export default Otp;
