import { Box } from "@mui/material";

function DashboardCard({ children, sx }) {

    return (
        <Box
            sx={{
                bgcolor: "#181818",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                boxShadow: "0 20px 20px rgba(0,0,0,0.3)",
                overflow: "hidden",

                ...sx,
            }}
        >
            {children}
        </Box>
    );
}

export default DashboardCard;
