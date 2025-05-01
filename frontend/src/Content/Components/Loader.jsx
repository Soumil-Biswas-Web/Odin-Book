import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Loader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                setLoading(true);
                return config;
            },
            (error) => {
                setLoading(false);
                return Promise.reject(error);
            }
        );

        axios.interceptors.response.use(
            (response) => {
                setLoading(false);
                return response;
            },
            (error) => {
                setLoading(false);
                return Promise.reject(error);
            }
        );
    }, []);

    if (loading) {
        return (
            <div className="fixed z-[100] bg-background-color w-full h-screen flex justify-center items-center">
                <div className="h-[50px] w-[50px] md:h-[80px] md:w-[80px] rounded-full border-b-2 border-b-contrast-color animate-spin"></div>
            </div>
        );
    }
}

export default Loader