
import TMDBLogo from "../../assets/api-credits/tmdb-logo.svg";
import DeezerLogo from "../../assets/api-credits/deezer-logo.svg";
import GoogleLogo from "../../assets/api-credits/google-logo.svg";
import { Box, Typography, Link } from "@mui/material";

const resources = [
    {
        name: "TMDB API",
        logo: TMDBLogo,
        url: "https://www.themoviedb.org/",
        alt: "TMDB"
    },
    {
        name: "Deezer API",
        logo: DeezerLogo,
        url: "https://www.deezer.com/",
        alt: "Deezer"
    },
    {
        name: "Google Books API Family",
        logo: GoogleLogo,
        url: "https://www.google.com/",
        alt: "Google"
    }
];

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                width: "100%",
                minHeight: "170px",
                borderTop: "1px solid #333",
                px: { xs: 2, sm: 3, md: 5 },
                py: { xs: 4, sm: 4.5, md: 5 },
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                    width: "100%",
                    maxWidth: "1400px"
                }}
            >
                
            {/* API Attribution */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    width: "100%"
                }}
            >
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        marginBottom: "20px"
                    }}
                >
                    Powered By:
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: { xs: 3, sm: 4, md: 5 },
                        width: "100%"
                    }}
                >
                    {resources.map((resource) => (
                        <Box
                            key={resource.name}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                width: {
                                    xs: "140px",
                                    sm: "155px",
                                    md: "175px"
                                },
                                gap: 1.25
                            }}
                        >
                            <Link
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "opacity 0.2s ease",
                                    "&:hover": {
                                        opacity: 0.7
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src={resource.logo}
                                    alt={resource.alt}
                                    sx={{
                                        display: "block",
                                        width: "auto",
                                        height: {
                                            xs: "55px",
                                            sm: "65px",
                                            md: "80px"
                                        },
                                        maxWidth: "100%",
                                        objectFit: "contain"
                                    }}
                                />
                            </Link>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    textAlign: "center",
                                    fontSize: "0.65rem",
                                    lineHeight: 1.5
                                }}
                            >
                                This product uses the {resource.name} but
                                is not endorsed or certified by {resource.alt}.
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

                {/* Copyright */}
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                        textAlign: "center",
                        fontSize: "0.75rem"
                    }}
                >
                    © {new Date().getFullYear()} MediaArchive. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default Footer;
