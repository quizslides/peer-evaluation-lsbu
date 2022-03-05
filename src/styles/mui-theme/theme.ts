import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F3F4F6",
    },
    primary: {
      main: grey[600],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 481,
      md: 769,
      lg: 1025,
      xl: 1201,
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          height: 0,
        },
      },
    },
  },
});

export default theme;
