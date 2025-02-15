import { Box } from "@mui/material";

import HangmanLogoSvg from "../assets/icons/hangman_logo.svg";
import StartForm from "../components/StartForm";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <Box className={styles.container}>
      <img
        src={HangmanLogoSvg}
        alt="Hangman Logo"
        className={styles.hangmanLogo}
      />

      <StartForm />
    </Box>
  );
};

export default Home;
