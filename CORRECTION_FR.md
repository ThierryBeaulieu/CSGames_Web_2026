# Grille de correction complète

## Frontend

| **Item**               | **Description**                                                                                   | **Points** |
| ---------------------- | ------------------------------------------------------------------------------------------------- | :--------: |
| **Personnages**        |                                                                                                   |            |
| Personnage principal   | Utiliser l’image pour représenter le personnage                                                   |     1      |
|                        | Déplacer le personnage vers la droite en appuyant sur la flèche droite ➡️                          |     1      |
|                        | Déplacer le personnage vers la gauche en appuyant sur la flèche gauche ⬅️                          |     1      |
|                        | Faire sauter le personnage en appuyant sur la flèche du haut ⬆️                                    |     1      |
|                        | Inverser horizontalement l’image du personnage selon la direction dans laquelle il se déplace     |     1      |
| Monstre                | Utiliser l’image du monstre pour le représenter                                                   |     1      |
|                        | Lorsque le joueur entre en collision avec le monstre, celui-ci disparaît                          |     1      |
|                        | Le monstre doit effectuer des allers-retours de gauche à droite                                   |     1      |
| **Arrière-plan**       |                                                                                                   |            |
| Ciel                   | Utiliser l’image prévue pour représenter le ciel                                                  |     1      |
| Sol                    | Utiliser l’image prévue pour représenter le sol                                                   |     1      |
| Arbres                 | Utiliser l’image prévue pour représenter les arbres                                               |     1      |
| **Mise en scène**      |                                                                                                   |            |
| Bouteilles             | Insérer les images des bouteilles. Elles doivent apparaître au premier plan, devant le personnage |     1      |
| Boîte mystère          | Utiliser l’image de la boîte mystère                                                              |     1      |
|                        | Lorsque le personnage touche à la boîte mystère, un champignon doit apparaître quelque part       |     1      |
| Champignon             | Utiliser l’image du champignon                                                                    |     1      |
|                        | Lorsque le joueur entre en contact avec le champignon, celui-ci disparaît                         |     1      |
| **Gestion des assets** |                                                                                                   |            |
|                        | Créer une section dédiée à l’état des assets                                                      |     1      |
|                        | Dans cette section, tous les assets doivent être visibles, avec leur nom et leur image            |     1      |
|                        | Lorsqu’un asset est correctement chargé, son contour doit être vert. Sinon, il doit être rouge    |     1      |
| **Total**              | **0**                                                                                             |   **19**   |

---

## Backend

| **Item**             | **Description**                                                                | **Points** |
| -------------------- | ------------------------------------------------------------------------------ | :--------: |
| **Personnages**      |                                                                                |            |
| Personnages          | Créer une route pour les personnages `/api/character`                          |     1      |
| Personnage principal | Créer un endpoint pour le personnage principal `/api/character/main-character` |     1      |
| Monstre              | Créer un endpoint pour le monstre `/api/character/monster`                     |     1      |
| **Arrière-plan**     |                                                                                |            |
| Arrière-plan         | Créer une route pour les arrière-plans `/api/background`                       |     1      |
| Ciel                 | Créer une route pour le ciel `/api/background/sky`                             |     1      |
| Sol                  | Créer une route pour le sol `/api/background/ground`                           |     1      |
| Arbres               | Créer une route pour les arbres `/api/background/trees`                        |     1      |
| **Mise en scène**    |                                                                                |            |
| Décors               | Créer une route pour la mise en scène `/api/scenery`                           |     1      |
| Bouteilles           | Créer une route pour les bouteilles `/api/scenery/bottles`                     |     1      |
| Boîte mystère        | Créer une route pour la boîte mystère `/api/scenery/mystery-block`             |     1      |
| Champignon           | Créer une route pour le champignon `/api/scenery/mushroom`                     |     1      |
| **Total**            | **0**                                                                          |   **11**   |

---

## Qualité du produit

| **Item**             | **Description**                                                                                            | **Points** |
| -------------------- | ---------------------------------------------------------------------------------------------------------- | :--------: |
| Qualité du code      | Qualité générale de la structure du code : tests, interfaces, design patterns, absence de code smell, etc. |     5      |
| Premier à terminer 🎉 | Si une équipe termine l’ensemble des tâches, 5 points lui seront attribués                                 |     5      |

---

## Pointage final

| **Item**          | **Points** |
| ----------------- | :--------: |
| **Score maximal** |     40     |
| **Score obtenu**  |     0      |