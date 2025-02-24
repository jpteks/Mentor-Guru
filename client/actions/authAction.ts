"use server";

import { User } from "@/models/user.model";
import { userSchema } from "@/schemas/user";
import { usersType } from "@/types/user";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import * as nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { MongooseError } from "mongoose";
import { dbConnect } from "@/lib/mongo.connection";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function logout() {
  await signOut();
}

export async function registerAuthActions(data: usersType) {
  const parsed = userSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: "Invalid data",
    };
  }
  await dbConnect();
  const { password, email } = parsed.data;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return {
        message: "User already exist",
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes
    const user = new User({
      ...parsed.data,
      password: hashedPassword,
      otp,
      otpExpiry,
      isEmailVerified: false,
    });
    await user.save();
    await sendOtpEmail(parsed.data.username, email, otp);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.EXPIRES,
    });
    return {
      message: "OTP sent through your mail. It expires in 10 minutes.",
      success: true,
      token,
    };
  } catch (error) {
    console.error("user creation error:", error);

    if (error instanceof MongooseError) {
      return {
        message: "Email already exist",
        success: false,
      };
    }

    return {
      message: "Something went wrong try again",
      success: false,
    };
  }
}

export async function verifyOTpActions(otp: number, token: string) {
  await dbConnect();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const user = await User.findById(decoded.id);
    if (!user) {
      return {
        message: "User not found",
        success: false,
      };
    }
    if (user.otp !== otp) {
      return {
        message: "Invalid OTP",
        success: false,
      };
    }
    if (user.otpExpiry < new Date()) {
      user.otp = generateOtp();
      user.otpExpiry = new Date(Date.now() + 10 * 60000);
      await user.save();
      await sendOtpEmail(user.username, user.email, user.otp);
      return {
        message: "OTP expired. A new OTP has been sent to your email.",
        success: false,
      };
    }
    user.isEmailVerified = true;
    user.accountStatus = "active";
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return {
      message: "OTP verified successfully",
      success: true,
    };
  } catch (error) {
    console.error("verify otp error:", error);
    return {
      message: "Invalid or expired token. Please try again.",
      success: false,
    };
  }
}

export async function loginAuthActions(data: {
  email: string;
  password: string;
}) {
  await dbConnect();
  const parsed = userSchema
    .pick({ email: true, password: true })
    .safeParse(data);

  if (!parsed.success) {
    return {
      message: "Invalid data",
    };
  }

  const { password, email } = parsed.data;
  console.log("parsed data", parsed.data);
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirect
    });

    const user = await User.findOne({ email });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.EXPIRE,
    });
    return {
      message: `${user.username} you are successfully login`,
      success: true,
      token,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials!" };

        case "CallbackRouteError":
          const errorMessage = error.cause?.err?.message;

          return { success: false, message: errorMessage as string };
          break;

        default:
          return { success: false, message: "Something went wrong!" };
      }
    }

    throw error;
  }
}

function generateOtp() {
  return otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
}

async function sendOtpEmail(
  username: string,
  email: string,
  otp: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Mentor Guru OTP verification `,
    text: `Hello ${username} your otp code is ${otp}`,
  });
}
export async function sendPasswordResetEmail(
  email: string,
  resetLink: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Hello,</p>
             <p>You requested to reset your password. Please use the link below to reset your password:</p>
             <p><a href="${resetLink}">Reset Password</a></p>
             <p>If you did not request a password reset, please ignore this email.</p>`,
  };

  await transporter.sendMail(mailOptions);
}
