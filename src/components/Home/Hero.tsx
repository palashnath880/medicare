"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const slides_data = [
  {
    name: "Dr. Md. Abdullah Mamun",
    degree: "MBBS, FCPS (Medicine)",
    currentEmployeeOf: "Chattogram General Hospital",
    specialist: "Medicine",
    image: "/images/doctors/doctor-img-1.webp",
    bgImg: "/images/medicine-img-1.webp",
  },
  {
    name: "Dr. Md. Ashrafuzzaman",
    degree: "MBBS, FCPS (Cardiology)",
    currentEmployeeOf: "Chattogram Medical College Hospital",
    specialist: "Cardiology",
    image: "/images/doctors/doctor-img-2.webp",
    bgImg: "/images/medicine-img-2.webp",
  },
  {
    name: "Dr. Md. Monirul Islam",
    degree: "MBBS, FCPS (Surgery)",
    currentEmployeeOf: "Holy Family Hospital",
    specialist: "Surgery",
    image: "/images/doctors/doctor-img-3.webp",
    bgImg: "/images/medicine-img-3.webp",
  },
  {
    name: "Dr. Md. Mosharraf Hossain",
    degree: "MBBS, FCPS (Gynecology and Obstetrics)",
    currentEmployeeOf: "Ispahani Maternity Hospital",
    specialist: "Gynecology and Obstetrics",
    image: "/images/doctors/doctor-img-4.webp",
    bgImg: "/images/medicine-img-4.webp",
  },
  {
    name: "Dr. Md. Shahadat Hossain",
    degree: "MBBS, FCPS (Pediatrics)",
    currentEmployeeOf: "Chittagong Shishu Hospital",
    specialist: "Pediatrics",
    image: "/images/doctors/doctor-img-5.webp",
    bgImg: "/images/medicine-img-5.webp",
  },
  {
    name: "Dr. Md. Masud Parvez",
    degree: "MBBS, FCPS (Neurology)",
    currentEmployeeOf: "Chattogram Metropolitan Hospital",
    specialist: "Neurology",
    image: "/images/doctors/doctor-img-6.webp",
    bgImg: "/images/medicine-img-1.webp",
  },
  {
    name: "Dr. Md. Nazmul Islam",
    degree: "MBBS, FCPS (Psychiatry)",
    currentEmployeeOf: "Chattogram Mental Hospital",
    specialist: "Psychiatry",
    image: "/images/doctors/doctor-img-7.webp",
    bgImg: "/images/medicine-img-2.webp",
  },
  {
    name: "Dr. Md. Shakil Ahmed",
    degree: "MBBS, FCPS (Otolaryngology)",
    currentEmployeeOf: "Chattogram ENT Hospital",
    specialist: "Otolaryngology",
    image: "/images/doctors/doctor-img-3.webp",
    bgImg: "/images/medicine-img-3.webp",
  },
  {
    name: "Dr. Md. Shafiqul Islam",
    degree: "MBBS, FCPS (Ophthalmology)",
    currentEmployeeOf: "Chattogram Eye Hospital",
    specialist: "Ophthalmology",
    image: "/images/doctors/doctor-img-4.webp",
    bgImg: "/images/medicine-img-4.webp",
  },
  {
    name: "Dr. Md. Shahinul Islam",
    degree: "MBBS, FCPS (Radiology)",
    currentEmployeeOf: "Chattogram Diagnostic Center",
    specialist: "Radiology",
    image: "/images/doctors/doctor-img-1.webp",
    bgImg: "/images/medicine-img-5.webp",
  },
];

export default function Hero() {
  return (
    <section className="mt-10">
      <div className="container px-5 mx-auto">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          speed={1000}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletActiveClass: "!bg-primary !opacity-100",
          }}
          className="!px-3 !pb-10"
          modules={[Pagination, Autoplay]}
        >
          {slides_data.map((slide, index) => (
            <SwiperSlide key={index} className="py-3 cursor-pointer">
              <div className="bg-primary rounded-lg bg-opacity-10 shadow-md">
                <div className="flex flex-col pt-4">
                  <Image
                    draggable={false}
                    width={400}
                    height={500}
                    src={slide.image}
                    alt={slide.name}
                    className="aspect-square object-contain"
                  />
                  <div className="flex flex-col px-3 py-5 justify-center gap-4 h-full w-full items-start">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-primary font-semibold text-xl">
                        {slide.name}
                      </h3>
                      <p className="text-primary text-opacity-90 text-sm ">
                        {slide.degree}
                      </p>
                    </div>
                    <p className="text-primary text-sm">
                      {slide.specialist} specialist of{" "}
                      <b>{slide.currentEmployeeOf}</b>
                    </p>
                    <button className="bg-primary text-white w-full text-sm font-semibold px-7 py-2.5 rounded-md duration-500 border-2 border-primary">
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
