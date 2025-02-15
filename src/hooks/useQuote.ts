import { useCallback, useEffect, useState } from "react";

import { QuoteResponse } from "../services/quotableAPI";
import { APIFetchStatus } from "../utils/enums";

export function useQuote(quotePromiseFn: () => Promise<QuoteResponse>) {
  const [quoteData, setQuoteData] = useState<QuoteResponse | undefined>(
    undefined
  );
  const [status, setStatus] = useState<APIFetchStatus>(APIFetchStatus.PENDING);
  const [error, setError] = useState<string | undefined>(undefined);

  const onResolve = useCallback((data: QuoteResponse) => {
    setQuoteData(data);
    setStatus(APIFetchStatus.SUCCESS);
  }, []);

  const onReject = useCallback((err: Error) => {
    setError(err.message);
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
