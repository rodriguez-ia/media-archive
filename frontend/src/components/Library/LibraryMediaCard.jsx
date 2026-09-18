import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import TheatersIcon from "@mui/icons-material/Theaters";
import AlbumIcon from "@mui/icons-material/Album";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { formatGenre, getGenreSx } from "../../utils/genreUtils.js";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box
} from "@mui/material";


function LibraryMediaCard({ mediaItem, onSelect }) {

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

    const isMovieOrTV = mediaItem.mediaType === "MOVIE" || mediaItem.mediaType === "TV_SHOW";
    const isMusic = mediaItem.mediaType === "MUSIC_ALBUM";
    const isBook = mediaItem.mediaType === "BOOK";

    const truncateDescription = (description) => {
        if (!description) {
            return "";
        }

        if (description.length <= DESCRIPTION_CHARACTER_LIMIT) {
            return description;
        }

        return description.slice(0, DESCRIPTION_CHARACTER_LIMIT) + "...";
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(mediaItem);
        }
    };


    return (
        <>
            <Card
                role="button"
                tabIndex={0}
                onClick={() => onSelect(mediaItem)}
                onKeyDown={handleKeyDown}
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                    cursor: "pointer",
                    overflow: "visible",

                    border:
                        "1px solid rgba(255, 255, 255, 0.08)",

                    background:
                        "linear-gradient(145deg, rgba(35,35,35,1), rgba(20,20,20,1))",

                    position: "relative",

                    transition:
                        "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",

                    willChange: "transform",

                    "&:hover": {
                        transform:
                            "translateY(-8px) scale(1.025)",

                        boxShadow:
                            "0 20px 35px rgba(0, 0, 0, 0.55)",

                        borderColor:
                            "rgba(255, 255, 255, 0.18)",

                        "& .media-image": {
                            transform: "scale(1.06)",
                        },

                        "& .card-glow": {
                            opacity: 1,
                        },
                    },

                    "&:focus-visible": {
                        outline:
                            "2px solid rgba(144, 202, 249, 0.9)",

                        outlineOffset: "4px",
                    },

                    "&:active": {
                        transform:
                            "translateY(-4px) scale(1.01)",
                    },
                }}
            >
                {/* Subtle glow */}
                <Box
                    className="card-glow"
                    sx={{
                        position: "absolute",
                        inset: -1,
                        borderRadius: "inherit",

                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.08), transparent 40%)",

                        opacity: 0,

                        transition: "opacity 0.3s ease",

                        pointerEvents: "none",

                        zIndex: 2,
                    }}
                />

                {/* Cover */}
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    {/* Image wrapper */}
                    <Box
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={mediaItem.coverImgUrl}
                            alt={mediaItem.title}
                            className="media-image"
                            sx={{
                                width: "100%",
                                aspectRatio: "2 / 3",
                                objectFit: "contain",
                                objectPosition: "center",
                                backgroundColor: "#181818",
                                display: "block",
                                transition:
                                    "transform 0.45s cubic-bezier(.2,.8,.2,1)",
                            }}
                        />

                        {/* Image gradient */}
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.45), transparent 45%)",
                                pointerEvents: "none",
                            }}
                        />
                    </Box>

                    {/* Community Rating */}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: -14,
                            left: 8,

                            width: 52,
                            height: 52,

                            borderRadius: "50%",

                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",

                            backgroundColor: "#181818",

                            border: `3px solid ${ratingColor}`,

                            boxShadow:
                                "0 4px 12px rgba(0, 0, 0, 0.6)",

                            zIndex: 3,
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
                                        color:
                                            "rgba(255, 255, 255, 0.5)",
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

                        position: "relative",
                        zIndex: 1,

                        display: "flex",
                        flexDirection: "column",

                        flexGrow: 1,

                        pt: 3,
                    }}
                >
                    {/* Title */}
                    <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{
                            lineHeight: 1.3,
                            overflowWrap: "anywhere",

                            transition: "color 0.2s ease",
                        }}
                    >
                        {mediaItem.title}
                    </Typography>


                    {/* Media Type + Release Date */}
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{
                            mt: 0.4,
                            fontSize: "0.8rem",
                        }}
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

                                mt: 1.25,
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

                                        color:
                                            "rgba(255, 255, 255, 0.6)",

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

                                fontSize: "0.7rem",

                                lineHeight: 1.5,

                                color:
                                    "rgba(255, 255, 255, 0.58)",
                            }}
                        >
                            {truncateDescription(
                                mediaItem.description
                            )}
                        </Typography>
                    )}


                    <Box
                        sx={{
                            display: "flex",

                            alignItems: "center",

                            justifyContent: "space-between",

                            gap: 0.75,

                            mt: "auto",

                            pt: 2,

                            color: "text.secondary",
                        }}
                    >
                        {/* Format */}
                        {mediaItem.format && (
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 0.75
                                }}
                            >
                                {isMovieOrTV && (
                                    <TheatersIcon
                                        sx={{
                                            fontSize: 18,
                                            opacity: 0.7,
                                        }}
                                    />
                                )}
                                {isMusic && (
                                    <AlbumIcon
                                        sx={{
                                            fontSize: 18,
                                            opacity: 0.7,
                                        }}
                                    />
                                )}
                                {isBook && (
                                    <AutoStoriesIcon
                                        sx={{
                                            fontSize: 18,
                                            opacity: 0.7,
                                        }}
                                    />
                                )}

                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 500,
                                    }}
                                >
                                    {mediaItem.format}
                                </Typography>
                            </Box>
                        ) || (
                            // Empty Box to keep formatting if mediaItem.format is null
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 0.75
                                }}
                            />
                        )}

                        {/* View Count */}
                        {isMovieOrTV && (
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 0.75
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
                        
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default LibraryMediaCard;