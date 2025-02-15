import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import MaskedQuoteText from "../components/Quote/MaskedQuoteText";

describe("MaskedQuoteText", () => {
  it("should render correct masked text", () => {
    const guessedLetters = new Set("ait".split(""));

    render(
      <MaskedQuoteText base="this is a test." revealed={guessedLetters} />
    );

    const textElement = screen.getByText("t_i_ i_ a t__t.");
    expect(textElement).toBeInTheDocument();
  });

  it("should render second correct masked text", () => {
    const guessedLetters = new Set("mois".split(""));

    render(
      <MaskedQuoteText
        base="lorem ipsum dolor sit amet."
        revealed={guessedLetters}
      />
    );

    const textElement = screen.getByText("_o__m i_s_m _o_o_ si_ _m__.");
    expect(textElement).toBeInTheDocument();
  });

  it("should render correct masked text with more random characters", () => {
    const guessedLetters = new Set("mois".split(""));

    render(
      <MaskedQuoteText
        base="lorem, ipsum; d'olor sit - amet."
        revealed={guessedLetters}
      />
    );

    const textElement = screen.getByText("_o__m, i_s_m; _'o_o_ si_ - _m__.");
    expect(textElement).toBeInTheDocument();
  });
});
