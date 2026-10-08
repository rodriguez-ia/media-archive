import { Box } from "@mui/material";
import MediaCarousel from "./MediaCarousel.jsx";
import { getGenreImage } from "../../utils/genreUtils.js";

const personalPages = [
    {
        id: "highest-rated",
        label: "Highest Rated",
        description: "Your personally highest-rated movies",
        items: [
            {
                id: 1,
                title: "Good Will Hunting",
                image: "https://image.tmdb.org/t/p/w500/z2FnLKpFi1HPO7BEJxdkv6hpJSU.jpg",
                stat: "★ 8.7",
            },
            {
                id: 2,
                title: "Interstellar",
                image: "https://image.tmdb.org/t/p/w342/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
                stat: "★ 8.6",
            },
            {
                id: 3,
                title: "The Batman",
                image: "https://image.tmdb.org/t/p/w342/74xTEgt7R36Fpooo50r9T25onhq.jpg",
                stat: "★ 8.5",
            },
        ],
    },

    {
        id: "most-viewed",
        label: "Most Viewed",
        description: "Your most watched movies",
        items: [
            {
                id: 4,
                title: "Oppenheimer",
                image: "https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
                stat: "42 views",
            },
            {
                id: 5,
                title: "Blade Runner 2049",
                image: "https://image.tmdb.org/t/p/w342/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
                stat: "37 views",
            },
            {
                id: 6,
                title: "Arrival",
                image: "https://image.tmdb.org/t/p/w342/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
                stat: "34 views",
            },
        ],
    },

    {
        id: "favorite-genre",
        label: "Top Genre",
        description: "Based on your rating history",
        items: [
            {
                id: 7,
                title: "Science Fiction",
                image: getGenreImage("SCIENCE_FICTION"),
                stat: "★ 8.4",
            },
            {
                id: 8,
                title: "Horror",
                image: getGenreImage("HORROR"),
                stat: "★ 8.1",
            },
            {
                id: 9,
                title: "Action",
                image: getGenreImage("ACTION"),
                stat: "★ 7.9",
            },
        ],
    },
];

function DashboardPersonal() {
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
