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
import { Mail } from "lucide-react";

import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Email should be valid" }),
});

const ForgotPassword = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    router.push("/resetpassword");
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

export default ForgotPassword;
