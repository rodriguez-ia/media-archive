import { Container, Box } from "@mui/material";

function DashboardPage() {

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    marginY: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    overflowX: "hidden",
                    overflowY: "auto",
                }}    
            >
                {/* Upper Section */}
                <Box>
                    <Box
                        sx={{
                            height: "50vh",
                            display: "flex",
                            flexDirection: "row",
                            gap: 3,
                        }}
                    >
                        {/* Summary */}
                        <Box
                            sx={{
                                width: "50%",

                                bgcolor: "#181818",
                                border:
                                    "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 3,
                                boxShadow:
                                    "0 20px 20px rgba(0,0,0,0.3)",
                                outline: "none",
                            }}
                        >
                            Summary
                        </Box>

                        <Box
                            sx={{
                                width: "50%",

                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                            }}
                        >
                            {/* Personal */}
                            <Box
                                sx={{
                                    height: "25vh",

                                    bgcolor: "#181818",
                                    border:
                                        "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 3,
                                    boxShadow:
                                        "0 20px 20px rgba(0,0,0,0.3)",
                                    outline: "none",
                                }}
                            >
                                Personal
                            </Box>

                            {/* Community */}
                            <Box
                                sx={{
                                    height: "25vh",

                                    bgcolor: "#181818",
                                    border:
                                        "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 3,
                                    boxShadow:
                                        "0 20px 20px rgba(0,0,0,0.3)",
                                    outline: "none",
                                }}
                            >
                                Community
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Lower Section */}
                <Box>
                    {/* Daily Spotlight */}
                    <Box
                        sx={{
                            height: "35vh",

                            bgcolor: "#181818",
                            border:
                                "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 3,
                            boxShadow:
                                "0 20px 20px rgba(0,0,0,0.3)",
                            outline: "none",
                        }}
                    >
                        Daily Spotlight
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default DashboardPage;