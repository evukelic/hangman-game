/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ErrorSnackbar from "../components/ErrorSnackbar";
import GameGrid from "../components/GameGrid/GameGrid";
import LetterButton from "../components/LetterButton";
import Quote from "../components/Quote/Quote";
import { useQuote } from "../hooks/useQuote";
import { useStopwatch } from "../hooks/useStopwatch";
import { RootState } from "../redux/store";
import HighScoreAPI, { HighScoreModel } from "../services/highScoreAPI";
import QuotableAPI from "../services/quotableAPI";
import { ALPHABET } from "../utils/constants";
import { APIFetchStatus, GameStatus } from "../utils/enums";
import styles from "./Game.module.css";

const MAX_ERRORS = 6;
const SCORE_ERROR_MESSAGE = "Error sending score to server";

const Game = () => {
  const [quotePromiseFn, setQuotePromiseFn] = useState(
    () => () => QuotableAPI.getRandomQuote().then((result) => result.data)
  );
  const { quoteData, status } = useQuote(quotePromiseFn);
  const { getTime, startStopwatch, stopStopwatch, resetStopwatch } =
    useStopwatch();

  const [quote, setQuote] = useState<string>("");
  const [quoteId, setQuoteId] = useState<string>("");
  const [uniqueChars, setuniqueChars] = useState<number>(0);

  const [charsFound, setCharsFound] = useState<Set<string>>(new Set());
  const [lettersClicked, setLettersClicked] = useState<Set<string>>(new Set());
  const [errorCount, setErrorCount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const userName = useSelector((state: RootState) => state.username);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PLAYING);

  const [scoreError, setScoreError] = useState<string>("");

  useEffect(() => {
    if (status === APIFetchStatus.SUCCESS && quoteData) {
      const content = quoteData.content.toLowerCase();
      const uniqueLetters = new Set(content.replace(/[^a-z]/g, "")).size;
      const quoteId = quoteData._id;

      setQuote(content);
      setuniqueChars(uniqueLetters);
      setQuoteId(quoteId);

      startStopwatch();
    }
  }, [status]);

  const fetchAnotherQuote = useCallback(() => {
    setQuotePromiseFn(
      () => () => QuotableAPI.getRandomQuote().then((res) => res.data)
    );
  }, []);

  const sendNewScore = useCallback(() => {
    const params: HighScoreModel = {
      quoteId,
      length: quote.length,
      uniqueCharacters: uniqueChars,
      userName,
      errors: errorCount,
      duration: getTime(),
    };

    HighScoreAPI.sendScore(params)
      .then((response) => {
        console.log(response);

        if (scoreError !== "") {
          setScoreError("");
        }
      })
      .catch((error) => {
        setScoreError(SCORE_ERROR_MESSAGE);
        console.error(error);
      });
  }, [quoteId, quote.length, uniqueChars, userName, errorCount, getTime]);

  useEffect(() => {
    if (errorCount === MAX_ERRORS) {
      setGameStatus(GameStatus.LOST);
      stopStopwatch();
    }
  }, [errorCount]);

  useEffect(() => {
    if (correctCount === uniqueChars && uniqueChars > 0) {
      setGameStatus(GameStatus.WON);
      stopStopwatch();
      sendNewScore();
    }
  }, [correctCount]);

  const handleLetterClick = (letter: string) => {
    if (gameStatus !== GameStatus.PLAYING) return;

    setLettersClicked((prev) => new Set(prev).add(letter));

    for (let i = 0; i < quote.length; i++) {
      if (quote[i] === letter) {
        setCharsFound((prev) => new Set(prev).add(letter));
        setCorrectCount((prev) => prev + 1);
        return;
      }
    }

    setErrorCount((prev) => prev + 1);
  };

  const resetGame = () => {
    setQuote("");
    setCharsFound(new Set());
    setLettersClicked(new Set());
    setErrorCount(0);
    setCorrectCount(0);
    setGameStatus(GameStatus.PLAYING);
    resetStopwatch();

    fetchAnotherQuote();
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.grid}>
        <GameGrid
          errorCount={errorCount}
          gameStatus={gameStatus}
          resetGame={resetGame}
        />
      </Box>

      <Box className={styles.quote}>
        <Quote
          quote={quote}
          charsFound={charsFound}
          apiStatus={status}
          gameStatus={gameStatus}
        />
      </Box>

      <Box className={styles.alphabet}>
        {ALPHABET.map((letter, index) => (
          <LetterButton
            key={index}
            letter={letter}
            index={index}
            disabled={lettersClicked.has(letter)}
            onClick={() => handleLetterClick(letter)}
          />
        ))}
      </Box>

      {scoreError && <ErrorSnackbar error={scoreError} />}
    </Box>
  );
};

export default Game;
