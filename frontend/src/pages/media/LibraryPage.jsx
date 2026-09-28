import { useState, useEffect, useMemo } from "react";
import { getUserLibrary, updateUserMediaItems, deleteUserMediaItems } from "../../services/mediaService.js";
import LibraryMediaGrid from "../../components/Library/LibraryMediaGrid.jsx";
import LibraryToolbar from "../../components/Library/LibraryToolbar.jsx";
import LibraryMediaContentModal from "../../components/Library/LibraryMediaContentModal.jsx";
import LibraryMediaDeletionModal from "../../components/Library/LibraryMediaDeletionModal.jsx";
import CircularProgress from "@mui/material/CircularProgress";

function LibraryPage() {

    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [responseMessage, setResponseMessage] = useState({});
    const [mediaItems, setMediaItems] = useState([]);
    const [openedMediaItem, setOpenedMediaItem] = useState(null);

    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedMediaIds, setSelectedMediaIds] = useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    const [sortOption, setSortOption] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");

    const [filters, setFilters] = useState({
        mediaTypes: [],
        formats: [],
        genres: [],
        statuses: [],
    });

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

    const searchedMediaItems = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        if (!normalizedQuery) {
            return mediaItems;
        }

        return mediaItems.filter((mediaItem) =>
            mediaItem.title?.toLowerCase().includes(normalizedQuery)
        );
    }, [mediaItems, searchQuery]);

    const sortedMediaItems = useMemo(() => {
        const sorted = [...searchedMediaItems];

        sorted.sort((a, b) => {
            let comparison = 0;

            switch (sortOption) {
                case "title":
                    comparison = (a.title ?? "").localeCompare(
                        b.title ?? "",
                        undefined,
                        { sensitivity: "base" }
                    );
                    break;

                case "personalRating":
                    comparison = (a.personalRating ?? 0) - (b.personalRating ?? 0);
                    break;

                case "communityRating":
                    comparison = (a.communityRating ?? 0) - (b.communityRating ?? 0);
                    break;

                case "viewCount":
                    comparison = (a.consumptionCount ?? 0) - (b.consumptionCount ?? 0);
                    break;

                default:
                    comparison = 0;
            }

            return sortDirection === "asc"
                ? comparison
                : -comparison;
        });

        return sorted;
    }, [searchedMediaItems, sortOption, sortDirection]);

    const filteredMediaItems = useMemo(() => {
        return sortedMediaItems.filter((mediaItem) => {

            const matchesMediaType =
                filters.mediaTypes.length === 0 ||
                filters.mediaTypes.includes(mediaItem.mediaType);

            const matchesFormat =
                filters.formats.length === 0 ||
                filters.formats.includes(mediaItem.format);

            const matchesGenre =
                filters.genres.length === 0 ||
                (mediaItem.genres ?? []).some((genre) =>
                    filters.genres.includes(genre)
                );

            const matchesStatus =
                filters.statuses.length === 0 ||
                filters.statuses.includes(mediaItem.status);

            return (
                matchesMediaType &&
                matchesFormat &&
                matchesGenre &&
                matchesStatus
            );
        });
    }, [sortedMediaItems, filters]);

    const handleFilterChange = (filterType, values) => {
        setFilters((current) => ({
            ...current,
            [filterType]: values,
        }));
    };

    const handleClearFilters = () => {
        setFilters({
            mediaTypes: [],
            formats: [],
            genres: [],
            statuses: [],
        });
    };

    const handleMediaSelect = (mediaItem) => {
        if (selectionMode) {
            setSelectedMediaIds((current) => {
                const isSelected = current.some(
                    (item) => item.externalId === mediaItem.externalId
                );

                if (isSelected) {
                    return current.filter(
                        (item) => item.externalId !== mediaItem.externalId
                    );
                }

                return [
                    ...current,
                    {
                        externalId: mediaItem.externalId,
                        mediaType: mediaItem.mediaType
                    }
                ];
            });

            return;
        }

        setOpenedMediaItem(mediaItem);
    };

    const handleStartSelection = () => {
        setSelectionMode(true);
        setSelectedMediaIds([]);
    };

    const handleCancelSelection = () => {
        setSelectionMode(false);
        setSelectedMediaIds([]);
    };

    const handleOpenDeleteDialog = () => {
        if (selectedMediaIds.length === 0) {
            return;
        }
        
        setDeleteDialogOpen(true);
    };
    
    const handleCloseDeleteDialog = () => {
        if (!deleting) {
            setDeleteDialogOpen(false);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedMediaIds.length === 0 || deleting) {
            return;
        }

        try {
            setDeleting(true);

            await deleteUserMediaItems(selectedMediaIds);

            /*
            * Remove the successfully deleted items from local state.
            *
            * We compare both externalId and mediaType because those
            * two fields together identify the library item for the API.
            */
            setMediaItems((current) =>
                current.filter(
                    (mediaItem) =>
                        !selectedMediaIds.some(
                            (selectedItem) =>
                                selectedItem.externalId === mediaItem.externalId &&
                                selectedItem.mediaType === mediaItem.mediaType
                        )
                )
            );

            setDeleteDialogOpen(false);
            handleCancelSelection();
        } catch (error) {
            if (error.message) {
                setResponseMessage(error.message);
            } else {
                setResponseMessage({
                    status: 500,
                    success: false,
                    source: "Unknown",
                    detail: "There was an error deleting the selected media.",
                });
            }
        } finally {
            setDeleting(false);
        }
    };

    const handleCloseModal = () => {
        setOpenedMediaItem(null);
    };

    const handleUpdateMediaItems = async (updatedMediaItems) => {
        try {
            await updateUserMediaItems(updatedMediaItems);

            setOpenedMediaItem((current) => {
                const updatedMediaItem = updatedMediaItems[current.externalId];

                return updatedMediaItem
                    ? { ...current, ...updatedMediaItem }
                    : current;
            });

            setMediaItems((current) =>
                current.map((mediaItem) => {
                    const updatedMediaItem = updatedMediaItems[mediaItem.externalId];

                    return updatedMediaItem
                        ? { ...mediaItem, ...updatedMediaItem }
                        : mediaItem;
                })
            );
        } catch (error) {
            if (error.message) {
                setResponseMessage(error.message);
            } else {
                setResponseMessage({
                    status: 500,
                    success: false,
                    source: "Unknown",
                    detail: "There was an error updating your library."
                });
            }

            throw error;
        }
    };

    return (
        <>
            <LibraryToolbar
                selectionMode={selectionMode}
                selectedCount={selectedMediaIds.length}
                onStartSelection={handleStartSelection}
                onCancelSelection={handleCancelSelection}
                onDeleteSelected={handleOpenDeleteDialog}
                deleting={deleting}
                onSearchChange={setSearchQuery}
                sortOption={sortOption}
                sortDirection={sortDirection}
                onSortChange={(option, direction) => {
                    setSortOption(option);
                    setSortDirection(direction);
                }}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
            />

            {loading ? (
                <CircularProgress />
            ) : (
                <LibraryMediaGrid
                    mediaItemArray={filteredMediaItems}
                    onMediaSelect={handleMediaSelect}
                    selectionMode={selectionMode}
                    selectedMediaIds={selectedMediaIds}
                />
            )}

            <LibraryMediaContentModal
                open={openedMediaItem !== null}
                onClose={handleCloseModal}
                mediaItem={openedMediaItem}
                onUpdate={handleUpdateMediaItems}
            />

            <LibraryMediaDeletionModal
                open={deleteDialogOpen}
                selectedCount={selectedMediaIds.length}
                deleting={deleting}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleDeleteSelected}
            />
        </>
    );
}

export default LibraryPage;