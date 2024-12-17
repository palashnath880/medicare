import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params: { degreeId } }: { params: { degreeId: string } }
) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json(`Unauthorized`, { status: 401 });
    }

    const res = await prisma.degree.delete({ where: { id: degreeId } });
    return NextResponse.json(`DELETED`);
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
