import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import ErrorSnackbar from "../components/ErrorSnackbar";
import LeaderboardList from "../components/LeaderboardList/LeaderboardList";
import HighScoreAPI, { HighScoreModel } from "../services/highScoreAPI";
import { RoutePath } from "../utils/enums";
import { calculateScore } from "../utils/scoreCalculator";
import styles from "./Leaderboard.module.css";

export interface LeaderboardProps {
  readonly userName: string;
  readonly score: number;
}

const LEADERBOARD_ERROR_MESSAGE = "Error fetching leaderboard data";
const MAX_ERRORS = 6;

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardProps[]>(
    []
  );
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsDataLoading(true);

    HighScoreAPI.getHighScores()
      .then((highScores: AxiosResponse<HighScoreModel[]>) => {
        const scoredData = highScores.data.map((score) => {
          const { userName, uniqueCharacters, errors, duration, length } =
            score;
          const calculatedScore = calculateScore(
            errors,
            uniqueCharacters,
            duration,
            length
          );

          return {
            userName,
            errors,
            score: calculatedScore,
          };
        });

        const sortedHighscores = scoredData.sort((a, b) => b.score - a.score);
        const validHighscores = sortedHighscores.filter(
          (score) => score.errors < MAX_ERRORS
        );
        setLeaderboardData(validHighscores);
      })
      .catch((error) => {
        setError(LEADERBOARD_ERROR_MESSAGE);
        console.error(error);
      })
      .finally(() => {
        setIsDataLoading(false);
      });
  }, []);

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <Typography variant="h3">Leaderboard</Typography>

        <Tooltip title="Back to Game">
          <Link to={RoutePath.GAME}>
            <Button variant="contained" className={styles.backButton}>
              <ArrowBackIcon />
            </Button>
          </Link>
        </Tooltip>
      </Box>
      <LeaderboardList data={leaderboardData} isDataLoading={isDataLoading} />

      {error && <ErrorSnackbar error={error} />}
    </Box>
  );
};

export default Leaderboard;
