import React, { useContext, useEffect, useState } from 'react'
import '../css/pagecss/Login.css';
import { Box, Button, CircularProgress, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/Authcontext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import googleIcon from '../img/google.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate])

  const handleClickshowPassword = () => {
    setShowPassword((show) => !show);
  }


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const validate = () => {
    let loginErrors = {};

    loginErrors.email = formData.email ? "" : "email is required";
    loginErrors.password = formData.password ? "" : "password is required";
    setErrors(loginErrors);
    return Object.values(loginErrors).every(x => x === '');
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await axios.post('https://recipegenerate-backend.onrender.com/api/users/login', formData);

        if (response.status === 200) {
          const { token, userId } = response.data;
          login(token, userId);

          navigate('/');
        }
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          if (errorMessage === "user not found with this email id") {
            toast.error("User not found with this email ID");
          }
          else if (errorMessage === "invalid password") {
            toast.error("Invalid password");
          }
          else {
            toast.error("Login failed");
          }
        }
        else if (error.request) {
          toast.error("Network error: No response received from server");
        } else {
          toast.error("Error: " + error.message);
        }
      }
      finally{
        setLoading(false);
      }
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const handleGoogleSignin = () => {
    window.location.href = "https://recipegenerate-backend.onrender.com/api/users/google";
  }


  return (
    <div className="bg-form">
      <Container maxWidth="sm">
        <ToastContainer />
        <Grid container spacing={2} display="flex" justifyContent="center">
          <Grid item lg={9} sm={10} xs={12} >
            <Box p={2} bgcolor="white" borderRadius={2} mt={10} boxShadow={5}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Login to account
              </Typography>
              <div style={{ marginTop: "8px" }}>
                <Typography variant="p" className="lato-light" sx={{ fontSize: "17px" }}>
                  Access to the Recipe generator tool
                </Typography>
              </div>
              <form onSubmit={handleOnSubmit}>
                <Box mt={3}>
                  <TextField name="email" onChange={handleOnChange} value={formData.email} label="Email" variant="outlined" error={!!errors.email} helperText={errors.email} fullWidth />
                </Box>
                <Box mt={3}>
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
                </Box>
                <Box mt={3}>
                  <Button type="submit" variant="contained" color="secondary" disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit"/>:'Login'}</Button>
                </Box>
              </form>
              <Box mt={4}>
                <Typography sx={{ fontSize: "14px", color: "gray" }} variant="p">Or login with</Typography>
                <Box display="flex" flexDirection="row" justifyContent="space-evenly" mt={2}>
                  <button className="googlebtn" onClick={handleGoogleSignin}><span style={{ marginRight: "10px" }}>
                    <img src={googleIcon} width="24px" alt="" />
                  </span>  Google</button>
                </Box>
              </Box>
              <Box mt={3}>
                <Typography fontSize="16px" sx={{ cursor: "pointer" }} onClick={() => navigate('/signup')}>Register new account</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Login