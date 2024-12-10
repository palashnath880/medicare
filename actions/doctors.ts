"use server";

import prisma from "@/lib/prisma";
import { Doctor } from "@prisma/client";

export const getDoctors = async (): Promise<Doctor[]> => {
  const doctors = await prisma.doctor.findMany({});
  return doctors;
};
