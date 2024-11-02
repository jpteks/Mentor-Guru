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
import { backendApi, Region } from "@/app/constant";
import AuthWrapper from "@/components/AuthWrapper";
import { InputPhone } from "@/components/ui/inputPhone";
import { InputForm } from "@/components/ui/inputForm";
import { Eye, EyeOff, Mail, Phone, User } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(9, {
    message: "phone number must be at least 9 characters.",
  }),
  region: z.string().min(3, {
    message: "region must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  terms: z.boolean().refine(v => v, { message: "Accept terms and conditions" }),
  email: z.string().email({ message: "Email should be valid" }),
  role: z.enum(["student", "admin", "tutor"]),
});

const Register = () => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
      region: "",
      password: "",
      email: "",
      role: "student",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await backendApi.post("/auth/register", values);
      const token = response.data.token;
      toast.success(response.data.message);
      router.push(`/otp?token=${token}`);
    } catch (error) {
      toast.error("Something went wrong" + error);
    } finally {
      setLoading(false);
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
                type='submit'
                className='w-full mt-3 bg-[#155FA0] hover:bg-[#155FA0] dark:text-white'
              >
                {loading ? "Loading..." : "SignUp"}
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
