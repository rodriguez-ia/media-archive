import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import { formatGenre, getGenreSx } from "../../utils/genreUtils.js";
import {
    CardMedia,
    Typography,
    Box,
    Modal,
    IconButton,
    Divider,
    Fade,
    Chip
} from "@mui/material";

function LibraryMediaModal({ open, onClose, mediaItem }) {

    if (!mediaItem) {
        return null;
    }

    const mediaTypeLabels = {
        MOVIE: "Movie",
        TV_SHOW: "TV Show",
        MUSIC_ALBUM: "Music Album",
        BOOK: "Book",
    };

    const genres = mediaItem.genres || [];

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

    const shouldShowViewCount = mediaItem.mediaType === "MOVIE" || mediaItem.mediaType === "TV_SHOW";

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",

                        top: "50%",
                        left: "50%",

                        transform:
                            "translate(-50%, -50%)",

                        width: {
                            xs: "92%",
                            sm: "80%",
                            md: 750,
                        },

                        maxHeight: "88vh",

                        overflowY: "auto",

                        bgcolor: "#181818",

                        border:
                            "1px solid rgba(255,255,255,0.1)",

                        borderRadius: 3,

                        boxShadow:
                            "0 30px 80px rgba(0,0,0,0.8)",

                        outline: "none",
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",

                            top: 10,
                            right: 10,

                            zIndex: 5,

                            backgroundColor:
                                "rgba(0,0,0,0.55)",

                            "&:hover": {
                                backgroundColor:
                                    "rgba(255,255,255,0.12)",
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>


                    <Box
                        sx={{
                            display: "flex",

                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },

                            gap: 3,

                            p: 3,
                        }}
                    >
                        {/* Large Cover */}
                        <Box
                            sx={{
                                flexShrink: 0,

                                width: {
                                    xs: "100%",
                                    sm: 220,
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={mediaItem.coverImgUrl}
                                alt={mediaItem.title}
                                sx={{
                                    width: "100%",

                                    aspectRatio: "2 / 3",

                                    objectFit: "cover",

                                    borderRadius: 2,

                                    boxShadow:
                                        "0 15px 35px rgba(0,0,0,0.6)",
                                }}
                            />
                        </Box>


                        {/* Details */}
                        <Box
                            sx={{
                                flexGrow: 1,

                                minWidth: 0,
                            }}
                        >
                            <Typography
                                variant="h4"
                                fontWeight={700}
                                sx={{
                                    pr: 5,

                                    fontSize: {
                                        xs: "1.6rem",
                                        sm: "2rem",
                                    },
                                }}
                            >
                                {mediaItem.title}
                            </Typography>


                            <Typography
                                color="text.secondary"
                                sx={{
                                    mt: 0.5,
                                }}
                            >
                                {mediaTypeLabels[
                                    mediaItem.mediaType
                                ] ||
                                    mediaItem.mediaType}

                                {mediaItem.releaseDate &&
                                    ` • ${mediaItem.releaseDate}`}
                            </Typography>


                            <Divider
                                sx={{
                                    my: 2,
                                    borderColor:
                                        "rgba(255,255,255,0.08)",
                                }}
                            />


                            {/* Rating */}
                            <Box
                                sx={{
                                    display: "flex",

                                    alignItems: "center",

                                    gap: 1,

                                    mb: 2,
                                }}
                            >
                                <StarIcon
                                    sx={{
                                        color: ratingColor,
                                    }}
                                />

                                <Typography
                                    fontWeight={600}
                                >
                                    {hasRating
                                        ? `${Number(
                                            mediaItem.communityRating
                                        ).toFixed(
                                            1
                                        )} / 10`
                                        : "No community rating"}
                                </Typography>
                            </Box>


                            {/* All Genres */}
                            {genres.length > 0 && (
                                <Box
                                    sx={{
                                        display: "flex",

                                        flexWrap: "wrap",

                                        gap: 0.75,

                                        mb: 2,
                                    }}
                                >
                                    {genres.map((genre) => (
                                        <Chip
                                            key={genre}
                                            label={formatGenre(
                                                genre
                                            )}
                                            size="small"
                                            sx={{
                                                fontWeight: 600,

                                                ...getGenreSx(
                                                    genre,
                                                    mediaItem.mediaType
                                                ),
                                            }}
                                        />
                                    ))}
                                </Box>
                            )}


                            {/* Full Description */}
                            {mediaItem.description && (
                                <Typography
                                    sx={{
                                        lineHeight: 1.7,

                                        color:
                                            "rgba(255,255,255,0.72)",

                                        whiteSpace:
                                            "pre-line",
                                    }}
                                >
                                    {mediaItem.description}
                                </Typography>
                            )}


                            {/* Additional Info */}
                            {shouldShowViewCount && (
                                <Box
                                    sx={{
                                        display: "flex",

                                        alignItems: "center",

                                        gap: 1,

                                        mt: 3,

                                        pt: 2,

                                        borderTop:
                                            "1px solid rgba(255,255,255,0.08)",

                                        color:
                                            "text.secondary",
                                    }}
                                >
                                    <VisibilityIcon />

                                    <Typography>
                                        {mediaItem.consumptionCount || 0} views
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default LibraryMediaModal;