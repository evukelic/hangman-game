import { Alert, Skeleton, Typography } from "@mui/material";

import { APIFetchStatus, GameStatus } from "../../utils/enums";
import MaskedQuoteText from "./MaskedQuoteText";
import styles from "./Quote.module.css";

interface QuoteProps {
  readonly quote: string;
  readonly charsFound: Set<string>;
  readonly apiStatus: APIFetchStatus;
  readonly gameStatus: GameStatus;
}

const ERROR_MESSAGE = "Failed to fetch the quote. Please try again.";

const Quote = ({ quote, charsFound, apiStatus, gameStatus }: QuoteProps) => {
  const getAlert = () => {
    return (
      <Alert severity="error" className={styles.alert}>
        {ERROR_MESSAGE}
      </Alert>
    );
  };

  const getSkeleton = () => {
    return (
      <Typography variant="h3" className={styles.skeleton}>
        <Skeleton />
      </Typography>
    );
  };

  const getQuote = () => {
    if (gameStatus !== GameStatus.LOST) {
      return <MaskedQuoteText base={quote} revealed={charsFound} />;
    }

    return (
      <Typography variant="h3" color="error">
        {quote}
      </Typography>
    );
  };

  return (
    <>
      {apiStatus === APIFetchStatus.ERROR && getAlert()}
      {apiStatus === APIFetchStatus.PENDING && getSkeleton()}
      {apiStatus === APIFetchStatus.SUCCESS && getQuote()}
    </>
  );
};

export default Quote;
