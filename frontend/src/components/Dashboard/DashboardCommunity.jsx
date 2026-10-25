import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MediaCarousel from "./MediaCarousel";
import { getDashboardCommunityData, addToUserLibrary } from "../../services/mediaService";

function DashboardCommunity() {

    const [communityPages, setCommunityPages] = useState([]);

    useEffect(() => {
        let cancelled = false;

        async function loadCommunityData() {
            try {
                const response = await getDashboardCommunityData();

                if (cancelled) {return;}

                let pages = response.data;
                for (let page of pages) {
                    setItemInfo(page);
                }

                setCommunityPages(pages);
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to fetch community carousel data: " + error);
                }
            }
        }

        loadCommunityData();

        return () => {
            cancelled = true;
        }
    }, [])

    const setItemInfo = (page) => {
        function truncateOneDecimal(number) {
            return Math.trunc(number * 10) / 10;
        }

        for (const item of page.items) {
            item.stat = item.communityRating
            ? "★ " + truncateOneDecimal(item.communityRating).toFixed(1)
            : "";

            item.id = item.externalId;

            console.log(JSON.stringify(item));
        }
    }

    const handleAddToWishlist = async (item) => {
        item = {
            ...item,
            status: "WISHLISTED"
        };

        try {
            await addToUserLibrary([item]);
            return true;
        } catch (error) {
            console.error("Failed to add media to wishlist:", error);
            return false;
        }
    }

    return (
        <Box
            sx={{
                height: "100%",
                minHeight: 0,
            }}
        >
            <MediaCarousel
                pages={communityPages}
                itemsPerView={3}
                onItemClick={handleAddToWishlist}
            />
        </Box>
    );
}

export default DashboardCommunity;
