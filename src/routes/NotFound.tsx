import { Box, Typography } from "@mui/material";

import NotFoundSvg from "../assets/icons/not_found.svg";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <Box className={styles.container}>
      <img
        src={NotFoundSvg}
        alt="Page Not Found"
        className={styles.notFoundImg}
      />
      <Typography variant="h3" className={styles.notFoundText}>
        Page Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;
