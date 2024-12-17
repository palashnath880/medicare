"use server";
import React from "react";
import Doctor from "../shared/Doctor";
import { getDoctors } from "../../../actions/doctors";

const BestDoctors = async () => {
  const doctors = await getDoctors();

  return (
    <section>
      <div className="container mx-auto px-5 py-16">
        <h1 className="text-4xl font-bold text-center">
          Best <span className="text-primary">Doctors</span>
        </h1>
        <div className="mt-16">
          <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-xl:grid-cols-3 xl:grid-cols-4 gap-5">
            {doctors.map((doctor, index) => (
              <Doctor key={index} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestDoctors;
