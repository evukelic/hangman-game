import { Alert, Snackbar } from "@mui/material";

const ErrorSnackbar = ({ error }: { error: string }) => {
  return (
    <Snackbar
      open={error !== ""}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
