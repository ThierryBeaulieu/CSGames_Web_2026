# Welcome to the CS Games 2025 Web Competition!

## Context

For this challenge, you will need to complete two distinct sections: the backend and the frontend.

The goal of this challenge is to design a retro game inside your web browser. Below is an example of the expected result.

![Enemy behavior](Documentation/enemy.gif)

### Backend

The responsibility of the backend is to create a set of routes that allow access to all the *assets* required to build the game.

All files are located in the `/database` directory.

Here is the list of routes you must create:

Character routes:

* `GET /api/character/main-character`
* `GET /api/character/monster`

Background routes:

* `GET /api/background/sky`
* `GET /api/background/trees`
* `GET /api/background/ground`

Scenery routes:

* `GET /api/scenery/bottles`
* `GET /api/scenery/mushroom`
* `GET /api/scenery/mystery-block`

Each of these routes should return a PNG to the client. A base route is provided. Feel free to modify it to suit the needs of the challenge.

> **Note:** It is technically possible to use the images directly in the frontend. If you do so, no points will be awarded for the backend.

### Frontend

Initially, when you open the application, you should be able to make the main character jump. At this stage, only the main character image should be functional.

![Initial result](Documentation/initial-state.png)

Next, you will need to implement a set of game mechanics.

A complete grading rubric is available in the file [CORRECTION_EN.md](./CORRECTION_EN.md).

The frontend is divided into four sections: characters, backgrounds, scenery, and asset management features. The following sections describe each feature to implement.

#### Characters

For the main character, you should be able to control it using the arrow keys ⬅️, ➡️, ⬆️. When the character moves to the right, the image should face right, and when the character moves to the left, the image should face left. Below is an example.

![Main character movement](Documentation/mainCharacter.gif)

For the enemy, it should move from right to left. When the character collides with the enemy, the enemy should disappear.

![Enemy behavior](Documentation/enemy.gif)

#### Background

This section is fairly simple: you just need to use the assets provided by the server to create an immersive environment (see the grading rubric for more details).

#### Scenery

When the character collides with the mystery box, a mushroom should appear somewhere (the location does not matter as long as it appears).

When the character collides with the mushroom, it should disappear.

![Mystery box usage](Documentation/mystery-box.gif)

#### Asset Management

In this section, you must create components that allow a game user to see which assets were successfully downloaded from the server and which were not (see the grading rubric for more details in [CORRECTION_EN.md](./CORRECTION_EN.md)).

Here is an example:

![Asset management](Documentation/asset_state.png)

## Grading Rubric

A complete grading rubric is available in the file [CORRECTION_EN.md](./CORRECTION_EN.md).
