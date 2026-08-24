import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import LibraryMediaCard from "../../components/Library/LibraryMediaCard.jsx";


function LibraryMediaGrid({ mediaItemArray }) {
    
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)',
                xl: 'repeat(6, 1fr)'
                },
                gap: 2,
            }}
        >
            {mediaItemArray.map((item, index) => (
                <LibraryMediaCard key={index} mediaItem={item} />
            ))}
        </Box>
    );
}

export default LibraryMediaGrid;