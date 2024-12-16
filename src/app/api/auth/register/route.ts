import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt-ts";

export async function POST(req: NextRequest) {
  try {
    const newUser: User = await req.json();

    // check user
    const getUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: newUser.email }, { phone: newUser.phone }],
      },
    });
    if (getUser) {
      const message = `User already exists at this ${
        newUser.email === getUser.email ? "email" : "phone"
      }`;
      return NextResponse.json({ message }, { status: 409 });
    }
    const salt = await genSalt(10);
    const hashPwd = await hash(newUser.password, salt);
    newUser.password = hashPwd;

    await prisma.user.create({ data: newUser });

    return NextResponse.json(`CREATED`);
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
