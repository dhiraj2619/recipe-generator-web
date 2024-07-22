import React, { useState } from 'react'
import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import googleIcon from '../img/google.png';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleClickshowPassword = () => {
        setShowPassword((show) => !show);
    }
  

    const validate = () => {
        let tempErrors = {};
        tempErrors.firstname = formData.firstname ? "" : "first name is required";
        tempErrors.lastname = formData.lastname ? "" : "last name is required";
        tempErrors.email = formData.email ? "" : "email is required";
        tempErrors.password = formData.password ? "" : "password is required";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleGoogleSignin=()=>{
        window.location.href = "https://recipegenerate-backend.onrender.com/api/users/google";
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                 await axios.post('https://recipegenerate-backend.onrender.com/api/users/register', formData);
                toast.success("signup successfull");
                navigate('/login');
            } catch (error) {
                if (error.response) {
                    const errorMessage = error.response.data.message;
                    if (errorMessage === "user already exists") {
                        toast.error("User Already exist with this email id");
                    }
                    else if (errorMessage === "user registration successfull") {
                        toast.success("Registration successfull");
                    }
                }
                else if (error.request) {
                    toast.error("Network error: No response received from server");
                } else {
                    toast.error("Error: " + error.message);
                }
            }
        }
        else {
            toast.error("Please fill in all required fields.");
        }

    }

    return (
        <div className="bg-signupform">
            <ToastContainer />
            <Container maxWidth="sm">
                <Grid container spacing={2} display="flex" justifyContent="center">
                    <Grid item lg={10} sm={10} xs={12} >
                        <Box p={2} bgcolor="white" borderRadius={2} mt={10} boxShadow={5}>
                            <Typography variant="h6" sx={{ fontWeight: "600" }}>
                                Create new account
                            </Typography>
                            <div style={{ marginTop: "8px" }}>
                                <Typography variant="p" className="lato-light" sx={{ fontSize: "17px" }}>
                                    Access to the Recipe generator tool
                                </Typography>
                            </div>
                            <form onSubmit={handleOnSubmit}>
                                <Grid container spacing={2} mt={2}>
                                    <Grid item lg={6} sm={12}>
                                        <TextField name="firstname" onChange={handleOnChange} value={formData.firstname} label="First name" variant="outlined" error={!!errors.firstname} helperText={errors.firstname} fullWidth />
                                    </Grid>
                                    <Grid item lg={6} sm={12}>
                                        <TextField name="lastname" onChange={handleOnChange} label="Last name" value={formData.lastname} variant="outlined" error={!!errors.lastname} helperText={errors.lastname} fullWidth />
                                    </Grid>
                                    <Grid item lg={12} sm={12}>
                                        <TextField name="email" onChange={handleOnChange} label="Email" variant="outlined" error={!!errors.email} helperText={errors.email} value={formData.email} fullWidth />
                                    </Grid>
                                    <Grid item lg={12} sm={12}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                            <OutlinedInput name="password" onChange={handleOnChange} value={formData.password}
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={handleClickshowPassword}

                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                                error={!!errors.password}

                                            />
                                            {errors.password && <Typography color="error" variant="caption">{errors.password}</Typography>}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Box mt={3}>
                                    <Button type="submit" variant="contained" color="secondary">Signup</Button>
                                </Box>
                            </form>
                            <Box mt={4} textAlign="center">
                                <Typography sx={{ fontSize: "16px", color: "gray" }} variant="p">OR</Typography>
                                <Box display="flex" flexDirection="row" justifyContent="space-evenly" mt={2}>
                                  
                                     <button className="googlebtn" onClick={handleGoogleSignin}><span style={{marginRight:"10px"}}>
                                           <img src={googleIcon} width="24px" alt="" />
                                        </span>  Google</button>
                                    
                                </Box>
                            </Box>
                            <Box mt={3}>
                                <Typography onClick={() => navigate('/login')} fontSize="16px" sx={{ cursor: "pointer" }}>Login to account</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Signup