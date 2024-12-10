import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    Credentials({
      name: "Credentials",
      authorize: async (credentials, req) => {
        const { email, password } = credentials;
        const admin = await prisma.user.findUnique({ where: { email } });

        if (!admin) {
          return Promise.reject(new Error("Admin Not Found"));
        }

        const isValidPassword = await bcrypt.compare(password, admin.password);

        if (!isValidPassword) {
          return Promise.reject(new Error("Invalid Credentials"));
        }

        return Promise.resolve(admin);
      },
    }),
  ],
  adapter: prisma.adapter,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    algorithm: "RS256",
  },
  callbacks: {
    async session({ session, user, token }) {
      if (user) {
        session.user = user;
      }
      return session;
    },
    async jwt({ token, user, session }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
  },
};

export default NextAuth(options);
