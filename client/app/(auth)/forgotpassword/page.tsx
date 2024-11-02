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
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import { backendApi } from "@/app/constant";
import { AxiosError } from "axios";

const formSchema = z.object({
  email: z.string().email({ message: "Email should be valid" }),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await backendApi.post(
        "/auth/request-password-reset",
        values,
        {
          withCredentials: true,
        }
      );

      if (response?.data) {
        const { statusCode, message } = response.data;

        if (statusCode === 404) {
          toast.error(message);
        } else {
          window.location.href = "https://mail.google.com/";
          toast.success(message || "password send to your email");
        }
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Handle Axios-specific errors
        toast.error(
          `API error: ${error.response?.data?.message || error.message}`
        );
      } else if (error instanceof Error) {
        // Handle generic errors
        console.error(`Something went wrong: ${error.message}`);

        toast.error(`Something went wrong`);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AuthWrapper
        title='Forgot Password'
        link='back to SignIn'
        text="No worries we'll send you instructions"
        href='/signin'
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=' max-w-md w-full md:text-xl '
          >
            <div className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <InputForm
                        icon={<Mail className='w-4 h-4 text-[#155FA0]' />}
                        placeholder='jpteks728@gmail.com'
                        type='email'
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
                {loading ? "Loading.." : "Reset Password"}
              </Button>
            </div>
          </form>
        </Form>
      </AuthWrapper>
    </>
  );
};

export default ForgotPassword;
