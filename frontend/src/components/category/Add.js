import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import createAxiosInstance from '../../utilities/AxiosInstance';
import { useNavigate } from 'react-router-dom';

import toastr from 'toastr'; // Import toastr

const AddComponent = () => {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');
    const axiosInstance = createAxiosInstance();
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleAddCategory = async () => {
        if (!categoryName.trim()) {
            setError('This field is required.');
            return;
        }

        try {
            const insertData = {
                name: categoryName,
            };
            const response = await axiosInstance.post("categories", insertData);
            setCategoryName(response.data.payload.name);
            if (response.status === 200) {
                navigate("/category", { replace: true }); // Use navigate with replace option
                toastr.success('Category Created successfully.'); // Show success message
            }
        } catch (error) {
            console.error(error.response.data.error.name[0]);
            if (error.response && error.response.data && error.response.data.error) {
                toastr.error(`Error Message: ${error.response.data.error.name[0]}`);
            } else {
                toastr.error('Error while Create category:', error);
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Add Category
            </Typography>
            <form>
                <TextField
                    label="Category Name"
                    variant="outlined"
                    fullWidth
                    value={categoryName}
                    onChange={handleInputChange}
                    error={Boolean(error)}
                    helperText={error}
                    style={{ marginBottom: '20px' }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCategory}
                >
                    Add
                </Button>
            </form>
        </div>
    );
};

export default AddComponent;

