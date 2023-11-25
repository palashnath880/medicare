import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Raleway } from 'next/font/google';
import { useRouter } from 'next/router';

const raleway = Raleway({ subsets: ['latin'] })

export default function AdminLayout({ children }) {

    // router
    const router = useRouter();
    const pathname = router.pathname;
    const isLogin = pathname.includes('/admin/login'); // login page check

    if (isLogin) {
        return <main className={raleway.className}>
            {children}
        </main>
    }

    return <div className={`${raleway.className}`}>
        <Sidebar />
        <div className=''>
            <main>
                {children}
            </main>
            <Footer />
        </div>
    </div>;
}
