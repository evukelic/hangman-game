import { createTheme } from "@mui/material";

import { ColorPalette } from "./enums";

export const THEME = createTheme({
  palette: {
    primary: {
      main: ColorPalette.PRIMARY,
    },
    secondary: {
      main: ColorPalette.SECONDARY,
    },
    info: {
      main: ColorPalette.INFO,
    },
  },
  typography: {
    fontFamily: "Pencil",
  },
});
