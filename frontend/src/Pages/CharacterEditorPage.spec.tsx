import { describe, test } from "vitest";
import { render } from "@testing-library/react";
import CharacterEditorPage from "./CharacterEditorPage";

describe("CharacterEditorPage", () => {
  test("renders without crashing", () => {
    render(<CharacterEditorPage />);
  });
});