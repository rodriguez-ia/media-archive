import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckIcon from '@mui/icons-material/Check';
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
}) {
    const [sortMenuAnchor, setSortMenuAnchor] = useState(null);

    const sortMenuOpen = Boolean(sortMenuAnchor);

    const handleSortClick = (event) => {
        setSortMenuAnchor(event.currentTarget);
    };

    const handleSortClose = () => {
        setSortMenuAnchor(null);
    };

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

                            <ToolbarButton
                                icon={<FilterListIcon />}
                                active
                                aria-label="Filter library"
                            >
                                Filter
                            </ToolbarButton>

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
