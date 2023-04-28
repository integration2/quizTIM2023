/**
 * TIM - QUIZ
 * @author: Prénom Nom;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo, c’est une bonne réponse !",
        "negative": "Désolé, ce n’est pas la bonne réponse"
    },
    "explications": {
        "Q1": "La Suède se situe en Europe du Nord entre la Norvège et la Finlande.",
        "Q2": "Ce pays est le Pérou. Il se situe à l’ouest de l’Amérique du Sud, à côté du Brésil",
        "Q3": "La Mongolie se trouve au nord de la Chine."
    },
    "bonnesReponses": [
        "Q1C",
        "Q2B",
        "Q3A"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Vous auriez pu faire mieux. Je vous suggère ..",
        "note33": "Vous auriez pu faire mieux. Je vous suggère ..",
        "note66": "Bravo, vous avez une bonne connaissance générale de ...",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    }
};

/* Objet Quiz */
const quiz = {
    debuterQuiz: function () { },
    validerReponse: function (idReponse) { },
    afficherResultats: function () { }
}