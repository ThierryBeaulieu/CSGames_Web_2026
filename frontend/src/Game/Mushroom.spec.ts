import { describe, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { Mushroom } from "./Mushroom";
import { CollisionDetector } from "./CollisionDetector";

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

// Mock CollisionDetector
vi.mock("./CollisionDetector", () => ({
  CollisionDetector: {
    collisionDetected: vi.fn(),
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

function createMockGameAsset(x: number, y: number, width = 10, height = 10) {
  return {
    pos: { x, y },
    width,
    height,
  } as any;
}

/* -------------------------------------------------
   Tests
-------------------------------------------------- */

describe("Mushroom", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with correct position, size, and visibility", () => {
    const mushroom = new Mushroom(10, 20);

    expect(mushroom.pos).toEqual({ x: 10, y: 20 });
    expect(mushroom.width).toBe(40);
    expect(mushroom.height).toBe(40);
    expect(mushroom.isVisible).toBe(false);
  });

  test("checkMysteryBoxState sets isVisible when mystery block is hit", () => {
    const mushroom = new Mushroom(0, 0);
    const mysteryBlock = { isHit: true } as any;

    mushroom.checkMysteryBoxState(mysteryBlock);
    expect(mushroom.isVisible).toBe(true);

    // should not change if isHit is false
    mushroom.isVisible = false;
    mysteryBlock.isHit = false;
    mushroom.checkMysteryBoxState(mysteryBlock);
    expect(mushroom.isVisible).toBe(false);
  });

  test("spawnMushroom sets isVisible when collision detected", () => {
    const mushroom = new Mushroom(0, 0);
    const player = createMockGameAsset(0, 0);
    const mysteryBox = createMockGameAsset(0, 0);

    (CollisionDetector.collisionDetected as any).mockReturnValue(true);
    mushroom.spawnMushroom(mysteryBox, player);
    expect(mushroom.isVisible).toBe(true);

    // collision false
    mushroom.isVisible = false;
    (CollisionDetector.collisionDetected as any).mockReturnValue(false);
    mushroom.spawnMushroom(mysteryBox, player);
    expect(mushroom.isVisible).toBe(false);
  });

  test("detectCollisionFromPlayer hides mushroom if collision detected", () => {
    const mushroom = new Mushroom(0, 0);
    mushroom.isVisible = true;
    const player = createMockGameAsset(0, 0);

    (CollisionDetector.collisionDetected as any).mockReturnValue(true);
    mushroom.detectCollisionFromPlayer(player);
    expect(mushroom.isVisible).toBe(false);

    // collision false
    mushroom.isVisible = true;
    (CollisionDetector.collisionDetected as any).mockReturnValue(false);
    mushroom.detectCollisionFromPlayer(player);
    expect(mushroom.isVisible).toBe(true);
  });

  test("render does nothing if isVisible is false", () => {
    const mushroom = new Mushroom(0, 0);
    const ctx = createMockCtx();
    mushroom.isVisible = false;

    mushroom.render(ctx);
    expect(ctx.drawImage).not.toHaveBeenCalled();
  });

  test("render draws image with camera when visible", () => {
    const mushroom = new Mushroom(200, 50);
    const ctx = createMockCtx();
    mushroom.isVisible = true;

    mushroom.render(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(
      mushroom.sprite,
      200 - 100, // camera.worldToScreenX
      50,
      40,
      40
    );
  });
});
