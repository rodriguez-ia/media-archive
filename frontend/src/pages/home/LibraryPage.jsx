import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserLibrary, addToUserLibrary } from "../../services/mediaService.js";
import MediaCard from "../../components/Media/MediaCard.jsx";

function LibraryPage() {
    const mediaItem1 = {
        simulatedIndex: 0,
        title:"Starship Troopers",
        mediaType:"MOVIE",
        coverImgUrl:"https://image.tmdb.org/t/p/w500/cxCmv23O7p3hyHwqoktHYkZcGsY.jpg"
    };
    const mediaItem2 = {
        simulatedIndex: 1,
        title:"Good Will Hunting",
        mediaType:"MOVIE",
        coverImgUrl:"https://image.tmdb.org/t/p/w500/z2FnLKpFi1HPO7BEJxdkv6hpJSU.jpg"
    };
    const mediaItem3 = {
        simulatedIndex: 2,
        title:"Dungeon Crawler Carl",
        mediaType:"BOOK",
        coverImgUrl:"http://books.google.com/books/content?id=506EEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    };
    const mediaItem4 = {
        simulatedIndex: 3,
        title:"Ride the Lightning",
        mediaType:"MUSIC_ALBUM",
        coverImgUrl:"https://api.deezer.com/album/14590610/image"
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(5, 1fr)',
                    },
                    gap: 2,
                }}
            >
                <MediaCard key={mediaItem1.simulatedIndex} mediaItem={mediaItem1}/>
                <MediaCard key={mediaItem2.simulatedIndex} mediaItem={mediaItem2}/>
                <MediaCard key={mediaItem3.simulatedIndex} mediaItem={mediaItem3}/>
                <MediaCard key={mediaItem4.simulatedIndex} mediaItem={mediaItem4}/>
            </Box>
        </Box>
    );
}

export default LibraryPage;