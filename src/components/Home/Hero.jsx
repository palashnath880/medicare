import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';

const slides_data = [
    {
        "name": "Dr. Md. Abdullah Mamun",
        "degree": "MBBS, FCPS (Medicine)",
        "currentEmployeeOf": "Chattogram General Hospital",
        "specialist": "Medicine",
        "image": "/images/doctors/doctor-img-1.webp",
        "bgImg": "/images/medicine-img-1.webp",
    },
    {
        "name": "Dr. Md. Ashrafuzzaman",
        "degree": "MBBS, FCPS (Cardiology)",
        "currentEmployeeOf": "Chattogram Medical College Hospital",
        "specialist": "Cardiology",
        "image": "/images/doctors/doctor-img-1.webp",
        "bgImg": "/images/medicine-img-2.webp",
    },
    {
        "name": "Dr. Md. Monirul Islam",
        "degree": "MBBS, FCPS (Surgery)",
        "currentEmployeeOf": "Holy Family Hospital",
        "specialist": "Surgery",
        "image": "/images/doctors/doctor-img-1.webp",
        "bgImg": "/images/medicine-img-3.webp",
    },
    {
        "name": "Dr. Md. Mosharraf Hossain",
        "degree": "MBBS, FCPS (Gynecology and Obstetrics)",
        "currentEmployeeOf": "Ispahani Maternity Hospital",
        "specialist": "Gynecology and Obstetrics",
        "image": "/images/doctors/doctor-img-1.webp",
        "bgImg": "/images/medicine-img-4.webp",
    },
    {
        "name": "Dr. Md. Shahadat Hossain",
        "degree": "MBBS, FCPS (Pediatrics)",
        "currentEmployeeOf": "Chittagong Shishu Hospital",
        "specialist": "Pediatrics",
        "image": "/images/doctors/doctor-img-1.webp",
        "bgImg": "/images/medicine-img-5.webp",
    },
    {
        "name": "Dr. Md. Masud Parvez",
        "degree": "MBBS, FCPS (Neurology)",
        "currentEmployeeOf": "Chattogram Metropolitan Hospital",
        "specialist": "Neurology",
        "image": "/images/doctors/doctor-img-1.webp",
        "bgImg": "/images/medicine-img-1.webp",
    },
    {
        "name": "Dr. Md. Nazmul Islam",
        "degree": "MBBS, FCPS (Psychiatry)",
        "currentEmployeeOf": "Chattogram Mental Hospital",
        "specialist": "Psychiatry",
        "image": "/images/doctors/doctor-img-1.webp",
        "bgImg": "/images/medicine-img-2.webp",
    },
    {
        "name": "Dr. Md. Shakil Ahmed",
        "degree": "MBBS, FCPS (Otolaryngology)",
        "currentEmployeeOf": "Chattogram ENT Hospital",
        "specialist": "Otolaryngology",
        "image": "/images/doctors/doctor-img-1.webp",
        "bgImg": "/images/medicine-img-3.webp",
    },
    {
        "name": "Dr. Md. Shafiqul Islam",
        "degree": "MBBS, FCPS (Ophthalmology)",
        "currentEmployeeOf": "Chattogram Eye Hospital",
        "specialist": "Ophthalmology",
        "image": "/images/doctors/doctor-img-1.webp",
        "bgImg": "/images/medicine-img-4.webp",
    },
    {
        "name": "Dr. Md. Shahinul Islam",
        "degree": "MBBS, FCPS (Radiology)",
        "currentEmployeeOf": "Chattogram Diagnostic Center",
        "specialist": "Radiology",
        "image": "/images/doctors/doctor-img-1.webp",
        "bgImg": "/images/medicine-img-5.webp",
    }
];

const Hero = () => {

    const slider = useRef();
    const nextRef = useRef();
    const prevRef = useRef();

    useEffect(() => {
        const container = slider.current;
        const slides = container.children;
        let index = 0;

        const __change_slide = (slide_index) => {

            // remove active class and opacity 0
            for (let slide of slides) {
                slide.classList.remove('active', 'opacity-100');
                slide.classList.add('-z-10');
            }

            for (let slide of slides) {
                const index = parseInt(slide.getAttribute('data-index'));
                if (index === slide_index) {
                    slide.classList.add('active', 'opacity-100');
                    slide.classList.remove('-z-10');
                }
            }

        }

        nextRef.current?.addEventListener('click', () => {
            if (index === slides.length - 1) {
                index = 0;
            } else {
                index++;
            }
            __change_slide(index);
        });

        prevRef.current?.addEventListener('click', () => {
            if (index === 0) {
                index = slides.length - 1;
            } else {
                index--;
            }
            __change_slide(index);
        });

        __change_slide(index);

    }, []);

    return (
        <section>
            <div className='w-full aspect-[16/6]'>
                <div className='relative w-full h-full' ref={slider}>
                    {slides_data.map(({ bgImg, image, name, degree, currentEmployeeOf, specialist }, index) => <div data-index={index} key={index} className='absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover duration-500 group opacity-0 -z-10' style={{ backgroundImage: `url(${bgImg})` }} >
                        <div className='w-full h-full grid place-items-center bg-black bg-opacity-50 overflow-hidden'>
                            <div className='container mx-auto px-28 h-full'>
                                <div className='flex gap-10 h-full'>
                                    <div className='w-1/2'>
                                        <div className='flex flex-col justify-center gap-4 h-full w-full items-start'>
                                            <div className=''>
                                                <h3 className='text-white font-semibold text-4xl duration-1000 translate-y-full opacity-0 group-[.active]:translate-y-0 group-[.active]:opacity-100'>
                                                    {name}
                                                </h3>
                                                <p className='text-white text-opacity-90 text-sm mt-2 duration-1000 translate-y-full opacity-0 group-[.active]:translate-y-0 group-[.active]:opacity-100'>{degree}</p>
                                            </div>
                                            <p className='text-white duration-1000 translate-y-full opacity-0 group-[.active]:translate-y-0 group-[.active]:opacity-100'>{specialist} specialist of {currentEmployeeOf}</p>
                                            <button className='bg-primary text-white text-sm font-semibold px-7 py-2.5 rounded-md duration-500 border-2 border-primary hover:bg-transparent translate-y-full opacity-0 group-[.active]:translate-y-0 group-[.active]:opacity-100'>
                                                Book Appointment
                                            </button>
                                        </div>
                                    </div>
                                    <div className='w-1/2'>
                                        <div className='relative w-full h-full'>
                                            <div className='aspect-[12/16] absolute bottom-0 right-0 lg:w-[370px] duration-1000 translate-x-full opacity-0 group-[.active]:translate-x-0 group-[.active]:opacity-100'>
                                                <Image draggable={false} width={400} height={500} src={image} alt={name} className='w-full h-full object-cover' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
                <div className='container px-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto'>
                    <div className='relative h-auto flex justify-between'>
                        <button ref={prevRef} className='absolute top-1/2 -translate-y-1/2 text-white left-0 opacity-80 hover:opacity-100 duration-200'>
                            <BiSolidLeftArrow className='w-9 h-9' />
                        </button>
                        <button ref={nextRef} className='absolute top-1/2 -translate-y-1/2 text-white right-0 opacity-80 hover:opacity-100 duration-200'>
                            <BiSolidRightArrow className='w-9 h-9' />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
