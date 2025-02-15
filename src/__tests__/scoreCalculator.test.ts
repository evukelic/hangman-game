import { calculateScore } from "../utils/scoreCalculator";

describe("scoreCalculator", () => {
  test("score of the solution with fewer errors should always be higher than for the solution with more errors", () => {
    const errors = 0;
    const errors2 = 1;
    const errors3 = 5;

    const uniqueLetters = 12;
    const duration = 28000;
    const length = 34;

    const result1 = calculateScore(errors, uniqueLetters, duration, length);
    const result2 = calculateScore(errors2, uniqueLetters, duration, length);
    const result3 = calculateScore(errors3, uniqueLetters, duration, length);

    expect(result1).toBeGreaterThan(result2);
    expect(result2).toBeGreaterThan(result3);
  });

  test("score of the solution with fewer errors should be higher even if duration is much longer", () => {
    const errors = 0;
    const errors2 = 1;

    const uniqueLetters = 12;
    const duration = 28000;
    const duration2 = Number.MAX_SAFE_INTEGER;
    const length = 34;

    const result1 = calculateScore(errors, uniqueLetters, duration2, length);
    const result2 = calculateScore(errors2, uniqueLetters, duration, length);

    expect(result1).toBeGreaterThan(result2);
  });

  test("given the same number of errors, solutions with larger numbers of unique letters should be scored higher", () => {
    const errors = 0;

    const uniqueLetters = 25;
    const uniqueLetters2 = 26;
    const duration = 28000;
    const length = 52;

    const result1 = calculateScore(errors, uniqueLetters, duration, length);
    const result2 = calculateScore(errors, uniqueLetters2, duration, length);

    expect(result1).toBeLessThan(result2);
  });

  test("given the same number of errors, solutions with larger numbers of unique letters should be scored higher even if duration is much longer", () => {
    const errors = 0;

    const uniqueLetters = 25;
    const uniqueLetters2 = 26;
    const duration = 28000;
    const duration2 = Number.MAX_SAFE_INTEGER;
    const length = 52;

    const result1 = calculateScore(errors, uniqueLetters2, duration2, length);
    const result2 = calculateScore(errors, uniqueLetters, duration, length);

    expect(result1).toBeGreaterThan(result2);
  });

  test("given the same number of errors, solutions with larger numbers of unique letters should be scored higher even if duration and length are much longer", () => {
    const errors = 0;

    const uniqueLetters = 25;
    const uniqueLetters2 = 26;
    const duration = 28000;
    const duration2 = Number.MAX_SAFE_INTEGER;
    const length = 26;
    const length2 = Number.MAX_SAFE_INTEGER;

    const result1 = calculateScore(errors, uniqueLetters2, duration2, length2);
    const result2 = calculateScore(errors, uniqueLetters, duration, length);

    expect(result1).toBeGreaterThan(result2);
  });

  test("given the same number of errors and unique letters, longer solutions should be scored higher", () => {
    const errors = 0;
    const uniqueLetters = 15;
    const duration = 25000;
    const length = 50;
    const length2 = 51;

    const result1 = calculateScore(errors, uniqueLetters, duration, length2);
    const result2 = calculateScore(errors, uniqueLetters, duration, length);

    expect(result1).toBeGreaterThan(result2);
  });

  test("given the same number of errors and unique letters, longer solutions should be scored higher even if duration is bigger", () => {
    const errors = 0;
    const uniqueLetters = 15;
    const duration = 25000;
    const duration2 = Number.MAX_SAFE_INTEGER;
    const length = 50;
    const length2 = 51;

    const result1 = calculateScore(errors, uniqueLetters, duration2, length2);
    const result2 = calculateScore(errors, uniqueLetters, duration, length);

    expect(result1).toBeGreaterThan(result2);
  });

  test("given the same number of errors, unique letters, and quote length, faster solutions should be scored higher", () => {
    const errors = 0;
    const uniqueLetters = 15;
    const duration = 25000;
    const duration2 = 25001;
    const length = 30;

    const result1 = calculateScore(errors, uniqueLetters, duration, length);
    const result2 = calculateScore(errors, uniqueLetters, duration2, length);

    expect(result1).toBeGreaterThan(result2);
  });
});
