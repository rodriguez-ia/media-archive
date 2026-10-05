import { Container, Box } from "@mui/material";
import DashboardCard from "../../components/Dashboard/DashboardCard.jsx";
import DashboardSummary from "../../components/Dashboard/DashboardSummary.jsx";

function DashboardPage() {

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    my: 2,
                    display: "grid",
                    gap: 3,
                    overflowX: "hidden",
                }}    
            >
                {/* Upper Section */}
                <Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "minmax(0, 1.5fr) minmax(0, 1fr)",
                            },
                            gap: 3,
                        }}
                    >
                        {/* Summary */}
                        <DashboardCard
                            sx={{
                                minHeight: {
                                    xs: 280,
                                    sm: 320,
                                    md: "clamp(320px, 42vh, 440px)",
                                }
                            }}
                        >
                            <DashboardSummary />
                        </DashboardCard>

                        {/* Personal + Community */}
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "1fr 1fr",
                                    md: "1fr",
                                },
                                gridTemplateRows: {
                                    xs: "repeat(2, minmax(180px, auto))",
                                    sm: "minmax(220px, auto)",
                                    md: "repeat(2, minmax(0, 1fr))",
                                },
                                gap: 3,
                            }}
                        >
                            {/* Personal */}
                            <DashboardCard>
                                Personal
                            </DashboardCard>

                            {/* Community */}
                            <DashboardCard>
                                Community
                            </DashboardCard>
                        </Box>
                    </Box>
                </Box>

                {/* Daily Spotlight */}
                <DashboardCard
                    sx={{
                        minHeight: {
                            xs: 280,
                            sm: 300,
                            md: "clamp(240px, 30vh, 340px)",
                        }
                    }}
                >
                    Daily Spotlight
                </DashboardCard>
            </Box>
        </Container>
    );
}

export default DashboardPage;