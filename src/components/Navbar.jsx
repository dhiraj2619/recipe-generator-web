import React,{useState} from 'react';
import { AppBar, Box, Toolbar, Typography, Button,  Link as MuiLink } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <MuiLink component={Link} to="/" underline="none" color="inherit">
                            RecipeGen
                        </MuiLink>
                    </Typography>
                    <div>
                      
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
