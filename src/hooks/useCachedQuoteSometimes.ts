import { useCallback, useEffect, useState } from "react";

import { QuoteResponse } from "../services/quotableAPI";
import { APIFetchStatus } from "../utils/enums";
import {
  getNumberOfStoredQuotes,
  getRandomLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";

const MAX_STORED_QUOTES = 10;

export function useCachedQuoteSometimes(
  quotePromiseFn: () => Promise<QuoteResponse>
) {
  const [quoteData, setQuoteData] = useState<QuoteResponse | undefined>(
    undefined
  );
  const [status, setStatus] = useState<APIFetchStatus>(APIFetchStatus.PENDING);
  const [error, setError] = useState<string | undefined>(undefined);

  const onResolve = useCallback((data: QuoteResponse) => {
    setQuoteData(data);
    setStatus(APIFetchStatus.SUCCESS);

    const numOfStoredQuotes = getNumberOfStoredQuotes();
    if (numOfStoredQuotes < MAX_STORED_QUOTES) {
      setLocalStorageItem(data._id, data);
    }
  }, []);

  const onReject = useCallback((error: Error) => {
    const cachedQuote = getRandomLocalStorageItem();

    if (cachedQuote) {
      setQuoteData(cachedQuote);
      setStatus(APIFetchStatus.SUCCESS);

      removeLocalStorageItem(cachedQuote._id);
      return;
    }

    setError(error.message);
    setStatus(APIFetchStatus.ERROR);
  }, []);

  useEffect(() => {
    setStatus(APIFetchStatus.PENDING);
    setError(undefined);
    setQuoteData(undefined);

    quotePromiseFn().then(onResolve).catch(onReject);
  }, [quotePromiseFn, onResolve, onReject]);

  return { quoteData, status, error, onResolve, onReject };
}
