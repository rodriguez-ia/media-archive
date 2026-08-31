import { useState } from "react";
import { Box, Container } from "@mui/material";
import DiscoverHeader from "../../components/Discover/DiscoverHeader";
import DiscoverMediaGrid from "../../components/Discover/DiscoverMediaGrid";

function DiscoverPage() {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchMediaTypes, setSearchMediaTypes] = useState(["MOVIE"]);

    const [searchResults, setSearchResults] = useState([]);
    const [stagedMedia, setStagedMedia] = useState([]);

    const [resultModalContent, setResultModalContent] = useState({
        open: false,
        success: false,
        message: ""
    });

    const mediaItemsTest = [{
        simulatedIndex: 0,
        title:"Starship Troopers",
        mediaType:"MOVIE",
        releaseDate: "1997-11-07",
        communityRating: 7.35,
        coverImgUrl:"https://image.tmdb.org/t/p/w500/cxCmv23O7p3hyHwqoktHYkZcGsY.jpg"
    },
    {
        simulatedIndex: 1,
        title:"Good Will Hunting",
        mediaType:"MOVIE",
        releaseDate: "1997-12-05",
        communityRating: 9.15,
        coverImgUrl:"https://image.tmdb.org/t/p/w500/z2FnLKpFi1HPO7BEJxdkv6hpJSU.jpg"
    },
    {
        simulatedIndex: 2,
        title:"Dungeon Crawler Carl",
        mediaType:"BOOK",
        releaseDate: "2025-12-30",
        communityRating: null,
        coverImgUrl:"https://books.google.com/books/content?id=506EEQAAQBAJ&printsec=frontcover&img=1&zoom=10&edge=curl&source=gbs_api"
        // had to append 's' to 'http' and change 'zoom' value to 10 for higher res google books images
    },
    {
        simulatedIndex: 3,
        title:"Ride the Lightning",
        mediaType:"MUSIC_ALBUM",
        releaseDate: null,
        communityRating: null,
        coverImgUrl:"https://cdn-images.dzcdn.net/images/cover/a0bd8b90e4b7fac3fd99f46497e803a7/500x500-000000-80-0-0.jpg"
        // had to use "cover_big" for image link instead of "cover"
    },
    {
        simulatedIndex: 4,
        title:"Bare-Metal Embedded C Programming",
        mediaType:"BOOK",
        releaseDate: "2024-09-30",
        communityRating: null,
        coverImgUrl:"https://books.google.com/books/content?id=UiYqEQAAQBAJ&printsec=frontcover&img=1&zoom=10&edge=curl&source=gbs_api"
    },
    {
        simulatedIndex: 5,
        title:"DOOM (Original Game Soundtrack)",
        mediaType:"MUSIC_ALBUM",
        releaseDate: null,
        communityRating: null,
        coverImgUrl:"https://cdn-images.dzcdn.net/images/cover/e4b9313746d5d6e1336cefc4f60cce0d/500x500-000000-80-0-0.jpg"
    },
    {
        simulatedIndex: 6,
        title:"Home Alone",
        mediaType:"MOVIE",
        releaseDate: "1990-11-16",
        communityRating: 9.22,
        coverImgUrl:"https://image.tmdb.org/t/p/w500/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg"
    }];

    return (
        <Container maxWidth="xl">
            <DiscoverHeader />

            <DiscoverMediaGrid mediaItemArray={mediaItemsTest}/>
        </Container>
    );
}

export default DiscoverPage;