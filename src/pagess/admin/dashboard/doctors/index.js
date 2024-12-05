import DoctorItem from '@/components/Admin/Doctor/DoctorItem';
import PageHeading from '@/components/Admin/shared/PageHeading';
import { Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useQuery } from 'react-query';

const Index = () => {

    // fetch all doctors
    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await axios.get(`/api/doctors`);
            return res.data;
        }
    });

    return (
        <div>

            <Head>
                <title>Medicare | Dashboard | Doctors</title>
            </Head>

            <PageHeading>All Doctors</PageHeading>
            <div className='mt-5 flex justify-between'>
                <div>

                </div>
                <Link href={'/admin/dashboard/doctors/add-doctor'} className='px-6 py-3 flex items-center gap-2 bg-primary text-white text-sm rounded-md font-semibold'>
                    <FaPlus />
                    Add Doctor
                </Link>
            </div>

            {/* show all doctors */}
            <div className='mt-10'>
                {isLoading && <div className='py-5 flex justify-center !text-primary'>
                    <CircularProgress color='inherit' />
                </div>}
                {!isLoading && <>
                    {Array.isArray(doctors) && doctors.length > 0 ? <table className='w-full !text-sm'>
                        <thead>
                            <tr>
                                <td className='px-3 py-3 font-semibold bg-primary bg-opacity-30 border border-primary text-center'>Doctor</td>
                                <td className='px-3 py-3 font-semibold bg-primary bg-opacity-30 border border-primary text-center'>Specialist</td>
                                <td className='px-3 py-3 font-semibold bg-primary bg-opacity-30 border border-primary text-center'>Current Employee Of</td>
                                <td className='px-3 py-3 font-semibold bg-primary bg-opacity-30 border border-primary text-center'>Visit Price</td>
                                <td className='px-3 py-3 font-semibold bg-primary bg-opacity-30 border border-primary text-center'>Visit Times</td>
                                <td className='px-3 py-3 font-semibold bg-primary bg-opacity-30 border border-primary text-center'>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor, index) => <DoctorItem doctor={doctor} key={index} />)}
                        </tbody>
                    </table>
                        : <Alert icon={false} severity="error">No Doctors Here</Alert>
                    }
                </>}
            </div>

        </div>
    );
}

export default Index;
