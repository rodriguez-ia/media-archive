import { Box, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

const MEDIA_COLORS = {
    movies: "#7DB9F2",
    tvShows: "#8FD3A8",
    musicAlbums: "#F28FA8",
    books: "#F5CF65",
}

function SummaryLegend({ mediaCounts }) {

    const mediaTypeData = [
        {
            label: "Movies",
            color: MEDIA_COLORS.movies,
            value: mediaCounts.movies,
        },
        {
            label: "TV Shows",
            color: MEDIA_COLORS.tvShows,
            value: mediaCounts.tvShows,
        },
        {
            label: "Music Albums",
            color: MEDIA_COLORS.musicAlbums,
            value: mediaCounts.musicAlbums,
        },
        {
            label: "Books",
            color: MEDIA_COLORS.books,
            value: mediaCounts.books,
        },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mt: 1,
                width: "fit-content",
            }}
        >
            {mediaTypeData.map(({ label, color, value }) => (
                <Box
                    key={label}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        minHeight: 20,
                        fontSize: "14px",
                        fontFamily: "Roboto, sans-serif",
                        color: "text.primary",
                    }}
                >
                    <Box
                        sx={{
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            backgroundColor: color,
                            flexShrink: 0,
                            mr: 1.25,
                        }}
                    />

                    <Box component="span">
                        {label}: {value}
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

function MediaSummary({ title, mediaCounts }) {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                minWidth: 0,
                px: {
                    xs: 1,
                    sm: 2,
                    md: 3,
                },
                py: {
                    xs: 2,
                    sm: 1,
                    md: 2,
                }
            }}
        >
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 600,
                    mb: 0.5,
                }}
            >
                {title}
            </Typography>

            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: mediaCounts.movies, color: MEDIA_COLORS.movies },           // Movies
                            { id: 1, value: mediaCounts.tvShows, color: MEDIA_COLORS.tvShows },         // TV Shows
                            { id: 2, value: mediaCounts.musicAlbums, color: MEDIA_COLORS.musicAlbums }, // Music Albums
                            { id: 3, value: mediaCounts.books, color: MEDIA_COLORS.books },             // Books
                        ],
                        highlightScope: {
                            fade: 'global',
                            highlight: 'item'
                        },
                        faded: {
                            innerRadius: 60,
                            additionalRadius: -10,
                            color: 'gray'
                        },
                        innerRadius: 60,
                        cornerRadius: 3,
                        paddingAngle: 2,
                    },
                ]}
                width={200}
                height={200}
            />

            <SummaryLegend mediaCounts={mediaCounts} />
        </Box>
    );
}

function DashboardSummary() {

    const ownedCounts = {
                        movies: 130,
                        tvShows: 25,
                        musicAlbums: 15,
                        books: 50
                    };
    const wishlistedCounts = {
                        movies: 5,
                        tvShows: 15,
                        musicAlbums: 5,
                        books: 20
                    };

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
                    sm: "1fr 1fr",
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
                <MediaSummary title={"Owned"} mediaCounts={ownedCounts}/>
            </Box>

            {/* Wishlisted Media */}
            <Box>
                <MediaSummary title={"Wishlisted"} mediaCounts={wishlistedCounts}/>
            </Box>
        </Box>
    );
}

export default DashboardSummary;
