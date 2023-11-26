import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

const Input = ({ value }) => {

    const [] = useState();

    return <div className='flex gap-5'>
        <div></div>
        <button className='px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg'>Save</button>
    </div>
}

const VisitTimesSelect = ({ Form }) => {

    // states
    const [isAdd, setIsAdd] = useState(false);

    return (
        <div className='flex flex-col gap-2 col-span-2'>
            <label className='text-sm text-primary' >Visit Times</label>
            <div className='flex flex-col gap-3'>

            </div>
            <div className='flex items-center justify-end'>
                <button onClick={() => setIsAdd(!isAdd)} type='button' className='bg-primary bg-opacity-20 text-primary cursor-pointer w-8 aspect-square rounded-full grid place-items-center'>
                    <FaPlus className='w-5 h-5' />
                </button>
            </div>

        </div>
    );
}

export default VisitTimesSelect;
