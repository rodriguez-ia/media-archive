
import { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
    Box,
    IconButton,
    Typography
} from "@mui/material";


function LibraryVideoCarousel() {

    const pages = [
        {
            name: "Game Intro",
            videoId: "UWo0Hhx07Pc"
        },
        {
            name: "Gameplay Video",
            videoId: "sTzV88Ug7jY"
        },
        {
            name: "Trailer",
            videoId: "7m80hA5bRk0"
        },
        {
            name: "Trailer",
            videoId: "8OaXfg8tMK0"
        }
    ];

    useEffect(() => {
        // TODO: retrieve real data via API callout
    }, []);

    const [activePage, setActivePage] = useState(0);

    const previousPage = () => {
        setActivePage((current) =>
            current === 0 ? pages.length - 1 : current - 1
        );
    };

    const nextPage = () => {
        setActivePage((current) =>
            current === pages.length - 1 ? 0 : current + 1
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
                    {pages[activePage].name}
                </Typography>

                {pages.length > 1 && (
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
                    {pages.map((videoObj) => (
                        <Box
                            key={videoObj.videoId}
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
                                    src={`https://www.youtube.com/embed/${videoObj.videoId}`}
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
        </Box>
    );
}

export default LibraryVideoCarousel;
