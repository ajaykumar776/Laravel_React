import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import createAxiosInstance from '../../utilities/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance();
    useEffect(() => {
        const handleLogout = async () => {
            try {
                await axiosInstance.post('/logout');
                localStorage.removeItem('authToken');
                navigate('/login');
            } catch (error) {
                console.error('Logout failed:', error.response.data);
            }
        };
        handleLogout();
    }, [])

    return (
        <></>
    );
};

export default LogoutComponent;
