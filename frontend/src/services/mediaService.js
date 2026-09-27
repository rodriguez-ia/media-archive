const API_BASE_URL = "http://localhost:8080/api";

async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
    }

    const body = await response.json();

    if (!response.ok) {
        const error = new Error(body.message || "Request failed");
        error.status = response.status;
        throw error;
    }

    return body;
}

export async function getUserLibrary() {
    return apiFetch("/media/library");
}

export async function addToUserLibrary(mediaItems) {
    return apiFetch("/media/library",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mediaItems)
    });
}

export async function deleteUserMediaItems(mediaItems) {
    return apiFetch("/media/library", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mediaItems)
    });
}

export async function fetchSubItemMedia(externalId) {
    return apiFetch(`/media/library/${encodeURIComponent(externalId)}`);
}

export async function updateUserMediaItems(mediaItemDetailsObj) {
    return apiFetch("/media/library",{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mediaItemDetailsObj)
    });
}

export async function searchExternalMedia(
    keyword,
    page,
    shouldSearchMoviesAndTV,
    shouldSearchMusic,
    shouldSearchBooks
) {
    const params = new URLSearchParams({
        keyword,
        page,
        shouldSearchMoviesAndTV,
        shouldSearchMusic,
        shouldSearchBooks
    });

    return apiFetch(`/media/externalMedia?${params}`);
}

export async function getMusicTrackDetails(externalId) {
    return apiFetch(`/media/externalMedia/music/track/${encodeURIComponent(externalId)}`);
}
