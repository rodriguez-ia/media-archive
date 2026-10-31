import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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
        backgroundColor: "#111",
        borderBottom: "1px solid #333",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "62px",
          px: 3,
        }}
      >
        <Typography
          component={Link}
          to="/dashboard"
          variant="h6"
          sx={{
            color: "white",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Media Archive
        </Typography>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        <Box>
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