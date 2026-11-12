import { useState, useEffect } from "react";
import MediaCarousel from "../Dashboard/MediaCarousel";
import { addToUserLibrary, getRecommendedTMDBMedia } from "../../services/mediaService.js";


function LibraryMediaRecommendedSection({
    externalId,
    mediaType,
    title,
    onRefreshMedia,
}) {

    const PAGE_SIZE = 5;

    const [recommendedPages, setRecommendedPages] = useState([]);

    useEffect(() => {
        let cancelled = false;

        async function loadRecommendedData() {
            try {
                const response = await getRecommendedTMDBMedia(externalId, mediaType);

                if (cancelled) {return;}

                let data = response.data;
                let pages = paginateResponseData(data);

                for (let page of pages) {
                    setItemInfo(page);
                }

                setRecommendedPages(pages);
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to fetch recommended media: " + error);
                }
            }
        }

        loadRecommendedData();

        return () => {
            cancelled = true;
        }
    }, []);

    const paginateResponseData = (data) => {
        let pages = [];

        let nextPageItems = [];

        for (const item of data) {
            if (nextPageItems.length === PAGE_SIZE) {
                pages.push({
                    id: pages.length,
                    label: "Recommended",
                    description: `Because of your interest in ${title}`,
                    items: nextPageItems
                });

                nextPageItems = [];
            }

            nextPageItems.push(item);
        }

        if (nextPageItems.length > 0) {
            pages.push({
                id: pages.length,
                label: "Recommended",
                description: `Because of your interest in ${title}`,
                items: nextPageItems
            });
        }

        return pages;
    }

    const setItemInfo = (page) => {
        function truncateOneDecimal(number) {
            return Math.trunc(number * 10) / 10;
        }

        for (const item of page.items) {
            item.stat = item.communityRating
            ? "★ " + truncateOneDecimal(item.communityRating).toFixed(1)
            : "";

            item.id = item.externalId;
        }
    }

    const handleAddToWishlist = async (item) => {
        item = {
            ...item,
            status: "WISHLISTED"
        };

        try {
            await addToUserLibrary([item]);
            await onRefreshMedia();

            return true;
        } catch (error) {
            console.error("Failed to add media to wishlist:", error);
            return false;
        }
    }

    return (
        <MediaCarousel 
            pages={recommendedPages}
            itemsPerView={PAGE_SIZE}
            onItemClick={handleAddToWishlist}
        />
    );
}

export default LibraryMediaRecommendedSection;
