import React, { useState, useEffect } from 'react';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import createAxiosInstance from '../../utilities/AxiosInstance';
import toastr from 'toastr';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    select: {
        cursor: 'pointer',
        minHeight: '56px',
    },
    buttonContainer: {
        textAlign: 'right',
        marginTop: '20px',
    },
});

const AddSubcategory = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subcategoryName, setSubcategoryName] = useState('');
    const axiosInstance = createAxiosInstance();
    const classes = useStyles();
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/categories');
                setCategories(response.data.payload);
            } catch (error) {
                toastr.error('Error fetching categories:', error.response.message);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!selectedCategory || !subcategoryName) {
            toastr.error('Please select a category and enter a subcategory name');
            return;
        }

        try {
            console.log(selectedCategory);
            const response = await axiosInstance.post('/subcategories', {
                category_id: selectedCategory,
                name: subcategoryName,
            });


            if (response.status === 200) {
                navigate("/subcategory", { replace: true }); // Use navigate with replace option
                toastr.success('Subcategory added successfully');
            }
            setSelectedCategory(null);
            setSubcategoryName('');
        } catch (error) {
            toastr.error('Error adding subcategory:', error.response.data.message);
        }
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Add Subcategory
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
                        {/* Move the Button outside the Grid container */}
                        <div className={classes.buttonContainer}>
                            <Button type="submit" variant="contained" color="primary">
                                Add Subcategory
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddSubcategory;
