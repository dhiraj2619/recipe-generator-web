import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Box, Container } from '@mui/material'

const MainLayout = ({ children }) => {
    return (
        <Box>
            <Navbar />
            <Box display="flex" flexDirection="row">
                <Sidebar />
                <Container sx={{ flexGrow: 1, marginTop: 2 }}>
                    {children}
                </Container>
            </Box>

        </Box>
    )
}

export default MainLayout