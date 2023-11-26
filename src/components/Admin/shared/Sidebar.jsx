import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const CustomNavLink = ({ children, href }) => {

    const router = useRouter();
    const isActive = router.pathname.startsWith(`/admin/dashboard` + href ? `/${href}` : '');

    return <li>
        <Link href={`/admin/dashboard/${href}`} className={`cursor-pointer hover:text-white text-primary px-5 py-2 rounded-md block text-sm font-medium duration-200 hover:bg-primary  border border-primary ${isActive && 'bg-primary text-white'} `}>
            {children}
        </Link>
    </li>
}


const Sidebar = () => {

    return (
        <div className='w-60 bg-[#f2f2f2]'>
            <div className='flex flex-col gap-5 mt-5'>
                <Link href='/admin/dashboard' className='w-28 h-auto overflow-hidden mx-auto'>
                    <Image width={150} height={150} src='/images/text-logo.png' className='w-full h-auto mix-blend-multiply' alt='logo' />
                </Link>
                <div className=''>
                    <ul className='space-y-1 px-3'>
                        <CustomNavLink href={''} >Home</CustomNavLink>
                        <CustomNavLink href={'doctors'} >Doctors</CustomNavLink>
                        <CustomNavLink href={'doctors'} >Doctors</CustomNavLink>
                        <CustomNavLink href={'doctors'} >Doctors</CustomNavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
