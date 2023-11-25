import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Raleway } from 'next/font/google';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Loader from './Loader';

const raleway = Raleway({ subsets: ['latin'] })

export default function AdminLayout({ children }) {

    const { status } = useSession();
    // router
    const router = useRouter();
    const pathname = router.pathname;
    const isLogin = pathname.includes('/admin/login'); // login page check

    if (status === 'loading') {
        return <Loader />
    }

    if (isLogin) {
        return <main className={raleway.className}>
            {children}
        </main>
    }

    return <div className={`${raleway.className} w-full h-screen flex`}>
        <Sidebar />
        <div className='flex-1 overflow-y-auto pl-5 pt-5'>
            <main>
                {children}
            </main>
            <Footer />
        </div>
    </div>;
}
