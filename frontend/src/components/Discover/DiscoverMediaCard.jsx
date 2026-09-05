import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star"
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    IconButton,
    FormControl,
    Select,
    MenuItem
} from "@mui/material";


function DiscoverMediaCard({ mediaItem, handleMediaCardRemoval, handleMediaStatusChange }) {

    const mediaTypeLabels = {
        MOVIE: "Movie",
        TV_SHOW: "TV Show",
        MUSIC_ALBUM: "Music Album",
        BOOK: "Book",
    };
    
    const hasRating = mediaItem.communityRating != null;
    
    let ratingColor = "rgba(255, 255, 255, 0.35)";
    if (hasRating) {
        if (mediaItem.communityRating >= 8) {
            ratingColor = "#66bb6a";
        } else if (mediaItem.communityRating >= 6) {
            ratingColor = "#ffca28";
        } else {
            ratingColor = "#ef5350";
        }
    }

    return (
        <Card sx={{
            border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    image={mediaItem.coverImgUrl}
                    alt={mediaItem.title}
                    sx={{
                        width: '100%',
                        aspectRatio: '2 / 3',
                        objectFit: 'contain',
                        backgroundColor: '#181818',
                        display: 'block'
                    }}
                />

                <IconButton
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        color: "rgba(255, 255, 255, 0.7)",
                        backgroundColor: "rgba(0, 0, 0, 0.25)",
                        "&:hover": {
                            color: "rgba(255, 255, 255, 1)",
                            backgroundColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }}
                    onClick={() => { handleMediaCardRemoval(mediaItem.externalId) }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>

                <Box
                    sx={{
                        position: "absolute",
                        bottom: -14,
                        left: 6,

                        width: 52,
                        height: 52,
                        borderRadius: "50%",

                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",

                        backgroundColor: "#181818",
                        border: `3px solid ${ratingColor}`,
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",

                        zIndex: 1,
                    }}
                >
                    {hasRating ? (
                        <>
                            <StarIcon
                                sx={{
                                    fontSize: 15,
                                    color: ratingColor,
                                    mb: "-2px",
                                }}
                            />

                            <Typography
                                sx={{
                                    fontSize: "0.9rem",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    color: "white",
                                }}
                            >
                                {Number(mediaItem.communityRating).toFixed(1)}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    color: ratingColor,
                                }}
                            >
                                ?
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "0.55rem",
                                    fontWeight: 600,
                                    lineHeight: 1,
                                    color: "rgba(255, 255, 255, 0.5)",
                                    mt: 0.25,
                                }}
                            >
                                N/A
                            </Typography>
                        </>
                    )}
                </Box>
            </Box>

            <CardContent
                sx={{
                    "&:last-child": {
                        paddingBottom: 2,
                    },
                }}
            >
                <Typography
                    variant="body1"
                    fontWeight={500}
                    sx={{
                        lineHeight: 1.3,
                        overflowWrap: "anywhere",
                    }}
                >
                    {mediaItem.title}
                </Typography>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{ mt: 0.25 }}
                >
                    {mediaTypeLabels[mediaItem.mediaType] || mediaItem.mediaType}
                    {mediaItem.releaseDate && ` • ${mediaItem.releaseDate}`}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Status:
                    </Typography>

                    <FormControl size="small">
                        <Select
                            value={mediaItem.status || "OWNED"}
                            onChange={(event) => {
                                handleMediaStatusChange(mediaItem.externalId, event.target.value)
                            }}
                            sx={{
                                minWidth: 100,
                                fontSize: "0.875rem",
                                height: 32,
                            }}
                        >
                            <MenuItem value="OWNED">Owned</MenuItem>
                            <MenuItem value="WISHLISTED">Wishlisted</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </CardContent>
        </Card>
    );
}

export default DiscoverMediaCard;