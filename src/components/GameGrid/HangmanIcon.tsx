import { useEffect, useState } from "react";

import {
  HANGMAN_ALIVE_URL,
  HANGMAN_DEAD_URL,
  HANGMAN_ERROR_URL,
} from "../../utils/constants";
import { GameStatus } from "../../utils/enums";
import HangmanIconItem from "./HangmanIconItem";

interface HangmanIconProps {
  readonly gameStatus: GameStatus;
  readonly errorCount: number;
}

const HangmanIcon = ({ gameStatus, errorCount }: HangmanIconProps) => {
  const [iconUrl, setIconUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    switch (gameStatus) {
      case GameStatus.WON:
        setIconUrl(HANGMAN_ALIVE_URL);
        break;
      case GameStatus.PLAYING:
        setIconUrl(HANGMAN_ERROR_URL.replace("%s", errorCount.toString()));
        break;
      case GameStatus.LOST:
        setIconUrl(HANGMAN_DEAD_URL);
        break;
    }
  }, [gameStatus, errorCount]);

  return <>{iconUrl && <HangmanIconItem url={iconUrl} />}</>;
};

export default HangmanIcon;
