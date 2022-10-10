import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';




function Content() {
    

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                    <Container positionmaxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <div position="fixed" bottom="10px">
                        <Copyright/>
                        </div>
                    </Container>
            </Box>
        </>
    );
}

export default function Home() {
    return <Content />;
}