import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import TaskList from '../components/TaskList';





const mdTheme = createTheme();

function Content() {
    

    return (
        <ThemeProvider theme={mdTheme}>
            <TaskList/>
            <Box sx={{ display: 'flex' }}>
                    <Container positionmaxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <div position="fixed" bottom="10px">
                        <Copyright/>
                        </div>
                    </Container>
            </Box>
        </ThemeProvider>
    );
}

export default function Home() {
    return <Content />;
}