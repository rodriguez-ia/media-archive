import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Button } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

import DiscoverHeader from "../../components/Discover/DiscoverHeader";
import DiscoverSearchbar from "../../components/Discover/DiscoverSearchbar";
import DiscoverMediaGrid from "../../components/Discover/DiscoverMediaGrid";
import DiscoverActionModal from "../../components/Discover/DiscoverActionModal";

import { addToUserLibrary } from "../../services/mediaService";

function DiscoverPage() {

    const [stagedMedia, setStagedMedia] = useState([]);

    const [actionModal, setActionModal] = useState({
        open: false,
        action: null,
        status: "CONFIRM",
        errorMessage: ""
    });

    const navigate = useNavigate();

    const handleToggleMedia = (selectedMediaItem) => {
        setStagedMedia(current => {
            const existing = current.some(
                element => element.externalId === selectedMediaItem.externalId
            );

            if (existing) {
                return current.filter(
                    element => element.externalId !== selectedMediaItem.externalId
                );
            }
            
            return [...current, selectedMediaItem];
        });
    };

    const handleMediaCardRemoval = (externalId) => {
        setStagedMedia(current => {
            return current.filter(element => element.externalId !== externalId);
        });
    };

    const handleMediaStatusChange = (externalId, status) => {
        if (status === "WISHLISTED") {
            setStagedMedia(current => 
                current.map(element => 
                    element.externalId === externalId ? {...element, status, format: null} : element
                )
            );
        } else {
            setStagedMedia(current => 
                current.map(element => 
                    element.externalId === externalId ? {...element, status} : element
                )
            );
        }
    };

    const handleMediaFormatChange = (externalId, format) => {
        setStagedMedia(current => 
            current.map(element =>
                element.externalId === externalId ? {...element, format} : element
            )
        )
    }

    const handleClearAll = () => {
        setActionModal({
            open: true,
            action: "CLEAR",
            status: "CONFIRM",
            errorMessage: ""
        });
    };

    const handleSaveToLibrary = () => {
        setActionModal({
            open: true,
            action: "SAVE",
            status: "CONFIRM",
            errorMessage: ""
        });
    };

    const handleCloseActionModal = () => {
        setActionModal(current => ({
            ...current,
            open: false
        }));
    };

    const handleConfirmAction = async () => {
        if (actionModal.action === "CLEAR") {
            setStagedMedia([]);

            setActionModal(current => ({
                ...current,
                open: false
            }));

            return;
        }

        if (actionModal.action === "SAVE") {
            setActionModal({
                ...actionModal,
                status: "LOADING"
            });

            try {
                await addToUserLibrary(stagedMedia);

                setActionModal(current => ({
                    ...current,
                    status: "SUCCESS"
                }));
            } catch (ex) {
                setActionModal(current => ({
                    ...current,
                    status: "ERROR",
                    errorMessage: ex?.message || "Oops. Something went wrong while saving your media."
                }));
            }
        }
    };

    const handleContinueAdding = () => {
        setStagedMedia([]);

        setActionModal(current => ({
            open: false,
            action: null,
            status: "CONFIRM",
            errorMessage: ""
        }));
    };

    const handleGoToLibrary = () => {
        setStagedMedia([]);

        setActionModal(current => ({
            open: false,
            action: null,
            status: "CONFIRM",
            errorMessage: ""
        }));

        navigate("/library");
    };

    return (
        <Container maxWidth="xl">
            <DiscoverHeader />

            <DiscoverSearchbar stagedMedia={stagedMedia} onToggleMedia={handleToggleMedia} />

            <DiscoverMediaGrid
                mediaItemArray={stagedMedia}
                handleMediaCardRemoval={handleMediaCardRemoval}
                handleMediaStatusChange={handleMediaStatusChange}
                handleMediaFormatChange={handleMediaFormatChange}
            />

            <Box
                sx={{
                    position: "sticky",
                    bottom: 0,
                    zIndex: 10,

                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    mt: 3,
                    py: 1.5,

                    background: "linear-gradient("
                        + "to bottom, "
                        + "transparent 0%, "
                        + "background.paper 20%"
                        + ")",

                    backdropFilter: "blur(8px)",
                }}
            >
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteOutlinedIcon />}
                    onClick={handleClearAll}
                    disabled={stagedMedia.length === 0}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                    }}
                >
                    Clear All
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LibraryAddIcon />}
                    onClick={handleSaveToLibrary}
                    disabled={stagedMedia.length === 0}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 2.5,
                    }}
                >
                    Save {stagedMedia.length} {stagedMedia.length === 1 ? "Item" : "Items"} to Library
                </Button>
            </Box>

            <DiscoverActionModal
                open={actionModal.open}
                action={actionModal.action}
                itemCount={stagedMedia.length}
                status={actionModal.status}
                errorMessage={actionModal.errorMessage}
                onClose={handleCloseActionModal}
                onConfirm={handleConfirmAction}
                onContinueAdding={handleContinueAdding}
                onGoToLibrary={handleGoToLibrary}
            />

        </Container>
    );
}

export default DiscoverPage;