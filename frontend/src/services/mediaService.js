const API_BASE_URL = "http://localhost:8080/api";

export async function getUserLibrary(request) {
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

export async function addToUserLibrary(request) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}/media/library`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(request)
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