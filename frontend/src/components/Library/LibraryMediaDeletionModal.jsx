import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";

function LibraryMediaDeletionModal({
    open,
    selectedCount,
    deleting,
    onClose,
    onConfirm
}) {
    
    return (
        <Dialog open={open}
                onClose={deleting ? undefined : onClose}
                aria-labelledby="delete-media-dialog-title" >
            <DialogTitle id="delete-media-dialog-title">
                Delete selected media?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This will remove {selectedCount}{" "} {selectedCount === 1 ? "item" : "items"} from your library. This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={deleting}>
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained" disabled={deleting}>
                    {deleting ? "Deleting..." : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default LibraryMediaDeletionModal;
