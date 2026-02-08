import { describe, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { Ground } from "./Ground";

/* -------------------------------------------------
   Mocks
-------------------------------------------------- */

// Mock Camera singleton with worldToScreenX
vi.mock("./Camera", () => ({
  Camera: {
    getInstance: () => ({
      worldToScreenX: (x: number) => x - 100, // simulate camera offset
    }),
  },
}));

// Mock Constants
vi.mock("./Constants", () => ({
  GROUND_Y: 50,
}));

// Mock Image for JSDOM
beforeAll(() => {
  (globalThis as any).Image = class {
    src = "";
    naturalWidth = 400;
    naturalHeight = 50;
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

describe("Ground", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with provided width and height", () => {
    const ground = new Ground(300, 150);

    expect(ground.width).toBe(300);
    expect(ground.height).toBe(150);
    expect(ground.pos).toEqual({ x: 0, y: 0 });
    expect(ground.useCamera).toBe(true);
  });

  test("updates size when image loads", () => {
    const ground = new Ground(10, 10);

    ground.sprite.onload?.(new Event("load"));

    expect(ground.width).toBe(400);
    expect(ground.height).toBe(50);
  });

  test("renders ground with camera when useCamera is true", () => {
    const ground = new Ground(300, 150);
    const ctx = createMockCtx();

    ground.render(ctx);

    // worldToScreenX = pos.x - 100
    expect(ctx.drawImage).toHaveBeenCalledWith(
      ground.sprite,
      -100, // 0 - 100
      0,
      300,
      150
    );
  });

  test("renders ground without camera when useCamera is false", () => {
    const ground = new Ground(300, 150);
    ground.useCamera = false;
    ground.pos.x = 50;
    const ctx = createMockCtx();

    ground.render(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(
      ground.sprite,
      50,
      0,
      300,
      150
    );
  });

  test("falls back to fillRect when drawImage throws", () => {
    const ground = new Ground(300, 150);
    const ctx = createMockCtx();

    ctx.drawImage = vi.fn(() => {
      throw new Error("draw failed");
    });

    ground.render(ctx);

    expect(ctx.fillStyle).toBe("#cf510c");
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 50, 300, 100); // height - GROUND_Y = 150 - 50
  });
});
