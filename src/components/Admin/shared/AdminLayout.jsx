import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Raleway } from 'next/font/google';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Loader from './Loader';
import { ThemeProvider } from '@mui/material/styles';
import theme from './mui-theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const raleway = Raleway({ subsets: ['latin'] })

export default function AdminLayout({ children }) {

    const { status } = useSession();
    // router
    const router = useRouter();
    const pathname = router.pathname;
    const isLogin = pathname.includes('/admin/login'); // login page check

    // new query client
    const client = new QueryClient();

    if (status === 'loading') {
        return <Loader />
    }

    if (isLogin) {
        return <main className={raleway.className}>
            {children}
        </main>
    }

    return <ThemeProvider theme={theme}>
        <QueryClientProvider client={client} >
            <div className={`${raleway.className} w-full h-screen flex`}>
                <Sidebar />
                <div className='flex-1 overflow-y-auto px-5 pt-5 flex flex-col'>
                    <main className='flex-1'>
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </QueryClientProvider>
    </ThemeProvider>;
}
