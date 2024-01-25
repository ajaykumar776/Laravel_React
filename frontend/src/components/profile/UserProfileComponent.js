import React, { useEffect, useState } from 'react';
import createAxiosInstance from '../../utilities/AxiosInstance';
import { Button, Grid, TextField, Typography } from '@mui/material';
import toastr from 'toastr';
const UserProfileUpdate = () => {
    const [name, setName] = useState('');
    const userId = localStorage.getItem('userId');
    useEffect(() => {

        const fetchUserDetails = async () => {
            try {
                const response = await axiosInstance.get(`/users/${userId}`);
                setName(response.data.payload.user.name);
            } catch (error) {
                toastr.error('Error fetching User details:', error);
            }
        };

        fetchUserDetails();
    }, [])
    const [profileImage, setProfileImage] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const axiosInstance = createAxiosInstance();

    const handleFileChange = (e) => {
        console.log('File input changed');
        const file = e.target.files[0];
        console.log('Selected file:', file);
        setProfileImage(file);
        setSelectedFileName(file.name);

        // Optionally, you can clear the file input to allow re-uploading of the same file
        e.target.value = null;
    };

    const handleUpdateProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('profile_image', profileImage);

            console.log('FormData values:');
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            const response = await axiosInstance.put('/update/profile', formData);
            if (response.status === 200) {
                console.log(response.data.payload);
                setName(response.data.payload.name)
                toastr.success(response.data.message);
            }
            // Handle success, update UI, or show a success message
        } catch (error) {
            console.error('Error updating profile:', error.response.data);
        }
    };


    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
                <TextField
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload Profile Image
                    </Button>
                </label>
                {selectedFileName && (
                    <Typography variant="subtitle1" style={{ marginLeft: 10 }}>
                        Selected File: {selectedFileName}
                    </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
                {profileImage && (
                    <img
                        src={URL.createObjectURL(profileImage)}
                        alt="Profile Preview"
                        style={{ maxWidth: '100px', marginTop: '10px', height: 'auto' }}
                    />
                )}
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleUpdateProfile}>
                    Update Profile
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserProfileUpdate;
