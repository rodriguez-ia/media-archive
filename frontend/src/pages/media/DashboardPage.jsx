import { Container, Box } from "@mui/material";
import DashboardCard from "../../components/Dashboard/DashboardCard.jsx";
import DashboardSummary from "../../components/Dashboard/DashboardSummary.jsx";
import DashboardPersonal from "../../components/Dashboard/DashboardPersonal.jsx";

function DashboardPage() {

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    my: 2,
                    display: "grid",
                    gap: 3,
                }}
            >
                {/* Daily Spotlight */}
                <DashboardCard
                    sx={{
                        minHeight: {
                            xs: 220,
                            sm: 260,
                            md: "clamp(220px, 25vh, 300px)",
                        },
                    }}
                >
                    Daily Spotlight
                </DashboardCard>

                {/* Summary */}
                <DashboardCard
                    sx={{
                        minHeight: {
                            xs: 280,
                            sm: 320,
                            md: "clamp(280px, 35vh, 400px)",
                        },
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
                        },
                        gap: 3,
                        minHeight: 0,
                    }}
                >
                    {/* Personal */}
                    <DashboardCard
                        sx={{
                            minHeight: {
                                xs: 260,
                                sm: 300,
                            },
                        }}
                    >
                        <DashboardPersonal />
                    </DashboardCard>

                    {/* Community */}
                    <DashboardCard
                        sx={{
                            minHeight: {
                                xs: 260,
                                sm: 300,
                            },
                        }}
                    >
                        Community
                    </DashboardCard>
                </Box>
            </Box>
        </Container>
    );
}

export default DashboardPage;