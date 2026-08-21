import { Link, useNavigate, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SideNavBar from "./SideNavBar.jsx";
import Header from "./Header.jsx";

function AppLayout() {
    return (
        <Box className="app-layout"
             sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh"
                }}>
            <Header />

            <Box sx={{
                    display: "flex",
                    flexGrow: 1,
                    minHeight: 0
                 }}>
                <SideNavBar />

                <Box component="main" sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default AppLayout;