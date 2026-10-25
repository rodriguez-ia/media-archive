import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MediaCarousel from "./MediaCarousel";
import { getDashboardCommunityData } from "../../services/mediaService";

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
                    setItemStats(page);
                }

                setCommunityPages(pages);
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to fetch media summary: " + error);
                }
            }
        }

        loadCommunityData();

        return () => {
            cancelled = true;
        }
    }, [])

    const setItemStats = (page) => {
        function truncateTwoDecimals(number) {
            return Math.trunc(number * 10) / 10;
        }

        for (const item of page.items) {
            item.stat = item.communityRating
            ? "★ " + truncateTwoDecimals(item.communityRating).toFixed(1)
            : "";
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
            />
        </Box>
    );
}

export default DashboardCommunity;
