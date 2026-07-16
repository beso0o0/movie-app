import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import { KeyboardEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 999,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.72)",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.9)",
  },
  marginLeft: 0,
  width: "100%",
  border: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === "dark" ? 0.08 : 0.55)}`,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Trending", to: "/features" },
  { label: "Library", to: "/all-movies" },
  { label: "Coming Soon", to: "/upcoming" },
];

type NavbarProps = {
  mode: "light" | "dark";
  onToggleMode: () => void;
};

function Navbar({ mode, onToggleMode }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "rgba(7,17,31,0.78)" : "rgba(243,239,231,0.78)",
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ gap: 2, flexWrap: "wrap", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(255,107,53,1), rgba(46,196,182,0.95))",
                display: "grid",
                placeItems: "center",
                color: "#08111d",
                fontWeight: 900,
              }}
            >
              M
            </Box>
            <Box>
              <Typography variant="h6" component="div" sx={{ lineHeight: 1 }}>
                Movie Explorer
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Curated nights, fast search, cleaner browsing
              </Typography>
            </Box>
          </Box>

          <Box
            component="ul"
            sx={{
              display: "flex",
              listStyle: "none",
              gap: 2,
              margin: 0,
              padding: 0,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {navLinks.map((link) => (
              <Box component="li" key={link.to}>
                <Button
                  component={Link}
                  to={link.to}
                  color="inherit"
                  sx={{
                    color: "text.primary",
                    px: 1.5,
                    minWidth: 0,
                    backgroundColor: "transparent",
                  }}
                >
                  {link.label}
                </Button>
              </Box>
            ))}
          </Box>

          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleSearchSubmit}
            />
          </SearchContainer>

          <IconButton
            onClick={onToggleMode}
            aria-label="Toggle theme"
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.65)",
            }}
          >
            {mode === "dark" ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
