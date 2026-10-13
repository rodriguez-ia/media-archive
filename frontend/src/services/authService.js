const API_BASE_URL = "http://localhost:8080/api/auth";

export async function registerUser(registerRequest) {
    const response = await fetch(
        `${API_BASE_URL}/register`,
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

export async function loginUser(loginRequest) {
    const response = await fetch(
        `${API_BASE_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginRequest)
        }
    );

    const body = await response.json();

    if (!response.ok) {
        throw body;
    }

    return body;
}