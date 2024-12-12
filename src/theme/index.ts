import { createTheme, Theme } from "@mui/material";

// :root {
//   --primary-color: #3498db; /* Azul */
//   --secondary-color: #2ecc71; /* Verde */
//   --accent-color: #e74c3c; /* Rojo */
//   --neutral-color: #ecf0f1; /* Gris Claro */
//   --dark-color: #2c3e50; /* Gris Oscuro */
// }

const colors = {
  primary: "#3498db",
  secondary: "#2ecc71",
  accent: "#e74c3c",
  neutral: "#ecf0f1",
  dark: "#2c3e50",
};

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: colors.dark,
    },
    info: {
      main: colors.neutral,
    },
    secondary: {
      main: colors.secondary,
    },
    error: {
      main: colors.accent,
    },
    text: {
      primary: colors.dark,
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});
