import { Box } from "@mui/material";
import DiscoverMediaCard from "../../components/Discover/DiscoverMediaCard.jsx";


function DiscoverMediaGrid({ mediaItemArray }) {
    
    return (
        <Box
            sx={{
                margin: 2,
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(5, 1fr)'
                },
                gap: 2,
            }}
        >
            {mediaItemArray.map((item, index) => (
                <DiscoverMediaCard key={item.externalId} mediaItem={item} />
            ))}
        </Box>
    );
}

export default DiscoverMediaGrid;