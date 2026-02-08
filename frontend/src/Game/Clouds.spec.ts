import { describe, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { Clouds } from "./Clouds";

/* -------------------------------------------------
   Mocks
-------------------------------------------------- */

// Mock Camera singleton
vi.mock("./Camera", () => ({
  Camera: {
    getInstance: () => ({
      x: 100,
    }),
  },
}));

// Mock Image for JSDOM
beforeAll(() => {
  (globalThis as any).Image = class {
    src = "";
    naturalWidth = 200;
    naturalHeight = 80;
    onload: (() => void) | null = null;
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

describe("Clouds", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with provided width and height", () => {
    const clouds = new Clouds(300, 150);

    expect(clouds.width).toBe(300);
    expect(clouds.height).toBe(150);
    expect(clouds.pos).toEqual({ x: 0, y: 0 });
  });

  test("updates size when image loads", () => {
    const clouds = new Clouds(10, 10);

    // simulate image load
    clouds.sprite.onload?.(new Event("load"));

    expect(clouds.width).toBe(200);
    expect(clouds.height).toBe(80);
  });

  test("renders clouds with parallax offset", () => {
    const clouds = new Clouds(300, 150);
    const ctx = createMockCtx();

    clouds.render(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(
      clouds.sprite,
      -100 * 0.3, // parallax
      0,
      300,
      150
    );
  });

  test("falls back to background fill when drawImage throws", () => {
    const clouds = new Clouds(300, 150);
    const ctx = createMockCtx();

    ctx.drawImage = vi.fn(() => {
      throw new Error("draw failed");
    });

    clouds.render(ctx);

    expect(ctx.fillStyle).toBe("#5c94fc");
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 300, 150);
  });
});
