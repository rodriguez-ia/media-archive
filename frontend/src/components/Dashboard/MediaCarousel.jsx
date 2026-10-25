import { useState } from "react";
import {
    Box,
    IconButton,
    Typography,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CircularProgress from "@mui/material/CircularProgress";

function MediaCarouselItem({
    item,
    onItemClick,
    isAdded = false,
    isAdding = false,
}) {
    const handleClick = onItemClick
        ? () => onItemClick(item)
        : item.onClick;

    const isDisabled = isAdded || isAdding;
    const isInteractive = Boolean(handleClick) && !isDisabled;

    return (
        <Box
            onClick={isInteractive ? handleClick : undefined}
            sx={{
                minWidth: 0,
                minHeight: 0,

                display: "flex",
                flexDirection: "column",

                cursor: isInteractive ? "pointer" : "default",
                opacity: isAdded ? 0.8 : 1,
                outlineOffset: 3,

                "&:hover img": {
                    transform: isInteractive ? "scale(1.035)" : "none",
                },
            }}
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
                    src={item.coverImgUrl}
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

                {/* Wishlist icon: only shown when the callback is provided */}
                {onItemClick && (
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: isAdded
                                ? "rgba(0, 0, 0, 0.35)"
                                : "rgba(0, 0, 0, 0.25)",
                            opacity: isAdded || isAdding ? 1 : 0,
                            transition: "opacity 180ms ease",
                            pointerEvents: "none",

                            // Show on hover-capable devices; keep visible
                            // on touch devices that have no hover state.
                            "@media (hover: hover)": {
                                ".MuiBox-root:hover > &": {
                                    opacity: 1,
                                },
                            },
                            "@media (hover: none)": {
                                opacity: 1,
                            },
                        }}
                    >
                        {isAdding ? (
                            <CircularProgress
                                size={38}
                                thickness={4}
                                sx={{ color: "#fff" }}
                            />
                        ) : isAdded ? (
                            <CheckCircleRoundedIcon
                                sx={{
                                    fontSize: { xs: 36, sm: 44 },
                                    color: "#69e69a",
                                    filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.7))",
                                }}
                            />
                        ) : (
                            <AddCircleRoundedIcon
                                sx={{
                                    fontSize: { xs: 36, sm: 44 },
                                    color: "#fff",
                                    filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.7))",
                                }}
                            />
                        )}
                    </Box>
                )}
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
    itemsPerView = 3,
    onItemClick,
}) {
    const [activePage, setActivePage] = useState(0);
    const [itemStatuses, setItemStatuses] = useState({});

    /*
     * Split each category into display pages.
     *
     * Example:
     *
     * Trending: [1, 2, 3, 4, 5]
     *
     * becomes:
     *
     * Trending page 1: [1, 2, 3]
     * Trending page 2: [4, 5]
     */
    const displayPages = pages.flatMap((page) => {
        const chunks = [];

        for (let i = 0; i < page.items.length; i += itemsPerView) {
            chunks.push({
                id: `${page.id}-${i / itemsPerView}`,
                label: page.label,
                description: page.description,
                items: page.items.slice(i, i + itemsPerView),
            });
        }

        return chunks;
    });

    if (!displayPages.length) {
        return null;
    }

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

    const handleItemClick = async (item) => {
        if (!onItemClick || !item.id) {
            return;
        }

        const currentStatus = itemStatuses[item.id];

        if (currentStatus?.added || currentStatus?.adding) {
            return;
        }

        setItemStatuses((previous) => ({
            ...previous,
            [item.id]: { adding: true, added: false },
        }));

        try {
            const success = await onItemClick(item);

            setItemStatuses((previous) => ({
                ...previous,
                [item.id]: {
                    adding: false,
                    added: success === true,
                },
            }));
        } catch (error) {
            setItemStatuses((previous) => ({
                ...previous,
                [item.id]: {
                    adding: false,
                    added: false,
                },
            }));
        }
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
                        {displayPages[activePage].label}
                    </Typography>

                    {displayPages[activePage].description && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                        >
                            {displayPages[activePage].description}
                        </Typography>
                    )}
                </Box>

                {displayPages.length > 1 && (
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
                    {displayPages.map((page, pageIndex) => (
                        <Box
                            key={page.id ?? pageIndex}
                            sx={{
                                minWidth: "100%",
                                height: "100%",
                                minHeight: 0,

                                display: "grid",

                                gridTemplateColumns: {
                                    xs: `repeat(${Math.min(itemsPerView, 2)}, minmax(0, 1fr))`,
                                    sm: `repeat(${itemsPerView}, minmax(0, 1fr))`,
                                },

                                gap: {
                                    xs: 1,
                                    sm: 1.5,
                                },
                            }}
                        >
                            {page.items.map((item) => {
                                const status = itemStatuses[item.id];

                                return (
                                    <MediaCarouselItem
                                        key={item.id}
                                        item={item}
                                        onItemClick={onItemClick ? handleItemClick : undefined}
                                        isAdded={status?.added ?? false}
                                        isAdding={status?.adding ?? false}
                                    />
                                );
                            })}
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Page indicators */}
            {displayPages.length > 1 && (
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
                    {displayPages.map((page, index) => (
                        <Box
                            key={page.id ?? index}
                            component="button"
                            onClick={() => setActivePage(index)}
                            aria-label={`Go to ${page.label} page ${index + 1}`}
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