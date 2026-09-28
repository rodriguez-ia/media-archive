import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { formatGenre } from '../../utils/genreUtils';
import {
    mediaTypeOptions,
    formatOptions,
    genreOptions,
    statusOptions,
    mediaTypeFormatOptions,
    mediaTypeGenreOptions,
} from "../../utils/mediaOptions.js";
import {
    Box,
    Button,
    InputBase,
    Stack,
    Typography,
    Menu,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Popover,
} from '@mui/material';


const SearchField = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',

    width: '100%',
    minWidth: 0,

    border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
    borderRadius: 1.25,

    background: `
        linear-gradient(
            135deg,
            ${alpha(theme.palette.common.white, 0.065)},
            ${alpha(theme.palette.common.white, 0.025)}
        )
    `,

    transition: 'all 160ms ease',

    '&:hover': {
        borderColor: alpha(theme.palette.primary.main, 0.35),
        backgroundColor: alpha(theme.palette.common.white, 0.07),
    },

    '&:focus-within': {
        borderColor: theme.palette.primary.main,
        boxShadow: `
            0 0 0 1px ${alpha(theme.palette.primary.main, 0.18)},
            0 0 18px ${alpha(theme.palette.primary.main, 0.10)}
        `,
    },

    [theme.breakpoints.up('sm')]: {
        width: 220,
    },

    [theme.breakpoints.up('md')]: {
        width: 250,
    },
}));


const SearchIconWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    paddingLeft: theme.spacing(1.25),

    color: alpha(theme.palette.common.white, 0.5),

    '& svg': {
        fontSize: 17,
    },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    flex: 1,
    minWidth: 0,

    color: theme.palette.common.white,

    '& .MuiInputBase-input': {
        padding: theme.spacing(0.8, 1.1, 0.8, 0.7),
        fontSize: '0.76rem',

        '&::placeholder': {
            color: alpha(theme.palette.common.white, 0.42),
            opacity: 1,
        },
    },
}));


function ToolbarButton({
    icon,
    children,
    active = false,
    ...props
}) {
    return (
        <Button
            {...props}
            startIcon={icon}
            size="small"
            variant="outlined"
            sx={(theme) => ({
                position: 'relative',

                minHeight: 33,
                px: 1.2,

                borderRadius: 1,

                color: active
                    ? theme.palette.common.white
                    : alpha(theme.palette.common.white, 0.68),

                borderColor: active
                    ? alpha(theme.palette.primary.main, 0.5)
                    : alpha(theme.palette.common.white, 0.11),

                background: active
                    ? `linear-gradient(
                        135deg,
                        ${alpha(theme.palette.primary.main, 0.16)},
                        ${alpha(theme.palette.primary.main, 0.05)}
                    )`
                    : alpha(theme.palette.common.white, 0.025),

                fontSize: '0.73rem',
                fontWeight: 500,
                textTransform: 'none',

                transition: 'all 150ms ease',

                '& .MuiButton-startIcon': {
                    marginRight: 0.55,

                    color: active
                        ? theme.palette.primary.main
                        : alpha(theme.palette.common.white, 0.45),

                    '& svg': {
                        fontSize: 16,
                    },
                },

                '&:hover': {
                    color: theme.palette.common.white,

                    borderColor: alpha(
                        theme.palette.primary.main,
                        0.55
                    ),

                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        0.09
                    ),

                    boxShadow: `
                        0 0 12px ${alpha(
                            theme.palette.primary.main,
                            0.08
                        )}
                    `,

                    '& .MuiButton-startIcon': {
                        color: theme.palette.primary.main,
                    },
                },

                '&:active': {
                    transform: 'translateY(1px)',
                },

                '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2,
                },

                ...props.sx,
            })}
        >
            {children}
        </Button>
    );
}


const FilterSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1.25, 1.5),

    '& + &': {
        borderTop: `1px solid ${alpha(
            theme.palette.common.white,
            0.07
        )}`,
    },
}));


const FilterSectionTitle = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(0.8),

    color: alpha(theme.palette.common.white, 0.45),

    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
}));


function FilterOption({ label, selected, onClick }) {
    return (
        <Button
            size="small"
            onClick={onClick}
            variant="outlined"
            sx={(theme) => ({
                minWidth: 'auto',
                minHeight: 28,

                px: 1,

                borderRadius: 1,

                color: selected
                    ? theme.palette.common.white
                    : alpha(theme.palette.common.white, 0.58),

                borderColor: selected
                    ? alpha(theme.palette.primary.main, 0.55)
                    : alpha(theme.palette.common.white, 0.10),

                backgroundColor: selected
                    ? alpha(theme.palette.primary.main, 0.14)
                    : alpha(theme.palette.common.white, 0.025),

                fontSize: '0.68rem',
                fontWeight: selected ? 600 : 400,

                textTransform: 'none',

                transition: 'all 120ms ease',

                '&:hover': {
                    borderColor: alpha(
                        theme.palette.primary.main,
                        0.45
                    ),

                    backgroundColor: selected
                        ? alpha(theme.palette.primary.main, 0.18)
                        : alpha(theme.palette.primary.main, 0.07),

                    color: theme.palette.common.white,
                },
            })}
        >
            {label}
        </Button>
    );
}


function LibraryToolbar({
    selectionMode,
    selectedCount,
    onStartSelection,
    onCancelSelection,
    onDeleteSelected,
    deleting,
    onSearchChange,
    sortOption,
    sortDirection,
    onSortChange,
    filters,
    onFilterChange,
    onClearFilters,
}) {
    // Sort
    const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
    const sortMenuOpen = Boolean(sortMenuAnchor);

    const handleSortClick = (event) => {
        setSortMenuAnchor(event.currentTarget);
    };

    const handleSortClose = () => {
        setSortMenuAnchor(null);
    };

    // Filter
    const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
    const filterMenuOpen = Boolean(filterMenuAnchor);

    const handleFilterClick = (event) => {
        setFilterMenuAnchor(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterMenuAnchor(null);
    };

    const toggleFilterValue = (filterType, value) => {
        const currentValues = filters[filterType];

        const newValues = currentValues.includes(value)
            ? currentValues.filter((current) => current !== value)
            : [...currentValues, value];

        onFilterChange(filterType, newValues);
    };

    const availableFormats = (() => {
        if (filters.mediaTypes.length === 0) {
            return formatOptions;
        }

        const formats = new Set();

        filters.mediaTypes.forEach((mediaType) => {
            const mediaTypeFormats =
                mediaTypeFormatOptions[mediaType] ?? [];

            mediaTypeFormats.forEach((format) => {
                formats.add(format);
            });
        });

        return formatOptions.filter((format) => formats.has(format));
    })();

    const availableGenres = (() => {
        if (filters.mediaTypes.length === 0) {
            return genreOptions;
        }

        const genres = new Set();

        filters.mediaTypes.forEach((mediaType) => {
            const mediaTypeGenres = mediaTypeGenreOptions[mediaType] ?? [];

            mediaTypeGenres.forEach((genre) => {
                genres.add(genre);
            });
        });

        return genreOptions.filter((genre) => genres.has(genre));
    })();

    const activeFilterCount =
        filters.mediaTypes.length +
        filters.formats.length +
        filters.genres.length +
        filters.statuses.length;

    return (
        <Box
            sx={(theme) => ({
                position: 'sticky',
                top: 0,
                zIndex: 10,
                width: '100%',

                px: {
                    xs: 1.25,
                    sm: 1.75,
                    md: 2,
                },

                py: {
                    xs: 0.9,
                    sm: 0.8,
                },

                background: `
                    linear-gradient(
                        180deg,
                        #161616 0%,
                        #121212 100%
                    )
                `,

                borderBottom: '1px solid',
                borderColor: alpha(
                    theme.palette.common.white,
                    0.075
                ),

                // Extended atmospheric glow.
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,

                    width: {
                        xs: 270,
                        sm: 400,
                        md: 450,
                    },

                    height: '100%',
                    pointerEvents: 'none',

                    background: `
                        radial-gradient(
                            ellipse at left center,
                            ${alpha(
                                theme.palette.primary.main,
                                0.10
                            )} 0%,
                            ${alpha(
                                theme.palette.primary.main,
                                0.045
                            )} 35%,
                            transparent 78%
                        )
                    `,
                },

                // Accent rail underneath.
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: -1,

                    width: {
                        xs: 150,
                        sm: 230,
                        md: 300,
                    },

                    height: 2,

                    background: `
                        linear-gradient(
                            90deg,
                            ${theme.palette.primary.main},
                            ${alpha(
                                theme.palette.primary.main,
                                0.25
                            )},
                            transparent
                        )
                    `,

                    boxShadow: `
                        0 0 10px ${alpha(
                            theme.palette.primary.main,
                            0.35
                        )}
                    `,
                },
            })}
        >
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,

                    display: 'flex',
                    alignItems: 'center',

                    gap: 1,

                    minWidth: 0,

                    flexWrap: {
                        xs: 'wrap',
                        sm: 'nowrap',
                    },
                }}
            >
                {/* Controls */}
                <Stack
                    direction="row"
                    spacing={0.7}
                    sx={{
                        flexShrink: 0,
                        order: 1,
                    }}
                >
                    {!selectionMode ? (
                        <>
                            {/* Sort Button */ }
                            <ToolbarButton
                                icon={<SortIcon />}
                                active={sortOption !== "title" || sortDirection !== "asc"}
                                aria-label="Sort library"
                                onClick={handleSortClick}
                            >
                                Sort
                            </ToolbarButton>

                            {/* Sort Menu */}
                            <Menu
                                anchorEl={sortMenuAnchor}
                                open={sortMenuOpen}
                                onClose={handleSortClose}
                                slotProps={{
                                    paper: {
                                        sx: {
                                            mt: 1,
                                            minWidth: 210,
                                        },
                                    },
                                }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        onSortChange("title", "asc");
                                        handleSortClose();
                                    }}
                                >
                                    <ListItemText>Title</ListItemText>

                                    {sortOption === "title" && sortDirection === "asc" && (
                                        <ListItemIcon sx={{ minWidth: "auto" }}>
                                            <CheckIcon fontSize="small" />
                                        </ListItemIcon>
                                    )}
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                        onSortChange("personalRating", "desc");
                                        handleSortClose();
                                    }}
                                >
                                    <ListItemText>Personal Rating</ListItemText>

                                    {sortOption === "personalRating" && sortDirection === "desc" && (
                                        <ListItemIcon sx={{ minWidth: "auto" }}>
                                            <CheckIcon fontSize="small" />
                                        </ListItemIcon>
                                    )}
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                        onSortChange("communityRating", "desc");
                                        handleSortClose();
                                    }}
                                >
                                    <ListItemText>Community Rating</ListItemText>

                                    {sortOption === "communityRating" && sortDirection === "desc" && (
                                        <ListItemIcon sx={{ minWidth: "auto" }}>
                                            <CheckIcon fontSize="small" />
                                        </ListItemIcon>
                                    )}
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                        onSortChange("viewCount", "desc");
                                        handleSortClose();
                                    }}
                                >
                                    <ListItemText>View Count</ListItemText>

                                    {sortOption === "viewCount" && sortDirection === "desc" && (
                                        <ListItemIcon sx={{ minWidth: "auto" }}>
                                            <CheckIcon fontSize="small" />
                                        </ListItemIcon>
                                    )}
                                </MenuItem>
                            </Menu>

                            {/* Filter Button */}
                            <ToolbarButton
                                icon={<FilterListIcon />}
                                active={
                                    filters.mediaTypes.length > 0 ||
                                    filters.formats.length > 0 ||
                                    filters.genres.length > 0 ||
                                    filters.statuses.length > 0
                                }
                                aria-label="Filter library"
                                onClick={handleFilterClick}
                            >
                                Filter
                                {activeFilterCount > 0 && (
                                    <Box
                                        component="span"
                                        sx={(theme) => ({
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                            ml: 0.5,

                                            minWidth: 17,
                                            height: 17,
                                            px: 0.4,

                                            borderRadius: 0.75,

                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.2
                                            ),

                                            color: theme.palette.primary.main,

                                            fontSize: '0.58rem',
                                            fontWeight: 700,
                                        })}
                                    >
                                        {activeFilterCount}
                                    </Box>
                                )}
                            </ToolbarButton>

                            {/* Filter Popover */}
                            <Popover
                                anchorEl={filterMenuAnchor}
                                open={filterMenuOpen}
                                onClose={handleFilterClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                slotProps={{
                                    paper: {
                                        sx: {
                                            mt: 1,
                                            width: {
                                                xs: 'calc(100vw - 24px)',
                                                sm: 520,
                                            },

                                            maxWidth: 520,

                                            maxHeight: '75vh',

                                            overflow: 'hidden',

                                            border: '1px solid',
                                            borderColor: alpha(
                                                '#ffffff',
                                                0.09
                                            ),

                                            borderRadius: 1.5,

                                            background: `
                                                linear-gradient(
                                                    145deg,
                                                    #1c1c1c,
                                                    #151515
                                                )
                                            `,

                                            boxShadow: `
                                                0 12px 40px rgba(0,0,0,0.45),
                                                0 0 24px ${alpha(
                                                    '#000000',
                                                    0.25
                                                )}
                                            `,
                                        },
                                    },
                                }}
                            >
                                {/* Header */}
                                <Box
                                    sx={(theme) => ({
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',

                                        px: 1.75,
                                        py: 1.25,

                                        borderBottom: '1px solid',
                                        borderColor: alpha(
                                            theme.palette.common.white,
                                            0.08
                                        ),

                                        background: `
                                            linear-gradient(
                                                90deg,
                                                ${alpha(
                                                    theme.palette.primary.main,
                                                    0.09
                                                )},
                                                transparent
                                            )
                                        `,
                                    })}
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                color: 'rgba(255,255,255,0.92)',
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Filter Library
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 0.15,
                                                color: 'rgba(255,255,255,0.38)',
                                                fontSize: '0.65rem',
                                            }}
                                        >
                                            Refine your collection
                                        </Typography>
                                    </Box>

                                    <Button
                                        size="small"
                                        onClick={onClearFilters}
                                        disabled={
                                            filters.mediaTypes.length === 0 &&
                                            filters.formats.length === 0 &&
                                            filters.genres.length === 0 &&
                                            filters.statuses.length === 0
                                        }
                                        sx={{
                                            minWidth: 'auto',
                                            px: 0.8,

                                            color: 'text.secondary',

                                            fontSize: '0.65rem',
                                            textTransform: 'none',

                                            '&:hover': {
                                                color: 'text.primary',
                                            },
                                        }}
                                    >
                                        Clear all
                                    </Button>
                                </Box>

                                {/* Scrollable content */}
                                <Box
                                    sx={{
                                        maxHeight: 'calc(75vh - 70px)',
                                        overflowY: 'auto',

                                        '&::-webkit-scrollbar': {
                                            width: 5,
                                        },

                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: 'rgba(255,255,255,0.12)',
                                            borderRadius: 5,
                                        },
                                    }}
                                >
                                    {/* MEDIA TYPE */}
                                    <FilterSection>
                                        <FilterSectionTitle>
                                            Media Type
                                        </FilterSectionTitle>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 0.6,
                                            }}
                                        >
                                            {mediaTypeOptions.map((option) => (
                                                <FilterOption
                                                    key={option.value}
                                                    label={option.label}
                                                    selected={filters.mediaTypes.includes(
                                                        option.value
                                                    )}
                                                    onClick={() =>
                                                        toggleFilterValue(
                                                            "mediaTypes",
                                                            option.value
                                                        )
                                                    }
                                                />
                                            ))}
                                        </Box>
                                    </FilterSection>

                                    {/* FORMAT */}
                                    <FilterSection>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                justifyContent: 'space-between',
                                                mb: 0.8,
                                            }}
                                        >
                                            <FilterSectionTitle sx={{ mb: 0 }}>
                                                Format
                                            </FilterSectionTitle>

                                            {filters.mediaTypes.length > 0 && (
                                                <Typography
                                                    sx={{
                                                        color: 'rgba(255,255,255,0.3)',
                                                        fontSize: '0.58rem',
                                                    }}
                                                >
                                                    {availableFormats.length} available
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 0.6,
                                            }}
                                        >
                                            {availableFormats.map((format) => (
                                                <FilterOption
                                                    key={format}
                                                    label={format}
                                                    selected={filters.formats.includes(format)}
                                                    onClick={() =>
                                                        toggleFilterValue(
                                                            "formats",
                                                            format
                                                        )
                                                    }
                                                />
                                            ))}
                                        </Box>
                                    </FilterSection>

                                    {/* GENRE */}
                                    <FilterSection>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                justifyContent: 'space-between',
                                                mb: 0.8,
                                            }}
                                        >
                                            <FilterSectionTitle
                                                sx={{ mb: 0 }}
                                            >
                                                Genre
                                            </FilterSectionTitle>

                                            {filters.mediaTypes.length > 0 && (
                                                <Typography
                                                    sx={{
                                                        color: 'rgba(255,255,255,0.3)',
                                                        fontSize: '0.58rem',
                                                    }}
                                                >
                                                    {availableGenres.length} available
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 0.55,

                                                maxHeight: 190,
                                                overflowY: 'auto',

                                                pr: 0.5,

                                                '&::-webkit-scrollbar': {
                                                    width: 4,
                                                },

                                                '&::-webkit-scrollbar-thumb': {
                                                    backgroundColor:
                                                        'rgba(255,255,255,0.10)',
                                                    borderRadius: 4,
                                                },
                                            }}
                                        >
                                            {availableGenres.map((genre) => (
                                                <FilterOption
                                                    key={genre}
                                                    label={formatGenre(genre)}
                                                    selected={filters.genres.includes(genre)}
                                                    onClick={() =>
                                                        toggleFilterValue(
                                                            "genres",
                                                            genre
                                                        )
                                                    }
                                                />
                                            ))}
                                        </Box>
                                    </FilterSection>

                                    {/* STATUS */}
                                    <FilterSection>
                                        <FilterSectionTitle>
                                            Status
                                        </FilterSectionTitle>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 0.6,
                                            }}
                                        >
                                            {statusOptions.map((option) => (
                                                <FilterOption
                                                    key={option.value}
                                                    label={option.label}
                                                    selected={filters.statuses.includes(
                                                        option.value
                                                    )}
                                                    onClick={() =>
                                                        toggleFilterValue(
                                                            "statuses",
                                                            option.value
                                                        )
                                                    }
                                                />
                                            ))}
                                        </Box>
                                    </FilterSection>
                                </Box>
                            </Popover>

                            <ToolbarButton
                                icon={
                                    <CheckBoxOutlineBlankOutlinedIcon />
                                }
                                aria-label="Select media"
                                onClick={onStartSelection}
                            >
                                Select
                            </ToolbarButton>
                        </>
                    ) : (
                        <>
                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    px: 1,
                                    color: 'rgba(255,255,255,0.68)',
                                    fontSize: '0.75rem',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {selectedCount} selected
                            </Typography>

                            <ToolbarButton
                                icon={<CloseOutlinedIcon />}
                                aria-label="Cancel selection"
                                onClick={onCancelSelection}
                            >
                                Cancel
                            </ToolbarButton>

                            <ToolbarButton
                                icon={<DeleteOutlinedIcon />}
                                aria-label="Delete selected media"
                                onClick={onDeleteSelected}
                                disabled={
                                    selectedCount === 0 || deleting
                                }
                                sx={(theme) => ({
                                    '&:hover': {
                                        borderColor:
                                            'rgba(239, 83, 80, 0.5)',

                                        backgroundColor:
                                            'rgba(239, 83, 80, 0.08)',

                                        '& .MuiButton-startIcon': {
                                            color: '#ef5350',
                                        },
                                    },
                                })}
                            >
                                Delete
                            </ToolbarButton>
                        </>
                    )}
                </Stack>

                {/* Title */}
                <Box
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'flex',
                        },

                        alignItems: 'center',

                        // Let this area use the space between
                        // controls and search.
                        flex: '1 1 auto',
                        minWidth: 0,

                        order: 2,
                    }}
                >
                    {/* Accent dot */}
                    <Box
                        sx={(theme) => ({
                            width: 5,
                            height: 5,

                            mr: 0.8,

                            flexShrink: 0,

                            borderRadius: '50%',

                            backgroundColor:
                                theme.palette.primary.main,

                            boxShadow: `0 0 8px ${alpha(
                                theme.palette.primary.main,
                                0.7
                            )}`,
                        })}
                    />

                    <Typography
                        noWrap
                        sx={{
                            minWidth: 0,

                            color: 'rgba(255,255,255,0.78)',
                            fontSize: '0.78rem',
                            fontWeight: 500,
                            letterSpacing: '0.015em',

                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        Media Library
                    </Typography>
                </Box>

                {/* Search */}
                <SearchField
                    sx={{
                        order: 3,

                        flex: '0 0 auto',

                        width: {
                            xs: '100%',
                            sm: 220,
                            md: 250,
                        },

                        maxWidth: '100%',

                        // On mobile it gets its own row.
                        mt: {
                            xs: 0.5,
                            sm: 0,
                        },
                    }}
                >
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>

                    <StyledInputBase
                        placeholder="Search library..."
                        onChange={(event) => onSearchChange(event.target.value)}
                    />
                </SearchField>
            </Box>
        </Box>
    );
}


export default LibraryToolbar;
