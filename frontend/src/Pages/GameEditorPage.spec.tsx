import React from "react";
import { describe, test, vi } from "vitest";
import { render } from "@testing-library/react";
import GameEditorPage from "./GameEditorPage";

// Mock AssetEditor so it won't try to access canvas
vi.mock("../AssetManager/AssetEditor", () => ({
  default: () => <div data-testid="mock-asset-editor" />,
}));

// Mock Modal because it might use portals
vi.mock("../Components/Modal", () => ({
  Modal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-modal">{children}</div>
  ),
}));

// Mock other heavy game imports to avoid errors
vi.mock("../Game/Trees", () => ({
  HighPalm: class {},
  MediumPalm: class {},
  LargeTree: class {},
}));

vi.mock("../AssetManager/TreesConfig", () => ({
  TreesConfig: { getInstance: () => ({ gameTrees: [] }) },
}));

vi.mock("../AssetManager/GroundPropsConfig", () => ({
  GroundPropsConfig: { getInstance: () => ({ groundProps: Array(10).fill({ pos: { x: 0, y: 0 } }) }) },
}));

vi.mock("../Game/Constants", () => ({
  GROUND_Y: 300,
  MAP_WIDTH: 1200,
}));

describe("GameEditorPage", () => {
  test("renders without crashing", () => {
    render(<GameEditorPage />);
  });
});
