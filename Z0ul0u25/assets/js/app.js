"use strict";
/**
 * TIM - QUIZ
 * @author: Philippe Gourdeau;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bonne réponse !",
        "negative": "Mauvaise réponse..."
    },
    "explications": {
        "Q1": "LMG gère officiellement 7 chaîne Youtube afin de couvrir les goût de tout le monde : LinusTechTips, Techlinked, ShortCircuit, Techquickie, LMGClips, Channel Super Fun et MAC address.",
        "Q2": "En date du 27 février 2022, il y a 59 membres officiels au sein de LMG… et ça n’arrête pas d’augmenter!",
        "Q3": "WAN signifie « Wide Area Network » mieux reconnu comme étant Internet. Le WAN show est présenté depuis plusieurs année par Linus Sebastian et Luke Lafreniere mettant en évidence les nouvelles, petites et grandes, dans le monde des technologies."
    },
    "bonnesReponses": [
        "Q1_C",
        "Q2_B",
        "Q3_A"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Vous ne semblez pas connaître LMG, puis-je vous suggéré un détour sur leurs chaînes Youtube?",
        "note33": "Vous auriez pu faire mieux. Je vous suggère de visiter leurs vidéos sur Youtube",
        "note66": "Bravo, vous avez une bonne connaissance générale de LMG",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    }
};


const refForm = document.getElementsByTagName("form")[0];
const refQuestions = document.getElementsByTagName("fieldset");
const refPrincipal = document.getElementById("principal");

let btnSuivant;

/* Objet Quiz */
const quiz = {
    questionCourante: -1,
    nbBonneReponse: 0,

    debuterQuiz: function () {
        refForm.classList.remove("cacher");
        refPrincipal.classList.add("cacher");
        refQuestions[++this.questionCourante].classList.remove("cacher");
    },

    validerReponse: function (idReponse) {
        if (idReponse == objJSON.bonnesReponses[this.questionCourante]) {
            console.log("Bonne réponse!");

            console.log(refQuestions[this.questionCourante]);
            refQuestions[this.questionCourante].classList.add("cacher");
            refQuestions[++this.questionCourante].classList.remove("cacher");
            // for (const input of document.querySelectorAll(`input[name='Q${quiz.questionCourante + 1}']:not(:checked)+label`) ){
            //     console.log(input);
            //     // input.classList.add("grise");
            // }
            this.nbBonneReponse++;
        } else {
            console.log("mauvaise réponse...");
        }
        btnSuivant.innerText = "Question suivante";
    },

    // afficherQuestionSuivante: function () {},
    // afficherResultats: function () { }
};

/**
 * Affiche la question suivante et cache la question courrante si valide
 * @param {Event} e Évenement déclancheur.
 */
function etapeSuivante(e) {
    switch (e.currentTarget.innerText) {
        case "Commencer le Quiz!":
            quiz.debuterQuiz();
            break;
        case "Vérifier ma réponse": {
            quiz.validerReponse(document.querySelector(`input[name='Q${quiz.questionCourante + 1}']:checked`).value);
            break;
        }
        default:
            // Question suivante
            break;
    }


    // (quiz.questionCourante != 0)?refQuestions[quiz.questionCourante - 1].classList.add("cacher"):null;

    btnSuivant.setAttribute("disabled", "disabled");
}


/**
 * cache le formulaire et chaque question individuellement.
 */
function cacherForm() {
    for (const question of refQuestions) {
        question.classList.add("cacher");
    }
    refForm.classList.add("cacher");
}

/**
 * Ajoute les boutons requis pour être interactif.
 */
function ajoutBtnsInteractif() {
    let btn = document.createElement("button");
    btn.classList.add("suivant");
    btn.innerText = "Commencer le Quiz!";
    btn.addEventListener("click", etapeSuivante, false);
    refPrincipal.appendChild(btn);
}

function choixReponse() {
    btnSuivant.removeAttribute("disabled");
}

/**
 * Action après le chargement de la page.
 */
function initialisation() {
    // (document.getElementsByTagName("body")[0].classList.contains("js-detector")) ? setupJS() : null;
    btnSuivant = document.querySelector("form>button");
    btnSuivant.innerText = "Vérifier ma réponse";
    btnSuivant.setAttribute("disabled", "disabled");
    btnSuivant.addEventListener("click", etapeSuivante, false);
    // Évenement pour prévenir l'envoi du formulaire
    refForm.addEventListener("submit", function (e) { e.preventDefault(); });

    for (const label of document.getElementsByTagName("label")) {
        label.addEventListener("click", choixReponse, false);
    }

    cacherForm();
    ajoutBtnsInteractif();

    // Pour je ne sais qu'elle holly reason, avec getElementsByClassName("margin-bottom") ça ne retire pas la classe sur le deuxième élément.
    for (const element of document.querySelectorAll(".margin-bottom")) {
        element.classList.remove("margin-bottom");
    }

}

window.addEventListener("DOMContentLoaded", initialisation, false);