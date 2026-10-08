import { Box } from "@mui/material";
import MediaCarousel from "./MediaCarousel";

const communityPages = [
    {
        id: "trending",
        label: "Trending",
        description: "The movies everyone is talking about right now",
        items: [
            {
                id: 1,
                title: "Parasite",
                image: "https://image.tmdb.org/t/p/w342/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                stat: "★ 8.5",
            },
            {
                id: 2,
                title: "Everything Everywhere All at Once",
                image: "https://image.tmdb.org/t/p/w342/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
                stat: "★ 7.8",
            },
            {
                id: 3,
                title: "Whiplash",
                image: "https://media.themoviedb.org/t/p/w94_and_h141_face/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
                stat: "★ 8.5",
            },
            {
                id: 4,
                title: "The Godfather",
                image: "https://image.tmdb.org/t/p/w342/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
                stat: "★ 8.7",
            },
            {
                id: 5,
                title: "Fight Club",
                image: "https://image.tmdb.org/t/p/w342/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
                stat: "★ 8.4",
            },
        ],
    },

    {
        id: "now-playing",
        label: "Now Playing",
        description: "Popular movies people are watching and discussing today",
        items: [
            {
                id: 1,
                title: "Top Gun: Maverick",
                image: "https://image.tmdb.org/t/p/w342/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
                stat: "★ 8.2",
            },
            {
                id: 2,
                title: "Guardians of the Galaxy Vol. 3",
                image: "https://image.tmdb.org/t/p/w342/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
                stat: "★ 7.9",
            },
            {
                id: 3,
                title: "John Wick: Chapter 4",
                image: "https://image.tmdb.org/t/p/w342/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
                stat: "★ 7.7",
            },
            {
                id: 4,
                title: "Avatar: The Way of Water",
                image: "https://image.tmdb.org/t/p/w342/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
                stat: "★ 7.6",
            },
            {
                id: 5,
                title: "The Super Mario Bros. Movie",
                image: "https://media.themoviedb.org/t/p/w94_and_h141_face/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
                stat: "★ 7.6",
            },
        ],
    },

    {
        id: "recommended",
        label: "Recommended",
        description: "Hand-picked movies you might want to watch next",
        items: [
            {
                id: 1,
                title: "Good Will Hunting",
                image: "https://image.tmdb.org/t/p/w342/z2FnLKpFi1HPO7BEJxdkv6hpJSU.jpg",
                stat: "★ 8.2",
            },
            {
                id: 2,
                title: "The Grand Budapest Hotel",
                image: "https://image.tmdb.org/t/p/w342/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
                stat: "★ 8.0",
            },
            {
                id: 3,
                title: "The Prestige",
                image: "https://media.themoviedb.org/t/p/w94_and_h141_face/Ag2B2KHKQPukjH7WutmgnnSNurZ.jpg",
                stat: "★ 8.2",
            },
            {
                id: 4,
                title: "Arrival",
                image: "https://image.tmdb.org/t/p/w342/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
                stat: "★ 7.9",
            },
            {
                id: 5,
                title: "La La Land",
                image: "https://image.tmdb.org/t/p/w342/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
                stat: "★ 7.9",
            },
        ],
    },
];

function DashboardCommunity() {

    return (
        <Box
            sx={{
                height: "100%",
                minHeight: 0,
            }}
        >
            <MediaCarousel
                pages={communityPages}
                itemsPerPage={5}
            />
        </Box>
    );
}

export default DashboardCommunity;
