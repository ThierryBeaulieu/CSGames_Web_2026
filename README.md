# Bienvenue à la compétition Web des CS Games 2025!

## Mise en contexte

Pour cette épreuve, vous devrez tenter d'implémenter le maximum de requis présent dans la grille de correction `Correction CSGames.xlxs`.

Le but de cette épreuve est de concevoir un site web permettant de créer et d'éditer un jeu 2D à l'intérieur de votre navigateur web. Voici un exemple du jeu résultant.

![Démonstration du jeu à produire](Documentation/enemy.gif)

Pour cette épreuve, il est à votre guise de choisir les requis que vous souhaitez implémenter. Les requis sont divisés en fonctions des pages de l'application.

Les sections suivantes vous donnera un détails de nos attentes envers chaque requis. Il est à noter que la correction se fera exclusivement à partir de la grille de correction `Correction CSGames.xlxs`.

Il est aussi à noter que pour aider la correction, vous êtes encouragés à cocher les requis que vous avez compléter dans le fichier Excel.

## Barre de navigation

Pour naviger à travers la page, on vous demander d'implémenter une barre de navigation, la barre de navigation doit être une bande sur le côté gauche de l'application. Pour obtenir des points supplémentaires, rendez la barre de navigation rétractable.

![Barre de navigation](Documentation/enemy.gif)


## Page de jeu (Game Page)

Comme vous pouvez le voir à partir de la page de base, on vous donne la page de jeu avec une boucle de jeu déjà complété. Vous devriez à partir du fichier `Game/Game.tsx` avoir un exemple de la manière que le rendu est produit.

Pour vous donner une meilleure idée de la boucle de jeu. Pour vous donnez une représentation plus concrète, il s'agit d'une boucle infini. À chaque image par seconde, on prend les entrés utilisateurs, on les traite et puis on crée un rendu de chaque item un par un. L'ordre dans lequel le rendu est fait influence dans ce monde 2D quels sont les images qui sont en avant plan d'en arrière plan.

![Rendering layers](Documentation/projection.png)

Comme vous pouvez voir, à partir du modèle de base, très peu d'éléments sont présent dans le jeu.


![Starting point for the game](Documentation/enemy.gif)

Pour ajouter un nouvel item au jeu, vous êtes libre de choisir la manière qui vous intéresse. Un exemple de base vous est toutefois fournit pour vous aider à commencer le défi.

À l'intérieur de la liste de correction, une grille détaillée vous est fourni de l'ensemble des éléments que vous pouvez ajouter : ciel nuageux, ciel bleu pâle, ciel bleu foncé, nuages, arbres, monstres, buissons, bouteilles, fleurs, etc. Voici un exemple du jeu une fois que plusieurs éléments y sont ajoutés.


![Game full of features](Documentation/enemy.gif)


Comme vous pouvez le voir dans la grille de correction, plusieurs fonctionnalités sont aussi demandés. Ces fonctionnalités vont influencer la comportement du personnages, du monde ou même du site web de plusieurs manières. C'est à votre guise de choisir les fonctionnalités que vous trouvez pertinentes dans le temps donné.


## Engin de jeu (Game Editor)

Cette page est destinée à la création d'un éditeur de jeu. Cette page a surtout pour but de vous permettre de modifier rapidement et efficacement les éléments présents sur la page de jeu. Deux fonctionnalités majeurs sont présentes : la gestion des arbres, la gestion des éléments présents sur le sol (bouteilles, fleurs et buisson).

En ce qui attrait à la gestion des arbres, plusieurs fonctionnalités vous sont demandés. Par exemple, il devrait être possible de visualiser l'ensemble des arbres présent à l'intérieur de l'éditeur, mais aussi à l'extérieur de celui-ci. Une list d'arbre devrait vous permettre de pouvoir incrémenter ou décrémenter la position de chaque arbre. Une fois la modification effectué, elle devrait apparaître dans la page de jeu. Une fonctionnalités supplémentaire est qu'il pourrait être possible d'incrémenter le nombre d'arbre et de le diminuer. Il devrait être possible à l'utilisateur à partir d'un modal de choisir l'arbre souhaité. Chaque arbre devrait apparaître à un endroit distinct de manière aléatoire.

![Tree handling in game editor](Documentation/enemy.gif)

En ce qui attrait à la gestion des items placés sur le sol, il devrait être possible à un utilisateur de pouvoir appuyer sur un bouton `Randomize` pour placer les différentes items à des endroits aléatoires sur le canvas.

![Random item placement](Documentation/enemy.gif)

Vous pouvez render le tout persistant à partir du serveur.


## Gestion du personnage (Game Editor)

Sur cette page, vous devez permettre aux utilisateurs de choisir le personnage que vous souhaitez. Vous avez le choix entre les trois personnages suivants :

Le chevalier :

![Knight](frontend/src/assets/characters/main-character.png)

La tête de poisson :

![Fish guy](frontend/src/assets/characters/main-character-fish.png)

Le chevalier avec lunettes :

![Cool character](frontend/src/assets/characters/cool-character.png)

Vous pouvez render le tout persistant à partir du serveur.

## Easter Egg

Sur cette page, vous devez simplement permettre aux correcteurs qui ont travaillés très très fort pour créer cette compétition de rire un peu grâce à un meme!




