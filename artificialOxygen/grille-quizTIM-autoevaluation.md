# Checklist et autoévaluation pour le Quiz-TIM

Barème : 
A = 100%, (Tout les sous-critères respectés, réussite complète)
B = 85%, (Presque tous les critères respectés)
C = 75%, (Quelques lacunes)
D = 65%, (Atteinte minimale du critère)
E = 55% (Lacunes majeures)

## Critère 1 : HTML (1.5 points)
- [x] le code a été validé et ne comporte aucune erreur
- [x] Intégrer des images réactives en utilisant picture, source et ses attributs 

__Commentaire sur critère HTML__: Je n'ai pas de balise picture car je n'ai que des SVG
__Note (A-E)__: A

## Critère 2: Styles CSS (2.5)
- [x] les tailles de polices sont réactives (plus grandes sur écran large)
- [x] il y a au moins un point de rupture et au moins 2 variantes de mise en page (écran étroit et écran large)
- [x] utiliser avec à propos des grilles css et des flexbox
- [x] de petites animations sont ajoutées pour agrémenter le parcours de l'utilisateur
- [x] la structure des fichiers css est conforme aux exigences de l'énoncé. Soit, que seul le fichier *style.css* est relié à la page html et ce fichier importe dans l'ordre `normalize`, `utilitaires` et `typo`. Des fichiers complémentaires ont été ajoutés au besoin pour les grilles et les animations.

__Commentaire sur critère CSS__: 
__Note (A-E)__: A

## Critère 3 :  JavaScript / données JSON (2.5)
- [x] les rétroactions, les réponses et les explications ne sont pas codés en "dur", tous les textes sont extraits de l'objet JSON adapté pour le sujet.
- [x] dans la version  pauvre (javascript désactivé)
    - [x] le formulaire s'affiche au complet (les 3 questions et le bouton de soumission)
    - [x] la balise form doit être présente avec comme action "index.html"
    - [x] aucun élément lié à la version riche n'apparait
- [x] dans la version riche
    - [x] le déroulement décrit dans l'énoncé est respecté et complet

__Commentaire sur critère JavaScript__: 
__Note (A-E)__: A

## Critère 4 :  Interactivité riche (1)
- [x] les boutons radio et les boutons d'action ont plusieurs états (désactivé, normal, survol, focus)
- [x] des transitions sont utilisé pour donner de l'effet aux changements d'état des éléments interactifs
 
__Commentaire sur critère interactivité / transitions / animations__:  Tous mes boutons ont des états. Mes boutons radios n'ont cependant pas d'état désactivé. Je n'ai pas consacré de temps pour cela vu que je devais me concentrer sur d'autres choses.
__Note (A-E)__: B

## Critère 5 :  Techniques d'accessibilité (1)
- [x] Il est possible de compléter le formulaire (répondre aux questions et obtenir un résultat) en se servant uniquement du clavier
- [x] Les attributs role ont été ajoutés sur les zones d'entête, de pied de page, de contenu principal et sur le formulaire
- [x] Les images ont des textes alternatifs bien choisis (alt)
 
__Commentaire sur critère accessibilité__: 
__Note (A-E)__: 

## Critère 6 :  Versionnage (0.5)
- [x] utilisation régulière du versionnage
 
__Commentaire sur critère versionnage__: 
__Note (A-E)__: 

## Critère 7 :  Finalisation 
### Obligatoire (1)
- [x] Créer le favicon à l'aide du service en ligne https://realfavicongenerator.net/
- [x] Compléter le README par un bilan du projet
    - [x] Ce que vous avez bien réussi et dont vous êtes fiers
    - [x] Ce qui vous a causé le plus de difficultés
    - [x] Ce qui pourrait être amélioré ou n'est pas terminé
- [x] Dernier commit/push dans le dépôt privé sur Github
- [x] Dernière mise en ligne sur timunix3.csfoy.ca/~quiz-TIM/ 
 
__Commentaire sur critère finalisation__: 
__Note (A-E)__: 

### BONUS (1pt)
- [ ] Activation de Github Pages & Création d'une page erreur 404 (fichier .htaccess, design et intégration du 404.html)
__OU__
- [x] Valeur ajoutée dans la réalisation du Quiz (animations, défi d'intégration, ...)

Mon principal défi était vraiment l'intégration des SVG. Il fallait que je mette un SVG par dessus un autre SVG (pour le conteneur des questions), il fallait ensuite que je change les images des questions pour d'autres images (toujours en svg) pour la rétroaction de la réponse à chaque question, puis j'ai rajouté un SVG lors de l'affichage du résultat avec le javascript pour faire une petite décoration...

__BONUS (A-E)__: 
__Commentaire__:
