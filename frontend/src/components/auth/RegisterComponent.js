import React, { useState } from 'react';
import { Typography, TextField, Button, Link } from '@mui/material';
import createAxiosInstance from '../../utilities/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
    const axiosInstance = createAxiosInstance();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registerEndpoint = "/register";
        try {
            const response = await axiosInstance.post(registerEndpoint, {
                name: name,
                email: email,
                password: password,
            });
            if (response.status === 200) {
                navigate("/login", { replace: true }); // Use navigate with replace option
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.email) {
                setError(error.response.data);
            } else {
                setError('Registration failed. Please try again.'); // Generic error message
            }
        }
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={Boolean(error.name)}
                    helperText={error.name}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(error.email)}
                    helperText={error.email}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(error.password)}
                    helperText={error.password}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                    style={{ marginTop: 20 }}
                >
                    Register
                </Button>
            </form>
            <Typography variant="body2" style={{ marginTop: 10 }}>
                <Link href="/login">Login</Link>
            </Typography>
        </div>
    );
};

export default RegisterComponent;