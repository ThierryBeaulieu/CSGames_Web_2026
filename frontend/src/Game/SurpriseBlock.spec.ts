import { describe, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { SurpriseBlock } from "./SurpriseBlock";

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

describe("SurpriseBlock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with correct position, size, and default isHit", () => {
    const block = new SurpriseBlock(10, 20);

    expect(block.pos).toEqual({ x: 10, y: 20 });
    expect(block.width).toBe(40);
    expect(block.height).toBe(40);
    expect(block.isHit).toBe(false);
  });

  test("renders with camera", () => {
    const block = new SurpriseBlock(200, 50);
    const ctx = createMockCtx();

    block.render(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(
      block.sprite,
      200 - 100, // camera.worldToScreenX
      50,
      40,
      40
    );
  });
});
