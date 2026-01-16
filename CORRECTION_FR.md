# Grille de correction complète


## Frontend
| **Item**              | **Description**                                                                                               | **Points** |
| --------------------- | ------------------------------------------------------------------------------------------------------------- | :--------: |
| **Personnages**       |                                                                                                               |            |
| Main Character        | Utiliser l'image pour représenter le personnage                                                               |     1      |
|                       | Bouger le personnage vers la droite en appuyant sur la flèche de droite ➡️                                     |     1      |
|                       | Bouger le personnage vers la gauche en appuyant sur la flèche de gauche ⬅️                                     |     1      |
|                       | Faire sauter le personnage en appuyant sur la touche du haut ⬆️                                                |     1      |
|                       | Inverser à l'horizontal l'image du personnage en fonction de la direction que va le personnage                |     1      |
| Monster               | Utiliser l'image du monstre pour représenter le monstre                                                       |     1      |
|                       | Lorsque je joueur entre en collision avec le monstre, le monstre disparaît.                                   |     1      |
|                       | Le monstre devrait faire des aller retour de droite à gauche                                                  |     1      |
| **Arrière Plan**      |                                                                                                               |            |
| Sky                   | Utiliser l'image prévu pour représenter le ciel                                                               |     1      |
| Ground                | Utiliser l'image prévu pour représenter le sol                                                                |     1      |
| Trees                 | Utiliser l'image prévu pour représenter les arbres                                                            |     1      |
| **Mise en scène**     |                                                                                                               |            |
| Bottles               | Insérer l'images des bouteilles. Les bouteilles devraient appraître à l'avant plan devant le personnage.      |     1      |
| Mystery Box           | Utiliser l'image de la boîte mystère.                                                                         |     1      |
|                       | Lorsque le personnage touche à la boite mystère, un champignon devrait appraître à quelque part.              |     1      |
| Mushroom              | Utiliser l'image du champignon                                                                                |     1      |
|                       | Lorsque le joueur entre en contact avec le champignon, le champignon devrait disparaître.                     |     1      |
| **Gestion des Asset** |                                                                                                               |            |
|                       | Créer une section destinée à l'état des assets.                                                               |     1      |
|                       | Dans cette section, on doit pouvoir voir l'ensemble des assets. Il doit y avoir le nom et l'image de l'asset. |     1      |
|                       | Lorsqu'un asset est bien téléchargé, le contour doit être vert. Lorsque ce n'est pas le cas, rouge.           |     1      |
| **Total**             | **0**                                                                                                         |   **19**   |

## Backend
| **Item**          | **Description**                                                       | **Points** |
| ----------------- | --------------------------------------------------------------------- | :--------: |
| **Personnage**    |                                                                       |            |
| Characters        | Créer une route pour les personnages `/api/character`                 |     1      |
| Main Character    | Créer un endpoint pour le personnage `/api/character/main-character/` |     1      |
| Monster           | Create un endpoint pour le monstre `/api/character/monster`           |     1      |
| **Arrière plan**  |                                                                       |            |
| Background        | Créer une route pour les arrières plans `/api/background`             |     1      |
| Sky               | Créer une route pour le ciel `/api/background/sky`                    |     1      |
| Ground            | Créer une route pour le sol `/api/background/ground`                  |     1      |
| Trees             | Créer une route pour les arbres `/api/background/trees`               |     1      |
| **Mise en scène** |                                                                       |            |
| Scenery           | Créer une route pour la mise en scène `/api/scenery`                  |     1      |
| Bottles           | Créer une route pour les bouteilles `/api/scenery/bottles/`           |     1      |
| Mystery Box       | Créer une route pour le block mystère `/api/scenery/mystery-block`    |     1      |
| Mushroom          | Créer une route pour le champignon `/api/scenery/mushroom`            |     1      |
| **Total**         | **0**                                                                 |   **11**   |


## Qualité du produit
| **Item**             | **Description**                                                                                                | **Points** |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | :--------: |
| Qualité de code      | Qualité générale de la structure de code. Cela inclut les tests, interfaces, design patterns, code smell, etc. |     5      |
| Premier à terminer 🎉 | Si une équipe termine l'ensemble des tâches, 5 points lui seront attribué.                                     |     5      |

## Pointage final
| **Item**          | **Points** |
| ----------------- | :--------: |
| **Score Maximal** |     40     |
| **Score Obtenu**  |     0      |