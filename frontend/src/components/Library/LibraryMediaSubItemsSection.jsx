import { useState, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import {
    fetchSubItemMedia,
    getMusicTrackDetails,
} from "../../services/mediaService.js";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    CardMedia,
    CircularProgress,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";

/*
 * Used by the LibraryMediaModal for:
 *
 * TV_SHOW
 *     -> TV_SEASON
 *         -> TV_EPISODE
 *
 * MUSIC_ALBUM
 *     -> MUSIC_TRACK
 */
function LibraryMediaSubItemsSection({
    mediaItem,
    sectionLabel,
    itemType,
    emptyMessage,
}) {
    const [expanded, setExpanded] = useState(false);

    /*
     * null = we have not loaded the sub-items yet.
     *
     * Once sub-items are loaded, they remain here even when
     * the accordion is collapsed. Re-opening therefore does
     * not trigger another API request.
     */
    const [subItems, setSubItems] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAccordionChange = async (_, isExpanded) => {
        setExpanded(isExpanded);

        // Only load the data the first time the section is opened.
        if (!isExpanded || subItems !== null) {
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const result = await fetchSubItemMedia(mediaItem.externalId);

            setSubItems(result.data ?? []);
        } catch (err) {
            console.error(
                "Failed to load child media:",
                err
            );

            setError("Unable to load related media.");
        } finally {
            setIsLoading(false);
        }
    };

    const isTrackList = itemType === "MUSIC_TRACK";

    return (
        <Accordion
            expanded={expanded}
            onChange={handleAccordionChange}
            disableGutters
            sx={{
                backgroundColor:
                    "rgba(255,255,255,0.025)",

                border:
                    "1px solid rgba(255,255,255,0.08)",

                borderRadius: 2,

                "&:before": {
                    display: "none",
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography fontWeight={700}>
                    {sectionLabel}
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                {isLoading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            py: 3,
                        }}
                    >
                        <CircularProgress size={28} />
                    </Box>
                )}

                {error && (
                    <Typography
                        color="error"
                        sx={{ py: 1 }}
                    >
                        {error}
                    </Typography>
                )}

                {!isLoading &&
                    !error &&
                    subItems &&
                    subItems.length === 0 && (
                        <Typography
                            color="text.secondary"
                            sx={{ py: 1 }}
                        >
                            {emptyMessage}
                        </Typography>
                    )}

                {!isLoading &&
                    !error &&
                    subItems &&
                    subItems.length > 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            {subItems.map((subItem) =>
                                isTrackList ? (
                                    <TrackRow
                                        key={subItem.externalId}
                                        track={subItem}
                                    />
                                ) : (
                                    <SeasonAccordion
                                        key={subItem.externalId}
                                        season={subItem}
                                    />
                                )
                            )}
                        </Box>
                    )}
            </AccordionDetails>
        </Accordion>
    );
}

/*
 * A TV season is itself expandable because its sub-items
 * are TV_EPISODE objects.
 */
function SeasonAccordion({ season }) {
    const [expanded, setExpanded] = useState(false);
    const [episodes, setEpisodes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAccordionChange = async (_, isExpanded) => {
        setExpanded(isExpanded);

        // Only fetch episodes the first time.
        if (!isExpanded || episodes !== null) {
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const result = await fetchSubItemMedia(season.externalId);

            setEpisodes(result.data ?? []);
        } catch (err) {
            console.error(
                "Failed to load episodes:",
                err
            );

            setError("Unable to load episodes.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Accordion
            expanded={expanded}
            onChange={handleAccordionChange}
            disableGutters
            sx={{
                backgroundColor:
                    "rgba(255,255,255,0.02)",

                border:
                    "1px solid rgba(255,255,255,0.06)",

                borderRadius: 1.5,

                "&:before": {
                    display: "none",
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >
                    {season.coverImgUrl && (
                        <CardMedia
                            component="img"
                            image={season.coverImgUrl}
                            alt={season.title}
                            sx={{
                                width: 45,
                                height: 65,
                                objectFit: "cover",
                                borderRadius: 1,
                                flexShrink: 0,
                            }}
                        />
                    )}

                    <Box>
                        <Typography fontWeight={600}>
                            {season.title}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Season {season.sortOrder}
                        </Typography>
                    </Box>
                </Box>
            </AccordionSummary>

            <AccordionDetails>
                {isLoading && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            py: 2,
                        }}
                    >
                        <CircularProgress size={24} />
                    </Box>
                )}

                {error && (
                    <Typography
                        color="error"
                        sx={{ py: 1 }}
                    >
                        {error}
                    </Typography>
                )}

                {!isLoading &&
                    !error &&
                    episodes &&
                    episodes.length === 0 && (
                        <Typography
                            color="text.secondary"
                        >
                            No episodes found.
                        </Typography>
                    )}

                {!isLoading &&
                    !error &&
                    episodes &&
                    episodes.length > 0 && (
                        <Box>
                            {episodes.map((episode) => (
                                <EpisodeRow
                                    key={episode.externalId}
                                    episode={episode}
                                />
                            ))}
                        </Box>
                    )}
            </AccordionDetails>
        </Accordion>
    );
}

function EpisodeRow({ episode }) {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                py: 1.5,

                borderBottom:
                    "1px solid rgba(255,255,255,0.06)",
            }}
        >
            {episode.coverImgUrl && (
                <CardMedia
                    component="img"
                    image={episode.coverImgUrl}
                    alt={episode.title}
                    sx={{
                        width: 140,
                        height: 79,
                        objectFit: "cover",
                        borderRadius: 1,
                        flexShrink: 0,
                    }}
                />
            )}

            <Box
                sx={{
                    minWidth: 0,
                    flex: 1,
                }}
            >
                {/* Episode number */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Episode {episode.sortOrder}
                </Typography>

                {/* Episode title */}
                <Typography
                    fontWeight={600}
                    sx={{
                        mt: 0.25,
                    }}
                >
                    {episode.title}
                </Typography>

                {/* Air date */}
                {episode.releaseDate && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.25,
                        }}
                    >
                        {episode.releaseDate}
                    </Typography>
                )}

                {/* Description */}
                {episode.description && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.5,
                            lineHeight: 1.4,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {episode.description}
                    </Typography>
                )}

                {/* Rating */}
                <CollectionRating
                    rating={episode.communityRating}
                />
            </Box>
        </Box>
    );
}

function TrackRow({ track }) {
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const [previewError, setPreviewError] = useState(null);

    const handlePlayPause = async () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            return;
        }

        if (!track.externalId) {
            return;
        }

        try {
            setIsLoadingPreview(true);
            setPreviewError(null);

            /*
             * Fetch the track details so we receive a fresh
             * temporary preview URL from the backend.
             */
            const result = await getMusicTrackDetails(track.externalId);

            const freshTrack = result.data;

            if (!freshTrack?.preview) {
                throw new Error(
                    "No preview is available for this track."
                );
            }

            /*
             * The preview URL is temporary, so it is only
             * assigned to the audio element for playback.
             * It is not persisted.
             */
            audioRef.current.src = freshTrack.preview;

            await audioRef.current.play();

            setIsPlaying(true);
        } catch (err) {
            console.error(
                "Failed to play track preview:",
                err
            );

            setPreviewError(
                "Unable to play track preview."
            );
        } finally {
            setIsLoadingPreview(false);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 1,
                }}
            >
                <IconButton
                    onClick={handlePlayPause}
                    disabled={isLoadingPreview}
                    size="small"
                    aria-label={
                        isPlaying
                            ? `Pause ${track.title}`
                            : `Play ${track.title} preview`
                    }
                >
                    {isPlaying ? (
                        <PauseIcon />
                    ) : (
                        <PlayArrowIcon />
                    )}
                </IconButton>

                <Typography
                    color="text.secondary"
                    sx={{
                        width: 28,
                        textAlign: "right",
                    }}
                >
                    {track.sortOrder}
                </Typography>

                <Box sx={{ flexGrow: 1 }}>
                    <Typography fontWeight={600}>
                        {track.title}
                    </Typography>

                    {previewError && (
                        <Typography
                            variant="caption"
                            color="error"
                        >
                            {previewError}
                        </Typography>
                    )}
                </Box>

                <CollectionRating
                    rating={track.communityRating}
                />

                <audio
                    ref={audioRef}
                    onEnded={handleEnded}
                    preload="none"
                />
            </Box>

            <Divider
                sx={{
                    borderColor:
                        "rgba(255,255,255,0.06)",
                }}
            />
        </Box>
    );
}

function CollectionRating({ rating }) {
    if (rating == null) {
        return null;
    }

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mt: 0.5,
            }}
        >
            <StarIcon
                sx={{
                    fontSize: 17,
                    color: "#ffca28",
                }}
            />

            <Typography variant="body2">
                {Number(rating).toFixed(1)}
            </Typography>
        </Box>
    );
}

export default LibraryMediaSubItemsSection;
