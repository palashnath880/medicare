import Image from 'next/image';
import React from 'react';

const Loader = () => {
    return (
        <div className='w-full h-screen grid place-items-center '>
            <div className='w-40 animate-pulse overflow-hidden'>
                <Image src={'/images/text-logo.png'} width={300} height={300} alt='Logo' className='mix-blend-multiply w-full h-auto' />
            </div>
        </div>
    );
}

export default Loader;
