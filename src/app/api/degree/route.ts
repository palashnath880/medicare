import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const result = await prisma.degree.findMany({
      where: search
        ? {
            name: { contains: search, mode: "insensitive" },
          }
        : {},
      orderBy: { createdAt: "desc" },
      select: {
        name: true,
        createdAt: true,
        id: true,
        doctor: {
          select: {
            id: true,
            name: true,
            image: {
              select: {
                display_url: true,
              },
            },
          },
        },
      },
    });
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
