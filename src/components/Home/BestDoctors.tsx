"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import VisitTimesPopup from "../shared/VisitTimesPopup";

const BestDoctors = () => {
  // states
  const [popup, setPopup] = useState(false);

  const doctors = [
    {
      name: "Dr. Md. Abdullah Mamun",
      degree: "MBBS, FCPS (Medicine)",
      currentEmployeeOf: "Chattogram General Hospital",
      specialist: "Medicine",
      image: "/images/doctors/doctor-img-1.webp",
    },
    {
      name: "Dr. Md. Ashrafuzzaman",
      degree: "MBBS, FCPS (Cardiology)",
      currentEmployeeOf: "Chattogram Medical College Hospital",
      specialist: "Cardiology",
      image: "/images/doctors/doctor-img-2.webp",
    },
    {
      name: "Dr. Md. Monirul Islam",
      degree: "MBBS, FCPS (Surgery)",
      currentEmployeeOf: "Holy Family Hospital",
      specialist: "Surgery",
      image: "/images/doctors/doctor-img-3.webp",
    },
  ];

  return (
    <section>
      <div className="container mx-auto px-5 py-16">
        <h1 className="text-4xl font-bold text-center">
          Best <span className="text-primary">Doctors</span>
        </h1>
        <div className="mt-16">
          <div className="grid grid-cols-4 gap-5">
            {doctors.map(
              (
                { name, currentEmployeeOf, degree, image, specialist },
                index
              ) => (
                <div key={index} className="pt-10">
                  <div className="bg-primary bg-opacity-10 rounded-xl shadow-lg relative pt-10 h-full flex flex-col">
                    <div className="w-24 p-2 bg-[#e5f2eb] rounded-full absolute -top-12 left-1/2 -translate-x-1/2">
                      <div className="w-full aspect-square rounded-full overflow-hidden bg-primary">
                        <Image
                          alt={name}
                          src={image}
                          width={100}
                          height={100}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="px-5 pt-5 pb-3 flex-1">
                      <h3 className="text-lg font-semibold text-center text-primary">
                        {name}
                      </h3>
                      <p className="text-center text-sm">{degree}</p>
                      <p className="text-center text-sm font-medium mt-4">
                        {specialist} specialist of {currentEmployeeOf}
                      </p>
                      <p className="flex justify-between mt-3">
                        <span className="text-primary text-sm font-semibold">
                          Visit Price:
                          <span className="text-lg ml-1">
                            <small>$</small>20
                          </span>
                        </span>
                        <button
                          className="text-primary"
                          title="Favorite Doctor"
                        >
                          <AiFillHeart className="w-6 h-6" />
                        </button>
                      </p>
                    </div>
                    <div className="flex gap-0.5 border-t border-primary rounded-b-xl overflow-hidden">
                      <button className="text-sm font-medium w-1/2 text-center py-3 text-white bg-primary">
                        Book Appointment
                      </button>
                      <button
                        onClick={() => setPopup(true)}
                        className="text-sm font-medium w-1/2 text-center py-3 text-white bg-primary"
                      >
                        Visit Times
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <VisitTimesPopup open={popup} close={() => setPopup(false)} />
    </section>
  );
};

export default BestDoctors;
