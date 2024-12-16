"use client";

import React from "react";
import PageHeading from "../../components/shared/PageHeading";
import AppointmentItem from "../../components/Appointment/AppointmentItem";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";

export default function Page() {
  const profile_data = {
    Name: "Palash Nath",
    "Phone No.": "+8801304780828",
    Email: "palashnath880@gmail.com",
    "Date Of Birth": "2020-03-10",
    Age: "18 Years",
  };

  return (
    <>
      <PageHeading name="My Appointments" bgImg="/images/appointment-bg.jpg" />

      <section className="py-20">
        <div className="container mx-auto px-5">
          <div className="flex gap-10 items-start">
            <div className="flex flex-col gap-3 w-2/3">
              {[...Array(10)].map((_, index) => (
                <AppointmentItem key={index} />
              ))}
            </div>
            <div className="w-1/3 border shadow-md rounded-md px-5 py-5 bg-primary bg-opacity-10">
              <div className="flex flex-col gap-5">
                <h1 className="text-lg font-semibold border-b pb-2 border-primary border-opacity-50">
                  My Profile
                </h1>
                <div className="mx-auto border-2 border-black rounded-full overflow-hidden w-28 aspect-square">
                  <Image
                    src={"/images/doctors/doctor-img-1.webp"}
                    width={120}
                    height={120}
                    alt="Doctor Profile"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
                <div className="">
                  <table className="w-full text-sm font-medium">
                    <tbody>
                      {Object.keys(profile_data).map((key, index) => (
                        <tr key={index}>
                          <td className="w-[120px]">{key}</td>
                          <td className="pb-2">: {profile_data[key]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* logout button */}
                <Button
                  color="primary"
                  startContent={<FiLogOut className="w-4 h-4" />}
                  onPress={() => signOut()}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
