import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    dark: {
      main: string;
      light: string;
    };
  }
  interface PaletteOptions {
    dark: {
      main: string;
      light: string;
    };
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
  palette: {
    primary: {
      main: "#9956F6",
      contrastText: "#FFFFFF",
    },
    dark: {
      main: "#121214",
      light: "#1A1A1E",
    },
    background: {
      default: "#121214",
      paper: "#1A1A1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
