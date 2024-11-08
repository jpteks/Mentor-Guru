"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/inputForm";
import { Eye, EyeOff, Mail } from "lucide-react";

import Link from "next/link";

import toast from "react-hot-toast";
import { backendApi } from "@/app/constant";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuth } from "@/lib/store";
import { verifyToken } from "@/utils/verifyToken";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password should not be empty.",
  }),
  email: z.string().email({ message: "Email should be valid" }),
});

const FormLogin = () => {
  const router = useRouter();
  const setAuth = useAuth(state => state.setAuth);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await backendApi.post("/auth/login", values, {
        withCredentials: true,
      });
      const token = response.data.token;
      console.log(response.data,token);

      const payload = token && verifyToken(token);

      if (response?.data) {
        const { statusCode, message } = response.data;

        if (statusCode === 409) {
          router.push("/otp");
        }
        if (statusCode === 400) {
          toast.error(message);
        } else {
          setAuth({
            role: payload?.role as string,
            id: payload?.id as string,
            accessToken: token,
          });
          if (payload?.role === "admin") {
            toast.success(message || "Logged in successfully");
            return router.push("/dashboard");
          } else {
            router.push("/courses");
            toast.success(message || "Logged in successfully");
          }
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

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputForm
                    icon={
                      isShowPassword ? (
                        <Eye
                          className='w-4 h-4 text-[#155FA0]'
                          onClick={toggleShowPassword}
                        />
                      ) : (
                        <EyeOff
                          className='w-4 h-4 text-[#155FA0]'
                          onClick={toggleShowPassword}
                        />
                      )
                    }
                    placeholder='create password'
                    type={isShowPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href='/forgotpassword'
            className='text-slate-600 text-sm text-right'
          >
            ForgotPassword?
          </Link>
          <Button
            type='submit'
            className='w-full mt-3 bg-[#155FA0] hover:bg-[#155FA0] dark:text-white'
          >
            {loading ? "Loading..." : "SignIn"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormLogin;
