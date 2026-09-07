import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

function LibraryMediaCard({ mediaItem }) {

    return (
        <Card sx={{
            border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
            <CardMedia
                component="img"
                image={mediaItem.coverImgUrl}
                alt={mediaItem.title}
                sx={{
                    width: '100%',
                    aspectRatio: '2 / 3',
                    objectFit: 'contain',
                    backgroundColor: '#181818',
                    display: 'block'
                }}
            />

            <CardContent>
                <Typography noWrap>
                    {mediaItem.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {mediaItem.mediaType}
                </Typography>

                <Typography>
                    View count: {mediaItem.consumptionCount}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default LibraryMediaCard;