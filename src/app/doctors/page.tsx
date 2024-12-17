import React from "react";
import PageHeading from "../../components/shared/PageHeading";
import { getDoctors } from "../../../actions/doctors";
import Doctor from "../../components/shared/Doctor";

export default async function page() {
  // get doctors
  const doctors = await getDoctors();
  console.log(doctors);

  return (
    <>
      <PageHeading bgImg={`/images/primary-care.webp`} name={"Doctors"} />

      <div className="py-20 container mx-auto px-5">
        {/* filter start */}
        {/* <div className="pb-10">

        </div> */}
        {/* filter end */}

        {Array.isArray(doctors) && doctors.length > 0 ? (
          <div className="grid grid-cols-4 gap-5">
            {doctors.map((doctor, index) => (
              <Doctor key={index} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="py-5 px-4 bg-red-50 border-l-4 border-red-500">
            <p className="text-sm text-red-500 font-semibold">
              Doctor not found
            </p>
          </div>
        )}
      </div>
    </>
  );
}
