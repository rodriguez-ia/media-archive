const API_BASE_URL = "http://localhost:8080/api";

export async function registerUser(registerRequest) {
    const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerRequest)
        }
    );

     const body = await response.json();

    if (!response.ok) {
        throw body;
    }

    return body;
}