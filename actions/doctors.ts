"use server";

import prisma from "@/lib/prisma";
import { Doctor, Image, Degree } from "@prisma/client";

export const getDoctors = async (): Promise<
  (Doctor & { image: Image; degree: Degree })[]
> => {
  const doctors = await prisma.doctor.findMany({
    where: {},
    include: { image: true, degree: true, visitTimes: true },
  });
  return doctors;
};
