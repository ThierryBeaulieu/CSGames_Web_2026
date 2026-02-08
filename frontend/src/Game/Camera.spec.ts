import { describe, test, expect, beforeEach, vi } from "vitest";
import { Camera } from "./Camera";

/* -------------------------------------------------
   Mocks
-------------------------------------------------- */

// Mock constants so tests are deterministic
vi.mock("./Constants", () => ({
  CANVAS_WIDTH: 100,
  MAP_WIDTH: 300,
}));

/* -------------------------------------------------
   Helpers
-------------------------------------------------- */

function createPlayer(x: number) {
  return {
    pos: { x, y: 0 },
  } as any;
}

/* -------------------------------------------------
   Tests
-------------------------------------------------- */

describe("Camera", () => {
  beforeEach(() => {
    // Reset singleton between tests
    (Camera as any).instance = undefined;
  });

  test("is a singleton", () => {
    const cam1 = Camera.getInstance();
    const cam2 = Camera.getInstance();

    expect(cam1).toBe(cam2);
  });

  test("does not move when player stays within margins", () => {
    const camera = Camera.getInstance();
    const player = createPlayer(50); // centered

    camera.follow(player);

    expect(camera.x).toBe(0);
  });

  test("moves right when player exceeds right margin", () => {
    const camera = Camera.getInstance();
    const player = createPlayer(90); // near right edge

    camera.follow(player);

    // CANVAS_WIDTH = 100
    // rightMargin = 30
    // expected camera.x = player.x - (100 - 30) = 90 - 70 = 20
    expect(camera.x).toBe(20);
  });

  test("moves left when player goes past left margin", () => {
    const camera = Camera.getInstance();

    // Start camera offset
    camera.x = 50;

    const player = createPlayer(55); // close to left edge on screen

    camera.follow(player);

    // leftMargin = 30
    // camera.x = player.x - leftMargin = 55 - 30 = 25
    expect(camera.x).toBe(25);
  });

  test("clamps camera to left bound (0)", () => {
    const camera = Camera.getInstance();
    const player = createPlayer(0);

    camera.follow(player);

    expect(camera.x).toBe(0);
  });

  test("clamps camera to right bound (map width - canvas width)", () => {
    const camera = Camera.getInstance();
    const player = createPlayer(290); // near map end

    camera.follow(player);

    // MAP_WIDTH - CANVAS_WIDTH = 200
    expect(camera.x).toBe(200);
  });

  test("worldToScreenX converts correctly", () => {
    const camera = Camera.getInstance();
    camera.x = 40;

    expect(camera.worldToScreenX(100)).toBe(60);
  });

  test("worldToScreenY converts correctly", () => {
    const camera = Camera.getInstance();
    camera.y = 20;

    expect(camera.worldToScreenY(50)).toBe(30);
  });
});
