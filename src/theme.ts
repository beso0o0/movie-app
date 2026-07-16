import { PaletteMode, alpha, createTheme } from "@mui/material/styles";

const primary = "#ff6b35";
const secondary = "#2ec4b6";

export function getAppTheme(mode: PaletteMode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
      background: {
        default: isDark ? "#07111f" : "#f3efe7",
        paper: isDark ? "#0f1b2d" : "#fff9f1",
      },
      text: {
        primary: isDark ? "#f6f2ea" : "#1a2233",
        secondary: isDark ? "#a8b4c7" : "#52607a",
      },
      divider: isDark ? "rgba(255,255,255,0.08)" : "rgba(15, 23, 42, 0.08)",
    },
    shape: {
      borderRadius: 20,
    },
    typography: {
      fontFamily: '"Aptos", "Trebuchet MS", "Segoe UI", sans-serif',
      h1: {
        fontFamily: '"Arial Nova", "Aptos", sans-serif',
        fontWeight: 800,
        letterSpacing: "-0.04em",
      },
      h2: {
        fontFamily: '"Arial Nova", "Aptos", sans-serif',
        fontWeight: 800,
        letterSpacing: "-0.03em",
      },
      h3: {
        fontWeight: 800,
        letterSpacing: "-0.03em",
      },
      h4: {
        fontWeight: 800,
        letterSpacing: "-0.02em",
      },
      h5: {
        fontWeight: 700,
      },
      button: {
        fontWeight: 700,
        textTransform: "none",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: isDark
              ? "radial-gradient(circle at top, rgba(46,196,182,0.16), transparent 24%), radial-gradient(circle at 20% 20%, rgba(255,107,53,0.22), transparent 20%), #07111f"
              : "radial-gradient(circle at top, rgba(46,196,182,0.18), transparent 24%), radial-gradient(circle at 20% 20%, rgba(255,107,53,0.14), transparent 20%), #f3efe7",
          },
          "::selection": {
            backgroundColor: alpha(primary, 0.35),
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backdropFilter: "blur(18px)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 20,
            paddingBlock: 10,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: isDark
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(15,23,42,0.07)",
            boxShadow: isDark
              ? "0 22px 45px rgba(0, 0, 0, 0.34)"
              : "0 20px 45px rgba(98, 78, 55, 0.12)",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },
    },
  });
}
