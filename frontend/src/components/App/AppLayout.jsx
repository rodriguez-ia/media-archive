import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SideNavBar from "./SideNavBar.jsx";
import Header from "./Header.jsx";

function AppLayout() {
    return (
        <Box className="app-layout" sx={{ display: 'flex' }}>
            <SideNavBar />

            <Box component="main" sx={{ flexGrow: 1 }}>
                <Header />
                <Outlet />
            </Box>
        </Box>
    );
}

export default AppLayout;