# Complete Correction Grid

## Frontend

| **Item**             | **Description**                                                                                                  | **Points** |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- | :--------: |
| **Characters**       |                                                                                                                  |            |
| Main Character       | Use the sprite from the server instead of the placeholder rectangle                                              |     1      |
|                      | Move the character to the right using the right arrow ➡️                                                          |     1      |
|                      | Move the character to the left using the left arrow ⬅️                                                            |     1      |
|                      | Make the character jump using the up arrow ⬆️                                                                     |     1      |
|                      | Flip the sprite according to the direction the character is facing                                               |     1      |
| Monster              | Use the sprite from the server instead of the placeholder rectangle                                              |     1      |
|                      | When the player collides with the monster, the monster should disappear                                          |     1      |
|                      | The monster should walk back and forth on the ground                                                             |     1      |
| **Background**       |                                                                                                                  |            |
| Sky                  | Use the sprite from the server instead of the placeholder                                                        |     1      |
| Ground               | Use the sprite from the server instead of the placeholder                                                        |     1      |
| Trees                | Use the sprite from the server instead of the placeholder                                                        |     1      |
| **Scenery**          |                                                                                                                  |            |
| Bottles              | Insert the bottle sprites into the game. The bottles should appear in front of the character                     |     1      |
| Mystery Box          | Use the sprite from the server instead of the placeholder rectangle                                              |     1      |
|                      | When the character collides with the mystery box, a mushroom should appear on the screen. It can appear anywhere |     1      |
| Mushroom             | Use the sprite from the server instead of the placeholder rectangle                                              |     1      |
|                      | When the player collides with the mushroom, it should disappear                                                  |     1      |
| **Asset Management** |                                                                                                                  |            |
|                      | Create a section to display which assets are correctly loaded and which are not                                  |     1      |
|                      | For each asset, display both the asset image and its name                                                        |     1      |
|                      | Display a red border when an asset is not loaded; otherwise, display a green border                              |     1      |
| **Total**            | **0**                                                                                                            |   **19**   |

---

## Backend

| **Item**       | **Description**                                                        | **Points** |
| -------------- | ---------------------------------------------------------------------- | :--------: |
| **Characters** |                                                                        |            |
| Characters     | Create a router for the character assets `/api/character`              |     1      |
| Main Character | Create an endpoint to serve the sprite `/api/character/main-character` |     1      |
| Monster        | Create an endpoint to serve the sprite `/api/character/monster`        |     1      |
| **Background** |                                                                        |            |
| Background     | Create a router for the background assets `/api/background`            |     1      |
| Sky            | Create an endpoint to serve the sprite `/api/background/sky`           |     1      |
| Ground         | Create an endpoint to serve the sprite `/api/background/ground`        |     1      |
| Trees          | Create an endpoint to serve the sprite `/api/background/trees`         |     1      |
| **Scenery**    |                                                                        |            |
| Scenery        | Create a router for the scenery assets `/api/scenery`                  |     1      |
| Bottles        | Create an endpoint to serve the sprite `/api/scenery/bottles`          |     1      |
| Mystery Box    | Create an endpoint to serve the sprite `/api/scenery/mystery-block`    |     1      |
| Mushroom       | Create an endpoint to serve the sprite `/api/scenery/mushroom`         |     1      |
| **Total**      | **0**                                                                  |   **11**   |

---

## Quality of Product

| **Item**          | **Description**                                                                                    | **Points** |
| ----------------- | -------------------------------------------------------------------------------------------------- | :--------: |
| Code quality      | Overall code structure, including tests, interfaces, design patterns, absence of code smells, etc. |     5      |
| First to finish 🎉 | If a team completes all tasks first, a bonus is awarded to that team                               |     5      |

---

## Final Result

| **Item**           | **Points** |
| ------------------ | :--------: |
| **Max Score**      |     40     |
| **Score Obtained** |     0      |
