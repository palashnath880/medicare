import { NextRequest, NextResponse } from "next/server";

const doctors = [
  {
    name: "Dr. Md. Abdullah Mamun",
    degree: "MBBS, FCPS (Medicine)",
    currentEmployeeOf: "Chattogram General Hospital",
    specialist: "Medicine",
    visitPrice: 4000,
    image: "/images/doctors/doctor-img-1.webp",
    bgImg: "/images/medicine-img-1.webp",
  },
  {
    name: "Dr. Md. Ashrafuzzaman",
    degree: "MBBS, FCPS (Cardiology)",
    currentEmployeeOf: "Chattogram Medical College Hospital",
    specialist: "Cardiology",
    visitPrice: 4000,
    image: "/images/doctors/doctor-img-2.webp",
    bgImg: "/images/medicine-img-2.webp",
  },
  {
    name: "Dr. Md. Monirul Islam",
    degree: "MBBS, FCPS (Surgery)",
    currentEmployeeOf: "Holy Family Hospital",
    specialist: "Surgery",
    visitPrice: 4000,
    image: "/images/doctors/doctor-img-3.webp",
    bgImg: "/images/medicine-img-3.webp",
  },
  {
    name: "Dr. Md. Mosharraf Hossain",
    degree: "MBBS, FCPS (Gynecology and Obstetrics)",
    currentEmployeeOf: "Ispahani Maternity Hospital",
    specialist: "Gynecology and Obstetrics",
    visitPrice: 4000,
    image: "/images/doctors/doctor-img-4.webp",
    bgImg: "/images/medicine-img-4.webp",
  },
  {
    name: "Dr. Md. Shahadat Hossain",
    degree: "MBBS, FCPS (Pediatrics)",
    currentEmployeeOf: "Chittagong Shishu Hospital",
    specialist: "Pediatrics",
    visitPrice: 4000,
    image: "/images/doctors/doctor-img-5.webp",
    bgImg: "/images/medicine-img-5.webp",
  },
  {
    name: "Dr. Md. Masud Parvez",
    degree: "MBBS, FCPS (Neurology)",
    currentEmployeeOf: "Chattogram Metropolitan Hospital",
    specialist: "Neurology",
    visitPrice: 4000,
    image: "/images/doctors/doctor-img-6.webp",
    bgImg: "/images/medicine-img-1.webp",
  },
  {
    name: "Dr. Md. Nazmul Islam",
    degree: "MBBS, FCPS (Psychiatry)",
    currentEmployeeOf: "Chattogram Mental Hospital",
    specialist: "Psychiatry",
    visitPrice: 4000,
    image: "/images/doctors/doctor-img-7.webp",
    bgImg: "/images/medicine-img-2.webp",
  },
  {
    name: "Dr. Md. Shakil Ahmed",
    degree: "MBBS, FCPS (Otolaryngology)",
    currentEmployeeOf: "Chattogram ENT Hospital",
    specialist: "Otolaryngology",
    visitPrice: 4000,
    image: "/images/doctors/doctor-img-3.webp",
    bgImg: "/images/medicine-img-3.webp",
  },
  {
    name: "Dr. Md. Shafiqul Islam",
    degree: "MBBS, FCPS (Ophthalmology)",
    currentEmployeeOf: "Chattogram Eye Hospital",
    specialist: "Ophthalmology",
    visitPrice: 4000,
    image: "/images/doctors/doctor-img-4.webp",
    bgImg: "/images/medicine-img-4.webp",
  },
  {
    name: "Dr. Md. Shahinul Islam",
    degree: "MBBS, FCPS (Radiology)",
    currentEmployeeOf: "Chattogram Diagnostic Center",
    specialist: "Radiology",
    visitPrice: 4000,
    image: "/images/doctors/doctor-img-1.webp",
    bgImg: "/images/medicine-img-5.webp",
  },
];

export async function GET() {
  try {
    return NextResponse.json(doctors);
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
