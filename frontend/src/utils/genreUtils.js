const specialGenreLabels = {
    R_AND_B: "R & B",
    RAP_HIP_HOP: "Rap / Hip Hop",
    SCI_FI_FANTASY: "Sci-Fi Fantasy",
    SCIENCE_FICTION: "Science Fiction",
    TV_MOVIE: "TV Movie",
    WAR_POLITICS: "War & Politics",
};

export const formatGenre = (genre) => {
    if (!genre) return "";

    if (specialGenreLabels[genre]) {
        return specialGenreLabels[genre];
    }

    return genre
        .split("_")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase()
        )
        .join(" ");

};

const genreColors = {
    ACTION: {
    backgroundColor: "#7f1d1d",
    color: "#fecaca",
    },
    ACTION_ADVENTURE: {
    backgroundColor: "#78350f",
    color: "#fde68a",
    },
    ADVENTURE: {
    backgroundColor: "#854d0e",
    color: "#fef3c7",
    },
    ANIMATION: {
    backgroundColor: "#4c1d95",
    color: "#ddd6fe",
    },
    COMEDY: {
    backgroundColor: "#713f12",
    color: "#fef08a",
    },
    CRIME: {
    backgroundColor: "#374151",
    color: "#e5e7eb",
    },
    DOCUMENTARY: {
    backgroundColor: "#1e3a5f",
    color: "#bfdbfe",
    },
    DRAMA: {
    backgroundColor: "#581c87",
    color: "#e9d5ff",
    },
    FAMILY: {
    backgroundColor: "#14532d",
    color: "#bbf7d0",
    },
    FANTASY: {
    backgroundColor: "#4c1d95",
    color: "#e9d5ff",
    },
    HISTORY: {
    backgroundColor: "#713f12",
    color: "#fde68a",
    },
    HORROR: {
    backgroundColor: "#7f1d1d",
    color: "#fecaca",
    },
    MYSTERY: {
    backgroundColor: "#312e81",
    color: "#c7d2fe",
    },
    REALITY: {
    backgroundColor: "#164e63",
    color: "#a5f3fc",
    },
    ROMANCE: {
    backgroundColor: "#831843",
    color: "#fbcfe8",
    },
    SCIENCE_FICTION: {
    backgroundColor: "#14532d",
    color: "#bbf7d0",
    },
    SCI_FI_FANTASY: {
    backgroundColor: "#064e3b",
    color: "#a7f3d0",
    },
    THRILLER: {
    backgroundColor: "#3f3f46",
    color: "#e4e4e7",
    },
    WAR: {
    backgroundColor: "#3f6212",
    color: "#d9f99d",
    },
    WAR_POLITICS: {
    backgroundColor: "#365314",
    color: "#d9f99d",
    },
    WESTERN: {
    backgroundColor: "#78350f",
    color: "#fed7aa",
    },
};

const defaultGenreStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    color: "rgba(255, 255, 255, 0.7)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
};

export const getGenreSx = (genre, mediaType) => {
    // Music genres and OTHER always get subtle styling
    if (
        mediaType === "MUSIC_ALBUM" ||
        genre === "OTHER"
    ) {
        return defaultGenreStyle;
    }

    return genreColors[genre] || defaultGenreStyle;

};
