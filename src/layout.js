import React, { useContext, useEffect } from 'react';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { Raleway } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { UserContext } from './contexts';

const raleway = Raleway({ subsets: ['latin'] });

const Layout = ({ children }) => {

    // context
    const { user } = useContext(UserContext);
    const router = useRouter();
    const pathname = router.pathname;
    const pathArr = pathname.split('/');
    const isAdmin = pathArr.some(i => i === 'admin');

    useEffect(() => {

        // if user not logged in then redirect to login page
        if (isAdmin && !user) {
            router.push('/admin/login');
        }

    }, [isAdmin, user]);

    return <>
        <Head>
            <link rel='icon' href='/images/logo.png' />
        </Head>

        {isAdmin ? <div>
            <main className={raleway.className}>
                {children}
            </main>
        </div> :
            <>
                <Header />
                <main className={raleway.className}>
                    {children}
                </main>
                <Footer />
            </>
        }

    </>
}

export default Layout;
