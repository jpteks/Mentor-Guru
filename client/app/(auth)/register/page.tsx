"use client";

import React, { useState, useEffect } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Region } from "@/app/constant";
import AuthWrapper from "@/components/AuthWrapper";
import { InputPhone } from "@/components/ui/inputPhone";
import { InputForm } from "@/components/ui/inputForm";
import { Eye, EyeOff, Mail, Phone, User } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { userSchema } from "@/schemas/user";
import { registerAuthActions } from "@/actions/authAction";

const Register = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      region: "",
      password: "",
      email: "",
      role: "student",
    },
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    const res = await registerAuthActions(values);

    if (res.success) {
      toast.success(res.message);

      const token = res.token;

      router.push(`/otp?token=${token}`);
    } else {
      toast.error(res.message);
    }
  }
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthWrapper
        title=' Create an Account'
        link='SignIn'
        text='Already have an account?'
        href='/signin'
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=' max-w-md w-full md:text-xl '
          >
            <div className='flex flex-col gap-1'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <InputForm
                        icon={<User className='w-4 h-4 text-[#155FA0]' />}
                        placeholder='Enter your fullname...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <InputPhone
                        icon={<Phone className='w-4 h-4 text-[#155FA0]' />}
                        className='pl-[10%] '
                        placeholder='/xxxxxxx...'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='region'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select region' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Region.map((region, indx) => (
                          <SelectItem key={indx} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              <Button
                disabled={form.formState.isSubmitting}
                type='submit'
                className='w-full mt-4'
              >
                {form.formState.isSubmitting ? (
                  <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-stone-400'></div>
                ) : (
                  "Register"
                )}
              </Button>
              <FormField
                control={form.control}
                name='terms'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='terms'
                          className='border-black'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor='terms'
                          className='font-medium text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                          Accept terms and conditions
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </AuthWrapper>
    </>
  );
};

export default Register;
