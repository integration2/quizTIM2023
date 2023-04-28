/**
 * TIM - QUIZ
 * @author: Sarah Al Mahsani;
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
        "Q1": "Au sens large, l'Antiquité grecque s'étend de l'époque des palais minoens, au XVIe siècle av. J.-C., et se prolonge jusqu'à la période romaine, soit au IIIe siècle.",
        "Q2": "La famille grecque est formée par un mariage entre deux personnes de condition libre, les esclaves ne pouvant fonder une famille, le maître pouvant séparer des parents et enfants non libres s'il le souhaite. Le mariage est en général une affaire privée, négociée entre l'époux et le père de la future épouse, qui sont la plupart du temps issus d'un même milieu social.",
        "Q3": "L'acropole d'Athènes est un plateau rocheux calcaire s'élevant au centre de la ville d'Athènes à laquelle elle a longtemps servi de citadelle, de l'Athènes antique à l'occupation ottomane, ainsi que de sanctuaire religieux durant l'Antiquité."
    },
    "bonnesReponses": [
        "q1_option2",
        "q2_option3",
        "q3_option3"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Je vous suggère de faire plus de recherche sur la Grèce Antique !",
        "note33": "Vous auriez pu faire mieux... ",
        "note66": "Bravo, vous avez une bonne connaissance générale de la Grèce Antique.",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    }
};

/* Objet Quiz */
const quiz = {
    debuterQuiz: function () { },
    validerReponse: function (idReponse) { },
    afficherResultats: function () { }
}