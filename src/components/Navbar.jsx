import React,{useContext, useState} from 'react';
import { AppBar, Box, Toolbar, Typography, Button,  Link as MuiLink, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const {isAuthenticated,logout} = useContext(AuthContext);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout=()=>{
        logout();
        handleClose();
        navigate('/');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <MuiLink component={Link} to="/" underline="none" color="inherit">
                            RecipeGen
                        </MuiLink>
                    </Typography>
                    {isAuthenticated ? (
                        <div>
                            <IconButton onClick={handleMenu} color="inherit">
                                <Avatar alt="Profile" src="/static/images/avatar/1.jpg" />
                            </IconButton>
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
