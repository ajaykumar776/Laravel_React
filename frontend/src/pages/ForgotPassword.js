import React from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';

const ForgotPassword = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Paper elevation={3} style={{ padding: 20, maxWidth: 300, margin: 'auto', marginTop: 100 }}>
            <Typography variant="h5" gutterBottom>
                Forgot Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Email" type="email" fullWidth margin="normal" />
                <Button type="submit" variant="contained" fullWidth color="primary" style={{ marginTop: 20 }}>
                    Reset Password
                </Button>
            </form>
        </Paper>
    );
};

export default ForgotPassword;
