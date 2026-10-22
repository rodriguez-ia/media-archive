import { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { getDashboardMediaSummary } from "../../services/mediaService";

const MEDIA_COLORS = {
    movies: "#7DB9F2",
    tvShows: "#8FD3A8",
    musicAlbums: "#F28FA8",
    books: "#F5CF65",
}

function MediaSummary({ title, mediaCounts }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const chartWidth = isMobile ? 280 : 400;
    const chartHeight = isMobile ? 210 : 250;
    const cx = chartWidth / 2;
    const cy = isMobile ? 175 : 220;
    const outerRadius = isMobile ? 125 : 170;
    const innerRadius = isMobile ? 55 : 75;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                minWidth: 0,
                px: { xs: 1, sm: 2, md: 3 },
                py: { xs: 2, sm: 1, md: 2 },
            }}
        >
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600 }}
            >
                {title}
            </Typography>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: chartWidth,
                    minWidth: 0,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, label: "Movies", value: mediaCounts.movies ?? 0, color: MEDIA_COLORS.movies },
                                { id: 1, label: "TV Shows", value: mediaCounts.tvShows ?? 0, color: MEDIA_COLORS.tvShows },
                                { id: 2, label: "Music Albums", value: mediaCounts.musicAlbums ?? 0, color: MEDIA_COLORS.musicAlbums },
                                { id: 3, label: "Books", value: mediaCounts.books ?? 0, color: MEDIA_COLORS.books },
                            ],
                            startAngle: -90,
                            endAngle: 90,
                            cx,
                            cy,
                            outerRadius,
                            innerRadius,
                            cornerRadius: 3,
                            paddingAngle: 2,
                            highlightScope: {
                                fade: "global",
                                highlight: "item",
                            },
                            faded: {
                                innerRadius,
                                additionalRadius: -10,
                                color: "gray",
                            },
                        },
                    ]}
                    margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    width={chartWidth}
                    height={chartHeight}
                    slotProps={{
                        legend: {
                            direction: "row",
                            position: {
                                vertical: "bottom",
                                horizontal: "middle",
                            },
                        },
                    }}
                />

                {/* Total centered inside the semicircle opening */}
                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        top: cy - innerRadius / 2,
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0,
                        pointerEvents: "none",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            lineHeight: 1.1,
                        }}
                    >
                        {mediaCounts.total ?? 0}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            lineHeight: 1.1,
                            mt: 0.25,
                        }}
                    >
                        Total
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

function DashboardSummary() {

    const [ownedCounts, setOwnedCounts] = useState({});
    const [wishlistedCounts, setWishlistedCounts] = useState({});

    useEffect(() => {
        let cancelled = false;

        async function loadSummary() {
            try {
                const response = await getDashboardMediaSummary();

                if (cancelled) {return;}

                setOwnedCounts({
                    total : response.data.ownedTotal,
                    movies : response.data.ownedMoviesCount,
                    tvShows : response.data.ownedTVShowsCount,
                    musicAlbums : response.data.ownedMusicAlbumsCount,
                    books : response.data.ownedBooksCount
                });

                setWishlistedCounts({
                    total : response.data.wishlistedTotal,
                    movies : response.data.wishlistedMoviesCount,
                    tvShows : response.data.wishlistedTVShowsCount,
                    musicAlbums : response.data.wishlistedMusicAlbumsCount,
                    books : response.data.wishlistedBooksCount
                });
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to fetch media summary: " + error);
                }
            }
        }

        loadSummary();

        return () => {
            cancelled = true;
        }
    }, []);

    return (
        <Box
            sx={{
                my: 2,
                width: "100%",
                display: "grid",
                
                // xs: vertically stacked
                // sm/md+: side-by-side
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                },

                // alignItems: "stretch",
            }}
        >
            {/* Owned Media */}
            <Box
                sx={{
                    // Horizontal divider on xs
                    borderBottom: {
                        xs: "1px solid #3A3A3A",
                        sm: "none",
                    },
                    
                    // Vertical divider on sm/md+
                    borderRight: {
                        xs: "none",
                        sm: "1px solid #3A3A3A",
                    },

                    borderColor: "#3A3A3A",
                }}
            >
                <MediaSummary title={"My Owned Media"} mediaCounts={ownedCounts}/>
            </Box>

            {/* Wishlisted Media */}
            <Box>
                <MediaSummary title={"My Wishlisted Media"} mediaCounts={wishlistedCounts}/>
            </Box>
        </Box>
    );
}

export default DashboardSummary;
