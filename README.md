# CSGames_Web_2025
CSGames_Web_2025

# Bienvenue à la compétition Web des CS Games 2025!

## Mise en contexte

Pour cette épreuve, vous aurez à compléter deux sections distinctes : le backend (APIs REST) et le frontend (APIs REST).

Le but de cette épreuve est de concevoir un jeu rétro à l'intérieur de votre navigateur web.

La responsabilité du frontend est de créer les différentes éléments du jeu en plus de faire la gestion des entrées utilisateurs. Une liste détaillée des mécaniques du jeu vous est fourni dans la section Frontend.

Le backend quant à lui est responsable d'envoyer l'ensemble des assets au Frontend via un API REST.
P
## Résultat attendu

### Frontend
Dans cette parti vous allez implémenter différentes mécaniques de jeu. C'est à partir de l'ensemble des mécaniques de jeu que vous allez avoir implémenter que votre score sera comptabilisé. Une grille détaillée des mécaniques de jeux et des points donnés est fournie à la fin de cette section.

#### Acquisition des assets

Dans ce projet, aucun fichier statique *asset (sprite)* ne sera fourni. Pour obtenir vos assets, vous devrez faire des requêtes au serveur à partir de ces APIs REST.

Par exemple, pour acquérir l'asset du personnage principal, vous devrez effectuer la requête suivante au serveur :

`GET /api/sprite/main-character`
    
Cette route devrait marcher par défaut et vous est offerte à guise d'exemple.

L'ensemble des routes suivantes vous permettrons d'avoir accès aux assets (sprite) présent sur le serveur.

🧒 `GET /api/sprite/main-character`

👨 `GET /api/sprite/main-character/bigger`

🌳 `GET /api/sprite/ground` 

🏞️ `GET /api/sprite/background`

😈 `GET /api/sprite/goomba` 

🎁 `GET /api/sprite/mystery-box` 

☄️ `GET /api/sprite/fire-ball`

🍄 `GET /api/sprite/mushroom`

    Note Importante 👉 Ces routes ne sont pas fonctionnelles par défaut (sauf main-character). Elle devront d'abord être implémentées dans la section serveur 🤷‍♂️  

#### Mécaniques de jeux

* Flèche de gauche ⬅️ et touche (A) : le personnage devrait aller à gauche
* Flèche de droite ➡️ et touche (D) : le personnage devrait aller à droite
* Flèche du haut ⬆️ et touche (W) : le personnage devrait sauter
* Flèche du bas ⬇️ et touche (S) : le personnage devrait s'accroupir
* Touche (F) : le personnage devrait lancer une boule de feu 🔥


## Vue d'ensemble de l'architecture de l'application web


## Grille de correction

Une grille de correction complète est disponible dans le fichier [CORRECTION.MD](./CORRECTION.MD).


