import { UserContext } from '@/contexts';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const AuthProvider = ({ children }) => {

    // states
    const [user, setUser] = useState(null);
    const router = useRouter();

    // logout handler
    const logout = () => {
        Cookies.remove('medicare_admin');
        router.push('/admin/login');
    }

    return (
        <UserContext.Provider value={{ user, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export default AuthProvider;
