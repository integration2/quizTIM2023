/**
 * TIM - QUIZ
 * @author: Alexandra Dias da Rocha;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo! Vous êtes un parfait globe-trotteur…",
        "negative": "Désolé! Le pays n’était pas loin…"
    },
    "explications": {
        "Q1": "Ce phénomène météorologique se produit en effet dans le nord-ouest du Venezuela près de l’embouchure du río Catatumbo. Cet orage se déchaîne pendant une dizaine d’heures, entre 140 et 160 nuits par an, soit un peu moins de 6 mois.",
        "Q2": "Le Spotted Lake est un lac canadien tacheté aux allures extra terrestre, situé en Colombie-Britannique. Paysage surréaliste par excellence, le Spotted Lake contient plus de minéraux que d'eau, ce qui fait qu'on peut théoriquement le traverser à pied !",
        "Q3": " En Californie, quelque part dans la vallée de la Mort, des rochers se déplacent sur le sol sans raison apparente, semblant défier les lois de la pesanteur. En équipant les pierres de GPS, des scientifiques ont trouvé une explication : du windsurf sur des carreaux de glace. "
    },
    "bonnesReponses": [
        "Q1B",
        "Q2B",
        "Q3A"
    ],
    "messages": {
        "resultatsDebut": "Votre score est de",
        "note0": "Retentez…",
        "note33": "Presque…",
        "note66": "Pas loin…",
        "note100": "Bravo !"
    }
};

/* Écouteurs d'événements */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');
    /* initier le quiz */
    quiz.initierQuiz();
});

document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {
    // console.log(btnRadio);
    btnRadio.addEventListener('click', function (e) {
        // Activer le bouton de validation
        e.target.closest('.question').querySelector('.ctnBouton__bouton').disabled = false;
        // quiz.setReponse(e.target.id);
    });
});

/* Objet Quiz */
const quiz = {
    // attributs qui sont des références vers les éléments du DOM
    refIntro: document.querySelector('.introduction'),
    refArrQuestions: document.querySelectorAll('.question'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),


    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        // Afficher l'intro  
        this.refIntro.classList.remove('cache');

        // / Ajout Alex !!!!
        // Créer le bouton pour démarrer le quiz 
        //const refBoutonStart = document.createElement('button');
        const refBoutonStart = document.getElementById('btnCommencerQuiz');
        console.log(refBoutonStart);
        //refBoutonStart.innerHTML = 'Démarrer le quiz';
        //this.refIntro.querySelector('.introduction__accroche').appendChild(refBoutonStart);

        // Ajouter un écouteur d'événement au bouton
        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        this.refArrQuestions.forEach(function (refQuestion) {
            // console.log(refQuestion.classList);
            refQuestion.classList.add('cache');
        })
        // Cacher le bouton de soumission du formulaire
        this.refCtnBoutonSubmit.classList.add('cache');

        // / Ajout Alex !!!!
        //Cacher mes réponses HTML
        let refReponsesHtml = document.querySelector(".reponse__section");
        console.log (refReponsesHtml);
        refReponsesHtml.classList.add('cache');
    },
    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refIntro.classList.add('cache');
        // Afficher la première question
        this.afficherQuestion(quiz.intNoQuestion);
    },
    afficherQuestion: function (numeroQuestion) {
        // Mettre à jour le numéro de la question
        this.intNoQuestion = numeroQuestion;
        // Afficher la question
        this.refArrQuestions[numeroQuestion].classList.remove('cache');
        // Créer un paragraphe
        const refCtnBouton = document.createElement('p');
        refCtnBouton.classList.add('ctnBouton');
        // Y ajouter le bouton de validation de la question 
        refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider ma réponse</button>';
        this.refArrQuestions[numeroQuestion].appendChild(refCtnBouton);

        // const refCtnBouton = document.createElement('div');
        // refCtnBouton.classList.add('form__confirmation--envoi ctnBoutonSubmit')
        // refCtnBouton.innerHTML = '<button type="submit"><img src="assets/images/btn/SVG/btn_verifier.svg" alt="bouton permettant de valider le quiz"></button>';
        // // Ajouter un écouteur d'événement au bouton
        // refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
    },
    validerReponse: function () {
        console.log('validerReponse');

        // Aller chercher la réponse (checked) en construisant le sélecteur d'après le no de question 
        const refReponse = document.querySelector('input[name=Q' + (this.intNoQuestion + 1) + ']:checked');
        const strReponse = refReponse.id;

        // Vérifier si la réponse est correcte 
        if (objJSON.bonnesReponses[this.intNoQuestion] === strReponse) {
            // Afficher la rétroaction positive
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').innerHTML = objJSON.retroactions.positive;
            // Changer l'apparence de la bonne réponse
            console.log(refReponse);
            refReponse.closest('li').querySelector('input+label').classList.add('bonneReponse');
            // Incrémenter le nombre de bonnes réponses
            this.intNbBonnesReponses++;
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
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton')
            .innerHTML += '<button type="button" class="ctnBouton__bouton">Passer à la question suivante</button>';

        // Ajouter une animation au bouton
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child').className = 'ctnBouton__bouton rubberBand';

        // Ajouter un écouteur d'événement au bouton
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child')
            .addEventListener('click', this.questionSuivante.bind(this));

    },
    questionSuivante: function () {
        // Cacher la question
        this.refArrQuestions[this.intNoQuestion].classList.add('cache');
        // Afficher la question suivante
        this.afficherQuestion(this.intNoQuestion + 1);
    },

    afficherResultats: function () { }
}