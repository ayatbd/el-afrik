import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios'; // To trigger interceptor if needed
import { setCredentials } from './features/auth/authSlice';

export function useAdminAuth() {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            // If not in redux, check if we have a refresh token in storage to restore session
            if (!isAuthenticated) {
                const persistedRefreshToken = localStorage.getItem('refreshToken');

                if (!persistedRefreshToken) {
                    router.push('/login');
                    return;
                }

                // Optional: Proactively refresh token on page load if access token is missing
                try {
                    const { data } = await api.post('/auth/refresh', { refreshToken: persistedRefreshToken });
                    dispatch(setCredentials({ accessToken: data.data.accessToken }));
                    // Re-check role after dispatch
                    const decodedUser = JSON.parse(atob(data.data.accessToken.split('.')[1]));
                    if (decodedUser.role !== 'superAdmin' && decodedUser.role !== 'admin') {
                        router.push('/unauthorized');
                    }
                } catch (err) {
                    router.push('/login');
                }
            } else if (user?.role !== 'superAdmin' && user?.role !== 'admin') {
                router.push('/unauthorized');
            }

            setLoading(false);
        };

        checkAuth();
    }, [isAuthenticated, user, router, dispatch]);

    return { loading, user };
}