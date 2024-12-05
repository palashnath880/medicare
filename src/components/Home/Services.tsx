import Image from "next/image";
import React from "react";

const Services = () => {
  const services_data = [
    {
      title: "Primary Care",
      content: `Our experienced primary care physicians offer comprehensive health assessments, vaccinations, and personalized care plans to keep you in optimal health.`,
      image: "/images/primary-care.webp",
    },
    {
      title: "Specialized Care",
      content: `From cardiology to dermatology, our team of specialists covers a wide range of medical fields to address your specific health needs.`,
      image: "/images/specialized-care.webp",
    },
    {
      title: "Wellness Care",
      content: `We believe in proactive healthcare. Explore our wellness programs designed to promote a healthy lifestyle and prevent potential health issues.`,
      image: "/images/wellness-care.webp",
    },
    {
      title: "Emergency Care",
      content: `Accidents and sudden illnesses can happen. Our emergency care services are available to provide prompt and efficient medical attention when you need it most.`,
      image: "/images/emergency-care.webp",
    },
  ];

  return (
    <section>
      <div className="container mx-auto px-5 py-16">
        <h1 className="text-4xl font-bold text-center">
          Our <span className="text-primary">Services</span>
        </h1>
        <div className="mt-16">
          <div className="grid grid-cols-4 gap-5">
            {services_data.map(({ content, image, title }, index) => (
              <div
                key={index}
                className="cursor-pointer group bg-primary bg-opacity-10 shadow-md"
              >
                <div className="aspect-[16/11] overflow-hidden">
                  <Image
                    draggable={false}
                    alt={title}
                    src={image}
                    width={500}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 duration-200"
                  />
                </div>
                <div className="px-4 py-6">
                  <h4 className="text-primary text-xl font-bold">{title}</h4>
                  <p className="text-sm mt-2 font-normal opacity-70">
                    {content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
