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
import React, { useState } from "react";
import OTPInput from "react-otp-input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { backendApi } from "@/app/constant";
import { AxiosError } from "axios";

const formSchema = z.object({
  otp: z.string().min(6, { message: "fill in the complete OTP!" }),
});

const Otp = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { otp } = values;
    const data = {
      otp: +otp,
    };
    try {
      setLoading(true);
      const response = await backendApi.post("/auth/verify-otp", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { statusCode, message } = response.data;

      if (statusCode >= 400) {
        switch (statusCode) {
          case 401:
            toast.error("Invalid or expired token. Please try again.");
            return;
          case 404:
            toast.error("User not found.");
            return;
          case 400:
            toast.error(message || "Invalid request."); // Display message if available
            return;
          case 500:
            toast.error("Server error. Please try again later.");
            return;
          case 410:
            toast.error(
              "OTP has expired. A new OTP has been sent to your email."
            );
            return;
          default:
            toast.error("An unexpected error occurred.");
            return;
        }
      } else {
        // If statusCode is 2xx, handle success
        toast.success(message || "OTP verified successfully.");
        router.push(`/signin`);
      }
    } catch (error: unknown) {
      // Check if the error is an AxiosError
      if (error instanceof AxiosError) {
        // Handle network or server errors
        if (error.response) {
          toast.error(
            `API error: ${error.response.data?.message || error.message}`
          );
        } else if (error.request) {
          // Request made but no response
          toast.error("Network error. Please check your connection.");
        } else {
          // Unexpected error
          console.error("An unexpected error occurred: " + error.message);
          toast.error("An unexpected error occurred: ");
        }
      } else if (error instanceof Error) {
        // Handle other generic errors
        console.error(`Something went wrong: ${error.message}`);
        toast.error(`Something went wrong`);
      } else {
        // Catch-all for unknown error types
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
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
              className='w-full mt-3 bg-[#155FA0] hover:bg-[#155FA0] dark:text-white'
            >
              {loading ? "Verifying..." : "Verify me"}
            </Button>

            <p className='cursor-pointer text-sm text-slate-600 text-center'>
              Didn&apos;t receive code ?
              <span className='hover:underline text-blue-800 dark:text-white'>
                Resend
              </span>
            </p>
          </form>
        </Form>
      </OtpWrapper>
    </div>
  );
};

export default Otp;
