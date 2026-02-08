import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import EasterEggPage from "./EasterEggPage";

describe("EasterEggPage", () => {
  test("renders without crashing", () => {
    render(<EasterEggPage />);
  });
});