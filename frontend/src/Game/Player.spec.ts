import { describe, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { Player } from "./Player";
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
    save: vi.fn(),
    restore: vi.fn(),
    scale: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}

function createMockKeys(left = false, right = false, up = false) {
  return { current: { ArrowLeft: left, ArrowRight: right, ArrowUp: up } };
}

/* -------------------------------------------------
   Tests
-------------------------------------------------- */

describe("Player", () => {
  beforeEach(() => {
    // reset singleton between tests
    (Player as any).instance = null;
    vi.clearAllMocks();
  });

  test("singleton returns same instance", () => {
    const p1 = Player.getInstance(0.5);
    const p2 = Player.getInstance(0.5);
    expect(p1).toBe(p2);
  });

  test("initializes with correct properties", () => {
    const player = Player.getInstance(0.8);

    expect(player.pos).toEqual({ x: 50, y: 0 });
    expect(player.width).toBe(40);
    expect(player.height).toBe(50);
    expect(player.vy).toBe(0);
    expect(player.onGround).toBe(false);
    expect(player.direction).toBe("right");
    expect(player.gravity).toBe(0.8);
    expect(player.isBigger).toBe(false);
  });

  test("handleUserInput moves left and right", () => {
    const player = Player.getInstance(0);
    player.pos.x = 100;

    player.handleUserInput(createMockKeys(true, false, false));
    expect(player.pos.x).toBe(97); // moved left
    expect(player.direction).toBe("left");

    player.handleUserInput(createMockKeys(false, true, false));
    expect(player.pos.x).toBe(100); // moved right
    expect(player.direction).toBe("right");
  });

  test("handleUserInput allows jump when on ground", () => {
    const player = Player.getInstance(0);
    player.onGround = true;
    player.pos.y = GROUND_Y - player.height;

    player.handleUserInput(createMockKeys(false, false, true));
    expect(player.vy).toBe(-12);
    expect(player.onGround).toBe(false);
  });

  test("gravity is applied and player lands on ground", () => {
    const player = Player.getInstance(1); // gravity = 1
    player.pos.y = 0;
    player.vy = 0;
    player.onGround = false;

    // call update once
    player.handleUserInput(createMockKeys());
    expect(player.vy).toBe(1);
    expect(player.pos.y).toBe(1);

    // simulate falling to ground
    player.pos.y = GROUND_Y;
    player.handleUserInput(createMockKeys());
    expect(player.pos.y).toBe(GROUND_Y - player.height);
    expect(player.vy).toBe(0);
    expect(player.onGround).toBe(true);
  });

  test("render draws right-facing player", () => {
    const player = Player.getInstance(0);
    const ctx = createMockCtx();
    player.direction = "right";

    player.render(ctx);
    expect(ctx.drawImage).toHaveBeenCalledWith(
      player.sprite,
      player.pos.x - 100, // worldToScreenX
      player.pos.y,
      player.width,
      player.height
    );
  });

  test("render draws left-facing player with scale", () => {
    const player = Player.getInstance(0);
    const ctx = createMockCtx();
    player.direction = "left";

    player.render(ctx);
    expect(ctx.scale).toHaveBeenCalledWith(-1, 1);
    expect(ctx.drawImage).toHaveBeenCalledWith(
      player.sprite,
      -(player.pos.x - 100) - player.width,
      player.pos.y,
      player.width,
      player.height
    );
  });
});
