"use client";

import Link from "next/link";
import React, { useEffect } from "react";

type VisitTimesPopupProps = {
  buttonText: React.ReactNode;
  buttonClass: string | null;
  style?: React.CSSProperties;
  doctor: null | any;
};

export default function VisitTimesPopup({
  buttonText,
  buttonClass,
  style,
}: VisitTimesPopupProps) {
  // trigger
  const trigger = () => {
    const body = document.querySelector("html body");
    const popupBox = body.querySelector("div.visitTimesPopup");
    if (popupBox) {
    }
  };

  // add popup box in the dom
  useEffect(() => {
    const body = document.querySelector("html body");
    const popupBox = body.querySelector("div.visitTimesPopup");
    if (!popupBox) {
      const popup = document.createElement("div");
      popup.classList.add("visitTimesPopup");
      body.append(popup);
    }
  }, []);

  return (
    <>
      <button onClick={trigger} className={buttonClass} style={style}>
        {buttonText}
      </button>
    </>
  );
}

// const VisitTimesPopup = ({ open, close, doctor }) => {
//   const ref = useRef();

//   const handleClose = () => {
//     close();
//   };

//   useEffect(() => {
//     // control scrollbar
//     const body = document.querySelector("body");
//     if (open) {
//       body.style.overflowY = "hidden";
//     } else {
//       body.style.overflowY = "auto";
//     }

//     // outside detect
//     const __outside_click = (e) => {
//       if (!e.target.closest(".modal_body")) {
//         const style = window.getComputedStyle(ref.current);
//         let opacity = parseInt(style.opacity);
//         if (opacity === 1) {
//           handleClose();
//         }
//       }
//     };

//     document.addEventListener("click", __outside_click);

//     return () => {
//       body.style.overflowY = "auto";
//       document.removeEventListener("click", __outside_click);
//     };
//   }, [open]);

//   return (
//     <div
//       ref={ref}
//       className={`fixed top-0 left-0 w-full h-screen bg-black p-5 bg-opacity-20 grid place-items-center duration-200 transition-opacity ${
//         open ? "visible opacity-100" : "invisible opacity-0"
//       }`}
//     >
//       <div
//         className={`modal_body bg-white p-5 rounded-xl shadow-xl sm:w-[400px] max-sm:w-full duration-200 ${
//           open ? "opacity-100 scale-100" : "opacity-0 scale-90"
//         }`}
//       >
//         <div className="flex items-center justify-between border-b pb-3 border-primary border-opacity-40">
//           <h3 className="font-semibold text-primary">Visit Times</h3>
//           <button
//             onClick={handleClose}
//             className="w-9 aspect-square rounded-full grid place-items-center bg-primary bg-opacity-10 hover:bg-opacity-100 text-primary hover:text-white duration-200"
//           >
//             <AiOutlineClose className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="mt-4 flex flex-col gap-3">
//           <p className="text-sm">
//             <span className="text-primary font-semibold">{doctor?.name}</span>{" "}
//             at <span className="text-primary">Medi Care</span> Clinic are
//             available to provide you with personalized care during the following
//             office hours:
//           </p>
//           {Array.isArray(doctor?.visitTimes)
//             ? doctor?.visitTimes?.map(
//                 ({ day, time: { start, end } }, index) => (
//                   <div className="flex flex-col gap-0" key={index}>
//                     <h5 className="text-sm text-primary flex gap-2">
//                       <span className="font-semibold">{day}:</span>
//                       <span className="flex gap-2 items-center">
//                         <span>{start}</span>
//                         <span className="rounded-full h-[2px] w-2 bg-primary"></span>
//                         <span>{end}</span>
//                       </span>
//                     </h5>
//                   </div>
//                 )
//               )
//             : null}

//           <Link
//             href={`/doctors/booking/${doctor?.id}`}
//             className="text-sm mt-3 bg-primary text-center text-white border-2 border-primary font-semibold py-2.5 px-5 rounded-lg hover:bg-transparent hover:text-primary duration-200"
//           >
//             Book Appointment
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VisitTimesPopup;
