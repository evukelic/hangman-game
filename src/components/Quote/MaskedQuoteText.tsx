import { Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface MaskedQuoteTextProps {
  base: string;
  revealed: Set<string>;
}

const MaskedQuoteText = ({ base, revealed }: MaskedQuoteTextProps) => {
  const [maskedQuote, setMaskedQuote] = useState<string>("");

  const shouldDisplayLetter = useCallback(
    (char: string): boolean => {
      const isLetterAlreadyFound = revealed.has(char);
      const isNotALetter = /^[^a-z]$/.test(char);

      return isLetterAlreadyFound || isNotALetter;
    },
    [revealed]
  );

  const generateMaskedQuote = useCallback(() => {
    return [...base]
      .map((char) => (shouldDisplayLetter(char) ? char : "_"))
      .join("");
  }, [base, shouldDisplayLetter]);

  useEffect(() => {
    if (base) {
      setMaskedQuote(generateMaskedQuote());
    }

    return () => {
      setMaskedQuote("");
    };
  }, [base, generateMaskedQuote]);

  return (
    <Typography variant={base.length > 100 ? "h4" : "h3"}>
      {maskedQuote}
    </Typography>
  );
};

export default MaskedQuoteText;
