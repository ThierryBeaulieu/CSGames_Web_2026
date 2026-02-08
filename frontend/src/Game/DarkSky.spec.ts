import { describe, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { DarkSky } from "./DarkSky";

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
    naturalWidth = 1024;
    naturalHeight = 256;
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

describe("DarkSky", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with provided width and height", () => {
    const sky = new DarkSky(300, 150);

    expect(sky.width).toBe(300);
    expect(sky.height).toBe(150);
    expect(sky.pos).toEqual({ x: 0, y: 0 });
    expect(sky.useCamera).toBe(true);
  });

  test("updates size when image loads", () => {
    const sky = new DarkSky(10, 10);

    sky.sprite.onload?.(new Event("load"));

    expect(sky.width).toBe(1024);
    expect(sky.height).toBe(256);
  });

  test("renders sky with camera parallax when useCamera is true", () => {
    const sky = new DarkSky(300, 150);
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
    const sky = new DarkSky(300, 150);
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
});
