import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';
import 'toastr/build/toastr.min.css';
import createAxiosInstance from '../../utilities/AxiosInstance';
import { useNavigate } from 'react-router-dom';

import toastr from 'toastr'; // Import toastr

const EditCategoryComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');
    const axiosInstance = createAxiosInstance();
    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await axiosInstance.get(`/categories/${id}`);
                setCategoryName(response.data.payload.name);
            } catch (error) {
                toastr.error('Error fetching category details:', error);
            }
        };

        fetchCategoryDetails();
    }, [id]);
    const handleInputChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleUpdateCategory = async () => {
        if (!categoryName.trim()) {
            setError('This field is required.');
            return;
        }

        try {
            const updatedData = {
                name: categoryName,
            };
            const response = await axiosInstance.put(`/categories/${id}`, updatedData);
            setCategoryName(response.data.payload.name);
            if (response.status === 200) {
                navigate("/category", { replace: true }); // Use navigate with replace option
                toastr.success('Category updated successfully.'); // Show success message
            }

        } catch (error) {
            // Handle errors, and optionally display an error message
            toastr.error('Error updating category:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Edit Category Page
            </Typography>

            {/* Form */}
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
                    onClick={handleUpdateCategory}
                >
                    Update
                </Button>
            </form>
        </div>
    );
};

export default EditCategoryComponent;

