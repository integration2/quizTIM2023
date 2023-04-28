/**
 * TIM - QUIZ
 * @author: Prénom Nom;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo, Vous avez eu une bonne réponse !",
        "negative": "Malheureusement, ce n’est pas la bonne réponse"
    },
    "explications": {
        "Q1": "Félix Leclerc est né au village de La Tuque, en Mauricie. C’est d’ailleurs ce petit coin du Québec qui seras le cadre de son tout premier roman « pieds nus dans l’aube » où il y raconte son enfance avec beaucoup de métaphores sur la nature qui l’a émerveillée durant ces temps insouciants.",
        "Q2": "Stephen King avait pour habitude d’empaler sur un seul clou toutes ses lettres de refus en guise de détermination. Malheureusement, il fut rejeté par le milieu littéraire pendant de nombreuses années avant qu’il ne lui soit accordé plus de crédit en 1990. Il est aujourd’hui l’écrivain d’horreur le plus connu au monde.",
        "Q3": "Haruki Murakami n’est pas l’auteur contemporain japonais le plus connu au monde pour rien. Lorsqu’il travaille sur un roman, il se lève à 4h du matin et travail de 5 à 6h. Une vraie machine à écrire !"
    },
    "bonnesReponses": [
        "Q1C",
        "Q2A",
        "Q3B"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Quel dommage... Recommencez ou faites de recherches !",
        "note33": "Vous auriez pu faire mieux. Réessayez.",
        "note66": "Bravo, vous avez une bonne connaissance générale sur les auteurs célèbres !",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    }
};

/* Objet Quiz */

const quiz = {
    debuterQuiz: function () { },
    validerReponse: function (idReponse) { },
    afficherResultats: function () { }
}