import { useState } from "react";
import {
    Box,
    IconButton,
    Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function MediaCarouselItem({ item }) {
    return (
        <Box
            sx={{
                minWidth: 0,
                minHeight: 0,

                display: "flex",
                flexDirection: "column",

                cursor: item.onClick ? "pointer" : "default",

                "&:hover img": {
                    transform: "scale(1.035)",
                },
            }}
            onClick={item.onClick}
        >
            {/* Poster */}
            <Box
                sx={{
                    position: "relative",

                    height: "100%",
                    minHeight: 0,

                    borderRadius: 1.5,
                    overflow: "hidden",
                    bgcolor: "#242424",
                }}
            >
                <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",

                        display: "block",

                        transition: "transform 200ms ease",
                    }}
                />
            </Box>

            {/* Metadata */}
            <Box
                sx={{
                    minWidth: 0,
                    mt: 0.75,
                    flexShrink: 0,
                }}
            >
                <Typography
                    variant="body2"
                    fontWeight={500}
                    noWrap
                    sx={{
                        color: "rgba(255,255,255,0.9)",
                    }}
                >
                    {item.title}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        color: "rgba(255,255,255,0.5)",
                    }}
                >
                    {item.stat}
                </Typography>
            </Box>
        </Box>
    );
}

function MediaCarousel({
    pages = [],
    itemsPerPage = 3,
}) {
    const [activePage, setActivePage] = useState(0);

    if (!pages.length) {
        return null;
    }

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
                height: "100%",
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                p: {
                    xs: 1.5,
                    sm: 2,
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0,
                    mb: 1,
                }}
            >
                <Box
                    sx={{
                        minWidth: 0,
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        noWrap
                    >
                        {pages[activePage].label}
                    </Typography>

                    {pages[activePage].description && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                        >
                            {pages[activePage].description}
                        </Typography>
                    )}
                </Box>

                {pages.length > 1 && (
                    <Box
                        sx={{
                            display: "flex",
                            flexShrink: 0,
                        }}
                    >
                        <IconButton
                            size="small"
                            onClick={previousPage}
                            aria-label="Previous"
                            sx={{
                                color: "rgba(255,255,255,0.65)",
                            }}
                        >
                            <ChevronLeftIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                            size="small"
                            onClick={nextPage}
                            aria-label="Next"
                            sx={{
                                color: "rgba(255,255,255,0.65)",
                            }}
                        >
                            <ChevronRightIcon fontSize="small" />
                        </IconButton>
                    </Box>
                )}
            </Box>

            {/* Carousel viewport */}
            <Box
                sx={{
                    position: "relative",
                    flex: 1,
                    minHeight: 0,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        height: "100%",
                        transform: `translateX(-${activePage * 100}%)`,
                        transition: "transform 300ms ease",
                    }}
                >
                    {pages.map((page, pageIndex) => (
                        <Box
                            key={page.id ?? pageIndex}
                            sx={{
                                minWidth: "100%",
                                height: "100%",
                                minHeight: 0,

                                display: "grid",

                                gridTemplateColumns: {
                                    xs: `repeat(${Math.min(itemsPerPage, 2)}, minmax(0, 1fr))`,
                                    sm: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
                                },

                                gap: {
                                    xs: 1,
                                    sm: 1.5,
                                },
                            }}
                        >
                            {page.items.map((item) => (
                                <MediaCarouselItem
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Page indicators */}
            {pages.length > 1 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 0.75,
                        mt: 1,
                        flexShrink: 0,
                    }}
                >
                    {pages.map((page, index) => (
                        <Box
                            key={page.id ?? index}
                            component="button"
                            onClick={() => setActivePage(index)}
                            aria-label={`Go to ${page.label}`}
                            sx={{
                                border: 0,
                                p: 0,
                                width: index === activePage ? 18 : 6,
                                height: 5,
                                borderRadius: 3,

                                bgcolor:
                                    index === activePage
                                        ? "primary.main"
                                        : "rgba(255,255,255,0.25)",

                                cursor: "pointer",
                                transition: "all 200ms ease",
                            }}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default MediaCarousel;
