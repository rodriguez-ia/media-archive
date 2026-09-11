import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { formatGenre, getGenreSx } from "../../utils/genreUtils.js";
import {
    CardMedia,
    Typography,
    Box,
    Modal,
    IconButton,
    Divider,
    Fade,
    Chip,
    TextField,
    MenuItem,
    Button,
} from "@mui/material";

function LibraryMediaModal({
    open,
    onClose,
    mediaItem,
    onUpdate,
}) {
    const [isEditing, setIsEditing] = useState(false);

    const [editValues, setEditValues] = useState({
        viewCount: 0,
        personalRating: "",
        purchaseDate: "",
        purchasePrice: "",
        status: "OWNED",
        format: "",
        condition: "",
        notes: "",
    });

    useEffect(() => {
        if (mediaItem) {
            setEditValues({
                viewCount:
                    mediaItem.consumptionCount ?? 0,

                personalRating:
                    mediaItem.personalRating ?? "",

                purchaseDate:
                    mediaItem.purchaseDate ?? "",

                purchasePrice:
                    mediaItem.purchasePrice ?? "",

                status:
                    mediaItem.status ?? "OWNED",

                format:
                    mediaItem.format ?? "",

                condition:
                    mediaItem.condition ?? "",

                notes:
                    mediaItem.notes ?? "",
            });
        }

        setIsEditing(false);
    }, [mediaItem, open]);

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
        if (mediaItem.communityRating >= 7) {
            ratingColor = "#66bb6a";
        } else if (mediaItem.communityRating >= 6) {
            ratingColor = "#ffca28";
        } else {
            ratingColor = "#ef5350";
        }
    }

    const shouldShowViewCount =
        mediaItem.mediaType === "MOVIE" ||
        mediaItem.mediaType === "TV_SHOW";

    const handleEditChange = (field) => (event) => {
        setEditValues((current) => ({
            ...current,
            [field]: event.target.value,
        }));
    };

    const resetEditValues = () => {
        setEditValues({
            viewCount:
                mediaItem.consumptionCount ?? 0,

            personalRating:
                mediaItem.personalRating ?? "",

            purchaseDate:
                mediaItem.purchaseDate ?? "",

            purchasePrice:
                mediaItem.purchasePrice ?? "",

            status:
                mediaItem.status ?? "OWNED",

            format:
                mediaItem.format ?? "",

            condition:
                mediaItem.condition ?? "",

            notes:
                mediaItem.notes ?? "",
        });
    };

    const handleEdit = () => {
        resetEditValues();
        setIsEditing(true);
    };

    const handleCancel = () => {
        resetEditValues();
        setIsEditing(false);
    };

    const handleSave = () => {
        const updatedMediaItem = {
            consumptionCount:
                editValues.viewCount === ""
                    ? 0
                    : Number(editValues.viewCount),

            personalRating:
                editValues.personalRating === ""
                    ? null
                    : editValues.personalRating,

            purchaseDate:
                editValues.purchaseDate === ""
                    ? null
                    : editValues.purchaseDate,

            purchasePrice:
                editValues.purchasePrice === ""
                    ? null
                    : editValues.purchasePrice,

            status:
                editValues.status || null,

            format:
                editValues.format.trim() || null,

            condition:
                editValues.condition.trim() || null,

            notes:
                editValues.notes.trim() || null,
        };

        if (onUpdate) {
            onUpdate(mediaItem.externalId, updatedMediaItem);
        }

        setIsEditing(false);
    };

    const formatPrice = (price) => {
        if (price == null || price === "") {
            return "—";
        }

        const numericPrice = Number(price);

        if (Number.isNaN(numericPrice)) {
            return price;
        }

        return `$${numericPrice.toFixed(2)}`;
    };

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
                            sm: 700,
                            md: 750,
                        },

                        /*
                         * Fixed modal height.
                         *
                         * The modal itself never scrolls.
                         * Any required scrolling happens inside
                         * the collection section or notes.
                         */
                        height: {
                            xs: "88vh",
                            sm: 760,
                        },

                        maxHeight: "88vh",

                        overflow: "hidden",

                        display: "flex",
                        flexDirection: "column",

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

                            zIndex: 10,

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

                    {/* ====================================================== */}
                    {/* MAIN CONTENT                                            */}
                    {/* ====================================================== */}
                    <Box
                        sx={{
                            display: "flex",

                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },

                            gap: 3,

                            p: 3,

                            flex: 1,

                            minHeight: 0,

                            overflow: "hidden",
                        }}
                    >
                        {/* ================================================== */}
                        {/* COVER                                               */}
                        {/* ================================================== */}
                        <Box
                            sx={{
                                flexShrink: 0,

                                width: {
                                    xs: 160,
                                    sm: 220,
                                },

                                /*
                                 * Keep the poster at its natural
                                 * 2:3 aspect ratio.
                                 *
                                 * Do NOT use height: "100%" here.
                                 */
                                aspectRatio: "2 / 3",

                                alignSelf: {
                                    xs: "center",
                                    sm: "flex-start",
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={mediaItem.coverImgUrl}
                                alt={mediaItem.title}
                                sx={{
                                    display: "block",

                                    width: "100%",

                                    height: "auto",

                                    aspectRatio: "2 / 3",

                                    objectFit: "contain",

                                    borderRadius: 2,

                                    boxShadow:
                                        "0 15px 35px rgba(0,0,0,0.6)",
                                }}
                            />
                        </Box>

                        {/* ================================================== */}
                        {/* DETAILS                                             */}
                        {/* ================================================== */}
                        <Box
                            sx={{
                                flexGrow: 1,

                                minWidth: 0,
                                minHeight: 0,

                                display: "flex",
                                flexDirection: "column",

                                overflow: "hidden",
                            }}
                        >
                            {/* ================================================== */}
                            {/* HEADER                                               */}
                            {/* ================================================== */}
                            <Box
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    fontWeight={700}
                                    sx={{
                                        pr: 5,

                                        fontSize: {
                                            xs: "1.5rem",
                                            sm: "2rem",
                                        },

                                        lineHeight: 1.15,
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

                                {/* Community Rating */}
                                <Box
                                    sx={{
                                        display: "flex",

                                        alignItems: "center",

                                        gap: 1,

                                        mb: 1.5,
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

                                {/* Genres */}
                                {genres.length > 0 && (
                                    <Box
                                        sx={{
                                            display: "flex",

                                            flexWrap: "wrap",

                                            gap: 0.75,

                                            mb: 1.5,
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
                            </Box>

                            {/* ================================================== */}
                            {/* DESCRIPTION                                         */}
                            {/* ================================================== */}
                            {mediaItem.description && (
                                <Box
                                    sx={{
                                        flexShrink: 0,

                                        maxHeight: {
                                            xs: 110,
                                            sm: 155,
                                        },

                                        overflow: "hidden",

                                        mb: 1,
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            lineHeight: 1.65,

                                            color:
                                                "rgba(255,255,255,0.72)",

                                            display:
                                                "-webkit-box",

                                            WebkitBoxOrient:
                                                "vertical",

                                            WebkitLineClamp: {
                                                xs: 5,
                                                sm: 6,
                                            },

                                            overflow: "hidden",
                                        }}
                                    >
                                        {mediaItem.description}
                                    </Typography>
                                </Box>
                            )}

                            {/* ================================================== */}
                            {/* COLLECTION DETAILS                                  */}
                            {/* ================================================== */}
                            <Box
                                sx={{
                                    mt: 1,

                                    pt: 2,

                                    minHeight: 0,

                                    /*
                                     * Give this section the remaining
                                     * vertical space.
                                     */
                                    flex: "1 1 0",

                                    display: "flex",
                                    flexDirection: "column",

                                    borderTop:
                                        "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                {/* Collection Header */}
                                <Box
                                    sx={{
                                        display: "flex",

                                        alignItems: "center",

                                        justifyContent:
                                            "space-between",

                                        gap: 2,

                                        flexShrink: 0,

                                        mb: 1.5,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                    >
                                        Collection Details
                                    </Typography>

                                    {!isEditing ? (
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            startIcon={
                                                <EditIcon />
                                            }
                                            onClick={handleEdit}
                                            sx={{
                                                textTransform:
                                                    "none",

                                                flexShrink: 0,
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    ) : (
                                        <Box
                                            sx={{
                                                display: "flex",

                                                gap: 1,

                                                flexShrink: 0,
                                            }}
                                        >
                                            <Button
                                                size="small"
                                                startIcon={
                                                    <CancelIcon />
                                                }
                                                onClick={
                                                    handleCancel
                                                }
                                                sx={{
                                                    textTransform:
                                                        "none",
                                                }}
                                            >
                                                Cancel
                                            </Button>

                                            <Button
                                                size="small"
                                                variant="contained"
                                                startIcon={
                                                    <SaveIcon />
                                                }
                                                onClick={
                                                    handleSave
                                                }
                                                sx={{
                                                    textTransform:
                                                        "none",
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </Box>
                                    )}
                                </Box>

                                {/* ================================================== */}
                                {/* COLLECTION CONTENT                                  */}
                                {/* ================================================== */}
                                <Box
                                    sx={{
                                        flex: 1,

                                        minHeight: 0,

                                        overflowY: "auto",

                                        overflowX: "hidden",

                                        /*
                                         * Important:
                                         * Floating MUI labels need some
                                         * space above them. Without this,
                                         * the first row's labels can be
                                         * clipped by the scroll container.
                                         */
                                        pt: 1,

                                        pr: 0.5,

                                        pb: 1,

                                        "&::-webkit-scrollbar": {
                                            width: 6,
                                        },

                                        "&::-webkit-scrollbar-track": {
                                            background:
                                                "transparent",
                                        },

                                        "&::-webkit-scrollbar-thumb": {
                                            backgroundColor:
                                                "rgba(255,255,255,0.18)",

                                            borderRadius: 3,
                                        },

                                        "&::-webkit-scrollbar-thumb:hover":
                                            {
                                                backgroundColor:
                                                    "rgba(255,255,255,0.3)",
                                            },
                                    }}
                                >
                                    {isEditing ? (
                                        <Box
                                            sx={{
                                                display: "grid",

                                                gridTemplateColumns: {
                                                    xs: "1fr",
                                                    sm: "1fr 1fr",
                                                },

                                                gap: 2,
                                            }}
                                        >
                                            {/* ========================================== */}
                                            {/* VIEW COUNT                                 */}
                                            {/* ========================================== */}
                                            {shouldShowViewCount && (
                                                <TextField
                                                    label="View Count"
                                                    type="number"
                                                    value={
                                                        editValues.viewCount
                                                    }
                                                    onChange={handleEditChange(
                                                        "viewCount"
                                                    )}
                                                    inputProps={{
                                                        min: 0,
                                                        step: 1,
                                                    }}
                                                    fullWidth
                                                />
                                            )}

                                            {/* ========================================== */}
                                            {/* PERSONAL RATING                           */}
                                            {/* ========================================== */}
                                            <TextField
                                                label="Personal Rating"
                                                type="number"
                                                value={
                                                    editValues.personalRating
                                                }
                                                onChange={handleEditChange(
                                                    "personalRating"
                                                )}
                                                inputProps={{
                                                    min: 0,
                                                    max: 10,
                                                    step: 0.1,
                                                }}
                                                fullWidth
                                            />

                                            {/* ========================================== */}
                                            {/* PURCHASE DATE                             */}
                                            {/* ========================================== */}
                                            <TextField
                                                label="Purchase Date"
                                                type="date"
                                                value={editValues.purchaseDate}
                                                onChange={handleEditChange("purchaseDate")}
                                                fullWidth
                                                slotProps={{
                                                    inputLabel: {
                                                        shrink: true,
                                                        sx: {
                                                            backgroundColor: "#181818",
                                                            px: 0.5,
                                                        },
                                                    },
                                                }}
                                            />

                                            {/* ========================================== */}
                                            {/* PURCHASE PRICE                            */}
                                            {/* ========================================== */}
                                            <TextField
                                                label="Purchase Price"
                                                type="number"
                                                value={
                                                    editValues.purchasePrice
                                                }
                                                onChange={handleEditChange(
                                                    "purchasePrice"
                                                )}
                                                inputProps={{
                                                    min: 0,
                                                    step: 0.01,
                                                }}
                                                fullWidth
                                            />

                                            {/* ========================================== */}
                                            {/* COLLECTION STATUS                         */}
                                            {/* ========================================== */}
                                            <TextField
                                                select
                                                label="Collection Status"
                                                value={
                                                    editValues.status
                                                }
                                                onChange={handleEditChange(
                                                    "status"
                                                )}
                                                fullWidth
                                            >
                                                <MenuItem value="OWNED">
                                                    Owned
                                                </MenuItem>

                                                <MenuItem value="WISHLISTED">
                                                    Wishlisted
                                                </MenuItem>
                                            </TextField>

                                            {/* ========================================== */}
                                            {/* FORMAT                                    */}
                                            {/* ========================================== */}
                                            <TextField
                                                label="Format"
                                                value={
                                                    editValues.format
                                                }
                                                onChange={handleEditChange(
                                                    "format"
                                                )}
                                                inputProps={{
                                                    maxLength: 50,
                                                }}
                                                fullWidth
                                            />

                                            {/* ========================================== */}
                                            {/* CONDITION                                 */}
                                            {/* ========================================== */}
                                            <TextField
                                                label="Condition"
                                                value={
                                                    editValues.condition
                                                }
                                                onChange={handleEditChange(
                                                    "condition"
                                                )}
                                                inputProps={{
                                                    maxLength: 50,
                                                }}
                                                fullWidth
                                            />

                                            {/* ========================================== */}
                                            {/* NOTES                                     */}
                                            {/* ========================================== */}
                                            <TextField
                                                label="Notes"
                                                value={
                                                    editValues.notes
                                                }
                                                onChange={handleEditChange(
                                                    "notes"
                                                )}
                                                multiline
                                                minRows={3}
                                                maxRows={5}
                                                fullWidth
                                                sx={{
                                                    gridColumn: {
                                                        xs: "auto",
                                                        sm: "1 / -1",
                                                    },
                                                }}
                                            />
                                        </Box>
                                    ) : (
                                        <Box
                                            sx={{
                                                display: "grid",

                                                gridTemplateColumns: {
                                                    xs: "1fr",
                                                    sm: "1fr 1fr",
                                                },

                                                gap: 1.5,

                                                pb: 1,
                                            }}
                                        >
                                            {/* ========================================== */}
                                            {/* VIEW COUNT                                 */}
                                            {/* ========================================== */}
                                            {shouldShowViewCount && (
                                                <CollectionDetail
                                                    icon={
                                                        <VisibilityIcon
                                                            sx={{
                                                                fontSize: 20,
                                                            }}
                                                        />
                                                    }
                                                    label="View Count"
                                                    value={
                                                        mediaItem.consumptionCount ??
                                                        0
                                                    }
                                                />
                                            )}

                                            {/* ========================================== */}
                                            {/* PERSONAL RATING                           */}
                                            {/* ========================================== */}
                                            <CollectionDetail
                                                icon={
                                                    <StarIcon
                                                        sx={{
                                                            fontSize: 20,

                                                            color:
                                                                "#ffca28",
                                                        }}
                                                    />
                                                }
                                                label="Personal Rating"
                                                value={
                                                    mediaItem.personalRating !=
                                                    null
                                                        ? `${Number(
                                                            mediaItem.personalRating
                                                        ).toFixed(
                                                            1
                                                        )} / 10`
                                                        : "—"
                                                }
                                            />

                                            {/* ========================================== */}
                                            {/* PURCHASE DATE                             */}
                                            {/* ========================================== */}
                                            <CollectionDetail
                                                icon={
                                                    <CalendarTodayIcon
                                                        sx={{
                                                            fontSize: 19,
                                                        }}
                                                    />
                                                }
                                                label="Purchase Date"
                                                value={
                                                    mediaItem.purchaseDate ||
                                                    "—"
                                                }
                                            />

                                            {/* ========================================== */}
                                            {/* PURCHASE PRICE                            */}
                                            {/* ========================================== */}
                                            <CollectionDetail
                                                icon={
                                                    <AttachMoneyIcon
                                                        sx={{
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                }
                                                label="Purchase Price"
                                                value={formatPrice(
                                                    mediaItem.purchasePrice
                                                )}
                                            />

                                            {/* ========================================== */}
                                            {/* COLLECTION STATUS                         */}
                                            {/* ========================================== */}
                                            <CollectionDetail
                                                icon={
                                                    <BookmarkIcon
                                                        sx={{
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                }
                                                label="Collection Status"
                                                value={
                                                    mediaItem.status ===
                                                    "OWNED"
                                                        ? "Owned"
                                                        : mediaItem.status ===
                                                            "WISHLISTED"
                                                          ? "Wishlisted"
                                                          : "—"
                                                }
                                            />

                                            {/* ========================================== */}
                                            {/* FORMAT                                    */}
                                            {/* ========================================== */}
                                            <CollectionDetail
                                                icon={
                                                    <LocalOfferIcon
                                                        sx={{
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                }
                                                label="Format"
                                                value={
                                                    mediaItem.format ||
                                                    "—"
                                                }
                                            />

                                            {/* ========================================== */}
                                            {/* CONDITION                                 */}
                                            {/* ========================================== */}
                                            <CollectionDetail
                                                icon={
                                                    <InfoOutlinedIcon
                                                        sx={{
                                                            fontSize: 20,
                                                        }}
                                                    />
                                                }
                                                label="Condition"
                                                value={
                                                    mediaItem.condition ||
                                                    "—"
                                                }
                                            />

                                            {/* ========================================== */}
                                            {/* NOTES                                     */}
                                            {/* ========================================== */}
                                            <Box
                                                sx={{
                                                    gridColumn: {
                                                        xs: "auto",
                                                        sm: "1 / -1",
                                                    },

                                                    minWidth: 0,

                                                    mt: 0.5,
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Notes
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        mt: 0.5,

                                                        maxHeight: {
                                                            xs: 70,
                                                            sm: 90,
                                                        },

                                                        overflowY:
                                                            "auto",

                                                        pr: 0.5,

                                                        "&::-webkit-scrollbar":
                                                            {
                                                                width: 5,
                                                            },

                                                        "&::-webkit-scrollbar-track":
                                                            {
                                                                background:
                                                                    "transparent",
                                                            },

                                                        "&::-webkit-scrollbar-thumb":
                                                            {
                                                                backgroundColor:
                                                                    "rgba(255,255,255,0.18)",

                                                                borderRadius: 3,
                                                            },

                                                        "&::-webkit-scrollbar-thumb:hover":
                                                            {
                                                                backgroundColor:
                                                                    "rgba(255,255,255,0.3)",
                                                            },
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            lineHeight:
                                                                1.6,

                                                            color:
                                                                mediaItem.notes
                                                                    ? "rgba(255,255,255,0.72)"
                                                                    : "text.secondary",

                                                            whiteSpace:
                                                                "pre-line",

                                                            overflowWrap:
                                                                "anywhere",
                                                        }}
                                                    >
                                                        {mediaItem.notes ||
                                                            "—"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

/**
 * Read-only collection field.
 */
function CollectionDetail({
    icon,
    label,
    value,
}) {
    return (
        <Box
            sx={{
                display: "flex",

                alignItems: "center",

                gap: 1,

                minWidth: 0,

                color: "text.secondary",
            }}
        >
            {icon}

            <Box
                sx={{
                    minWidth: 0,
                }}
            >
                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {label}
                </Typography>

                <Typography
                    fontWeight={600}
                    color={
                        value === "—"
                            ? "text.secondary"
                            : "text.primary"
                    }
                    sx={{
                        overflowWrap: "anywhere",
                    }}
                >
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}

export default LibraryMediaModal;
