# Checklist et autoévaluation pour le Quiz-TIM

Barème : 
A = 100%, (Tout les sous-critères respectés, réussite complète)
B = 85%, (Presque tous les critères respectés)
C = 75%, (Quelques lacunes)
D = 65%, (Atteinte minimale du critère)
E = 55% (Lacunes majeures)

## Critère 1 : HTML (1.5 points)
- [x] le code a été validé et ne comporte aucune erreur
- [ ] Intégrer des images réactives en utilisant picture, source et ses attributs

__Commentaire sur critère HTML__: L'utilisation des balises pictures, sources et ses attributs auraient pus amilioré l'utilisation des images dans le quiz.
__Note (A-E)__: C

## Critère 2: Styles CSS (2.5)
- [x] les tailles de polices sont réactives (plus grandes sur écran large)
- [x] il y a au moins un point de rupture et au moins 2 variantes de mise en page (écran étroit et écran large)
- [x] utiliser avec à propos des grilles css et des flexbox
- [x] de petites animations sont ajoutées pour agrémenter le parcours de l'utilisateur
- [x] la structure des fichiers css est conforme aux exigences de l'énoncé. Soit, que seul le fichier *style.css* est relié à la page html et ce fichier importe dans l'ordre `normalize`, `utilitaires` et `typo`. Des fichiers complémentaires ont été ajoutés au besoin pour les grilles et les animations.

__Commentaire sur critère CSS__: Le quiz est très bien adapté pour différentes dimensions, les grille css et flexbpx sont biens utilisés, il y a quelques animations sur certains boutons et la strucutre des fichiers css sont biens.
__Note (A-E)__: A

## Critère 3 :  JavaScript / données JSON (2.5)
- [x] les rétroactions, les réponses et les explications ne sont pas codés en "dur", tous les textes sont extraits de l'objet JSON adapté pour le sujet.
- [ ] dans la version  pauvre (javascript désactivé)
    - [ ] le formulaire s'affiche au complet (les 3 questions et le bouton de soumission)
    - [x] la balise form doit être présente avec comme action "index.html"
    - [x] aucun élément lié à la version riche n'apparait
- [x] dans la version riche
    - [x] le déroulement décrit dans l'énoncé est respecté et complet

__Commentaire sur critère JavaScript__: L'adaptation quand un navigateur n'a pas de javascript pourrait être meilleur
__Note (A-E)__: B 

## Critère 4 :  Interactivité riche (1)
- [x] les boutons radio et les boutons d'action ont plusieurs états (désactivé, normal, survol, focus)
- [x] des transitions sont utilisé pour donner de l'effet aux changements d'état des éléments interactifs
 
__Commentaire sur critère interactivité / transitions / animations__: L'interactivité du quiz est très bien en général, il y aurait pus avoir plus de transitions pour donner un effet satisfaisant.
__Note (A-E)__: B

## Critère 5 :  Techniques d'accessibilité (1)
- [ ] Il est possible de compléter le formulaire (répondre aux questions et obtenir un résultat) en se servant uniquement du clavier
- [x] Les attributs role ont été ajoutés sur les zones d'entête, de pied de page, de contenu principal et sur le formulaire
- [x] Les images ont des textes alternatifs bien choisis (alt)
 
__Commentaire sur critère accessibilité__: Le formulaire n'est pas très accesible simplement avec l'usage du clavier. Cepedant, les attributs des rôles de pages et les textes alt sur les images sont adéquats
__Note (A-E)__: B

## Critère 6 :  Versionnage (0.5)
- [x] utilisation régulière du versionnage
 
__Commentaire sur critère versionnage__: Versionnage régulièrement sur GitHub et "update" fréquent sur le serveur distant timunix3
__Note (A-E)__: A

## Critère 7 :  Finalisation 
### Obligatoire (1)
- [x] Créer le favicon à l'aide du service en ligne https://realfavicongenerator.net/
- [x] Compléter le README par un bilan du projet
    - [x] Ce que vous avez bien réussi et dont vous êtes fiers
    - [x] Ce qui vous a causé le plus de difficultés
    - [x] Ce qui pourrait être amélioré ou n'est pas terminé
- [x] Dernier commit/push dans le dépôt privé sur Github
- [x] Dernière mise en ligne sur timunix3.csfoy.ca/~quiz-TIM/ 
 
__Commentaire sur critère finalisation__: Tout est conforme aux demandes!
__Note (A-E)__: A 

### BONUS (1pt)
- [x] Activation de Github Pages & Création d'une page erreur 404 (fichier .htaccess, design et intégration du 404.html)
__OU__
- [ ] Valeur ajoutée dans la réalisation du Quiz (animations, défi d'intégration, ...)
DÉCRIRE LA VALEUR AJOUTÉE en commentaire

__BONUS (A-E)__: A
__Commentaire__: GitHub pages bel et bien activé :smiley:
