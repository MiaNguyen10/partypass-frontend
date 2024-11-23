import { createTheme } from "@mui/material/styles";
import shadows from "@mui/material/styles/shadows";

const theme = createTheme({
  shadows: shadows.map(() => "none"),
  palette: {
    primary: {
      main: "#222831",
    },
  },
  typography: {},
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1440,
      xl: 1536,
    },
  },
  components: {},
});

export default theme;
