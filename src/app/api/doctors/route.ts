import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { Doctor, Image } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await prisma.doctor.count({});

    const doctors = await prisma.doctor.findMany({
      include: { degree: true, image: true },
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
