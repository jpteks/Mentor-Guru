"use client";

import React from "react";

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


import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    router.push("/");
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
                className='w-full mt-3 bg-[#155FA0] hover:bg-[#155FA0]'
              >
                Reset Password
              </Button>
            </div>
          </form>
        </Form>
      </AuthWrapper>
    </>
  );
};

export default ResetPassword;
