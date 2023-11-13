import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineClose } from 'react-icons/ai';


const VisitTimesPopup = ({ open, close }) => {

    const ref = useRef();

    const handleClose = () => {
        close();
    }

    useEffect(() => {

        // control scrollbar
        const body = document.querySelector('body');
        if (open) {
            body.style.overflowY = 'hidden';
        } else {
            body.style.overflowY = 'auto';
        }

        // outside detect
        const __outside_click = (e) => {
            if (!e.target.closest('.modal_body')) {
                const style = window.getComputedStyle(ref.current);
                let opacity = parseInt(style.opacity);
                if (opacity === 1) {
                    handleClose();
                }
            }
        }

        document.addEventListener('click', __outside_click);

        return () => {
            body.style.overflowY = 'auto';
            document.removeEventListener('click', __outside_click);
        }

    }, [open]);

    return <div ref={ref} className={`fixed top-0 left-0 w-full h-screen bg-black p-5 bg-opacity-20 grid place-items-center duration-200 transition-opacity ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className={`modal_body bg-white p-5 rounded-xl shadow-xl sm:w-[400px] max-sm:w-full duration-200 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className='flex items-center justify-between border-b pb-3 border-primary border-opacity-40'>
                <h3 className='font-semibold text-primary'>Visit Times</h3>
                <button onClick={handleClose} className='w-9 aspect-square rounded-full grid place-items-center bg-primary bg-opacity-10 hover:bg-opacity-100 text-primary hover:text-white duration-200'>
                    <AiOutlineClose className='w-5 h-5' />
                </button>
            </div>
            <div className='mt-4 flex flex-col gap-3'>
                <p className='text-sm'>The doctor at <span className='text-primary'>Medi Care</span> Clinic are available to provide you with personalized care during the following office hours:</p>
                <div className='flex flex-col gap-0'>
                    <h5 className='text-sm text-primary font-semibold'>Monday - Friday:</h5>
                    <ul className='text-sm pl-5 font-medium'>
                        <li className='relative after:content-[""] after:w-1.5 after:aspect-square after:bg-primary after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-4'>9:00 AM - 12:00 PM (Morning)</li>
                        <li className='relative after:content-[""] after:w-1.5 after:aspect-square after:bg-primary after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-4'>2:00 PM - 5:00 PM (Afternoon)</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-0'>
                    <h5 className='text-sm text-primary font-semibold'>Saturday:</h5>
                    <ul className='text-sm pl-5 font-medium'>
                        <li className='relative after:content-[""] after:w-1.5 after:aspect-square after:bg-primary after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-4'>10:00 AM - 1:00 PM</li>
                    </ul>
                </div>
                <div className='flex flex-col gap-0'>
                    <h5 className='text-sm text-primary font-semibold'>Sunday:</h5>
                    <ul className='text-sm pl-5 font-medium'>
                        <li className='relative after:content-[""] after:w-1.5 after:aspect-square after:bg-primary after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:-left-4'>Closed</li>
                    </ul>
                </div>
                <button className='text-sm mt-3 bg-primary text-white border-2 border-primary font-semibold py-2.5 px-5 rounded-lg hover:bg-transparent hover:text-primary duration-200'>
                    Book Appointment
                </button>
            </div>
        </div>
    </div>
}


const BestDoctors = () => {

    // states
    const [popup, setPopup] = useState(false);

    const doctors = [
        {
            "name": "Dr. Md. Abdullah Mamun",
            "degree": "MBBS, FCPS (Medicine)",
            "currentEmployeeOf": "Chattogram General Hospital",
            "specialist": "Medicine",
            "image": "/images/doctors/doctor-img-1.webp",
        },
        {
            "name": "Dr. Md. Ashrafuzzaman",
            "degree": "MBBS, FCPS (Cardiology)",
            "currentEmployeeOf": "Chattogram Medical College Hospital",
            "specialist": "Cardiology",
            "image": "/images/doctors/doctor-img-2.webp",
        },
        {
            "name": "Dr. Md. Monirul Islam",
            "degree": "MBBS, FCPS (Surgery)",
            "currentEmployeeOf": "Holy Family Hospital",
            "specialist": "Surgery",
            "image": "/images/doctors/doctor-img-3.webp",
        },
    ];

    return (
        <section>
            <div className='container mx-auto px-5 py-16'>
                <h1 className='text-4xl font-bold text-center'>
                    Best <span className='text-primary'>Doctors</span>
                </h1>
                <div className='mt-16'>
                    <div className='grid grid-cols-4 gap-5'>
                        {doctors.map(({ name, currentEmployeeOf, degree, image, specialist }, index) => <div key={index} className='pt-10'>
                            <div className='bg-primary bg-opacity-10 rounded-xl shadow-lg relative pt-10 h-full flex flex-col'>
                                <div className='w-24 p-2 bg-[#e5f2eb] rounded-full absolute -top-12 left-1/2 -translate-x-1/2'>
                                    <div className='w-full aspect-square rounded-full overflow-hidden bg-primary'>
                                        <Image alt={name} src={image} width={100} height={100} className='w-full h-full object-contain' />
                                    </div>
                                </div>
                                <div className='px-5 pt-5 pb-3 flex-1'>
                                    <h3 className='text-lg font-semibold text-center text-primary'>{name}</h3>
                                    <p className='text-center text-sm'>{degree}</p>
                                    <p className='text-center text-sm font-medium mt-4'>
                                        {specialist} specialist of {currentEmployeeOf}
                                    </p>
                                    <p className='flex justify-between mt-3'>
                                        <span className='text-primary text-sm font-semibold'>
                                            Visit Price:
                                            <span className='text-lg ml-1'><small>$</small>20</span>
                                        </span>
                                        <button className='text-primary' title='Favorite Doctor'>
                                            <AiFillHeart className='w-6 h-6' />
                                        </button>
                                    </p>
                                </div>
                                <div className='flex gap-0.5 border-t border-primary rounded-b-xl overflow-hidden'>
                                    <button className='text-sm font-medium w-1/2 text-center py-3 text-white bg-primary'>Book Appointment</button>
                                    <button onClick={() => setPopup(true)} className='text-sm font-medium w-1/2 text-center py-3 text-white bg-primary'>Visit Times</button>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>

            <VisitTimesPopup open={popup} close={() => setPopup(false)} />
        </section>
    );
}

export default BestDoctors;
