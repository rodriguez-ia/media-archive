import { useState } from "react";
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { registerUser } from "../services/authService.js";

function RegisterPage() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    const [message, setMessage] = useState("");

    const validateForm = () => {
        const errors = {};

        // Username validation
        if (!username.trim()) {
            errors.username = "Username is required";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            errors.email = "Invalid email address";
        }

        // Password validation
        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        return errors;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            const request = {
                username,
                email,
                password
            };

            const response = await registerUser(request);

            setMessage(`User registered successfully: ${response.username}`);
        } catch (error) {
            setMessage("Registration failed");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4}}>
                <Typography variant="h4">
                    Create Account
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField 
                            label="Username"
                            value={username}
                            error={!!errors.username}
                            helperText={errors.username}
                            onChange={(e) => {
                                setUsername(e.target.value);

                                setErrors(prev => ({
                                    ...prev,
                                    username: ""
                                }));
                            }}
                        />

                        <TextField
                            label="Email"
                            value={email}
                            error={!!errors.email}
                            helperText={errors.email}
                            onChange={(e) => {
                                setEmail(e.target.value);

                                setErrors(prev => ({
                                    ...prev,
                                    email: ""
                                }));
                            }}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            error={!!errors.password}
                            helperText={errors.password}
                            onChange={(e) => {
                                setPassword(e.target.value);

                                setErrors(prev => ({
                                    ...prev,
                                    password: ""
                                }));
                            }}
                        />

                        <Button
                            variant="contained"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (<CircularProgress size={24}/>) : ("Register")}
                        </Button>
                    </Stack>
                </form>

                {message && (<Typography>{message}</Typography>)}
            </Paper>
        </Container>
    );
}

export default RegisterPage;