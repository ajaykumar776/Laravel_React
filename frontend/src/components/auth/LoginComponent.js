import React, { useState } from 'react';
import { Typography, TextField, Button, Link } from '@mui/material';
import createAxiosInstance from '../../utilities/AxiosInstance';
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';
const LoginComponent = () => {
    const navigate = useNavigate();
    const axiosInstance = createAxiosInstance();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/login", {
                email: username,
                password: password,
            });
            console.log(response.status);
            if (response.status === 200) {
                const authToken = response.data.access_token;
                const user = response.data.user;
                setUsername(user.email);
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('user_type', user.user_type);
                localStorage.setItem('userId', user.id);
                localStorage.setItem('name', user.name);
                navigate("/dashboard", { replace: true }); // Use navigate with replace option
                toastr.success('Login successful:', response.data);

            }

        } catch (error) {
            console.log(error);
            toastr.error('Login failed:', error.response.data);
        }
    };


    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    fullWidth
                    type='email'
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" fullWidth color="primary" style={{ marginTop: 20 }}>
                    Login
                </Button>
            </form>
            <Typography variant="body2" style={{ marginTop: 10 }}>
                <Link href="/forgot-password">Forgot Password?</Link>
                <span style={{ margin: '0 10px' }}>&nbsp;</span>
                <Link href="/register">Register</Link>
            </Typography>
        </div>
    );
};

export default LoginComponent;
