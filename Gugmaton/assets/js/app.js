/**
 * TIM - QUIZ
 * @author: Ugo Nanini;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo, c'est une bonne réponse !",
        "negative": "Désolé, ce n'est pas la bonne réponse"
    },
    "explications": {
        "Q1": "C'est en 1985 que Windows 1.0 fait sa première apparition. Il deviendra rapidement le système le plus utilisé au monde.",
        "Q2": "Paul Allen est un visionnaire dans le domaine de la micro-informatique qui a travaillé avec Bill Gates la société Microsoft.",
        "Q3": "Les deux premières versions majeures de Windows utilisaient des icônes de 32x32 pixels sans couleurs. Avec l'évolution de la technologie, de la couleur, une meilleure résolution, des ajustements de taille et des améliorations de design ont été ajoutés à celles-ci."
    },
    "bonnesReponses": [
        "Q1D",
        "Q2A",
        "Q3D"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Le point positif de ce résultat est que vous n'allez pas faire pire.",
        "note33": "Vous devrez faire plus d'effort la prochaine fois.",
        "note66": "Bravo, vous avez presque atteint la note parfaite.",
        "note100": "Félicitations, un vrai professionnel de Windows!"
    }
};

/* Écouteurs d'événements */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');
    /* initier le quiz */
    quiz.debuterQuiz();
});

document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {
    // console.log(btnRadio);
    btnRadio.addEventListener('click', function (e) {
        // Activer le bouton de validation
        e.target.closest('.question').querySelector('.ctnBouton__bouton').disabled = false;
    });
});

// /* Objet Quiz */
const quiz = {
    refIntro: document.querySelector(".intro"),
    refArrQuestions: document.querySelectorAll(".question"),
    refBoutonQuestion: document.querySelectorAll(".fieldset_question"),
    refBtnSubmit: document.querySelector(".ctnBoutonSubmit"),
    refIntroContent: document.querySelector(".introduction"),
    refTitreQuiz: document.querySelector(".titre_quiz"),
    refResultat: document.querySelector(".resultat"),
    refFormulaire: document.querySelector(".form"),
    refBarreProgresUn: document.querySelector(".barre_progression1"),
    refBarreProgresDeux: document.querySelector(".barre_progression2"),
    refBarreProgresTrois: document.querySelector(".barre_progression3"),

    intNoQuestion: 0,
    intNbrQuestions: 3,
    intNbrBonnesReponses: 0,

    debuterQuiz: function () {
        this.refIntro.classList.remove('cache');

        const refBoutonCommencer = document.createElement("button");
        refBoutonCommencer.textContent = "Démarrer le Quiz";
        refBoutonCommencer.classList.add("btnCommencer");
        this.refIntroContent.appendChild(refBoutonCommencer);

        refBoutonCommencer.addEventListener('click', this.demarrerQuiz.bind(this));

        this.refArrQuestions.forEach(function (refQuestion) {
            refQuestion.classList.add('cache');
        })
    },
    demarrerQuiz: function () {
        this.refIntro.classList.add("cache");
        this.afficherQuestion();
    },
    afficherQuestion: function () {
        console.log("Numéro de la question: " + this.intNoQuestion);
        this.refArrQuestions[this.intNoQuestion].classList.remove("cache");
        const refParagraphe = document.createElement("p");
        refParagraphe.classList.add("ctnBouton");
        refParagraphe.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider ma réponse</button>';
        this.refBoutonQuestion[this.intNoQuestion].appendChild(refParagraphe);
        refParagraphe.querySelector(".ctnBouton__bouton").addEventListener('click', this.validerReponse.bind(this));
        this.refTitreQuiz.classList.remove("cache");
        //aficher les barres de progression
        if (this.intNoQuestion == 0) {
            this.refBarreProgresUn.classList.remove("cache");
        } else if (this.intNoQuestion == 1) {
            this.refBarreProgresUn.classList.add("cache");
            this.refBarreProgresDeux.classList.remove("cache");
        } else if (this.intNoQuestion == 2) {
            this.refBarreProgresDeux.classList.add("cache");
            this.refBarreProgresTrois.classList.remove("cache");
        }
    },
    validerReponse: function () {
        console.log("J'ai entrer dans la fonction validerReponse");
        // Aller chercher la réponse (checked) en construisant le sélecteur d'après le no de question 
        const refReponse = document.querySelector('input[name=Q' + (this.intNoQuestion + 1) + ']:checked');
        const strReponse = refReponse.id;

        // Vérifier si la réponse est correcte 
        if (objJSON.bonnesReponses[this.intNoQuestion] === strReponse) {
            // Afficher la rétroaction positive
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').innerHTML = objJSON.retroactions.positive;
            // Changer l'apparence de la bonne réponse
            refReponse.closest('li').querySelector('input+label').classList.add('bonneReponse');
            // Incrémenter le nombre de bonnes réponses
            this.intNbrBonnesReponses++;
        } else {
            // Afficher la rétroaction négative
            this.refArrQuestions[this.intNoQuestion]
                .querySelector('.question__retroaction').innerHTML = objJSON.retroactions.negative;
            // Changer l'apparence de la mauvaise réponse 
            refReponse.closest('li').querySelector('input+label').classList.add('mauvaiseReponse');
            // Changer l'apparence de la bonne réponse
            const refQuestion = this.refArrQuestions[this.intNoQuestion];
            refQuestion.querySelector('#' + objJSON.bonnesReponses[this.intNoQuestion] + '+label').classList.add('bonneReponse');
        }

        // Supprimer le bouton Valider la réponse
        this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton__bouton').remove();
        // Désactiver les boutons radios de la question courante
        this.refArrQuestions[this.intNoQuestion].querySelectorAll('input[type=radio]').forEach(function (refInput) {
            refInput.disabled = true;
        });

        // Ajouter animation au paragraphe de rétroaction
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('slideUp');
        // Afficher l'explication
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.question__explication').innerHTML = objJSON.explications['Q' + (this.intNoQuestion + 1)];
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__explication').className = 'question__explication tada';

        // Afficher le bouton pour passer à la question suivante
        if (this.intNoQuestion == 2) {
            this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton').innerHTML += '<button type="button" class="valider__bouton">Valider le formulaire</button>';
            this.refArrQuestions[this.intNoQuestion].querySelector('.valider__bouton').className = 'valider__bouton rubberBand';
            this.refArrQuestions[this.intNoQuestion].querySelector('.valider__bouton').addEventListener('click', this.afficherResultat.bind(this));
        } else {
            this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton').innerHTML += '<button type="button" class="ctnBouton__bouton">Passer à la question suivante</button>';


            // Ajouter une animation au bouton
            this.refArrQuestions[this.intNoQuestion]
                .querySelector('.ctnBouton__bouton:last-child').className = 'ctnBouton__bouton rubberBand';

            // Ajouter un écouteur d'événement au bouton
            this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton__bouton:last-child').addEventListener('click', this.questionSuivante.bind(this));
        }
        console.log("Nombre de bonnes réponses: " + this.intNbrBonnesReponses);
    },
    questionSuivante: function () {
        if (this.intNoQuestion == 2) {
            this.intNoQuestion++;
            this.refArrQuestions[this.intNoQuestion - 1].classList.add('cache');
            this.refArrQuestions[this.intNoQuestion].classList.remove('cache');
        } else {
            this.intNoQuestion++;
            // Cacher la question
            this.refArrQuestions[this.intNoQuestion - 1].classList.add('cache');
            // Afficher la question suivante
            this.afficherQuestion(this.intNoQuestion + 1);
        }
    },
    afficherResultat: function () {
        console.log("afficherResultat");
        this.refBarreProgresTrois.classList.add("cache");
        this.refArrQuestions[this.intNoQuestion].classList.add("cache");
        const refDivResultat = document.createElement("div");
        refDivResultat.className = "divResultat";
        this.refFormulaire.appendChild(refDivResultat);
        if (this.intNbrBonnesReponses == 1) {
            refDivResultat.innerHTML = "<h1>" + objJSON.messages.note33 + "</h1>";
        } else if (this.intNbrBonnesReponses == 2) {
            refDivResultat.innerHTML = "<h1>" + objJSON.messages.note66 + "</h1>";
        } else if (this.intNbrBonnesReponses == 3) {
            refDivResultat.innerHTML = "<h1>" + objJSON.messages.note100 + "</h1>";
        } else {
            refDivResultat.innerHTML = "<h1>" + objJSON.messages.note0 + "</h1>";
        }
        console.log(refDivResultat);
    }
}