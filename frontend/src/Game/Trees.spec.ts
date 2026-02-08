import { describe, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { Trees, LargeTree, HighPalm, MediumPalm } from "./Trees";
import { GROUND_Y } from "./Constants";

/* -------------------------------------------------
   Mocks
-------------------------------------------------- */

// Mock Camera singleton
vi.mock("./Camera", () => ({
  Camera: {
    getInstance: () => ({
      worldToScreenX: (x: number) => x - 100,
    }),
  },
}));

// Mock Constants
vi.mock("./Constants", () => ({
  GROUND_Y: 300,
}));

// Mock Image for JSDOM
beforeAll(() => {
  (globalThis as any).Image = class {
    src = "";
    naturalWidth = 40;
    naturalHeight = 40;
    onload: ((ev: Event) => void) | null = null;
  };
});

/* -------------------------------------------------
   Helpers
-------------------------------------------------- */

function createMockCtx(): CanvasRenderingContext2D {
  return {
    drawImage: vi.fn(),
    fillRect: vi.fn(),
    fillStyle: "",
  } as unknown as CanvasRenderingContext2D;
}

/* -------------------------------------------------
   Tests
-------------------------------------------------- */

describe("Trees base class", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with correct position, size, groundY", () => {
    const tree = new Trees(50, 100, 10, 20, 200, "asset.png");

    expect(tree.pos).toEqual({ x: 10, y: 20 });
    expect(tree.width).toBe(50);
    expect(tree.height).toBe(100);
    expect(tree.groundY).toBe(200);
    expect(tree.useCamera).toBe(true);
  });

  test("renders with camera", () => {
    const tree = new Trees(50, 100, 200, 50, 300, "asset.png");
    const ctx = createMockCtx();

    tree.render(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(
      tree.sprite,
      200 - 100, // camera.worldToScreenX
      50,
      50,
      100
    );
  });

  test("falls back gracefully if drawImage throws", () => {
    const tree = new Trees(50, 100, 10, 20, 200, "asset.png");
    const ctx = createMockCtx();
    ctx.drawImage = vi.fn(() => { throw new Error("fail"); });

    tree.render(ctx);

    // Should not throw; no other fallback for Trees
    expect(ctx.drawImage).toHaveBeenCalled();
  });
});

describe("Trees subclasses", () => {
  test("LargeTree initializes correctly", () => {
    const tree = new LargeTree(10, 20);
    expect(tree.pos).toEqual({ x: 10, y: 20 });
    expect(tree.width).toBe(58);
    expect(tree.height).toBe(175);
    expect(tree.groundY).toBe(GROUND_Y);
  });

  test("HighPalm initializes correctly", () => {
    const tree = new HighPalm(15, 25);
    expect(tree.pos).toEqual({ x: 15, y: 25 });
    expect(tree.width).toBe(96);
    expect(tree.height).toBe(239);
    expect(tree.groundY).toBe(GROUND_Y);
  });

  test("MediumPalm initializes correctly", () => {
    const tree = new MediumPalm(5, 10);
    expect(tree.pos).toEqual({ x: 5, y: 10 });
    expect(tree.width).toBe(96);
    expect(tree.height).toBe(188);
    expect(tree.groundY).toBe(GROUND_Y);
  });
});
