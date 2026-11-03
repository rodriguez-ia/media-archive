import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from "../../assets/app-logo.svg";
import headerBackground from "../../assets/header-background.webp";
import PersonIcon from "@mui/icons-material/Person"
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Menu,
  MenuItem
} from "@mui/material";

function Header() {
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const userMenuOpen = Boolean(userMenuAnchor);

  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.sub);
    }
  }, []);

  const handleUsernameClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#050915",
        borderBottom: "1px solid #333",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "62px",
          px: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <Box
          component="img"
          src={headerBackground}
          alt=""
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: {
              xs: "400px",
              md: "500px",
              lg: "550px",
              xl: "650px",
            },
            objectFit: "cover",
            objectPosition: "left center",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="Media Archive"
          sx={{
            position: "relative",
            height: {
              xs: "45px",
              sm: "50px",
              md: "55px",
              lg: "65px",
              xl: "75px",
            },
            width: "auto",
            zIndex: 1,
          }}
        />

        {/* Spacer */}
        <Box sx={{ flexGrow: 1, zIndex: 1 }} />

        <Box
        sx={{
          position: "relative",
          zIndex: 1
        }}
        >
          <Box
            onClick={handleUsernameClick}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "white",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 500,
              "&:hover": {
                color: "#bbb",
              }
              }}
          >
            <PersonIcon fontSize="small" />

            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              {username}
            </Typography>
          </Box>

          <Menu
            anchorEl={userMenuAnchor}
            open={userMenuOpen}
            onClose={handleUserMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              component={Link}
              to="/login"
              onClick={() => {
                handleLogout();
                handleUserMenuClose();
              }}
              sx={{
                fontSize: "0.875rem",
                color: "error.main",
              }}
            >
              Log out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;