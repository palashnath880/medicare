import React from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={`bg-[#f2f2f2]`}>
      <div className="container mx-auto px-5 py-10">
        <div className="grid max-lg:grid-cols-1 grid-cols-8 gap-5">
          <div className="col-span-2">
            <Image
              width={200}
              height={200}
              src="/images/text-logo.png"
              className="mix-blend-multiply w-36 h-auto"
              alt="Medi Care Logo"
            />
            <h3 className="text-primary font-semibold text-xl mt-5">
              Medi Care
            </h3>
            <p className="text-sm text-primary mt-2">
              At Medi Care, your health is our priority. Our dedicated team of
              healthcare professionals is committed to providing compassionate
              and personalized medical care to you and your family. Whether you
              need a routine check-up, specialized treatment, or expert advice,
              we are here to serve you.
            </p>
          </div>
          <div className="col-span-2">
            <h3 className="text-primary text-xl font-semibold border-b border-primary pb-2 min-w-[90%] w-fit">
              Contact Information:
            </h3>
            <div className="flex flex-col gap-6 px-2 mt-5">
              <p className="text-sm text-primary font-medium">
                Medi Care Clinic, <br /> CWK Road, <br /> Chittagong, Bangladesh{" "}
              </p>
              <div>
                <p className="text-sm flex items-center gap-2 text-primary">
                  <strong>Phone:</strong>
                  <span>+880123456789</span>
                </p>
                <p className="text-sm flex items-center gap-2 text-primary">
                  <strong>Email:</strong>
                  <span>medicare@contact.com</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <h3 className="text-primary text-xl font-semibold border-b border-primary pb-2 min-w-[90%] w-fit">
              Office Hours:
            </h3>
            <div className="flex flex-col gap-2 px-2 mt-5">
              <p className="text-sm text-primary font-medium">
                Monday - Friday: 8:00 AM - 6:00 PM
              </p>
              <p className="text-sm text-primary font-medium">
                Saturday: 9:00 AM - 2:00 PM
              </p>
              <p className="text-sm text-primary font-medium">Sunday: Closed</p>
            </div>
          </div>
          <div className="col-span-2">
            <h3 className="text-primary text-xl font-semibold border-b border-primary pb-2 min-w-[90%] w-fit">
              Connect With Us:
            </h3>
            <div className="flex flex-col gap-2 px-2 mt-5">
              <p className="text-sm text-primary font-medium">
                Follow us on social media for the latest updates, health tips,
                and community events.
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                <a className="w-8 aspect-square rounded-full grid place-items-center hover:bg-primary hover:text-white text-primary cursor-pointer duration-200">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a className="w-8 aspect-square rounded-full grid place-items-center hover:bg-primary hover:text-white text-primary cursor-pointer duration-200">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a className="w-8 aspect-square rounded-full grid place-items-center hover:bg-primary hover:text-white text-primary cursor-pointer duration-200">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a className="w-8 aspect-square rounded-full grid place-items-center hover:bg-primary hover:text-white text-primary cursor-pointer duration-200">
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a className="w-8 aspect-square rounded-full grid place-items-center hover:bg-primary hover:text-white text-primary cursor-pointer duration-200">
                  <FaReddit className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:justify-center mt-10">
          <p className="text-sm text-primary font-medium flex gap-2 max-sm:flex-col">
            <strong>Emergency Contact :</strong>
            In case of a medical emergency, please call{" "}
            <a href="tel:+8801356545811" className="underline">
              +8801356545811
            </a>
          </p>
        </div>
      </div>
      <div className="container mx-auto px-5 py-5 border-t border-primary border-opacity-50">
        <div className="flex justify-center items-center">
          <p className="font-medium text-sm text-primary">
            Copyright {new Date().getFullYear()} | Developed By{" "}
            <a>Palash Nath</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
