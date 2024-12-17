import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserDoctor } from "react-icons/fa6";

const About = () => {
  return (
    <section>
      <div className="container mx-auto px-5 py-20">
        <div className="flex max-md:flex-col-reverse gap-10 items-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold">
              About <span className="text-primary">Medi Care</span>
            </h1>
            <p className="mt-3 text-sm lg:w-[400px]">
              Welcome to <span className="text-primary">Medi Care</span>{" "}
              Hospital, where we prioritize your well-being. Our expert team is
              dedicated to delivering high-quality healthcare with a
              patient-centric approach. Equipped with state-of-the-art
              facilities, we offer a range of services tailored to your
              individual needs. Your health is our commitment.
            </p>
            <Link
              href="/doctors"
              className="text-sm font-semibold flex items-center gap-3 mt-4 border-2 border-primary rounded-md px-6 py-2.5 bg-primary text-white w-fit"
            >
              <FaUserDoctor className="w-5 h-5" />
              Doctors
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-[16/11] rounded-xl shadow-xl overflow-hidden">
              <Image
                src="/images/hospital.webp"
                width={500}
                height={400}
                alt="About Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
