import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params: { doctorId } }: { params: { doctorId: string } }
) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json(`Unauthorized`, { status: 401 });
    }

    // delete doctor
    const result = await prisma.doctor.delete({ where: { id: doctorId } });

    return NextResponse.json({ message: `DELETED ${result.name}` });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
