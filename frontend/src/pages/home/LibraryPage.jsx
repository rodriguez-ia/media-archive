import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserLibrary, addToUserLibrary } from "../../services/mediaService.js";

function LibraryPage() {


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
                <Card>
                    <CardMedia
                        component="img"
                        image='https://image.tmdb.org/t/p/w500/cxCmv23O7p3hyHwqoktHYkZcGsY.jpg'//{media.thumbnailUrl}
                        alt='temp-alt'//{media.name}
                    />

                    <CardContent>
                        <Typography noWrap>
                        Starship Troopers
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                        Movie
                        </Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardMedia
                        component="img"
                        image='https://image.tmdb.org/t/p/w500/z2FnLKpFi1HPO7BEJxdkv6hpJSU.jpg'//{media.thumbnailUrl}
                        alt='temp- alt'//{media.name}
                    />

                    <CardContent>
                        <Typography noWrap>
                        Good Will Hunting
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                        Movie
                        </Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardMedia
                        component="img"
                        image='http://books.google.com/books/content?id=506EEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'//{media.thumbnailUrl}
                        alt='temp- alt'//{media.name}
                    />

                    <CardContent>
                        <Typography noWrap>
                        Dungeon Crawler Carl
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                        Book
                        </Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardMedia
                        component="img"
                        image='https://api.deezer.com/album/14590610/image'//{media.thumbnailUrl}
                        alt='temp- alt'//{media.name}
                    />

                    <CardContent>
                        <Typography noWrap>
                        Ride the Lightning (Deluxe Remaster)
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                        Music Album
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}

export default LibraryPage;