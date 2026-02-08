import { describe, test, expect, vi, beforeAll } from "vitest";
import { Monster } from "./Monster";
import { CollisionDetector } from "./CollisionDetector";

/* -------------------------------------------------
   Mocks
-------------------------------------------------- */

vi.mock("./Camera", () => ({
  Camera: {
    getInstance: () => ({
      worldToScreenX: (x: number) => x,
    }),
  },
}));

vi.mock("./CollisionDetector", () => ({
  CollisionDetector: {
    collisionDetected: vi.fn(),
  },
}));

beforeAll(() => {
  (globalThis as any).Image = class {
    src = "";
  };
});

/* -------------------------------------------------
   Helpers
-------------------------------------------------- */

function createMockCtx(width = 300): CanvasRenderingContext2D {
  return {
    canvas: { width } as HTMLCanvasElement,
    drawImage: vi.fn(),
    fillRect: vi.fn(),
    fillStyle: "",
  } as unknown as CanvasRenderingContext2D;
}

/* -------------------------------------------------
   Tests
-------------------------------------------------- */

describe("Monster", () => {
  test("moves horizontally every render call", () => {
    const monster = new Monster(100, 50);
    const ctx = createMockCtx();

    monster.render(ctx);

    expect(monster.pos.x).toBe(99);
  });

  test("reverses direction when hitting left wall", () => {
    const monster = new Monster(0, 50);
    monster.speed = -1;

    const ctx = createMockCtx();

    monster.render(ctx);

    expect(monster.speed).toBe(1);
  });

  test("reverses direction when hitting right wall", () => {
    const monster = new Monster(260, 50);
    monster.speed = 1;

    const ctx = createMockCtx(300);

    monster.render(ctx);

    expect(monster.speed).toBe(-1);
  });

  test("draws sprite on canvas", () => {
    const monster = new Monster(100, 50);
    const ctx = createMockCtx();

    monster.render(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(
      monster.sprite,
      99,
      50,
      40,
      40
    );
  });

  test("logs when collision occurs", () => {
    const monster = new Monster(0, 0);
    const player = { pos: { x: 0, y: 0 }, width: 40, height: 40 } as any;

    (CollisionDetector.collisionDetected as any).mockReturnValue(true);

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    monster.detectCollisionFromPlayer(player);

    expect(CollisionDetector.collisionDetected).toHaveBeenCalledWith(
      player,
      monster
    );
    expect(logSpy).toHaveBeenCalledWith("collision with monster");

    logSpy.mockRestore();
  });

  test("does nothing when no collision occurs", () => {
    const monster = new Monster(0, 0);
    const player = {} as any;

    (CollisionDetector.collisionDetected as any).mockReturnValue(false);

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    monster.detectCollisionFromPlayer(player);

    expect(logSpy).not.toHaveBeenCalled();

    logSpy.mockRestore();
  });
});
