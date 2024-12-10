import prisma from "@/lib/prisma";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";

class InvalidLoginError extends CredentialsSignin {
  code = "";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      authorize: async (credentials: { login: string; password: string }) => {
        const { login, password } = credentials;

        // find user by email or phone number
        const findUser = await prisma.user.findFirst({
          where: {
            OR: [{ email: login }, { phone: login }],
          },
        });

        if (!findUser) throw new InvalidLoginError();

        if (!(await compare(password, findUser.password))) {
          throw new InvalidLoginError();
        }

        return findUser;
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: "/login",
  },
});
