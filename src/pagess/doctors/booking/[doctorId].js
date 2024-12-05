import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';

const AppointmentBooking = ({ doctor }) => {

    // react-hook-form
    const { register, formState: { errors }, handleSubmit } = useForm();

    // if doctor is null
    if (!doctor) {
        return <div className='py-20 container mx-auto flex flex-col gap-6 items-center'>
            <h2 className='text-2xl font-semibold text-center text-primary'>Doctor Not Found</h2>
            <Link href={'/doctors'} className=' text-sm text-white bg-primary px-8 py-3 rounded-md shadow-lg font-medium'>
                Go Back To Doctors
            </Link>
        </div>;
    }

    return (
        <div className='py-20'>
            <div className='container mx-auto'>
                <h1 className='text-3xl font-semibold text-primary text-center mx-auto'>Appointment Booking</h1>
            </div>
            <div className='flex gap-10 container mx-auto mt-12'>
                <div className='w-3/4'>
                    <div className='bg-primary bg-opacity-5 px-5 py-5 rounded-lg border-2 border-primary border-opacity-20 shadow-lg' >

                        <form onSubmit={handleSubmit()}>
                            <div className='grid grid-cols-2 gap-x-5 gap-y-3'>
                                <div className='flex flex-col gap-1'>
                                    <input
                                        type='text'
                                        placeholder='Patient Name'
                                        className='px-5 py-3 text-sm font-medium text-primary rounded-md border border-primary outline-none'
                                        {...register('name', { required: 'Patient name is required' })}
                                    />
                                    {errors?.name && <span className='text-xs text-red-500 font-medium'>{errors?.name?.message}</span>}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <input
                                        type='number'
                                        placeholder='Patient Age'
                                        className='px-5 py-3 text-sm font-medium text-primary rounded-md border border-primary outline-none'
                                        {...register('age', { required: 'Patient age is required' })}
                                    />
                                    {errors?.age && <span className='text-xs text-red-500 font-medium'>{errors?.age?.message}</span>}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <input
                                        type='tel'
                                        placeholder='Phone Number'
                                        className='px-5 py-3 text-sm font-medium text-primary rounded-md border border-primary outline-none'
                                        {...register('phone', { required: 'Phone number is required' })}
                                    />
                                    {errors?.phone && <span className='text-xs text-red-500 font-medium'>{errors?.phone?.message}</span>}
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div>
                                        <ReactDatePicker
                                            minDate={new Date()}
                                            dayClassName={(date) => date >= new Date() ? '!text-primary !font-semibold' : ''}
                                            showTimeSelect
                                            inline
                                        />
                                    </div>
                                </div>
                            </div>
                            <button>Submit</button>
                        </form>

                    </div>
                </div>
                <div className='w-1/4'>
                    <div className='bg-primary bg-opacity-5 px-3 py-5 rounded-lg border-2 border-primary border-opacity-20 shadow-lg'>
                        <div className='flex flex-col items-center gap-3'>
                            <div className='flex flex-col w-full items-center'>
                                <div className='w-20 aspect-square border-2 border-primary overflow-hidden rounded-full'>
                                    <Image src={doctor?.image?.display_url} width={100} height={100} className='w-full h-full overflow-hidden object-cover' alt={doctor?.name} />
                                </div>
                                <h4 className='text-base font-semibold text-primary mt-2'>{doctor?.name}</h4>
                                <p className='text-sm font-medium text-primary'>{doctor?.degree}</p>
                            </div>
                            <div className='w-full'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointmentBooking;

export async function getServerSideProps({ params: { doctorId } }) {

    if (!doctorId) {
        return { props: { doctor: null } }
    }

    // prisma query
    const doctor = await prisma.doctor.findUnique({
        where: {
            id: doctorId,
        },
        select: {
            name: true,
            id: true,
            degree: true, specialist: true,
            currentEmployeeOf: true,
            visitPrice: true,
            visitTimes: true,
            image: true,
        }
    });

    return {
        props: {
            doctor: doctor
        }
    };

}