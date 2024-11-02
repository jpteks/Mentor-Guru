"use client";

import React, { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthWrapper from "@/components/AuthWrapper";
import { InputForm } from "@/components/ui/inputForm";

import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { backendApi } from "@/app/constant";

const formSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    passwordConfirm: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine(
    data => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match.",
      path: ["passwordConfirm"],
    }
  );

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await backendApi.post("/auth/reset-password", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { statusCode, message } = response.data;

      if (statusCode >= 400) {
        switch (statusCode) {
          case 404:
            toast.error("User not found.");
            return;
          case 400:
            toast.error(message || "Expire or Invalid token.");
            return;
          case 500:
            toast.error("Server error. Please try again later.");
            return;
          default:
            toast.error("An unexpected error occurred.");
            return;
        }
      } else {
        toast.success(message || "password reset successfully.");
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
    <>
      <AuthWrapper
        title='Set New Password'
        link=''
        text='Must be atleast 6 characters long'
        href=''
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=' max-w-md w-full md:text-xl '
          >
            <div className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputForm
                        //icon={<Eye className='w-4 h-4 text-[#155FA0]' />}
                        icon=''
                        placeholder='create password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='passwordConfirm'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <InputForm
                        //icon={<Eye className='w-4 h-4 text-[#155FA0]' />}
                        icon=''
                        placeholder='confirm password'
                        type='password'
                        {...field}
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
                {loading ? "Please wait..." : " Reset Password"}
              </Button>
            </div>
          </form>
        </Form>
      </AuthWrapper>
    </>
  );
};

export default ResetPassword;
