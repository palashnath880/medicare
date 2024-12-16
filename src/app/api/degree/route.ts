import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await prisma.degree.findMany({});
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json(`Unauthorized`, { status: 401 });
    }

    const newDegree = await req.json();

    // check degree
    const getDegree = await prisma.degree.findFirst({
      where: { name: newDegree.name },
    });
    if (getDegree) {
      return NextResponse.json(
        { message: `${newDegree.name} already exists` },
        { status: 409 }
      );
    }

    await prisma.degree.create({ data: newDegree });
    return NextResponse.json({ message: `Created` });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
