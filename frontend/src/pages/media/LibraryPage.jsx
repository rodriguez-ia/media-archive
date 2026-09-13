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

    const mediaItemsTest = [{
        simulatedIndex: 0,
        title:"Starship Troopers",
        mediaType:"MOVIE",
        coverImgUrl:"https://image.tmdb.org/t/p/w500/cxCmv23O7p3hyHwqoktHYkZcGsY.jpg"
    },
    {
        simulatedIndex: 1,
        title:"Good Will Hunting",
        mediaType:"MOVIE",
        coverImgUrl:"https://image.tmdb.org/t/p/w500/z2FnLKpFi1HPO7BEJxdkv6hpJSU.jpg"
    },
    {
        simulatedIndex: 2,
        title:"Dungeon Crawler Carl",
        mediaType:"BOOK",
        coverImgUrl:"https://books.google.com/books/content?id=506EEQAAQBAJ&printsec=frontcover&img=1&zoom=10&edge=curl&source=gbs_api"
        // had to append 's' to 'http' and change 'zoom' value to 10 for higher res google books images
    },
    {
        simulatedIndex: 3,
        title:"Ride the Lightning",
        mediaType:"MUSIC_ALBUM",
        coverImgUrl:"https://cdn-images.dzcdn.net/images/cover/a0bd8b90e4b7fac3fd99f46497e803a7/500x500-000000-80-0-0.jpg"
        // had to use "cover_big" for image link instead of "cover"
    },
    {
        simulatedIndex: 4,
        title:"Bare-Metal Embedded C Programming",
        mediaType:"BOOK",
        coverImgUrl:"https://books.google.com/books/content?id=UiYqEQAAQBAJ&printsec=frontcover&img=1&zoom=10&edge=curl&source=gbs_api"
    },
    {
        simulatedIndex: 5,
        title:"DOOM (Original Game Soundtrack)",
        mediaType:"MUSIC_ALBUM",
        coverImgUrl:"https://cdn-images.dzcdn.net/images/cover/e4b9313746d5d6e1336cefc4f60cce0d/500x500-000000-80-0-0.jpg"
    },
    {
        simulatedIndex: 6,
        title:"Home Alone",
        mediaType:"MOVIE",
        coverImgUrl:"https://image.tmdb.org/t/p/w500/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg"
    }];

    return (
        <>
            <LibraryToolbar label="Media Library" />
            
            { loading ? <CircularProgress /> : <LibraryMediaGrid mediaItemArray={mediaItems} onMediaSelect={handleMediaSelect} /> }
            
            <LibraryMediaModal open={selectedMediaItem !== null} onClose={handleCloseModal} mediaItem={selectedMediaItem} onUpdate={handleUpdateMediaItem} />
        </>
    );
}

export default LibraryPage;