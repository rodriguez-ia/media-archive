import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import SideNavBar from "./SideNavBar.jsx";

function AppLayout() {
    return (
        <div className="app-layout">
            <SideNavBar />

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;