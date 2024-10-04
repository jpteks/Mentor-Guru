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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().min(9, {
    message: "phone number must be at least 9 characters.",
  }),
  region: z.string().min(3, {
    message: "region must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  email: z.string().email({ message: "Email should be valid" }),
  role: z.enum(["student", "admin", "tutor"]),
});

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => setIsShowPassword(!isShowPassword);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      phone: "",
      region: "",
      password: "",
      email: "",
      role: "student",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <AuthWrapper
        title=' Create an Accout'
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
                name='phone'
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
                className='w-full mt-3 bg-[#155FA0] hover:bg-[#155FA0]'
              >
                SignUp
              </Button>
            </div>
          </form>
        </Form>
      </AuthWrapper>
    </>
  );
};

export default Register;
