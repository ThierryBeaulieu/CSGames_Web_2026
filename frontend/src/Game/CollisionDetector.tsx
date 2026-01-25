import type { GameAsset } from './GameAsset';

export class CollisionDetector {
  // Axis-Aligned Bounding Box (AABB) collision detection
  static collisionDetected(object1: GameAsset, object2: GameAsset): boolean {
    return (
      object1.pos.x < object2.pos.x + object2.width &&
      object1.pos.x + object1.width > object2.pos.x &&
      object1.pos.y < object2.pos.y + object2.height &&
      object1.pos.y + object1.height > object2.pos.y
    );
  }
}
