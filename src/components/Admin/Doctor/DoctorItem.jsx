import Image from 'next/image';
import React from 'react';

const DoctorItem = ({ doctor }) => {
    return (
        <tr>
            <td className='px-3 py-3 bg-primary bg-opacity-5 text-primary border border-primary'>
                <div className='flex items-center gap-2'>
                    <div className='w-12 aspect-square rounded-full overflow-hidden cursor-pointer'>
                        <Image src={doctor?.image?.display_url} width={100} height={100} className='w-full h-full' alt={doctor?.name} />
                    </div>
                    <div className='flex-1'>
                        <p className='text-sm font-semibold'>{doctor?.name}</p>
                        <p className='text-sm font-medium opacity-70'>{doctor?.degree}</p>
                    </div>
                </div>
            </td>
            <td className='px-3 py-3 bg-primary bg-opacity-5 text-primary border border-primary'>{doctor?.specialist}</td>
            <td className='px-3 py-3 bg-primary bg-opacity-5 text-primary border border-primary'>{doctor?.currentEmployeeOf}</td>
            <td className='px-3 py-3 bg-primary bg-opacity-5 text-primary border border-primary font-medium font-sans'>$ {doctor?.visitPrice}</td>
            <td className='px-3 py-3 bg-primary bg-opacity-5 text-primary border border-primary'>
                {Array.isArray(doctor?.visitTimes) && doctor?.visitTimes.length > 0 ?
                    doctor.visitTimes.map(({ day, time }, index) => <p key={index} className=''>
                        <span className='font-semibold mr-2'>{day}:</span>
                        {`${time?.start} - ${time?.end}`}
                    </p>)
                    :
                    <span>No Visit Times</span>
                }
            </td>
            <td className='px-3 py-3 bg-primary bg-opacity-5 text-primary border border-primary'></td>
        </tr>
    );
}

export default DoctorItem;
