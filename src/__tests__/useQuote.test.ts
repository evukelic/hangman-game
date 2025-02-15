import { act, renderHook, waitFor } from "@testing-library/react";
import axios from "axios";

import { useQuote } from "../hooks/useQuote";

jest.mock("axios");

describe("useQuote", () => {
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

  it("should handle successful API call", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    let result;
    await act(async () => {
      ({ result } = renderHook(() => useQuote(quotePromiseFn)));
    });

    expect(result!.current.status).toBe("success");
    expect(result!.current.quoteData).toEqual(mockData);
    expect(result!.current.error).toBeUndefined();
  });

  it("should handle API failure", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("API Error"));

    let result;
    await act(async () => {
      ({ result } = renderHook(() => useQuote(quotePromiseFn)));
    });

    expect(result!.current.status).toBe("error");
    expect(result!.current.error).toBe("API Error");
  });

  it("should handle empty data response", async () => {
    const emptyMockData = {};
    (axios.get as jest.Mock).mockResolvedValue({ data: emptyMockData });

    let result;
    await act(async () => {
      ({ result } = renderHook(() => useQuote(quotePromiseFn)));
    });

    expect(result!.current.status).toBe("success");
    expect(result!.current.quoteData).toEqual(emptyMockData);
  });

  it("should handle API timeout", async () => {
    jest.useFakeTimers();
    (axios.get as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: mockData }), 3000)
        ) // Delay response
    );

    let result;
    await act(async () => {
      ({ result } = renderHook(() => useQuote(quotePromiseFn)));
    });

    expect(result!.current.status).toBe("pending");

    jest.advanceTimersByTime(3000);

    await waitFor(() => expect(result!.current.status).toBe("success"));
  });
});
