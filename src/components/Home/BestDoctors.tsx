"use server";
import Image from "next/image";
import React from "react";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import VisitTimesPopup from "../shared/VisitTimesPopup";
import Doctor from "../shared/Doctor";
import { getDoctors } from "../../../actions/doctors";

const BestDoctors = async () => {
  // states
  // const [popup, setPopup] = useState(false);

  const doctors = await getDoctors();

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
