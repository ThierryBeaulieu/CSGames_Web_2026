import { describe, test, expect, beforeAll, beforeEach, vi } from "vitest";
import { GroundProps, Bottle, Flowers, Bush } from "./GroundProps";
import { GROUND_Y } from "./Constants";

/* -------------------------------------------------
   Mocks
-------------------------------------------------- */

// Mock Camera singleton with worldToScreenX
vi.mock("./Camera", () => ({
  Camera: {
    getInstance: () => ({
      worldToScreenX: (x: number) => x - 100,
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
    naturalWidth = 123;
    naturalHeight = 456;
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

describe("GroundProps base class", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with given parameters", () => {
    const prop = new GroundProps(10, 20, 5, 15, 50, "dummy.png");

    expect(prop.width).toBe(10);
    expect(prop.height).toBe(20);
    expect(prop.pos).toEqual({ x: 5, y: 15 });
    expect(prop.groundY).toBe(50);
    expect(prop.useCamera).toBe(true);
  });

  test("updates size when image loads", () => {
    const prop = new GroundProps(10, 10, 0, 0, 50, "dummy.png");

    prop.sprite.onload?.(new Event("load"));

    expect(prop.width).toBe(123);
    expect(prop.height).toBe(456);
  });

  test("renders with camera when useCamera is true", () => {
    const prop = new GroundProps(10, 20, 150, 25, 50, "dummy.png");
    const ctx = createMockCtx();

    prop.render(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(
      prop.sprite,
      150 - 100, // worldToScreenX
      25,
      10,
      20
    );
  });

  test("renders without camera when useCamera is false", () => {
    const prop = new GroundProps(10, 20, 150, 25, 50, "dummy.png");
    prop.useCamera = false;
    const ctx = createMockCtx();

    prop.render(ctx);

    expect(ctx.drawImage).toHaveBeenCalledWith(
      prop.sprite,
      150,
      25,
      10,
      20
    );
  });
});

/* -------------------------------------------------
   Tests for subclasses
-------------------------------------------------- */

describe("GroundProps subclasses", () => {
  test("Bottle initializes with correct size and groundY", () => {
    const bottle = new Bottle(10, 20);

    expect(bottle.width).toBe(24);
    expect(bottle.height).toBe(42);
    expect(bottle.pos).toEqual({ x: 10, y: 20 });
    expect(bottle.groundY).toBe(GROUND_Y);
  });

  test("Flowers initializes with correct size and groundY", () => {
    const flowers = new Flowers(5, 15);

    expect(flowers.width).toBe(37);
    expect(flowers.height).toBe(24);
    expect(flowers.pos).toEqual({ x: 5, y: 15 });
    expect(flowers.groundY).toBe(GROUND_Y);
  });

  test("Bush initializes with correct size and groundY", () => {
    const bush = new Bush(0, 0);

    expect(bush.width).toBe(40);
    expect(bush.height).toBe(40);
    expect(bush.pos).toEqual({ x: 0, y: 0 });
    expect(bush.groundY).toBe(GROUND_Y);
  });
});
