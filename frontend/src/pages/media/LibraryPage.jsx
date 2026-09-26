import { useState, useEffect } from "react";
import { getUserLibrary, updateUserMediaItem } from "../../services/mediaService.js";
import LibraryMediaGrid from "../../components/Library/LibraryMediaGrid.jsx";
import LibraryToolbar from "../../components/Library/LibraryToolbar.jsx";
import LibraryMediaModal from "../../components/Library/LibraryMediaModal.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

function LibraryPage() {

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState({});
    const [mediaItems, setMediaItems] = useState([]);
    const [selectedMediaItem, setSelectedMediaItem] = useState(null);

    useEffect(() => {
        async function loadLibrary() {
            try {
                setLoading(true);

                const response = await getUserLibrary();

                setResponseMessage(response.message);
                setMediaItems(response.data);
            } catch (error) {
                if (error.message) {
                    setResponseMessage(error.message);
                } else {
                    setResponseMessage({
                        status: 500,
                        success: false,
                        source: "Unknown",
                        detail: "There was an error loading your library."
                    });
                }
            } finally {
                setLoading(false);
            }
        }

        loadLibrary();
    }, []);

    const handleMediaSelect = (mediaItem) => {
        setSelectedMediaItem(mediaItem);
    };

    const handleCloseModal = () => {
        setSelectedMediaItem(null);
    };

    const handleUpdateMediaItem = async (externalId, updatedMediaItem) => {

        try {

            await updateUserMediaItem(externalId, updatedMediaItem);

            setSelectedMediaItem((current) => ({
                ...current,
                ...updatedMediaItem
            }));

            setMediaItems((current) => 
                current.map((mediaItem) => 
                    mediaItem.externalId === externalId
                        ? {...mediaItem, ...updatedMediaItem}
                        : mediaItem
                )
            );
        } catch (error) {
            if (error.message) {
                setResponseMessage(error.message);
            } else {
                setResponseMessage({
                    status: 500,
                    success: false,
                    source: "Unknown",
                    detail: "There was an error loading your library."
                });
            }

            throw error;
        }
    }

    return (
        <>
            <LibraryToolbar label="Media Library" />
            
            { loading ? <CircularProgress /> : <LibraryMediaGrid mediaItemArray={mediaItems} onMediaSelect={handleMediaSelect} /> }
            
            <LibraryMediaModal open={selectedMediaItem !== null} onClose={handleCloseModal} mediaItem={selectedMediaItem} onUpdate={handleUpdateMediaItem} />
        </>
    );
}

export default LibraryPage;