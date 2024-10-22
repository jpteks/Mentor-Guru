"use client";

import { useState } from "react";

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
import { Eye, EyeOff, Mail } from "lucide-react";

import Link from "next/link";
import toast from "react-hot-toast";
import { coursesApi } from "@/app/constant";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password should not be empty.",
  }),
  email: z.string().email({ message: "Email should be valid" }),
});

const SignIn = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      //setLoading(true);
      const response = await coursesApi.post("/auth/login", values);
      console.log(response);
      router.push("/courses");
      toast.success("you logged in!");
    } catch (error) {
      toast.error("Something went wrong" + error);
    } finally {
      //setLoading(false);
    }
  }

  return (
    <>
      <AuthWrapper
        title='Welcome Back'
        link='SignUp'
        text="Don't have an account?"
        href='/register'
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
                SignIn
              </Button>
            </div>
          </form>
        </Form>
      </AuthWrapper>
    </>
  );
};

export default SignIn;
