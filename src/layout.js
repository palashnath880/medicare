import React from 'react';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { Raleway } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from './components/Admin/shared/AdminLayout';
import "cropperjs/dist/cropper.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

const raleway = Raleway({ subsets: ['latin'] });

const Layout = ({ children }) => {

    // context
    const router = useRouter();
    const pathname = router.pathname;
    const isAdmin = pathname.includes('/admin/');

    return <>
        <Head>
            <link rel='icon' href='/images/logo.png' />
        </Head>

        {isAdmin ? <AdminLayout>{children}</AdminLayout> :
            <>
                <Header />
                <main className={raleway.className}>
                    {children}
                </main>
                <Footer />
            </>
        }

        <ToastContainer />
    </>
}

export default Layout;
