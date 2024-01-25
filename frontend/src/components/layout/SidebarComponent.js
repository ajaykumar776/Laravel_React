// Sidebar.js
import React from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import SubcategoryIcon from '@mui/icons-material/PlaylistAdd';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
const Sidebar = () => {
    const location = useLocation();
    const user_type = localStorage.getItem('user_type');
    const user = {};
    user.user_type = user_type;

    console.log(user.user_type);
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <List style={{ marginTop: '100px' }}>
                <RouterNavLink to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }} activeClassName="active-link">
                    <ListItem selected={location.pathname === '/dashboard'}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </RouterNavLink>

                {/* Categories */}
                {user && (user.user_type === 'ADMIN') && (
                    <RouterNavLink to="/category" style={{ textDecoration: 'none', color: 'inherit' }} activeClassName="active-link">
                        <ListItem selected={location.pathname === '/category'}>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItem>
                    </RouterNavLink>
                )}

                {/* Subcategories */}
                {user && (user.user_type === 'ADMIN') && (

                    <RouterNavLink to="/subcategory" style={{ textDecoration: 'none', color: 'inherit' }} activeClassName="active-link">
                        <ListItem selected={location.pathname === '/subcategory'}>
                            <ListItemIcon>
                                <SubcategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sub-Categories" />
                        </ListItem>
                    </RouterNavLink>
                )}

                {user && (user.user_type === 'ADMIN') && (

                    <RouterNavLink to="/users" style={{ textDecoration: 'none', color: 'inherit' }} activeClassName="active-link">
                        <ListItem selected={location.pathname === '/users'}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </RouterNavLink>
                )}

                {/* Profile (only for 'user' type) */}
                {user && (user.user_type === 'USER' || user.user_type === 'ADMIN') && (
                    <RouterNavLink to="/profile" style={{ textDecoration: 'none', color: 'inherit' }} activeClassName="active-link">
                        <ListItem selected={location.pathname === '/profile'}>
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </RouterNavLink>
                )}
            </List>
        </Drawer>
    );
};

export default Sidebar;
