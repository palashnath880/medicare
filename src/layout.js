import React, { useEffect } from 'react';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { Raleway } from 'next/font/google';
import Head from 'next/head';

const raleway = Raleway({ subsets: ['latin'] });

const Layout = ({ children }) => {

    return <>
        <Head>
            <link rel='icon' href='/images/logo.png' />
        </Head>
        <Header />
        <main className={raleway.className}>
            {children}
        </main>
        <Footer />
    </>
}

export default Layout;
