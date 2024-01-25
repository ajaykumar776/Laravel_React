import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Avatar, MenuItem, Menu, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ExitToApp as ExitToAppIcon, Person as PersonIcon } from '@mui/icons-material';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const user_type = localStorage.getItem('user_type');
    const user = {};
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate("/login", { replace: true }); // Use navig
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const initials = "P";

    const renderRightButtons = () => {
        if (token) {
            return (
                <>
                    <Avatar onClick={handleMenuOpen} style={{ cursor: "pointer" }}>
                        {user && user.profile_image ? (
                            <img src={user.profile_image} alt="User Profile" />
                        ) : (
                            initials
                        )}
                    </Avatar>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                            <ListItemIcon>
                                <PersonIcon fontSize="small" /> Profile
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="small" />Logout
                            </ListItemIcon>
                        </MenuItem>
                    </Menu>
                </>
            );
        } else {
            return (
                <>
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                    <Button color="inherit" component={Link} to="/register">
                        Register
                    </Button>
                </>
            );
        }
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span>{user_type} |</span> Dashboard | {user && user.name}
                    </Link>
                </Typography>
                <div style={{ marginLeft: 'auto' }}>
                    {renderRightButtons()}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
