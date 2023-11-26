import PageHeading from '@/components/Admin/shared/PageHeading';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';

const Index = () => {
    return (
        <div>
            <PageHeading>All Doctors</PageHeading>
            <div className='mt-5 flex justify-between'>
                <div>

                </div>
                <Link href={'/admin/dashboard/doctors/add-doctor'} className='px-6 py-3 flex items-center gap-2 bg-primary text-white text-sm rounded-md font-semibold'>
                    <FaPlus />
                    Add Doctor
                </Link>
            </div>

        </div>
    );
}

export default Index;
