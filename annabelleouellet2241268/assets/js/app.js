/**
 * TIM - QUIZ
 * @author: Annabelle Ouellet;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo, c’est une bonne réponse!",
        "negative": "Désolé, c'est une mauvaise réponse.",
        "negative2": "Vous êtes tombé dans le piège. Malheureusement, c’est une mauvaise réponse." 
    },
    "explications": {
        "Q1": "La pop est apparue dans les années 1960, durant les premières années du rock, vous connaissez le célèbre groupe The Beatles. La pop coréenne apparait dans le début des années 1990, soit 42 années après la Guerre de Corée. Le groupe sud-coréen Seo Taiji And Boys est le tout premier groupe d’idoles de K-Pop.",
        "Q2": "Eh oui, toutes ces informations sont fausses! Il y a eu beaucoup de collaborations récemment avec des artistes populaires qui font de la pop, la K-Pop utilise autant de genres que la pop, soit le rock, la ballade et l’EDM (electronic dance machine). Aussi, la K-Pop est influencée partout dans le monde entier.",
        "Q3": "C’est BTS qui détient le nombre de 28 Guinness World Records. En voici quelques exemples. Ils ont le plus de vues sur une vidéo en première et en 24 heures sur YouTube avec leur single « Butter », en avril 2021, le groupe a été le groupe le plus écouté sur Spotify avec 16,3 milliards. C’est le premier groupe coréen à avoir atteint le #1 dans le US Artist 100 et le US Album Charts avec leur album Love Yourself : Tear sorti en 2018. Les ARMY sont fiers de ce groupe talentueux."
    },
    "bonnesReponses": [
        "Q1D",
        "Q2D",
        "Q3B"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Dommage! Tu peux reprendre le test ou prends le temps de lire mon Webzine sur la musique disponible sur le serveur du Cégep.",
        "note33": "Ce n'est pas grave, au moins, ce n'était que pour le plaisir de te faire découvrir un genre qui me plaît.",
        "note66": "Bien joué! Tu as réussi à surpasser la note de passage et tu as fait de ton mieux. Ne lâche pas!",
        "note100": "C’est un excellent résultat pour quelqu’un, peut-être comme vous, qui explore et connait ces deux genres de musique."
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
    refIntro: document.querySelector('.intro'),
    refArrQuestions: document.querySelectorAll('.question'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),


    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        // Afficher l'intro  
        this.refIntro.classList.remove('cache');

        // Créer le bouton pour démarrer le quiz
        const refBoutonStart = document.createElement('button');
        refBoutonStart.innerHTML = 'Démarrer le quiz';
        this.refIntro.querySelector('.intro__p').appendChild(refBoutonStart);

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
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retro').innerHTML = objJSON.retroactions.positive;
            // Changer l'apparence de la bonne réponse
            console.log(refReponse);
            refReponse.closest('li').querySelector('input+label').classList.add('bonneReponse');
            // Incrémenter le nombre de bonnes réponses
            this.intNbBonnesReponses++;
        } else {
            // Afficher la rétroaction négative
            this.refArrQuestions[this.intNoQuestion]
                .querySelector('.question__retro').innerHTML = objJSON.retroactions.negative;
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
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retro').classList.add('slideUp');
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

