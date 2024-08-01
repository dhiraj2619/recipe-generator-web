import React, { useContext, useState } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, Link as MuiLink, IconButton, Menu, MenuItem, Icon } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';
import { AccountCircle, DarkMode, LightMode } from '@mui/icons-material';
import { themeContext } from '../context/ThemeContext';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const { mode, toggleTheme } = useContext(themeContext);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        navigate('/');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: mode === 'light' ? '#e4e8ec' : '#030202', color: mode === 'light' ? '#030202' : 'white', boxShadow: "0" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <MuiLink component={Link} to="/" underline="none" color="inherit">
                            RecipeGen
                        </MuiLink>
                    </Typography>
                    <IconButton>
                        <Icon onClick={toggleTheme} style={{ listStyle: "none" }}>
                            {mode === 'light' ? <DarkMode /> : <LightMode />}
                        </Icon>
                    </IconButton>
                    {isAuthenticated ? (
                        <div>
                            <Button color="primary"> 
                                <IconButton onClick={handleMenu} color="inherit">
                                    <AccountCircle />
                                </IconButton>
                                <Typography>{user?.firstname}</Typography>
                            </Button>

                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
