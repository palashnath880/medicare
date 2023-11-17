import PageHeading from "@/components/shared/PageHeading";
import VisitTimesPopup from "@/components/shared/VisitTimesPopup";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from 'react'
import { AiFillHeart } from "react-icons/ai";

export default function Doctors({ doctors }) {


    // states
    const [visitTimes, setVisitTimes] = useState(null);


    return <>

        <Head>
            <title>Medi Care - Doctors</title>
        </Head>

        <PageHeading
            bgImg={`/images/primary-care.webp`}
            name={'Doctors'}
        />

        <div className="py-20 container mx-auto px-5">
            <div className="grid grid-cols-3 gap-8">
                {Array.isArray(doctors) ? doctors.map(({ image, name, currentEmployeeOf, visitPrice, degree, specialist }, index) => <div key={index} className="bg-primary bg-opacity-10 pt-5 rounded-xl shadow-xl">
                    <div className="mx-auto aspect-square w-20 overflow-hidden rounded-full bg-primary text-white">
                        <Image src={image} width={200} height={200} alt={name} className="w-full h-full object-cover" />
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
                                <span className='text-lg ml-1'><small>$</small>{visitPrice}</span>
                            </span>
                            <button className='text-primary' title='Favorite Doctor'>
                                <AiFillHeart className='w-6 h-6' />
                            </button>
                        </p>
                    </div>
                    <div className='flex gap-0.5 border-t border-primary rounded-b-xl overflow-hidden'>
                        <button className='text-sm font-medium w-1/2 text-center py-3 text-white bg-primary'>Book Appointment</button>
                        <button onClick={() => setVisitTimes(doctors[index])} className='text-sm font-medium w-1/2 text-center py-3 text-white bg-primary'>Visit Times</button>
                    </div>
                </div>) : null}
            </div>
        </div>

        {/* visit times show popup */}
        <VisitTimesPopup
            open={Boolean(visitTimes)}
            close={() => setVisitTimes(null)}
            doctor={visitTimes}
        />

    </>
}

export async function getServerSideProps() {
    const res = await fetch(`${process.env.WEBSITE_URI}/api/doctors`);
    const data = await res.json();
    return {
        props: {
            doctors: data,
        }
    }
}