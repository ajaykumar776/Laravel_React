import React, { useEffect, useState } from 'react';
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import createAxiosInstance from '../../utilities/AxiosInstance';
import toastr from 'toastr';

const TableComponent = () => {

    const axiosInstance = createAxiosInstance();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [columns, setColumns] = useState([
        { id: 'id', label: 'ID', minWidth: 50 },
        { id: 'CategoryName', label: 'CategoryName', minWidth: 100 },
        { id: 'SubcategoryName', label: 'SubcategoryName', minWidth: 100 },
        { id: 'CreatedAt', label: 'CreatedAt', minWidth: 150 },
        { id: 'Actions', label: 'Actions', minWidth: 150 },
    ]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getSubCategory = async () => {
        try {
            const response = await axiosInstance.get(`/subcategories`);
            setRows(response.data.payload);
        } catch (error) {
            console.error('Error fetching subcategories:', error.message);
        }
    };

    useEffect(() => {
        getSubCategory();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/subcategories/${id}`);
            toastr.success('Item deleted successfully');
            getSubCategory();
        } catch (error) {
            toastr.error('Error deleting item:', error.response.data);
        }
    };

    return (
        <Paper sx={{ width: '100%', marginTop: '80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Subcategory List
                </Typography>
                <div>
                    {/* Add button */}
                    <Button variant="contained" color="primary">
                        <Link to={"/subcategoryadd"} style={{ color: "white", textDecoration: "none" }}>
                            Add
                        </Link>
                    </Button>
                </div>
            </div>
            <div>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{
                                            minWidth: column.minWidth,
                                            position: 'sticky',
                                            top: 0,
                                            background: 'silver', // Set the background color here
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Link to={`/editsubcategory/${row.id}`}>
                                            {row.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.category.name}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.created_at}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <Link to={`/editsubcategory/${row.id}`}>
                                                <Edit style={{ color: 'blue' }} />
                                            </Link>
                                        </IconButton>

                                        <IconButton onClick={() => handleDelete(row.id)}>
                                            <Delete style={{ color: 'red' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper >

    );
};

export default TableComponent;
