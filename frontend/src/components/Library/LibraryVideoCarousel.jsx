
import { useEffect, useState } from "react";
import { getGameVideos } from "../../services/mediaService";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
    Box,
    IconButton,
    Typography
} from "@mui/material";


function LibraryVideoCarousel({ externalId }) {

    const [displayPages, setDisplayPages] = useState([])
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        let cancelled = false;

        async function getExternalGameVideos() {
            try {
                const response = await getGameVideos(externalId);

                if (cancelled) {return;}

                setDisplayPages(response.data);
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to retrieve video data for media item: " + error);
                }
            }
        }

        getExternalGameVideos();

        return () => {
            cancelled = true;
        }
    }, []);

    const previousPage = () => {
        setActivePage((current) =>
            current === 0 ? displayPages.length - 1 : current - 1
        );
    };

    const nextPage = () => {
        setActivePage((current) =>
            current === displayPages.length - 1 ? 0 : current + 1
        );
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "800px",
                mx: "auto",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,

                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 1.5
            }}
        >
            {displayPages.length > 0 && (
                <>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pb: 1.5,
                            borderBottom: "1px solid rgba(255,255,255,0.08)"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.95)"
                            }}
                        >
                            {displayPages[activePage].name}
                        </Typography>

                        {displayPages.length > 1 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexShrink: 0
                                }}
                            >
                                <IconButton
                                    size="small"
                                    onClick={previousPage}
                                    aria-label="Previous video"
                                    sx={{
                                        color: "rgba(255,255,255,0.75)"
                                    }}
                                >
                                    <ChevronLeftIcon fontSize="small" />
                                </IconButton>

                                <IconButton
                                    size="small"
                                    onClick={nextPage}
                                    aria-label="Next video"
                                    sx={{
                                        color: "rgba(255,255,255,0.75)"
                                    }}
                                >
                                    <ChevronRightIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                    </Box>

                    {/* Video Carousel */}
                    <Box
                        sx={{
                            overflow: "hidden",
                            borderRadius: 1
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                transform: `translateX(-${activePage * 100}%)`,
                                transition: "transform 300ms ease",
                                "@media (prefers-reduced-motion: reduce)": {
                                    transition: "none"
                                }
                            }}
                        >
                            {displayPages.map((videoObj) => (
                                <Box
                                    key={videoObj.video_id}
                                    sx={{
                                        minWidth: "100%",
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: "100%",
                                            aspectRatio: "16 / 9"
                                        }}
                                    >
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${videoObj.video_id}`}
                                            title={videoObj.name}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            loading="lazy"
                                            style={{
                                                display: "block",
                                                border: 0
                                            }}
                                        />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default LibraryVideoCarousel;
