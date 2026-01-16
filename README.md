# Bienvenue à la compétition Web des CS Games 2025 !

The english version is available [here](./README_EN.md).

## Mise en contexte

Pour cette épreuve, vous aurez à compléter deux sections distinctes : le backend et le frontend.

Le but de cette épreuve est de concevoir un jeu rétro à l’intérieur de votre navigateur web. Voici un exemple du résultat attendu :

![Comportement d’un ennemi](Documentation/enemy.gif)

---

## Backend

La responsabilité du backend est de créer un ensemble de routes vous permettant d’avoir accès à l’ensemble des *assets* nécessaires à la création du jeu.

L’ensemble des fichiers est présent dans le dossier `/database`.

Voici l’ensemble des routes que vous devrez créer :

### Routes pour les personnages

* `GET /api/character/main-character`
* `GET /api/character/monster`

### Routes pour les arrière-plans

* `GET /api/background/sky`
* `GET /api/background/trees`
* `GET /api/background/ground`

### Routes pour les décors

* `GET /api/scenery/bottles`
* `GET /api/scenery/mushroom`
* `GET /api/scenery/mystery-block`

Chacune de ces routes doit retourner un fichier PNG au frontend. Une route de base vous est fournie ; n’hésitez pas à la modifier selon les besoins du défi.

> **À noter** : Il est techniquement possible d’utiliser directement les images dans le frontend. Toutefois, si tel est le cas, aucun point ne sera attribué pour le backend.

---

## Frontend

Initialement, lorsque vous ouvrez l’application, vous devriez être en mesure de faire sauter le personnage principal. À ce stade, seule l’image du personnage principal devrait être fonctionnelle.

![Résultat initial](Documentation/initial-state.png)

Pour la suite, vous devrez implémenter un ensemble de mécaniques de jeu.

Une grille de correction complète est disponible dans le fichier [CORRECTION_FR.md](./CORRECTION_FR.md).

Le frontend se divise en quatre sections : les personnages, les arrière-plans, les décors et les fonctionnalités de gestion des assets. Les sections suivantes décrivent chaque fonctionnalité à implémenter.

---

### Characters

Dans le cas du personnage principal, on souhaite pouvoir le contrôler à l’aide des flèches ⬅️, ➡️ et ⬆️. Lorsque le personnage se déplace vers la droite, l’image doit être orientée vers la droite ; lorsqu’il se déplace vers la gauche, l’image doit être orientée vers la gauche. Voici un exemple :

![Mouvements du personnage principal](Documentation/mainCharacter.gif)

Dans le cas de l’ennemi, celui-ci doit se déplacer de droite à gauche. Lorsque le personnage entre en collision avec l’ennemi, ce dernier doit disparaître.

![Comportement d’un ennemi](Documentation/enemy.gif)

---

### Background

Cette section est assez simple : vous devez utiliser les assets fournis par le serveur afin de créer un environnement immersif (voir la grille de correction pour plus de détails).

---

### Scenery

Lorsque le personnage entre en collision avec la boîte mystère, un champignon doit apparaître quelque part à l’écran (l’emplacement importe peu, tant qu’il apparaît).

Lorsque le personnage entre en collision avec le champignon, celui-ci doit disparaître.

![Utilisation de la boîte mystère](Documentation/mystery-box.gif)

---

### Asset Management

Dans cette section, vous devez créer des composants permettant à un utilisateur du jeu de voir quels assets ont été correctement téléchargés par le serveur et lesquels ne l’ont pas été (voir la grille de correction pour plus de détails dans [CORRECTION_FR.md](./CORRECTION_FR.md)).

Voici un exemple :

![Gestion des assets](Documentation/asset_state.png)

---

## Grille de correction

Une grille de correction complète est disponible dans le fichier [CORRECTION_FR.md](./CORRECTION_FR.md).
