import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

describe("NavBar component", () => {
  test("renders all navigation links when easterEggVisible is true", () => {
    render(
      <MemoryRouter>
        <NavBar easterEggVisible={true} emojisEnabled={true} />
      </MemoryRouter>
    );

    const gamePageLink = screen.getByText(/Game Page$/);
    const gameEditorLink = screen.getByText(/Game Editor$/);
    const characterEditorLink = screen.getByText(/Character Editor$/);
    const easterEggLink = screen.getByText(/Easter Egg$/);

    expect(gamePageLink).toBeDefined();
    expect(gameEditorLink).toBeDefined();
    expect(characterEditorLink).toBeDefined();
    expect(easterEggLink).toBeDefined();

    expect(gamePageLink.closest("a")?.getAttribute("href")).toBe("/");
    expect(gameEditorLink.closest("a")?.getAttribute("href")).toBe("/game-editor");
    expect(characterEditorLink.closest("a")?.getAttribute("href")).toBe("/character-editor");
    expect(easterEggLink.closest("a")?.getAttribute("href")).toBe("/easter-egg");
  });

  test("does not render Easter Egg link when easterEggVisible is false", () => {
    render(
      <MemoryRouter>
        <NavBar easterEggVisible={false} emojisEnabled={true} />
      </MemoryRouter>
    );

    const easterEggLink = screen.queryByText(/Easter Egg$/);
    expect(easterEggLink).toBeNull();

    expect(screen.getByText(/Game Page$/)).toBeDefined();
    expect(screen.getByText(/Game Editor$/)).toBeDefined();
    expect(screen.getByText(/Character Editor$/)).toBeDefined();
  });

  test("renders emojis before the link text when emojisEnabled is true", () => {
    render(
      <MemoryRouter>
        <NavBar easterEggVisible={true} emojisEnabled={true} />
      </MemoryRouter>
    );

    const gamePageLink = screen.getByText(/🌟 Game Page/);
    const gameEditorLink = screen.getByText(/🦄 Game Editor/);
    const characterEditorLink = screen.getByText(/🔥 Character Editor/);
    const easterEggLink = screen.getByText(/🐣 Easter Egg/);

    expect(gamePageLink).toBeDefined();
    expect(gameEditorLink).toBeDefined();
    expect(characterEditorLink).toBeDefined();
    expect(easterEggLink).toBeDefined();
  });

  test("does not render emojis when emojisEnabled is false", () => {
    render(
      <MemoryRouter>
        <NavBar easterEggVisible={true} emojisEnabled={false} />
      </MemoryRouter>
    );

    expect(screen.getByText("Game Page")).toBeDefined();
    expect(screen.getByText("Game Editor")).toBeDefined();
    expect(screen.getByText("Character Editor")).toBeDefined();
    expect(screen.getByText("Easter Egg")).toBeDefined();

    // Ensure emojis are not present
    expect(screen.queryByText(/🌟/)).toBeNull();
    expect(screen.queryByText(/🦄/)).toBeNull();
    expect(screen.queryByText(/🔥/)).toBeNull();
    expect(screen.queryByText(/🐣/)).toBeNull();
  });

  test("renders correct hrefs when emojisEnabled is false", () => {
    render(
      <MemoryRouter>
        <NavBar easterEggVisible={true} emojisEnabled={false} />
      </MemoryRouter>
    );

    expect(screen.getByText("Game Page").closest("a")?.getAttribute("href")).toBe("/");
    expect(screen.getByText("Game Editor").closest("a")?.getAttribute("href")).toBe("/game-editor");
    expect(screen.getByText("Character Editor").closest("a")?.getAttribute("href")).toBe("/character-editor");
    expect(screen.getByText("Easter Egg").closest("a")?.getAttribute("href")).toBe("/easter-egg");
  });
});