import { dbConnect } from "@/lib/mongo.connection";
import { User } from "@/models/user.model";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async credentials => {
        const { email, password } = credentials;
        await dbConnect();

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        if (
          user.accountStatus === "inactive" ||
          user.isEmailVerified === false
        ) {
          throw new Error("please verify your email");
        }

        const isMatch = await bcrypt.compare(password as string, user.password);
        if (!isMatch) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id,
          email: user.email,
          image: user.avatarUrl,
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    verifyRequest: `/signin`,
    error: "/signin",
  },
  callbacks: {
    async session({ session, token }) {
      // Add user data from token to session
      if (token?.user) {
        session.user.id = token.user.id; // Add user ID
        session.user.name = token.user.name; // Add user role
        session.user.image = token.user.image;
        session.user.role = token.user.role;
        session.user.email = token.user.email;
        //Add custom logo field
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
