import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Box, Container } from '@mui/material'
import { useLocation } from 'react-router-dom'

const MainLayout = ({ children }) => {
    const location = useLocation();

    const noSidebarRoute = ['/getfullrecipe'];
    return (
        <Box>
            <Navbar />
            <Box display="flex" flexDirection="row">
                {!noSidebarRoute.includes(location.pathname) && <Sidebar />}
                <Container sx={{ flexGrow: 1, marginTop: 2 }}>
                    {children}
                </Container>
            </Box>

        </Box>
    )
}

export default MainLayout