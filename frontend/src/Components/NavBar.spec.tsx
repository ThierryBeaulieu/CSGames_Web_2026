import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

describe("NavBar component", () => {
  test("renders all navigation links when easterEggVisible is true", () => {
    render(
      <MemoryRouter>
        <NavBar easterEggVisible={true} />
      </MemoryRouter>
    );

    // Check each link exists
    const gamePageLink = screen.getByText("Game Page");
    const gameEditorLink = screen.getByText("Game Editor");
    const characterEditorLink = screen.getByText("Character Editor");
    const easterEggLink = screen.getByText("Easter Egg");

    expect(gamePageLink).toBeDefined();
    expect(gameEditorLink).toBeDefined();
    expect(characterEditorLink).toBeDefined();
    expect(easterEggLink).toBeDefined();

    // Check the hrefs
    expect(gamePageLink.closest("a")?.getAttribute("href")).toBe("/");
    expect(gameEditorLink.closest("a")?.getAttribute("href")).toBe("/game-editor");
    expect(characterEditorLink.closest("a")?.getAttribute("href")).toBe("/character-editor");
    expect(easterEggLink.closest("a")?.getAttribute("href")).toBe("/easter-egg");
  });

  test("does not render Easter Egg link when easterEggVisible is false", () => {
    render(
      <MemoryRouter>
        <NavBar easterEggVisible={false} />
      </MemoryRouter>
    );

    // The Easter Egg link should not exist
    const easterEggLink = screen.queryByText("Easter Egg");
    expect(easterEggLink).toBeNull();

    // Other links should still exist
    expect(screen.getByText("Game Page")).toBeDefined();
    expect(screen.getByText("Game Editor")).toBeDefined();
    expect(screen.getByText("Character Editor")).toBeDefined();
  });
});
