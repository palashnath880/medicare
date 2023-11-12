import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'] });

const Header = () => {

    const menus = [
        {
            path: '/',
            label: 'Home'
        },
        {
            path: '/about-us',
            label: 'About Us'
        },
        {
            path: '/services',
            label: 'Services'
        },
        {
            path: '/doctors',
            label: 'Doctors'
        },
    ];

    return (
        <header className={raleway.className}>
            <div className='container mx-auto px-5 max-sm:px-3 py-2'>
                <div className='flex justify-between items-center'>
                    <Link href='/' className='w-20 h-20 inline-block'>
                        <Image alt='Logo' src='/images/text-logo.png' width={120} height={120} className='w-full h-full' />
                    </Link>
                    <div>
                        <ul className='flex items-center gap-10'>
                            {menus.map(({ label, path }, index) => <li key={index} className='text-sm font-semibold'>
                                <Link href={path}>{label}</Link>
                            </li>)}
                        </ul>
                    </div>
                    <button className='bg-primary text-white text-sm font-semibold px-7 py-2.5 rounded-md duration-200 border-2 border-primary hover:bg-transparent hover:text-primary'>
                        Book Appointment
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
