
import { useEffect, useRef, useState } from "react";
import GoogleBooksPreviewIcon from "../../assets/api-credits/google-preview.svg";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
    Box,
    Button
} from "@mui/material";

function GoogleBooksViewer({ identifier }) {
    const containerRef = useRef(null);

    const [previewState, setPreviewState] = useState("idle");

    const googleBooksUrl = `https://books.google.com/books?id=${encodeURIComponent(identifier)}`;

    useEffect(() => {
        if (previewState !== "loading" || !containerRef.current) {
            return;
        }

        let cancelled = false;

        async function initializeViewer() {
            try {
                const api = await window.googleBooksReady;

                if (cancelled || !containerRef.current) {
                    return;
                }

                const viewer = new api.DefaultViewer(containerRef.current);

                viewer.load(
                    identifier,
                    () => {
                        if (!cancelled) {
                            setPreviewState("unavailable");
                        }
                    },
                    () => {
                        if (!cancelled) {
                            setPreviewState("available");
                        }
                    }
                );
            } catch (error) {
                console.error("Initialization failed:", error);

                if (!cancelled) {
                    setPreviewState("unavailable");
                }
            }
        }

        initializeViewer();

        return () => {
            cancelled = true;
        };
    }, [previewState]);

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            {previewState === "idle" && (
                <Box
                    component="img"
                    src={GoogleBooksPreviewIcon}
                    alt="Preview"
                    onClick={() => setPreviewState("loading")}
                    sx={{
                        "&:hover": {
                            cursor: "pointer"
                        }
                    }}
                />
            )}

            {(previewState === "loading" ||
                previewState === "available") && (
                <Box
                    ref={containerRef}
                    sx={{
                        width: "100%",
                        height: 500
                    }}
                />
            )}

            {previewState === "unavailable" && (
                <Button
                    variant="outlined"
                    endIcon={<OpenInNewIcon />}
                    onClick={() =>
                        window.open(
                            googleBooksUrl,
                            "_blank",
                            "noopener,noreferrer"
                        )
                    }
                    sx={{
                        textTransform: "none"
                    }}
                >
                    Preview unavailable — View on Google Books
                </Button>
            )}
        </Box>
    );
}

export default GoogleBooksViewer;
