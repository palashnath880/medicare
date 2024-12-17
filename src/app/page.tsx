import React from "react";
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import Services from "../components/Home/Services";
import BestDoctors from "../components/Home/BestDoctors";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <BestDoctors />

      {/* contact us area start */}
      <section className="bg-primary bg-opacity-10 mb-28 max-lg:mb-20">
        <div className="container mx-auto px-5 py-20">
          <div className="flex flex-col gap-5 sm:w-[600px] mx-auto items-center">
            <h1 className="text-4xl font-bold text-center">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-center text-sm">
              Visit us at Chawkbazar, CTG to experience the difference in
              healthcare. You can also reach us by phone at
              <a className="text-primary mx-1">+880123456789</a>or email us at
              <a
                href="mailto:medicare@contact.com"
                className="text-primary ml-1"
              >
                medicare@contact.com
              </a>
            </p>
            <button className="bg-primary rounded-full w-fit text-white text-sm font-semibold px-7 py-2.5 duration-200 border-2 border-primary hover:bg-transparent hover:text-primary">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
      {/* contact us area end */}

      <section>
        <div className="max-lg:container md:w-[900px] mx-auto px-5 pt-10 pb-20">
          <div className="flex max-md:flex-col items-center gap-10">
            <div className="w-full md:w-1/2">
              <div className="aspect-video">
                <Image
                  src="/images/clock.webp"
                  width={500}
                  height={500}
                  alt="Click"
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex flex-col gap-4">
                <h1 className="max-sm:text-2xl text-4xl font-bold">
                  Appoiment <span className="text-primary">Scheduling</span>
                </h1>
                <p className="text-sm">
                  Book your appointment online or call our friendly staff to
                  arrange a convenient time for your visit. We strive to provide
                  flexible scheduling options to accommodate your busy
                  lifestyle.
                </p>
                <p className="text-sm">
                  Thank you for choosing Medi Care Clinic. Your well-being is
                  our priority, and we look forward to serving you and your
                  family with excellence in healthcare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
