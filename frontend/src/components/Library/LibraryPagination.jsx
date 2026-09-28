import { alpha, styled } from "@mui/material/styles";
import {
    Box,
    FormControl,
    MenuItem,
    Pagination,
    Select,
    Typography,
} from "@mui/material";


const PageSizeSelect = styled(Select)(({ theme }) => ({
    minWidth: 72,

    height: 30,

    color: alpha(theme.palette.common.white, 0.75),

    fontSize: "0.7rem",

    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(
            theme.palette.common.white,
            0.10
        ),
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(
            theme.palette.primary.main,
            0.45
        ),
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
    },

    "& .MuiSelect-icon": {
        color: alpha(
            theme.palette.common.white,
            0.45
        ),
    },
}));


function LibraryPagination({
    page,
    pageCount,
    pageSize,
    totalItems,
    onPageChange,
    onPageSizeChange,
}) {
    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, totalItems);

    if (totalItems === 0) {
        return null;
    }

    return (
        <Box
            sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",

                gap: 2,

                mt: 2,
                px: 1,

                borderTop: "1px solid",
                borderColor: alpha(
                    theme.palette.common.white,
                    0.07
                ),

                pt: 1.5,
                pb: 1,

                flexWrap: "wrap",
            })}
        >
            {/* Page size */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <Typography
                    sx={{
                        color: "rgba(255,255,255,0.38)",
                        fontSize: "0.65rem",
                    }}
                >
                    Items per page
                </Typography>

                <FormControl size="small">
                    <PageSizeSelect
                        value={pageSize}
                        onChange={onPageSizeChange}
                        MenuProps={{
                            PaperProps: {
                                sx: (theme) => ({
                                    mt: 0.5,

                                    border: "1px solid",
                                    borderColor: alpha(
                                        theme.palette.common.white,
                                        0.09
                                    ),

                                    borderRadius: 1.5,

                                    background:
                                        "linear-gradient(145deg, #1c1c1c, #151515)",

                                    "& .MuiMenuItem-root": {
                                        fontSize: "0.7rem",
                                    },
                                }),
                            },
                        }}
                    >
                        <MenuItem value={10}>
                            10
                        </MenuItem>

                        <MenuItem value={25}>
                            25
                        </MenuItem>

                        <MenuItem value={50}>
                            50
                        </MenuItem>

                        <MenuItem value={100}>
                            100
                        </MenuItem>
                    </PageSizeSelect>
                </FormControl>
            </Box>

            <Typography>
                Showing {startItem}-{endItem} of {totalItems}
            </Typography>

            {/* Pagination */}
            <Pagination
                page={page}
                count={pageCount}
                onChange={(_, value) =>
                    onPageChange(value)
                }
                size="small"
                siblingCount={1}
                boundaryCount={1}
                sx={(theme) => ({
                    "& .MuiPaginationItem-root": {
                        minWidth: 30,
                        height: 30,

                        color: alpha(
                            theme.palette.common.white,
                            0.55
                        ),

                        borderRadius: 1,

                        fontSize: "0.7rem",
                    },

                    "& .MuiPaginationItem-root:hover": {
                        backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.08
                        ),

                        color:
                            theme.palette.common.white,
                    },

                    "& .Mui-selected": {
                        backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.16
                        ),

                        color:
                            theme.palette.common.white,

                        border: "1px solid",
                        borderColor: alpha(
                            theme.palette.primary.main,
                            0.45
                        ),

                        "&:hover": {
                            backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.20
                            ),
                        },
                    },

                    "& .MuiPaginationItem-ellipsis": {
                        color: alpha(
                            theme.palette.common.white,
                            0.3
                        ),
                    },
                })}
            />
        </Box>
    );
}

export default LibraryPagination;
