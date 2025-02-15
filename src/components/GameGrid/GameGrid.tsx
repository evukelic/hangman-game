import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { Link } from "react-router";

import { GameStatus, RoutePath } from "../../utils/enums";
import styles from "./GameGrid.module.css";
import HangmanIcon from "./HangmanIcon";

interface GameGridProps {
  readonly errorCount: number;
  readonly gameStatus: GameStatus;
  readonly resetGame: () => void;
}

const GameGrid = ({ errorCount, gameStatus, resetGame }: GameGridProps) => {
  const getTextForErrorCount = (errorCount: number) => {
    if (errorCount === 1) {
      return "Oops... 1 error!";
    }

    return `Oops... ${errorCount} errors!`;
  };

  return (
    <Grid2 container width="100%">
      <Grid2 size={4} className={styles.errorItem}>
        {errorCount && gameStatus === GameStatus.PLAYING ? (
          <Typography variant="h4" className={styles.errorText}>
            {getTextForErrorCount(errorCount)}
          </Typography>
        ) : null}
      </Grid2>

      <Grid2 size={4} className={styles.gallows}>
        <HangmanIcon gameStatus={gameStatus} errorCount={errorCount} />
      </Grid2>

      <Grid2 size={4} className={styles.actions}>
        <Box className={styles.actionsContainer}>
          <Button
            variant="contained"
            size="small"
            startIcon={<ReplayIcon />}
            onClick={resetGame}
          >
            New Quote
          </Button>

          {gameStatus === GameStatus.WON && (
            <Link to={RoutePath.LEADERBOARD}>
              <Button
                variant="contained"
                size="small"
                className={styles.leaderboardBtn}
              >
                Show Leaderboard
              </Button>
            </Link>
          )}
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default GameGrid;
