import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import MediaCarousel from "./MediaCarousel.jsx";
import { formatGenre, getGenreImage } from "../../utils/genreUtils.js";
import { getDashboardPersonalData } from "../../services/mediaService.js";

function DashboardPersonal() {

    const [personalPages, setPersonalPages] = useState([]);

    useEffect(() => {
        let cancelled = false;

        async function loadPersonalData() {
            try {
                const response = await getDashboardPersonalData();

                if (cancelled) {return;}

                let mediaPages = response.data.mediaPages;
                for (let page of mediaPages) {
                    setItemInfo(page);
                }

                let genresPage = response.data.genresPage;
                setItemInfo(genresPage);

                const updatedMediaPages = [
                    ...mediaPages,
                    ...(genresPage ? [genresPage] : [])
                ];

                setPersonalPages(updatedMediaPages);
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to fetch personal media carousel data: " + error);
                }
            }
        }

        loadPersonalData();

        return () => {
            cancelled = true;
        }
    }, []);

    const setItemInfo = (page) => {
        function truncateOneDecimal(number) {
            return Math.trunc(number * 100) / 100;
        }
        
        switch (page.id) {
            case "highest-rated":
                for (const item of page.items) {
                    item.stat = item.personalRating ? "★ " + truncateOneDecimal(item.personalRating).toFixed(1) : "";
                }

                break;
            case "most-viewed":
                for (const item of page.items) {
                    item.stat = item.consumptionCount ? item.consumptionCount + " views" : "";
                }

                break;
            case "top-genres":
                for (const item of page.items) {
                    item.stat = item.ratingTotal ? "★ " + truncateOneDecimal(item.ratingTotal).toFixed(1) : "";
                    item.stat += item.viewsTotal ? ` (${item.viewsTotal} views)` : "";

                    item.id = item.genre;
                    item.title = formatGenre(item.genre);
                    item.coverImgUrl = getGenreImage(item.genre);
                }

                break;
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
                pages={personalPages}
                itemsPerView={3}
            />
        </Box>
    );
}

export default DashboardPersonal;
