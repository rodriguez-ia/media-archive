import { useState } from "react";
import { getUserLibrary, addToUserLibrary } from "../../services/mediaService.js";
import MediaGrid from "../../components/Media/MediaGrid.jsx";
import MediaToolbar from "../../components/App/MediaToolbar.jsx";

function LibraryPage() {
    const mediaItems = [{
        simulatedIndex: 0,
        title:"Starship Troopers",
        mediaType:"MOVIE",
        coverImgUrl:"https://image.tmdb.org/t/p/w500/cxCmv23O7p3hyHwqoktHYkZcGsY.jpg"
    },
    {
        simulatedIndex: 1,
        title:"Good Will Hunting",
        mediaType:"MOVIE",
        coverImgUrl:"https://image.tmdb.org/t/p/w500/z2FnLKpFi1HPO7BEJxdkv6hpJSU.jpg"
    },
    {
        simulatedIndex: 2,
        title:"Dungeon Crawler Carl",
        mediaType:"BOOK",
        coverImgUrl:"http://books.google.com/books/content?id=506EEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        simulatedIndex: 3,
        title:"Ride the Lightning",
        mediaType:"MUSIC_ALBUM",
        coverImgUrl:"https://api.deezer.com/album/14590610/image"
    },
    {
        simulatedIndex: 4,
        title:"Bare-Metal Embedded C Programming",
        mediaType:"BOOK",
        coverImgUrl:"http://books.google.com/books/content?id=UiYqEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        simulatedIndex: 5,
        title:"DOOM (Original Game Soundtrack)",
        mediaType:"MUSIC_ALBUM",
        coverImgUrl:"https://api.deezer.com/album/941543521/image"
    },
    {
        simulatedIndex: 6,
        title:"Home Alone",
        mediaType:"MOVIE",
        coverImgUrl:"https://image.tmdb.org/t/p/w500/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg"
    }];

    return (
        <>
            <MediaToolbar label="Media Library" />
            <MediaGrid mediaItemArray={mediaItems}/>
        </>
    );
}

export default LibraryPage;