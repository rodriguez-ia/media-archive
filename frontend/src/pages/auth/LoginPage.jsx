import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { loginUser } from "../../services/authService.js";

function LoginPage() {

    const [username, setUsername] = useState("");
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
                password
            };

            const response = await loginUser(request);

            setMessage(`Login successful`);

            localStorage.setItem("token", response.data.token);
            console.log("JWT:\n" + JSON.stringify(response.data.token));
        } catch (error) {
            if (error.message) {
                setMessage(error.message.detail);
            } else {
                setMessage("Login failed");
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4}}>
                <Typography variant="h4">
                    Log In
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
                            {loading ? (<CircularProgress size={24}/>) : ("Submit")}
                        </Button>
                    </Stack>
                </form>

                {message && (<Typography>{message}</Typography>)}

                <Typography>
                    <Link to="/register">Not a user? Sign up.</Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default LoginPage;