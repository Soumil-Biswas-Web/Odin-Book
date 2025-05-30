import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Loader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const reqInterceptor = axios.interceptors.request.use(
            (config) => {
                setLoading(true);
                return config;
            },
            (error) => {
                setLoading(false);
                return Promise.reject(error);
            }
        );
    
        const resInterceptor = axios.interceptors.response.use(
            (response) => {
                setLoading(false);
                return response;
            },
            (error) => {
                setLoading(false);
                return Promise.reject(error);
            }
        );
    
        // Cleanup function
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        };
    }, []);

    if (loading) {
        return (
            <div className="fixed z-[100] bg-background-color w-full h-screen flex justify-center items-center">
                <div className="h-[50px] w-[50px] md:h-[80px] md:w-[80px] rounded-full border-b-2 border-b-contrast-color animate-spin"></div>
            </div>
        );
    } else return null;
}

export default Loader