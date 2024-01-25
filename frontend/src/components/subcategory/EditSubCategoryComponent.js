import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, MenuItem } from '@mui/material';
import createAxiosInstance from '../../utilities/AxiosInstance';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import toastr from 'toastr';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    select: {
        cursor: 'pointer',
        minHeight: "56px"
    },
});

const EditSubcategory = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subcategoryName, setSubcategoryName] = useState('');
    const axiosInstance = createAxiosInstance();
    const { id } = useParams();
    const navigate = useNavigate();
    // Helper function to get the label for a given categoryId
    const getCategoryLabel = (categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        return category ? category.name : '';
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/categories');
                setCategories(response.data.payload);
            } catch (error) {
                toastr.error('Error fetching categories:', error.message);
            }
        };

        const fetchSubcategoryData = async () => {
            try {
                const response = await axiosInstance.get(`/subcategories/${id}`);
                const selectedCategoryId = response.data.payload.category_id;
                setSubcategoryName(response.data.payload.name || '');
                setSelectedCategory(response.data.payload.category_id);
            } catch (error) {
                toastr.error('Error fetching subcategory data:', error.message);
            }
        };

        fetchCategories();
        fetchSubcategoryData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(`/subcategories/${selectedCategory}/${id}`, {
                name: subcategoryName,
            });
            if (response.status === 200) {
                navigate("/subcategory", { replace: true });
                toastr.success('Subcategory updated successfully:');
            }
        } catch (error) {
            toastr.error('Error updating subcategory:', error.response.data.message);
        }
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Edit Subcategory
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            select
                            label="Select Category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            fullWidth
                            variant="outlined"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Subcategory Name"
                            fullWidth
                            margin=""
                            value={subcategoryName}
                            onChange={(e) => setSubcategoryName(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20, textAlign: "right" }}>
                            Update Subcategory
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default EditSubcategory;
