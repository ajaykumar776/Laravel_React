import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    IconButton,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import createAxiosInstance from '../../utilities/AxiosInstance';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const axiosInstance = createAxiosInstance();

    const [columns, setColumns] = useState([
        { id: 'id', label: 'ID', minWidth: 50 },
        { id: 'Name', label: 'Name', minWidth: 100 },
        { id: 'Email', label: 'Email', minWidth: 150 },
        { id: 'Actions', label: 'Actions', minWidth: 150 },
    ]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users');
                setUsers(response.data.payload.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []); // Empty dependency array to fetch users only once when the component mounts

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEdit = () => {

    }
    return (

        <Paper sx={{ width: '100%', marginTop: '80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Users List
                </Typography>
                <div>
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
                            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Link to={`/userEdit/${row.id}`}>
                                            {row.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <Link to={`/userEdit/${row.id}`}>
                                                <Edit style={{ color: 'blue' }} />
                                            </Link>
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
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default UserList;
