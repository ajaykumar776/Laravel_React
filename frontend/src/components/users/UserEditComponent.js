import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import createAxiosInstance from '../../utilities/AxiosInstance';
import toastr from 'toastr';
import { useParams } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const UserEditComponent = () => {
    const axiosInstance = createAxiosInstance();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [SubCategoriesValues, SetSubCategoriesValues] = useState([]);

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axiosInstance.get(`/userDetails/${id}`);
                const userDetails = response.data.payload.userDetails;
                console.log(userDetails.user)
                console.log(userDetails.categories)
                setName(userDetails.user.name);
                setEmail(userDetails.user.email);
                setSelectedCategoryId(userDetails.category.id);
                SetSubCategoriesValues(userDetails.subcategyIds);
                console.log(selectedCategoryId);
                console.log(selectedSubcategories);
            } catch (error) {
                toastr.error('Error fetching User details:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/categories');
                setCategories(response.data.payload);
            } catch (error) {
                toastr.error('Error fetching categories:', error);
            }
        };

        const fetchSubcategories = async () => {
            try {
                const response = await axiosInstance.get('/subcategories');
                setSubcategories(response.data.payload);
            } catch (error) {
                toastr.error('Error fetching subcategories:', error);
            }
        };

        fetchUserDetails();
        fetchCategories();
        fetchSubcategories();
    }, []);

    const updateUserDetails = async () => {
        try {
            console.log()

            const response = await axiosInstance.put(`/userDetails/${id}`, {
                category_id: selectedCategoryId,
                subcategories: SubCategoriesValues,
            });
            if (response.status == 200) {
                toastr.success('User updated successfully:', response.data);
            }
        } catch (error) {
            toastr.error('Error updating profile:', error.response.data);
        }
    };


    const handleChange = (event) => {
        SetSubCategoriesValues(event.target.value);
        // const {
        //     target: { value },
        // } = event;
        // console.log("value of each.." + value);
        // SetSubCategoriesValues(
        //     // On autofill we get a stringified value.
        //     typeof value === 'string' ? value.split(',') : value,
        // );

    };
    const handleCategoryChange = async (categoryId) => {
        setSelectedCategoryId(categoryId);
        try {
            const response = await axiosInstance.get(`subcategories/getSubcategory/${categoryId}`);
            setSubcategories(response.data.payload);
            setSelectedSubcategories([]);
            SetSubCategoriesValues([]);
            // Reset selected subcategories when the category changes
        } catch (error) {
            toastr.error('Error fetching subcategories:', error);
        }
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Edit User
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField
                        select
                        label="Select Category"
                        fullWidth
                        value={selectedCategoryId}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {/* Your second form element */}
                <FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">Select SubCategory</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={SubCategoriesValues}
                        onChange={handleChange}
                        input={<OutlinedInput label="Sub Category" />}
                        renderValue={(selected) => selected.map((id) => subcategories.find((subcat) => subcat.id === id)?.name).join(', ')}
                        MenuProps={MenuProps}
                    >
                        {subcategories.length === 0 && (
                            <MenuItem disabled value="">
                                No data found
                            </MenuItem>
                        )}
                        {subcategories.map((subcategory) => (
                            <MenuItem key={subcategory.id} value={subcategory.id}>
                                <Checkbox checked={SubCategoriesValues.indexOf(subcategory.id) > -1} />
                                <ListItemText primary={subcategory.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={updateUserDetails}>
                    Update Profile
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserEditComponent;
