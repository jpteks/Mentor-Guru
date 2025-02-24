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
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOTpActions } from "@/actions/authAction";

const formSchema = z.object({
  otp: z.string().min(6, { message: "fill in the complete OTP!" }),
});

const Otp = () => {
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
    const res = await verifyOTpActions(+otp, token as string);

    if (res.success) {
      toast.success(res.message);

      router.push(`/signin`);
    } else {
      toast.error(res.message);
      //reset form
      form.reset();
    }
  }

  return (
    <div className='max-w-md w-full mx-auto gap-4 min-h-screen flex flex-col items-center justify-center'>
      <div className='bg-[#155FA0] flex items-center justify-center text-white w-28 h-28 p-5 rounded-full'>
        <LockKeyhole size={40} />
      </div>
      <OtpWrapper
        title=' OTP verification'
        text='Paste the Otp code sent to your email'
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
              disabled={form.formState.isSubmitting}
              type='submit'
              className='w-full mt-4'
            >
              {form.formState.isSubmitting ? (
                <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-stone-400'></div>
              ) : (
                "Verify OTP"
              )}
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
