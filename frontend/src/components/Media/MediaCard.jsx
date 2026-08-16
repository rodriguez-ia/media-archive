import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

function MediaCard({ mediaItem }) {

    return (
        <Card>
            <CardMedia
                component="img"
                image={mediaItem.coverImgUrl}
                alt={mediaItem.title}
            />

            <CardContent>
                <Typography noWrap>
                {mediaItem.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                {mediaItem.mediaType}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MediaCard;