const API_BASE_URL = "http://localhost:8080/api";

export async function registerUser(registerRequest) {
    const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // TODO: standardize request json?
            body: JSON.stringify(registerRequest)
        }
    );

    if (!response.ok) {
        throw new Error("Registration failed.");
    }

    return response.json();
}