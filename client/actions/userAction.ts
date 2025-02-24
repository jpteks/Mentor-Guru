/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { dbConnect } from "@/lib/mongo.connection";
import { User } from "@/models/user.model";
import { usersType } from "@/types/user";
import { revalidateTag, unstable_cache } from "next/cache";


export async function getUserById(
  id: string
): Promise<Omit<
  usersType,
  | "isEmailVerified"
  | "accountStatus"
  | "otp"
  | "otpExpiry"
  | "createdAt"
  | "updatedAt"
> | null> {
  await dbConnect();

  try {
    const user: usersType | null = await User.findById(id);
    if (!user) {
      return null;
    }

    // Destructure and exclude unwanted fields
    const {
      isEmailVerified,
      otp,
      otpExpiry,
      createdAt,
      updatedAt,
      __v,
      ...filteredUser
    } = user;

    
    return filteredUser as Omit<
      usersType,
      | "isEmailVerified"
      | "accountStatus"
      | "otp"
      | "otpExpiry"
      | "createdAt"
      | "updatedAt"
    >;
  } catch (error) {
    console.error("User retrieval error:", error);
    return null;
  }
}


export const getCachedUser = unstable_cache(
  async id => getUserById(id),
  ["user-by-id"],
  {
    tags: ["user"],
  }
);

export async function editUserById(
  id: string,
  updateData: {
    username: string;
    phoneNumber: string;
    bio?: string | undefined;
  }
) {
  await dbConnect();

  try {
    //const formObject = Object.fromEntries(updateData);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedUser) {
      return { updatedUser: null, message: "User not found", success: false };
    }
    revalidateTag("user");
    return {
      updatedUser: null,
      message: "User updated successfully",
      success: true,
    };
  } catch (error) {
    console.error("user update error:", error);
    return { updatedUser: null, message: "Update failed", success: false };
  }
}
