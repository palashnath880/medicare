import NextImage from "next/image";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { displayPrice } from "../../lib/utils";
import Link from "next/link";
import VisitTimesPopup from "./VisitTimesPopup";
import { type Doctor, type Image, type Degree } from "@prisma/client";

type DoctorProps = {
  doctor: (Doctor & { image: Image; degree: Degree }) | null;
};

export default function Doctor({ doctor }: DoctorProps) {
  return (
    <div className="pt-10">
      <div className="bg-primary bg-opacity-10 rounded-xl shadow-lg relative pt-10 h-full flex flex-col">
        <div className="w-24 p-2 bg-[#e5f2eb] rounded-full absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="w-full aspect-square rounded-full overflow-hidden bg-primary">
            <NextImage
              alt={doctor.name}
              src={doctor?.image?.display_url}
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="px-3 pt-5 pb-3 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-center text-primary">
            {doctor.name}
          </h3>
          <p className="text-center text-sm">{doctor?.degree?.name}</p>
          <p className="text-center text-sm font-medium mt-4 flex-1">
            {doctor.specialist} specialist of <b>{doctor.employeeOf}</b>
          </p>
          <p className="flex justify-between mt-3">
            <span className="text-primary text-sm font-semibold">
              Visit Price:
              <span className="text-sm ml-1 font-sans">
                {displayPrice(doctor.visitPrice)}
              </span>
            </span>
            <button className="text-primary" title="Favorite Doctor">
              <AiFillHeart className="w-6 h-6" />
            </button>
          </p>
        </div>
        <div className="flex gap-0.5 border-t border-primary rounded-b-xl overflow-hidden">
          <Link
            href={`/appointment/book/${doctor.id}`}
            className="text-sm font-medium w-1/2 text-center py-3 text-white bg-primary"
          >
            Book Appointment
          </Link>
          <VisitTimesPopup
            buttonText="Visit Times"
            doctor={doctor}
            buttonClass="text-sm font-medium w-1/2 text-center py-3 text-white bg-primary"
          />
        </div>
      </div>
    </div>
  );
}
