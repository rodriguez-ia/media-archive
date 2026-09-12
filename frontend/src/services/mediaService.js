const API_BASE_URL = "http://localhost:8080/api";

export async function getUserLibrary() {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/media/library`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const body = await response.json();

    if (!response.ok) {
        const error = new Error(body.message || "Request failed");
        error.status = response.status;
        throw error;
    }

    return body;
}

export async function addToUserLibrary(mediaItems) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/media/library`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(mediaItems)
        }
    );

    const body = await response.json();

    if (!response.ok) {
        const error = new Error(body.message || "Request failed");
        error.status = response.status;
        throw error;
    }

    return body;
}

export async function searchExternalMedia(
    keyword,
    page,
    shouldSearchMoviesAndTV,
    shouldSearchMusic,
    shouldSearchBooks
) {
    const token = localStorage.getItem("token");

    const params = new URLSearchParams({
        keyword,
        page,
        shouldSearchMoviesAndTV,
        shouldSearchMusic,
        shouldSearchBooks
    });

    const response = await fetch(
        `${API_BASE_URL}/media/externalMedia?${params}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    const body = await response.json();

    if (!response.ok) {
        const error = new Error(body.message || "Request failed");
        error.status = response.status;
        throw error;
    }

    return body;
}
