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
import { useRouter } from "next/navigation";
import { loginAuthActions } from "@/actions/authAction";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password should not be empty.",
  }),
  email: z.string().email({ message: "Email should be valid" }),
});

const FormLogin = () => {
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
    const response = await loginAuthActions(values);

    if (!response.success) {
      toast.error(response.message as string);
    } else {
      toast.success(response.message);
      router.push("/courses");
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
            disabled={form.formState.isSubmitting}
            type='submit'
            className='w-full mt-4'
          >
            {form.formState.isSubmitting ? (
              <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-stone-400'></div>
            ) : (
              "SignIn"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormLogin;
