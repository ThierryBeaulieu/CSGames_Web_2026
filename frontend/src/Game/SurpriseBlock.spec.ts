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

// Mock Audio globally **before importing SurpriseBlock**
const playMock = vi.fn();
(globalThis as any).Audio = class {
  currentTime = 0;
  play = playMock;
};

// Mock Image for JSDOM
(globalThis as any).Image = class {
  src = "";
  naturalWidth = 40;
  naturalHeight = 40;
  onload: ((ev: Event) => void) | null = null;
};


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

    test("plays sound when collision is detected", () => {
        const block = new SurpriseBlock(10, 20);

        // Mock a player that will collide with the block
        const player = {
            pos: { x: 10, y: 20 },
            width: 40,
            height: 40,
            isHit: false,
        };

        // Call collision detection
        block.detectCollisionFromPlayer(player as any);

        // The sound should play and reset currentTime
        expect(block.sound.play).toHaveBeenCalled();
        expect(block.sound.currentTime).toBe(0);
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
