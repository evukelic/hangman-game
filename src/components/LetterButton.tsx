import { Button, Grow } from "@mui/material";

import styles from "./LetterButton.module.css";

interface LetterButtonProps {
  readonly letter: string;
  readonly index: number;
  readonly disabled: boolean;
  readonly onClick?: () => void;
}

const LetterButton = ({
  letter,
  index,
  disabled,
  onClick,
}: LetterButtonProps) => {
  return (
    <Grow in={true} timeout={index * 100}>
      <Button
        variant="contained"
        color="info"
        disabled={disabled}
        onClick={onClick}
        className={styles.letterButton}
      >
        {letter}
      </Button>
    </Grow>
  );
};

export default LetterButton;
