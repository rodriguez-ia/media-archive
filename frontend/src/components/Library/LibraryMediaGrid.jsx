import { Box } from "@mui/material";
import LibraryMediaCard from "../../components/Library/LibraryMediaCard.jsx";

function LibraryMediaGrid({
    mediaItemArray,
    onMediaSelect,
    selectionMode,
    selectedMediaIds
}) {

    return (
        <Box
            sx={{
                margin: 2,
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(5, 1fr)'
                },
                gap: 2,
            }}
        >
            {mediaItemArray.map((item, index) => (
                <LibraryMediaCard
                    key={item.externalId || index}
                    mediaItem={item}
                    onSelect={onMediaSelect}
                    selectionMode={selectionMode}
                    selected={
                        selectedMediaIds?.some(
                            (selectedItem) =>
                                selectedItem.externalId === item.externalId &&
                                selectedItem.mediaType === item.mediaType
                        ) ?? false
                    }
                />
            ))}
        </Box>
    );
}

export default LibraryMediaGrid;