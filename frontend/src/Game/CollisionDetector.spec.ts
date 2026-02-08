import { describe, test, expect } from "vitest";
import { CollisionDetector } from "./CollisionDetector";

/* -------------------------------------------------
   Helpers
-------------------------------------------------- */

function createMockGameAsset(x: number, y: number, width: number, height: number) {
  return {
    pos: { x, y },
    width,
    height,
  } as any; // satisfies GameAsset type
}

/* -------------------------------------------------
   Tests
-------------------------------------------------- */

describe("CollisionDetector", () => {
  test("detects collision when objects fully overlap", () => {
    const obj1 = createMockGameAsset(10, 10, 50, 50);
    const obj2 = createMockGameAsset(20, 20, 50, 50);

    const result = CollisionDetector.collisionDetected(obj1, obj2);

    expect(result).toBe(true);
  });

  test("detects collision when objects partially overlap on the edge", () => {
    const obj1 = createMockGameAsset(0, 0, 30, 30);
    const obj2 = createMockGameAsset(25, 25, 30, 30);

    const result = CollisionDetector.collisionDetected(obj1, obj2);

    expect(result).toBe(true);
  });

  test("does not detect collision when objects are completely separate", () => {
    const obj1 = createMockGameAsset(0, 0, 30, 30);
    const obj2 = createMockGameAsset(50, 50, 30, 30);

    const result = CollisionDetector.collisionDetected(obj1, obj2);

    expect(result).toBe(false);
  });

  test("does not detect collision when objects touch edges but do not overlap", () => {
    const obj1 = createMockGameAsset(0, 0, 30, 30);
    const obj2 = createMockGameAsset(30, 0, 30, 30);

    const result = CollisionDetector.collisionDetected(obj1, obj2);

    expect(result).toBe(false);
  });

  test("detects collision when one object is inside the other", () => {
    const obj1 = createMockGameAsset(10, 10, 50, 50);
    const obj2 = createMockGameAsset(20, 20, 10, 10);

    const result = CollisionDetector.collisionDetected(obj1, obj2);

    expect(result).toBe(true);
  });

  test("detects collision when objects overlap exactly on top-left corner", () => {
    const obj1 = createMockGameAsset(0, 0, 10, 10);
    const obj2 = createMockGameAsset(5, 5, 10, 10);

    const result = CollisionDetector.collisionDetected(obj1, obj2);

    expect(result).toBe(true);
  });

  test("does not detect collision when objects touch on corner", () => {
    const obj1 = createMockGameAsset(0, 0, 10, 10);
    const obj2 = createMockGameAsset(10, 10, 10, 10);

    const result = CollisionDetector.collisionDetected(obj1, obj2);

    expect(result).toBe(false);
  });
});
