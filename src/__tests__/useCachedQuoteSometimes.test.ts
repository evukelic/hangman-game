import { act, renderHook } from "@testing-library/react";
import axios from "axios";

import { useCachedQuoteSometimes } from "../hooks/useCachedQuoteSometimes";

jest.mock("axios");

describe("useCachedQuoteSometimes", () => {
  const mockData = {
    _id: "jnnIm5mCp1",
    content:
      "To acquire knowledge, one must study; but to acquire wisdom, one must observe.",
    author: "Marilyn vos Savant",
    length: 78,
  };
  const quotePromiseFn = () =>
    axios.get("http://api.quotable.io/random").then((result) => result.data);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should save quote to local storage", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    await act(async () => {
      renderHook(() => useCachedQuoteSometimes(quotePromiseFn));
    });

    const savedQuote = localStorage.getItem("hangman_quote_jnnIm5mCp1");

    expect(savedQuote).not.toBeNull();
    expect(JSON.parse(savedQuote!)).toEqual(mockData);
  });

  it("should return a quote from local storage when request fails", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    await act(async () => {
      renderHook(() => useCachedQuoteSometimes(quotePromiseFn));
    });

    (axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

    let result;
    await act(async () => {
      ({ result } = renderHook(() => useCachedQuoteSometimes(quotePromiseFn)));
    });

    expect(result!.current.status).toBe("success");
    expect(result!.current.error).toBeUndefined();
    expect(result!.current.quoteData).toEqual(mockData);
  });

  it("should fail if request fails and there are no quotes in local storage", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

    let result;
    await act(async () => {
      ({ result } = renderHook(() => useCachedQuoteSometimes(quotePromiseFn)));
    });

    expect(result!.current.status).toBe("error");
    expect(result!.current.error).toEqual("API Error");
  });
});
