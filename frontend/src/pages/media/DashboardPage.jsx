import { Container, Box } from "@mui/material";

function DashboardPage() {

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    marginY: 2,
                    display: "flex",
                    flexDirection: "column",
                }}    
            >
                {/* Upper Section */}
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        {/* Summary */}
                        <Box>
                            Summary
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            {/* Personal */}
                            <Box>
                                Personal
                            </Box>

                            {/* Community */}
                            <Box>
                                Community
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Lower Section */}
                <Box>
                    {/* Daily Spotlight */}
                    <Box>
                        Daily Spotlight
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default DashboardPage;