import { Box } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

function SummaryLegend({ mediaCounts}) {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '10px',
            }}
        >
            {[
                { label: 'Movies', color: '#5C8DDE', value: mediaCounts.movies },
                { label: 'TV Shows', color: '#9B7EDE', value: mediaCounts.tvShows },
                { label: 'Music Albums', color: '#4DB6AC', value: mediaCounts.musicAlbums },
                { label: 'Books', color: '#E6A65D', value: mediaCounts.books },
            ].map(({ label, color, value }) => (
                <Box
                    key={label}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '20px',
                        fontSize: '14px',
                        fontFamily: 'Roboto, sans-serif',
                        color: 'text.primary',
                    }}
                >
                    <Box
                        sx={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            backgroundColor: color,
                            flexShrink: 0,
                            mr: '10px',
                        }}
                    />
                    {label}: {value}
                </Box>
            ))}
        </Box>
    );
}

function DashboardSummary() {

    return (
        <Box
            sx={{
                my: 2,
                display: "flex",
                flexDirection: "row",
            }}
        >
            {/* Owned Media */}
            <Box>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, color: '#5C8DDE' }, // Movies
                                { id: 1, value: 15, color: '#9B7EDE' }, // TV Shows
                                { id: 2, value: 20, color: '#4DB6AC' }, // Music Albums
                                { id: 3, value: 20, color: '#E6A65D' }, // Books
                            ],
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: {
                                    innerRadius: 60,
                                    additionalRadius: -10,
                                    color: 'gray'
                                },
                            innerRadius: 60,
                        },
                    ]}
                    width={200}
                    height={200}
                />
                <SummaryLegend
                    mediaCounts={{
                        movies: 10,
                        tvShows: 15,
                        musicAlbums: 20,
                        books: 20
                    }}
                />
            </Box>

            {/* Wishlisted Media */}
            <Box>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, color: '#5C8DDE' }, // Movies
                                { id: 1, value: 15, color: '#9B7EDE' }, // TV Shows
                                { id: 2, value: 20, color: '#4DB6AC' }, // Music Albums
                                { id: 3, value: 20, color: '#E6A65D' }, // Books
                            ],
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: {
                                innerRadius: 60,
                                additionalRadius: -10,
                                color: 'gray'
                            },
                            innerRadius: 60,
                        },
                    ]}
                    slotProps={{
                        legend: {
                            direction: 'vertical',
                            position: {
                                vertical: 'bottom',
                                horizontal: 'middle',
                            }
                        }
                    }}
                    width={200}
                    height={200}
                />
                <SummaryLegend
                    mediaCounts={{
                        movies: 10,
                        tvShows: 15,
                        musicAlbums: 20,
                        books: 20
                    }}
                />
            </Box>
        </Box>
    );
}

export default DashboardSummary;
