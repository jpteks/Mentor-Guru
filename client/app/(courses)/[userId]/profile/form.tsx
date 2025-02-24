"use client";
import { editUserById } from "@/actions/userAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usersType } from "@/types/user";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// Define validation schema using Zod
const schema = z.object({
  username: z.string().min(3, "Name must be at least 3 characters"),
  phoneNumber: z.string().min(9, {
    message: "phone number must be at least 9 characters.",
  }),
  bio: z.string().max(200, "Bio must be under 200 characters").optional(),
});

type FormData = z.infer<typeof schema>;

const AccountForm = ({ data }: { data:  Omit<
      usersType,
      | "isEmailVerified"
      | "accountStatus"
      | "otp"
      | "otpExpiry"
      | "createdAt"
      | "updatedAt"
    > }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: data.username,
      phoneNumber: data.phoneNumber,
      bio: data.bio || "",
    },
  });

  const onSubmit = async (formData: FormData) => {
    const res = await editUserById(data._id as string, formData);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className='h-screen border-x p-6'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        <h1 className='font-bold'>Account Settings</h1>
        <div className='grid md:grid-cols-2 w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='username'>Name</Label>
            <Input id='username' {...register("username")} />
            {errors.username && (
              <span className='text-red-500 text-sm'>
                {errors.username.message}
              </span>
            )}
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' defaultValue={data.email} readOnly />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='phoneNumber'>Phone Number</Label>
            <Input id='phoneNumber' {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <span className='text-red-500 text-sm'>
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='region'>Region</Label>
            <Input id='region' defaultValue={data.region} readOnly />
          </div>
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='bio'>Bio</Label>
          <Textarea placeholder='Tell us about you.' {...register("bio")} />
          {errors.bio && (
            <span className='text-red-500 text-sm'>{errors.bio.message}</span>
          )}
        </div>

        <div className='flex gap-2'>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
