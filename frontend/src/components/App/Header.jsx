import { Link } from "react-router-dom";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";

function Header() {
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

        <Button
          component={Link}
          to="/profile"
          sx={{
            color: "white",
          }}
        >
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;