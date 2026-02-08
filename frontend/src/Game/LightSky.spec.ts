import { describe, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { LightSky } from "./LightSky";

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
    naturalWidth = 1200;
    naturalHeight = 300;
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

describe("LightSky", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with provided width and height", () => {
    const sky = new LightSky(300, 150);

    expect(sky.width).toBe(300);
    expect(sky.height).toBe(150);
    expect(sky.pos).toEqual({ x: 0, y: 0 });
    expect(sky.useCamera).toBe(true);
  });

  test("updates size when image loads", () => {
    const sky = new LightSky(10, 10);

    sky.sprite.onload?.(new Event("load"));

    expect(sky.width).toBe(1200);
    expect(sky.height).toBe(300);
  });

  test("renders sky with camera parallax when useCamera is true", () => {
    const sky = new LightSky(300, 150);
    const ctx = createMockCtx();

    sky.render(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(
      sky.sprite,
      -100 * 0.2, // parallax factor
      0,
      300,
      150
    );
  });

  test("renders sky without camera parallax when useCamera is false", () => {
    const sky = new LightSky(300, 150);
    sky.useCamera = false;
    sky.pos.x = 50;
    const ctx = createMockCtx();

    sky.render(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(
      sky.sprite,
      50, // uses pos.x directly
      0,
      300,
      150
    );
  });

  test("falls back to background fill when drawImage throws", () => {
    const sky = new LightSky(300, 150);
    const ctx = createMockCtx();

    ctx.drawImage = vi.fn(() => {
      throw new Error("draw failed");
    });

    sky.render(ctx);

    expect(ctx.fillStyle).toBe("#5c94fc");
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 300, 150);
  });
});
