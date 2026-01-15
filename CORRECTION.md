# Grille de correction complète


## Frontend
| **Item**             | **Description**                                                                                          | **Points** |
| -------------------- | -------------------------------------------------------------------------------------------------------- | :--------: |
| **Characters**       |                                                                                                          |            |
| Main Character       | Use the sprite from the server instead of the placeholder rectangle                                      |     1      |
|                      | Move the character to the right using the right arrow ➡️                                                  |     1      |
|                      | Move the character to the left using the left arrow ⬅️                                                    |     1      |
|                      | Make the character jump using the up arrow ⬆️                                                             |     1      |
|                      | Flip the sprite according to the direction that the character looks at                                   |     1      |
| Monster              | Use the sprite from the server instead of the placeholder rectangle                                      |     1      |
|                      | When the player collides with the monster, the monster should disappear                                  |     1      |
|                      | The monster should walk back and forth on the ground                                                     |     1      |
| **Background**       |                                                                                                          |            |
| Sky                  | Use the sprite from the server instead of the placeholders                                               |     1      |
| Ground               | Use the sprite from the server instead of the placeholders                                               |     1      |
| Trees                | Use the sprite from the server instead of the placeholders                                               |     1      |
| **Scenery**          |                                                                                                          |            |
| Bottles              | Insert the sprites of the bottles in the game. The bottles should appear in front of the character.      |     1      |
| Mystery Box          | Use the sprite from the server instead of the placeholder rectangle                                      |     1      |
|                      | When the character collides with the mystery box, a mushroom should appear on screen. It can be anywhere |     1      |
| Mushroom             | Use the sprite from the server instead of the placeholder rectangle                                      |     1      |
|                      | When the player collides with the mushroom, it should disappear                                          |     1      |
| **Asset Management** |                                                                                                          |            |
|                      | Create a section to display the assets correctly loaded and the ones that are not loaded                 |     1      |
|                      | For each asset, have the asset being displayed and the name of the asset                                 |     1      |
|                      | When an asset is not loaded, display a red border. Otherwise display a green border.                     |     1      |
| **Total**            | **0**                                                                                                    |   **19**   |

## Backend
| **Item**       | **Description**                                                        | **Points** |
| -------------- | ---------------------------------------------------------------------- | :--------: |
| **Characters** |                                                                        |            |
| Characters     | Create a router for the characters assets `/api/character`             |     1      |
| Main Character | Create an endpoint to send the sprite `/api/character/main-character/` |     1      |
| Monster        | Create an endpoint to send the sprite `/api/character/monster`         |     1      |
| **Background** |                                                                        |            |
| Background     | Create a router for the background assets `/api/background`            |     1      |
| Sky            | Create an endpoint to send the sprite `/api/background/sky`            |     1      |
| Ground         | Create an endpoint to send the sprite `/api/background/ground`         |     1      |
| Trees          | Create an endpoint to send the sprite `/api/background/trees`          |     1      |
| **Scenery**    |                                                                        |            |
| Scenery        | Create a router for the background assets `/api/scenery`               |     1      |
| Bottles        | Create an endpoint to send the sprite `/api/scenery/bottles/`          |     1      |
| Mystery Box    | Create an endpoint to send the sprite `/api/scenery/mystery-block`     |     1      |
| Mushroom       | Create an endpoint to send the sprite `/api/scenery/mushroom`          |     1      |
| **Total**      | **0**                                                                  |   **11**   |


## Quality of product
| **Item**          | **Description**                                                                                      | **Points** |
| ----------------- | ---------------------------------------------------------------------------------------------------- | :--------: |
| Code quality      | Overall structure of the code, this can include tests, interfaces, design patterns, code smell, etc. |     5      |
| First to finish 🎉 | If a team finishes every single task first, a bonus of is given to this team                         |     5      |

## Final Result
| **Item**           | **Points** |
| ------------------ | :--------: |
| **Max Score**      |     40     |
| **Score obtained** |     0      |