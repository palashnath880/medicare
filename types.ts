import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface User extends PrismaUser {}

  interface Session {
    user: User;
  }
}
