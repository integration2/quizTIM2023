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
        "Q1": "La réponse était le fusain, il est plus facile à estomper et à gommer donc idéal pour des esquisses !",
        "Q2": "La bonne réponse est la sanguine! Elle permet à la fois de délimiter le dessin, mais aussi de le remplir avec ombre et lumière, donnant ainsi du relief au dessin. Parfaite pour tout sorte de portrait et dessin nu!",
        "Q3": "Toutes ces réponses son bonne! N’importe quelle façon pour développer sa technique amèneras une amélioration !"
    },
    "bonnesReponses": [
        "Q1A",
        "Q2C",
        "Q3D"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Vous auriez pu faire mieux. Je vous suggère d'étudiez un peu!",
        "note33": "C'est pas mal..mais vous auriez pu faire mieux. ",
        "note66": "Bravo, vous avez une bonne connaissance générale en dessin!",
        "note100": "Félicitations, vous êtes un fin connaisseur!"
    }
};
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
    refContainer: document.querySelector('.container'),
    refArrQuestions: document.querySelectorAll('.question'),
    /* btn submit */
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),
    // bouton redémarrer quiz
    refBtnRecommencer: document.createElement('p'),



    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        // Afficher l'intro  
        this.refIntro.classList.remove('cache');
        this.refContainer.classList.add('cache')
        // Créer le bouton pour démarrer le quiz
        const refBoutonStart = document.createElement('button');
        refBoutonStart.textContent = 'Démarrer le quiz';
        this.refIntro.appendChild(refBoutonStart);


        // Ajouter un écouteur d'événement au bouton
        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        this.refArrQuestions.forEach(function (refQuestion) {
            // console.log(refQuestion.classList);
            refQuestion.classList.add('cache');
        })
        // Cacher le bouton de soumission du formulaire
        this.refCtnBoutonSubmit.classList.add('cache');
    },
    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refIntro.classList.add('cache');
        this.refContainer.classList.remove('cache');
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


        const refSuivieQuestion = document.querySelector('.suivieQuestion');
        if (this.intNoQuestion == 0) {
            refSuivieQuestion.querySelector('.dot1').classList.add('courant');
        }
        else if (this.intNoQuestion == 1) {
            refSuivieQuestion.querySelector('.dot2').classList.add('courant');
        }
        else if (this.intNoQuestion == 2) {
            refSuivieQuestion.querySelector('.dot3').classList.add('courant');
        }
        // Ajouter un écouteur d'événement au bouton
        refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
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
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('BonneReponse')
            this.refArrQuestions[this.intNoQuestion].querySelector('.iconFemmeMauvaise').classList.add('cache')

            // Incrémenter le nombre de bonnes réponses
            this.intNbBonnesReponses++;
        } else {
            // Afficher la rétroaction négative
            this.refArrQuestions[this.intNoQuestion]
                .querySelector('.question__retroaction').innerHTML = objJSON.retroactions.negative;
            // Changer l'apparence de la mauvaise réponse 
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('MauvaiseReponse')
            this.refArrQuestions[this.intNoQuestion].querySelector('.iconFemmeBonne').classList.add('cache')
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
        // Afficher la bonne réponse et sa rétroaction
        this.refArrQuestions[this.intNoQuestion].querySelector('.grille').classList.remove('cache');
        // Cache les réponses inexactes
        this.refArrQuestions[this.intNoQuestion].querySelector('.quiz').classList.add('cache');
        // Ajouter animation au paragraphe de rétroaction
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('slideUp');
        // Afficher l'explication
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.question__explication').innerHTML = objJSON.explications['Q' + (this.intNoQuestion + 1)];
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__explication').className = 'question__explication tada';

        // Afficher le bouton pour passer à la question suivante
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton')
            .innerHTML += '<button type="button" class="ctnBouton__bouton">Passer à la question suivante</button>'

        // Ajouter une animation au bouton
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child').className = 'ctnBouton__bouton rubberBand';

        // Ajouter un écouteur d'événement au bouton
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child')
            .addEventListener('click', this.questionSuivante.bind(this));

        console.log(this.intNoQuestion)

        if (this.intNoQuestion === 2) {
            this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton__bouton').innerText = 'Validez mes réponses!';
            this.refArrQuestions[this.intNoQuestion]
                .querySelector('.ctnBouton__bouton:last-child')
                .addEventListener('click', this.afficherResultats.bind(this));
        }

    },
    questionSuivante: function () {
        // Cacher la question
        this.refArrQuestions[this.intNoQuestion].classList.add('cache');


        // Afficher la question suivante
        if (this.intNoQuestion != 2) {
            this.afficherQuestion(this.intNoQuestion + 1);
        }

    },

    afficherResultats: function () {
        const refForm= document.querySelector('.form-quiz');
        refForm.classList.add('cache');

        let intPourcentage = 100 / 3 * this.intNbBonnesReponses;

        const refResultat = document.createElement('section');
        refResultat.classList.add('afficherResultats');
        refResultat.innerHTML = '<div class="compt_resultats"><div class="texte_resultats"><img class="quiz--imgPersonnageResultats iconFemmeBonne" src="../AxelRoberge/assets/images/FemmeRetroBonne.png" alt="icone de femme qui tien ses lunette"><h2 class="titre_resultats">Voici ton résultat:</h2><p class="paragraphe_resultats">' + Math.round(intPourcentage) + '%</p><p class="paragraphe_explication"</p></div></div>';
        document.querySelector('main').appendChild(refResultat);
        const refParagrapheResultat = document.querySelector('.paragraphe_explication');

        if (this.intNbBonnesReponses === 0) {
            refParagrapheResultat.innerHTML += objJSON.messages.note0;
        }

        if (this.intNbBonnesReponses === 1) {
            refParagrapheResultat.innerHTML += objJSON.messages.note33;
        }

        if (this.intNbBonnesReponses === 2) {
            refParagrapheResultat.innerHTML += objJSON.messages.note66;
        }

        if (this.intNbBonnesReponses === 3) {
            refParagrapheResultat.innerHTML += objJSON.messages.note100;
        }
    },
}
