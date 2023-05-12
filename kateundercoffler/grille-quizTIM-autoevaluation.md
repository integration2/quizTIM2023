# Checklist et autoévaluation pour le Quiz-TIM

Barème : 
A = 100%, (Tout les sous-critères respectés, réussite complète)
B = 85%, (Presque tous les critères respectés)
C = 75%, (Quelques lacunes)
D = 65%, (Atteinte minimale du critère)
E = 55% (Lacunes majeures)

## Critère 1 : HTML (1.5 points)
- [X] le code a été validé et ne comporte aucune erreur
- [X] Intégrer des images réactives en utilisant picture, source et ses attributs

__Commentaire sur critère HTML__: - Validateur : Warning: The banner role is unnecessary for element header. Aucun erreur mais j'en ai cela.
__Note (A-E)__: A

## Critère 2: Styles CSS (2.5)
- [X] les tailles de polices sont réactives (plus grandes sur écran large)
- [X] il y a au moins un point de rupture et au moins 2 variantes de mise en page (écran étroit et écran large)
- [X] utiliser avec à propos des grilles css et des flexbox
- [X] de petites animations sont ajoutées pour agrémenter le parcours de l'utilisateur
- [X] la structure des fichiers css est conforme aux exigences de l'énoncé. Soit, que seul le fichier *style.css* est relié à la page html et ce fichier importe dans l'ordre `normalize`, `utilitaires` et `typo`. Des fichiers complémentaires ont été ajoutés au besoin pour les grilles et les animations.

__Commentaire sur critère CSS__: 
__Note (A-E)__: A

## Critère 3 :  JavaScript / données JSON (2.5)
- [X] les rétroactions, les réponses et les explications ne sont pas codés en "dur", tous les textes sont extraits de l'objet JSON adapté pour le sujet.
- [X] dans la version  pauvre (javascript désactivé)
    - [X] le formulaire s'affiche au complet (les 3 questions et le bouton de soumission)
    - [X] la balise form doit être présente avec comme action "index.html"
    - [X] aucun élément lié à la version riche n'apparait
- [X] dans la version riche
    - [X] le déroulement décrit dans l'énoncé est respecté et complet

__Commentaire sur critère JavaScript__: 
__Note (A-E)__: A

## Critère 4 :  Interactivité riche (1)
- [x] les boutons radio et les boutons d'action ont plusieurs états (désactivé, normal, survol, focus)
- [x] des transitions sont utilisé pour donner de l'effet aux changements d'état des éléments interactifs
 
__Commentaire sur critère interactivité / transitions / animations__: J'aurais pu ajouter plus de transitions, surtout entre chaque question.
__Note (A-E)__: B

## Critère 5 :  Techniques d'accessibilité (1)
- [x] Il est possible de compléter le formulaire (répondre aux questions et obtenir un résultat) en se servant uniquement du clavier
- [x] Les attributs role ont été ajoutés sur les zones d'entête, de pied de page, de contenu principal et sur le formulaire
- [ ] Les images ont des textes alternatifs bien choisis (alt)
 
__Commentaire sur critère accessibilité__:  J'ai des textes alternatifs pour les images des questions, mais quand ils changent selon la réponse donné, je ne les ai pas changées.
__Note (A-E)__: B (.5)

## Critère 6 :  Versionnage (0.5)
- [x] utilisation régulière du versionnage
 
__Commentaire sur critère versionnage__: 
__Note (A-E)__: A

## Critère 7 :  Finalisation 
### Obligatoire (1)
- [x] Créer le favicon à l'aide du service en ligne https://realfavicongenerator.net/
- [X] Compléter le README par un bilan du projet
    - [X] Ce que vous avez bien réussi et dont vous êtes fiers
    - [X] Ce qui vous a causé le plus de difficultés
    - [X] Ce qui pourrait être amélioré ou n'est pas terminé
- [ ] Dernier commit/push dans le dépôt privé sur Github
- [ ] Dernière mise en ligne sur timunix3.csfoy.ca/~quiz-TIM/ 
 
__Commentaire sur critère finalisation__: 
__Note (A-E)__: 

### BONUS (1pt)
- [x] Activation de Github Pages & Création d'une page erreur 404 (fichier .htaccess, design et intégration du 404.html)
__OU__
- [ ] Valeur ajoutée dans la réalisation du Quiz (animations, défi d'intégration, ...)
DÉCRIRE LA VALEUR AJOUTÉE en commentaire

__BONUS (A-E)__: 
__Commentaire__:
