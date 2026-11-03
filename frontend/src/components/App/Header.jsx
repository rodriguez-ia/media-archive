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

        <Box
          component={Link}
          to="/dashboard"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            position: "relative",
            zIndex: 1,
            textDecoration: "none",
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="Media Archive logo"
            sx={{
              height: {
                xs: "45px",
                sm: "50px",
                md: "55px",
                lg: "65px",
                xl: "75px",
              },
              width: "auto",
            }}
          />

          {/* App name */}
          <Typography
            sx={{
              fontFamily: '"Pacifico", serif',
              fontSize: {
                xs: "1.1rem",
                sm: "1.3rem",
                md: "1.5rem",
                lg: "1.7rem",
              },
              color: "#fef7ff",
              letterSpacing: "1px",
              textShadow: `
                0 0 2px #fff,
                0 0 5px #DCCBFF,
                0 0 10px #DCCBFF,
                0 0 20px #e3d6ff,
                0 0 35px #e3d6ff
              `,
              whiteSpace: "nowrap",
            }}
          >
            Media Archive
          </Typography>
        </Box>

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
              whiteSpace: "nowrap",
              cursor: "pointer",
              color: "#fef7ff",
              "&:hover": {
                color: "#bbb",
              }
            }}
          >
            <PersonIcon />

            <Typography
              sx={{
                color: "inherit",
                letterSpacing: "2px",
                textShadow: `
                  0 0 2px #fff,
                  0 0 5px #d0b8ff,
                  0 0 10px #d0b8ff,
                  0 0 20px #d3befd,
                  0 0 35px #d3befd
                `,
                fontFamily: '"Pacifico", cursive',
                fontSize: {
                  xs: "0.9rem",
                  sm: "1.0rem",
                  md: "1.1rem",
                },
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