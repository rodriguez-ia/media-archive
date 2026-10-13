
import { useEffect, useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { getDailyRandom } from "../../utils/otherUtils";
import { formatGenre } from "../../utils/genreUtils";
import {
    getSpotlightOnThisDay,
    getSpotlightForgottenFavorite,
    getSpotlightGenreShoutout,
    getSpotlightRandomSpotlight,
    getSpotlightTopTrending
} from "../../services/mediaService";

/*
 * Shared visual building blocks
 */

const spotlightStyles = {
    card: {
        position: "relative",
        isolation: "isolate",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        minHeight: { xs: 300, sm: 260, md: 245 },
        width: "100%",
        border: "1px solid",
        borderColor: "rgba(255,255,255,0.10)",
        borderRadius: 3,
        bgcolor: "#191919",
        color: "#fff",
        boxSizing: "border-box",
    },
    artwork: {
        position: "absolute",
        zIndex: -2,
        top: 0,
        right: 0,
        height: "100%",
        width: { xs: "76%", sm: "58%", md: "53%" },
        objectFit: "cover",
        objectPosition: "center 25%",
        opacity: 0.85,
    },
    overlay: {
        position: "absolute",
        inset: 0,
        zIndex: -1,
        background: {
            xs: "linear-gradient(90deg, #191919 0%, rgba(25,25,25,0.96) 30%, rgba(25,25,25,0.70) 62%, rgba(25,25,25,0.35) 100%), linear-gradient(0deg, rgba(25,25,25,0.8), transparent 65%)",
            md: "linear-gradient(90deg, #191919 0%, #191919 29%, rgba(25,25,25,0.94) 43%, rgba(25,25,25,0.58) 67%, rgba(25,25,25,0.16) 100%)",
        },
    },
    content: {
        width: "100%",
        boxSizing: "border-box",
        p: { xs: 2, sm: 3, md: 3.5 },
        pr: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1.5,
    },
    eyebrow: {
        fontSize: "0.72rem",
        fontWeight: 800,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        color: "#8ec5ff",
    },
    headline: {
        fontSize: { xs: "1.45rem", sm: "1.8rem", md: "2.15rem" },
        lineHeight: 1.15,
        fontWeight: 800,
        letterSpacing: "-0.035em",
        maxWidth: { xs: "100%", sm: "85%", md: "72%" },
        textWrap: "balance",
    },
    mediaTitle: {
        fontSize: { xs: "1rem", sm: "1.1rem" },
        fontWeight: 700,
        lineHeight: 1.4,
    },
    description: {
        fontSize: "0.85rem",
        lineHeight: 1.65,
        color: "rgba(255,255,255,0.76)",
        maxWidth: 520,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: { xs: 2, sm: 3 },
        overflow: "hidden",
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
        gap: 0.75,
        mt: 0.5,
    },
};

const chipSx = {
    color: "rgba(255,255,255,0.9)",
    bgcolor: "rgba(255,255,255,0.09)",
    border: "1px solid rgba(255,255,255,0.13)",
    fontWeight: 600,
    fontSize: "0.7rem",
    height: 27,
    "& .MuiChip-label": { px: 1.2 },
};

const accentChipSx = {
    ...chipSx,
    color: "#c5e1ff",
    bgcolor: "rgba(91,160,230,0.17)",
    borderColor: "rgba(142,197,255,0.28)",
};

function formatMediaType(mediaType) {
    const labels = {
        MOVIE: "Movie",
        TV_SHOW: "TV Show",
        MUSIC_ALBUM: "Music Album",
        BOOK: "Book",
    };

    return labels[mediaType] ?? mediaType?.replaceAll("_", " ") ?? "Media";
}

function formatReleaseDate(releaseDate) {
    if (!releaseDate) return null;

    const [year, month, day] = releaseDate.split("-").map(Number);
    if (!year || !month || !day) return null;

    return new Date(year, month - 1, day).toLocaleDateString(
        undefined,
        { month: "long", day: "numeric", year: "numeric" }
    );
}

function MediaGenres({ genres = [], limit = 3 }) {
    if (!genres?.length) return null;

    return (
        <Stack direction="row" sx={spotlightStyles.chips}>
            {genres.slice(0, limit).map(genre => (
                <Chip
                    key={genre}
                    label={formatGenre(genre)}
                    size="small"
                    sx={chipSx}
                />
            ))}
        </Stack>
    );
}

function MediaFacts({ children }) {
    if (!children?.length) return null;

    return (
        <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            spacing={1.5}
            sx={{ mt: 0.25 }}
        >
            {children.map((fact, index) => (
                <Typography
                    key={`${fact}-${index}`}
                    component="span"
                    sx={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                    }}
                >
                    {fact}
                </Typography>
            ))}
        </Stack>
    );
}

/*
 * Shared responsive card.
 * Individual spotlight components determine which content appears.
 */

function SpotlightCard({
    data,
    eyebrow,
    headline,
    subtitle,
    icon = "✦",
    children,
}) {
    if (!data) return <NoSpotlight />;

    const { coverImgUrl, title, description } = data;

    return (
        <Box sx={spotlightStyles.card}>
            {coverImgUrl && (
                <Box
                    component="img"
                    src={coverImgUrl}
                    alt=""
                    aria-hidden="true"
                    sx={spotlightStyles.artwork}
                />
            )}

            <Box sx={spotlightStyles.overlay} />

            <Box sx={spotlightStyles.content}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 0.25 }}
                >
                    <Box
                        aria-hidden="true"
                        sx={{
                            display: "grid",
                            placeItems: "center",
                            width: 30,
                            height: 30,
                            borderRadius: 2,
                            bgcolor: "rgba(142,197,255,0.14)",
                            color: "#a9d3ff",
                            fontSize: "1rem",
                        }}
                    >
                        {icon}
                    </Box>

                    <Typography sx={spotlightStyles.eyebrow}>
                        {eyebrow}
                    </Typography>
                </Stack>

                <Typography component="h2" sx={spotlightStyles.headline}>
                    {headline}
                </Typography>

                <Box>
                    <Typography sx={spotlightStyles.mediaTitle}>
                        {title}
                    </Typography>

                    {subtitle && (
                        <Typography
                            sx={{
                                mt: 0.5,
                                fontSize: "0.82rem",
                                color: "#a9d3ff",
                                fontWeight: 600,
                            }}
                        >
                            {subtitle}
                        </Typography>
                    )}
                </Box>

                {description && (
                    <Typography sx={spotlightStyles.description}>
                        {description}
                    </Typography>
                )}

                {children}
            </Box>
        </Box>
    );
}

/*
 * 1. ON THIS DAY
 */

function OnThisDay({ data }) {
    if (!data) return <NoSpotlight />;

    const releaseDate = formatReleaseDate(data.releaseDate);
    const releaseYear = data.releaseDate
        ? Number(data.releaseDate.slice(0, 4))
        : null;

    const yearsAgo = releaseYear
        ? new Date().getFullYear() - releaseYear
        : null;

    const anniversaryHeadline =
        yearsAgo > 0
            ? `Released ${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago today`
            : "A day worth remembering";

    return (
        <SpotlightCard
            data={data}
            eyebrow="On this day"
            headline={anniversaryHeadline}
            subtitle={
                releaseDate
                    ? `Originally released ${releaseDate}`
                    : "A release from your collection"
            }
            icon="◷"
        >
            <MediaGenres genres={data.genres} />

            <MediaFacts>
                {data.communityRating != null &&
                    [`★ ${Number(data.communityRating).toFixed(1)} community rating`]}
                {data.consumptionCount > 0 &&
                    [`↻ Watched ${data.consumptionCount} times`]}
            </MediaFacts>
        </SpotlightCard>
    );
}

/*
 * 2. FORGOTTEN FAVORITE
 */

function ForgottenFavorite({ data }) {
    if (!data) return <NoSpotlight />;

    const rating = data.personalRating;
    const hasRating = rating != null;

    return (
        <SpotlightCard
            data={data}
            eyebrow="Forgotten favorite"
            headline="Time for a revisit?"
            subtitle={
                hasRating
                    ? `You rated this ${rating}/10`
                    : "A familiar favorite from your collection"
            }
            icon="♡"
        >
            <MediaGenres genres={data.genres} />

            <MediaFacts>
                {hasRating && [`★ Your rating: ${rating}/10`]}
                {data.consumptionCount > 0 &&
                    [`↻ Watched ${data.consumptionCount} times`]}
            </MediaFacts>
        </SpotlightCard>
    );
}

/*
 * 3. GENRE SHOUTOUT
 */

function GenreShoutout({ data }) {
    if (!data) return <NoSpotlight />;

    const featuredGenre = data.genres?.[0];

    return (
        <SpotlightCard
            data={data}
            eyebrow="Genre shoutout"
            headline={
                featuredGenre
                    ? `Your ${formatGenre(featuredGenre)} era`
                    : "A little more of what you love"
            }
            subtitle="A spotlight from your personal collection"
            icon="✧"
        >
            <MediaGenres genres={data.genres} />

            <MediaFacts>
                {data.personalRating != null &&
                    [`★ Your rating: ${data.personalRating}/10`]}
                {data.consumptionCount > 0 &&
                    [`↻ Watched ${data.consumptionCount} times`]}
            </MediaFacts>
        </SpotlightCard>
    );
}

/*
 * 4. RANDOM SPOTLIGHT
 */

function RandomSpotlight({ data }) {
    if (!data) return <NoSpotlight />;

    return (
        <SpotlightCard
            data={data}
            eyebrow="Your daily discovery"
            headline="Rediscover something great."
            subtitle={`${formatMediaType(data.mediaType)} from your collection`}
            icon="✦"
        >
            <MediaGenres genres={data.genres} />

            <MediaFacts>
                {data.personalRating != null &&
                    [`★ Your rating: ${data.personalRating}/10`]}
                {data.communityRating != null &&
                    [`★ Community: ${Number(data.communityRating).toFixed(1)}`]}
                {data.consumptionCount > 0 &&
                    [`↻ Watched ${data.consumptionCount} times`]}
            </MediaFacts>
        </SpotlightCard>
    );
}

/*
 * 5. TOP TRENDING
 */

function TopTrending({ data }) {
    if (!data) return <NoSpotlight />;

    return (
        <SpotlightCard
            data={data}
            eyebrow="Community spotlight"
            headline="Trending with the community."
            subtitle={`${formatMediaType(data.mediaType)} making waves`}
            icon="↗"
        >
            <MediaGenres genres={data.genres} />

            <MediaFacts>
                {data.communityRating != null &&
                    [`★ ${Number(data.communityRating).toFixed(1)} community rating`]}
                {data.personalRating != null &&
                    [`Your rating: ${data.personalRating}/10`]}
            </MediaFacts>
        </SpotlightCard>
    );
}

/*
 * EMPTY STATE
 */

function NoSpotlight() {
    return (
        <Box
            sx={{
                ...spotlightStyles.card,
                minHeight: { xs: 230, sm: 245 },
                justifyContent: "center",
                textAlign: "center",
                background:
                    "radial-gradient(ellipse at 80% 20%, rgba(76,130,190,0.18), transparent 48%), #191919",
            }}
        >
            <Stack
                alignItems="center"
                spacing={1.5}
                sx={{ width: "100%", px: 3, py: 4 }}
            >
                <Box
                    sx={{
                        display: "grid",
                        placeItems: "center",
                        width: 52,
                        height: 52,
                        borderRadius: 3,
                        bgcolor: "rgba(142,197,255,0.12)",
                        color: "#a9d3ff",
                        fontSize: "1.6rem",
                    }}
                >
                    ✧
                </Box>

                <Typography
                    component="h2"
                    sx={{ fontSize: "1.3rem", fontWeight: 800 }}
                >
                    Your next spotlight awaits.
                </Typography>

                <Typography
                    sx={{
                        maxWidth: 360,
                        color: "rgba(255,255,255,0.65)",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                    }}
                >
                    Add media to your library to unlock daily discoveries,
                    forgotten favorites, and memorable release anniversaries.
                </Typography>
            </Stack>
        </Box>
    );
}

/*
 * DASHBOARD COMPONENT
 */

function DashboardDailySpotlight() {
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function fetchSpotlightSafely(apiCallback) {
            try {
                return await apiCallback();
            } catch (error) {
                if (error.status === 404) {
                    return null;
                }

                throw error;
            }
        }

        async function fetchSpotlight() {
            const defaultComponent = {component: OnThisDay, apiCallback: getSpotlightOnThisDay};

            const otherComponents = [
                { component: ForgottenFavorite, apiCallback: getSpotlightForgottenFavorite },
                { component: GenreShoutout, apiCallback: getSpotlightGenreShoutout },
                { component: RandomSpotlight, apiCallback: getSpotlightRandomSpotlight },
                { component: TopTrending, apiCallback: getSpotlightTopTrending }
            ];

            const hasData = (response) => {
                return Object.keys(response?.data ?? {}).length > 0;
            }
                
            try {
                // Always try OnThisDay first.
                let chosen = defaultComponent;
                let response = await fetchSpotlightSafely(chosen.apiCallback);

                if (!hasData(response)) {
                    // Try a daily-selected spotlight.
                    chosen = otherComponents[getDailyRandom()];
                    response = await fetchSpotlightSafely(chosen.apiCallback);
                }

                if (!hasData(response) && chosen.component !== RandomSpotlight) {
                    
                    // Last resort: RandomSpotlight.
                    chosen = otherComponents.find(
                        item => item.component === RandomSpotlight
                    );
                    response = await fetchSpotlightSafely(chosen.apiCallback);
                }

                if (!cancelled) {
                    setSelected(
                        hasData(response)
                            ? {
                                component: chosen.component,
                                data: response.data
                            }
                            : null
                    );
                }
            } catch (error) {
                console.error("Failed to fetch daily spotlight:", error);

                if (!cancelled) {
                    setSelected(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchSpotlight();

        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    ...spotlightStyles.card,
                    minHeight: 200,
                    px: 3,
                }}
            >
                <Typography sx={{ color: "rgba(255,255,255,0.65)" }}>
                    Finding your daily spotlight...
                </Typography>
            </Box>
        );
    }

    const ComponentToRender = selected?.component ?? NoSpotlight;

    return (
        <Box sx={{ width: "100%", minWidth: 0 }}>
            <ComponentToRender data={selected?.data} />
        </Box>
    );
}

export default DashboardDailySpotlight;
