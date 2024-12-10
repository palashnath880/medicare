"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import VisitTimesPopup from "../shared/VisitTimesPopup";
import Doctor from "../shared/Doctor";

const BestDoctors = () => {
  // states
  const [popup, setPopup] = useState(false);

  const doctors = [
    {
      id: "10",
      name: "Dr. Md. Abdullah Mamun",
      degree: "MBBS, FCPS (Medicine)",
      currentEmployeeOf: "Chattogram General Hospital",
      specialist: "Medicine",
      visitPrice: 300,
      image: "/images/doctors/doctor-img-1.webp",
    },
    {
      id: "10",
      name: "Dr. Md. Ashrafuzzaman",
      degree: "MBBS, FCPS (Cardiology)",
      currentEmployeeOf: "Chattogram Medical College Hospital",
      specialist: "Cardiology",
      visitPrice: 300,
      image: "/images/doctors/doctor-img-2.webp",
    },
    {
      id: "10",
      name: "Dr. Md. Monirul Islam",
      degree: "MBBS, FCPS (Surgery)",
      currentEmployeeOf: "Holy Family Hospital",
      specialist: "Surgery",
      visitPrice: 300,
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
            {doctors.map((doctor, index) => (
              <Doctor key={index} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>

      {/* <VisitTimesPopup open={popup} close={() => setPopup(false)} /> */}
    </section>
  );
};

export default BestDoctors;
