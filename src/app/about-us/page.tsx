import Image from "next/image";
import React from "react";
import PageHeading from "../../components/shared/PageHeading";

export default function page() {
  const apart_data = [
    {
      title: "Expert Team:",
      content: `Our hospital is staffed by a team of skilled and compassionate healthcare professionals, including board-certified physicians, nurses, and support staff, all working together to ensure your well-being.`,
    },
    {
      title: "State-of-the-Art Facilities:",
      content: `Equipped with the latest medical technology and infrastructure, we strive to offer advanced diagnostic and treatment options to meet the diverse needs of our patients.`,
    },
    {
      title: "Patient-Centric Approach:",
      content: `Your health journey is unique, and we tailor our services to address your individual needs. We believe in open communication, involving you in decision-making, and providing comprehensive information about your healthcare options.`,
    },
    {
      title: "Community Engagement:",
      content: ` Beyond the walls of our hospital, we actively engage with the community through health education programs, wellness initiatives, and partnerships to promote overall well-being.`,
    },
  ];

  return (
    <>
      <PageHeading name={"About Us"} bgImg={"/images/primary-care.webp"} />

      <section className="py-20 px-5 relative">
        <div className="mx-auto max-w-[700px] bg-primary bg-opacity-10 rounded-xl">
          <div className="aspect-video overflow-hidden rounded-xl">
            <Image
              src="/images/hospital.webp"
              width={1080}
              height={720}
              className="w-full h-full object-cover"
              alt="About Image"
            />
          </div>

          <div className="px-5 py-7">
            <h3 className="text-xl font-semibold text-primary">
              About Medi Care Hospital
            </h3>
            <p className="text-sm mt-3">
              Welcome to Medi Care Hospital, where your well-being is our
              priority. At the heart of our mission is a commitment to
              delivering exceptional healthcare with a focus on compassion,
              innovation, and excellence.
            </p>
            <div className="pl-3 mt-5">
              <h3 className="text-lg font-semibold text-primary">
                Our Vision:
              </h3>
              <p className="text-sm mt-1">
                We envision a community where every individual receives
                comprehensive, personalized, and accessible healthcare. Through
                cutting-edge medical practices and a patient-centered approach,
                we strive to set new standards in healthcare excellence.
              </p>

              <h3 className="text-lg font-semibold text-primary mt-6">
                Our Mission:
              </h3>
              <p className="text-sm mt-1">
                Medi Care Hospital is dedicated to providing high-quality
                medical services that encompass prevention, diagnosis,
                treatment, and rehabilitation. We aim to create a healing
                environment that fosters trust, respect, and collaboration
                between our healthcare professionals and our patients.
              </p>

              <h3 className="text-lg font-semibold text-primary mt-6">
                What Sets Us Apart:
              </h3>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                {apart_data.map(({ content, title }, index) => (
                  <li key={index} className="text-sm">
                    <strong className="text-primary mr-2">{title}</strong>
                    {content}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
