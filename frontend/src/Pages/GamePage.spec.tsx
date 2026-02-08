import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GamePage from "./GamePage";

// ---- Mock the Game component ----
vi.mock("../Game/Game", () => ({
  default: () => <div data-testid="mock-game">Mock Game</div>,
}));

describe("GamePage", () => {
  test("renders without crashing", () => {
    render(<GamePage />);
    // Check that the mocked Game component exists
    const gameDiv = screen.getByTestId("mock-game");
    expect(gameDiv).toBeDefined();
    expect(gameDiv.textContent).toBe("Mock Game");
  });
});
