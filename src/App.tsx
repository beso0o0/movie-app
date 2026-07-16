import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AllMovies from "./component/AllMovies/AllMovies";
import Features from "./component/Features/Features";
import Home from "./component/Home";
import MovieDetails from "./component/MovieDetails";
import Search from "./component/Search";
import Upcoming from "./component/Upcoming/Upcoming";
import { getAppTheme } from "./theme";
import "./App.css";

function App() {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const savedMode = window.localStorage.getItem("movie-theme-mode");
    return savedMode === "light" || savedMode === "dark" ? savedMode : "dark";
  });

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  const toggleMode = (): void => {
    setMode((currentMode) => {
      const nextMode = currentMode === "dark" ? "light" : "dark";
      window.localStorage.setItem("movie-theme-mode", nextMode);
      return nextMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box className="app-shell">
          <Navbar mode={mode} onToggleMode={toggleMode} />
          <Box component="main" className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/all-movies" element={<AllMovies />} />
              <Route path="/features" element={<Features />} />
              <Route path="/search" element={<Search />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
