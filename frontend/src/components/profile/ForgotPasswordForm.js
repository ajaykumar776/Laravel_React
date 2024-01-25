import React, { useState } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import createAxiosInstance from '../../utilities/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: "2px",
        borderRadius: "5px",
        maxWidth: 400,
        margin: 'auto',
    },
    textField: {
        marginBottom: "2px"
    },
    submitButton: {
        marginTop: "10px",
    },
    message: {
        marginTop: "5px",
        textAlign: 'center',
    },
}));

const ForgotPasswordForm = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showUpdatePassword, setShowUpdatePassword] = useState(false);
    const axiosInstance = createAxiosInstance();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get(`/forgot-password/${email}`);
            console.log(response.data);
            if (response.status == 200 && response.data.payload.email) {
                setMessage('');
                setShowUpdatePassword(true);
            } else {
                setMessage(`Email ${email} not found`);
            }
        } catch (error) {
            console.error('Error checking email:', error);
            setMessage('Invaild Email. Please try again.');
        }
    };

    const updatePassword = async () => {
        try {
            const response = await axiosInstance.post('/update-password', {
                email: email,
                password: newPassword
            });
            if (response.status === 200) {
                setMessage('Password updated successfully');
                navigate("/login", { replace: true }); // Use navigate with replace option
                setShowUpdatePassword(false);
            } else {
                setMessage('Failed to update password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <form className={classes.formContainer} onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                Forgot Password
            </Typography>
            <TextField
                className={classes.textField}
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
            />
            {showUpdatePassword && (
                <TextField
                    style={{ marginTop: "20px" }}
                    className={classes.textField}
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    fullWidth
                />
            )}
            {showUpdatePassword ? (
                <Button
                    className={classes.submitButton}
                    style={{ marginTop: "20px" }}
                    type="button"  // Ensure type is explicitly set to "button" to prevent form submission
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={updatePassword} // Pass the function directly to onClick
                >
                    Update Password
                </Button>
            ) : (
                <Button
                    className={classes.submitButton}
                    style={{ marginTop: "20px" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Reset Password
                </Button>
            )}
            {message && <Typography className={classes.message}>{message}</Typography>}
        </form>
    );
};

export default ForgotPasswordForm;
