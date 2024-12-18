import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { Doctor, Image, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // find query
    const query: Prisma.DoctorWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { employeeOf: { contains: search, mode: "insensitive" } },
            { degree: { name: { contains: search, mode: "insensitive" } } },
          ],
        }
      : {};

    // get all count
    const count = await prisma.doctor.count({ where: query });

    // all doctors
    const doctors = await prisma.doctor.findMany({
      where: query,
      include: { degree: true, image: true, visitTimes: true },
      skip: skip,
      take: limit,
    });

    return NextResponse.json({ count, doctors });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json(`Unauthorized`, { status: 401 });
    }
    const data: Doctor & { image: any } = await req.json();

    await prisma.doctor.create({
      data: {
        name: data.name,
        specialist: data.specialist,
        visitPrice: data.visitPrice,
        image: { create: data.image },
        employeeOf: data.employeeOf,
        degree: {
          connect: { id: data.degreeId },
        },
      },
    });
    return NextResponse.json({ message: `Created` }, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
