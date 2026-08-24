import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Box, Stack, Typography } from "@mui/material";

function DiscoverHeader() {

    return (
        <Box
            sx={{
                marginTop: 2,
                width: "100%",
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
            >
                <AutoAwesomeIcon
                    sx={{
                        width: "2rem",
                        height: "2rem",
                        color: "#CBD5E0",
                        transform: "translateY(2px)"
                    }}
                />
                <Typography
                    variant="h4"
                    sx={{
                        color: "#CBD5E0",
                        fontWeight: 500
                    }}
                >
                    Discover
                </Typography>
            </Stack>
        </Box>
    );
}

export default DiscoverHeader;