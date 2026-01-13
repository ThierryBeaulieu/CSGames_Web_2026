# CSGames_Web_2025
CSGames_Web_2025

# Bienvenue à la compétition Web des CS Games 2025!

## Mise en contexte

Pour cette épreuve, vous aurez à compléter trois sections distinctes : le backend (APIs REST), le frontend (APIs REST & WebSockets) et le backend (WebSockets).

Le but de cette épreuve est de concevoir un jeu rétro inspiré des premières version du jeu "Super Mario Bros" à l'intérieur de votre navigateur web. Le jeu est composé en deux sections : le frontend et le backend.

La responsabilité du frontend est de s'occuper de la gestion des entrées utilisateurs. Une liste détaillée des mécaniques de jeu est fournie dans la section Backend.

Le backend quant à lui possède deux responsabilités : la gestion des assets et la gestion de l'état de la partie. Une liste détaillée est fournie dans la section Backend.

## Résultat attendu

### Frontend
Pour la partie frontend, on s'attend à ce que les développeurs implémentent 3 sections distinctes : l'intégrations des assets (APIs REST), les mécaniques de jeux, et l'envoie de l'état du jeu au serveur (Sockets).

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


### Backend


## Vue d'ensemble de l'architecture de l'application web


