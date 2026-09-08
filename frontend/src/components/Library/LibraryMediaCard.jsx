import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import { formatGenre, getGenreSx } from "../../utils/genreUtils";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box
} from "@mui/material";


function LibraryMediaCard({ mediaItem }) {

    const mediaTypeLabels = {
        MOVIE: "Movie",
        TV_SHOW: "TV Show",
        MUSIC_ALBUM: "Music Album",
        BOOK: "Book",
    };

    const MAX_VISIBLE_GENRES = 3;
    const DESCRIPTION_CHARACTER_LIMIT = 150;

    const genres = mediaItem.genre || mediaItem.genres || [];
    const visibleGenres = genres.slice(0, MAX_VISIBLE_GENRES);
    const remainingGenreCount = Math.max(
        0,
        genres.length - MAX_VISIBLE_GENRES
    );

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

    const truncateDescription = (description) => {
        if (!description) {
            return "";
        }

        if (description.length <= DESCRIPTION_CHARACTER_LIMIT) {
            return description;
        }

        return description.slice(0, DESCRIPTION_CHARACTER_LIMIT) + "...";
    };


    return (
        <Card
            sx={{
                border: "1px solid rgba(255, 255, 255, 0.08)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    image={mediaItem.coverImgUrl}
                    alt={mediaItem.title}
                    sx={{
                        width: "100%",
                        aspectRatio: "2 / 3",
                        objectFit: "contain",
                        backgroundColor: "#181818",
                        display: "block",
                    }}
                />

                {/* Community Rating */}
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
                                {Number(
                                    mediaItem.communityRating
                                ).toFixed(1)}
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
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                }}
            >
                {/* Title */}
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


                {/* Media Type + Release Date */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{ mt: 0.25 }}
                >
                    {mediaTypeLabels[mediaItem.mediaType] ||
                        mediaItem.mediaType}

                    {mediaItem.releaseDate &&
                        ` • ${mediaItem.releaseDate}`}
                </Typography>


                {/* Genres */}
                {genres.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                            mt: 1,
                        }}
                    >
                        {visibleGenres.map((genre) => (
                            <Box
                                key={genre}
                                sx={{
                                    px: 0.9,
                                    py: 0.3,
                                    borderRadius: "12px",
                                    fontSize: "0.7rem",
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                    whiteSpace: "nowrap",
                                    ...getGenreSx(
                                        genre,
                                        mediaItem.mediaType
                                    ),
                                }}
                            >
                                {formatGenre(genre)}
                            </Box>
                        ))}

                        {remainingGenreCount > 0 && (
                            <Box
                                sx={{
                                    px: 0.9,
                                    py: 0.3,
                                    borderRadius: "12px",
                                    fontSize: "0.7rem",
                                    fontWeight: 600,
                                    lineHeight: 1.2,
                                    color: "rgba(255, 255, 255, 0.6)",
                                    backgroundColor:
                                        "rgba(255, 255, 255, 0.05)",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                +{remainingGenreCount}
                            </Box>
                        )}
                    </Box>
                )}


                {/* Description */}
                {mediaItem.description && (
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 1.5,
                            fontSize: "0.65rem",
                            lineHeight: 1.45,
                            color: "rgba(255, 255, 255, 0.58)",
                        }}
                    >
                        {truncateDescription(mediaItem.description)}
                    </Typography>
                )}

                {/* View Count - Movies and TV only */}
                {shouldShowViewCount && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.75,
                            mt: "auto",
                            pt: 2,
                            color: "text.secondary",
                        }}
                    >
                        <VisibilityIcon
                            sx={{
                                fontSize: 18,
                                opacity: 0.7,
                            }}
                        />

                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                            }}
                        >
                            {mediaItem.consumptionCount || 0}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

export default LibraryMediaCard;