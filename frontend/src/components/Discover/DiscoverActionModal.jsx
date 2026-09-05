import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";

function DiscoverActionModal({
    open,
    action,
    itemCount,
    status,
    errorMessage,
    onClose,
    onConfirm,
    onContinueAdding,
    onGoToLibrary,
}) {
    const isClear = action === "CLEAR";
    const isSave = action === "SAVE";

    return (
        <Dialog
            open={open}
            onClose={status === "LOADING" ? undefined : onClose}
            fullWidth
            maxWidth="xs"
        >
            {status === "CONFIRM" && (
                <>
                    <DialogTitle>
                        {isClear ? "Clear staged items?" : "Save to library?"}
                    </DialogTitle>

                    <DialogContent>
                        <Typography color="text.secondary">
                            {isClear
                                ? `Are you sure you want to remove all ${itemCount} ${
                                      itemCount === 1 ? "item" : "items"
                                  } from your staged media?`
                                : `Are you sure you want to save all ${itemCount} ${
                                      itemCount === 1 ? "item" : "items"
                                  } to your library?`}
                        </Typography>
                    </DialogContent>

                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button
                            onClick={onClose}
                            color="inherit"
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={onConfirm}
                            variant="contained"
                            color={isClear ? "error" : "primary"}
                            startIcon={
                                isClear
                                    ? <DeleteOutlinedIcon />
                                    : <LibraryAddIcon />
                            }
                        >
                            {isClear ? "Clear All" : "Save to Library"}
                        </Button>
                    </DialogActions>
                </>
            )}

            {status === "LOADING" && (
                <>
                    <DialogTitle>
                        Saving to your library
                    </DialogTitle>

                    <DialogContent>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                py: 3,
                                gap: 2,
                            }}
                        >
                            <CircularProgress />

                            <Typography color="text.secondary">
                                Saving {itemCount}{" "}
                                {itemCount === 1 ? "item" : "items"}...
                            </Typography>
                        </Box>
                    </DialogContent>
                </>
            )}

            {status === "SUCCESS" && (
                <>
                    <DialogTitle>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <CheckCircleOutlinedIcon
                                color="success"
                            />

                            Saved successfully
                        </Box>
                    </DialogTitle>

                    <DialogContent>
                        <Typography color="text.secondary">
                            {itemCount}{" "}
                            {itemCount === 1 ? "item has" : "items have"}{" "}
                            been added to your library.
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{ mt: 1 }}
                        >
                            Would you like to continue adding more media?
                        </Typography>
                    </DialogContent>

                    <DialogActions
                        sx={{
                            px: 3,
                            pb: 2,
                            gap: 1,
                        }}
                    >
                        <Button
                            onClick={onContinueAdding}
                            color="inherit"
                        >
                            Continue Adding
                        </Button>

                        <Button
                            onClick={onGoToLibrary}
                            variant="contained"
                        >
                            Go to Library
                        </Button>
                    </DialogActions>
                </>
            )}

            {status === "ERROR" && (
                <>
                    <DialogTitle>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <ErrorOutlinedIcon color="error" />

                            Unable to save
                        </Box>
                    </DialogTitle>

                    <DialogContent>
                        <Typography color="text.secondary">
                            {errorMessage ||
                                "Oops... Something went wrong. Please try again."}
                        </Typography>
                    </DialogContent>

                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button
                            onClick={onClose}
                            color="inherit"
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={onConfirm}
                            variant="contained"
                        >
                            Try Again
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}

export default DiscoverActionModal;
