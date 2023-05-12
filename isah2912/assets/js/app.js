/**
 * TIM - QUIZ
 * @author: Prénom Nom;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo! C’est la bonne réponse!",
        "negative": "Malheureusement, ce n’est pas la bonne réponse…"
    },
    "explications": {
        "Q1": "Avec plus de 1,268 Millard de personnes qui parlent cette langue, l’anglais est la langue la plus parlée dans le monde aujourd’hui!",
        "Q2": "Effectivement, le Mandarin est la langue la plus difficile à cause des nombreux sinogrammes qui ne donnent aucun indice sur la prononciation des mots. Il y a différentes intonations qui sont associées pour chaque signe. Il faut donc se pratiquer sans relâche afin de les apprendre.",
        "Q3": "On ne connait pas le nombre exact, mais il y aurait environ 7 000 mille langues dans le monde entier. 32% d’entre elles seraient parlées en Asie, 30% en Afrique, 18% en Océanie, 15% en Amérique et 4% en Europe."
    },
    "bonnesReponses": [
        "Q1B",
        "Q2A",
        "Q3C"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Vous auriez pu faire mieux. Je vous suggère de recommencer",
        "note33": "Vous auriez pu faire mieux. Je vous suggère recommencer",
        "note66": "Bravo, vous avez une bonne connaissance générale des langues",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    }
};


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');

    quiz.initierQuiz();
});

document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {
    
    btnRadio.addEventListener('click', function (e) {
        
        e.target.closest('.section_question').querySelector('.bouton').disabled = false;
        
    });
});

/* Objet Quiz */
const quiz = {

    refIntro: document.querySelector('.introduction'),
    refArrQuestions: document.querySelectorAll('.section_question'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'), 
    refResultat: document.querySelector('resultat'),

    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        // Afficher l'intro  
        this.refIntro.classList.remove('cache');

        // Créer le bouton pour démarrer le quiz
        const refBoutonStart = document.createElement('button');
        refBoutonStart.innerHTML = 'Démarrer le quiz';
        this.refIntro.querySelector('.contenu').appendChild(refBoutonStart);

        // Ajouter un écouteur d'événement au bouton
        refBoutonStart.addEventListener('click', this.debuterQuiz.bind(this));

        // Cacher les questions
        this.refArrQuestions.forEach(function (refQuestion) {
            // console.log(refQuestion.classList);
            refQuestion.classList.add('cache');
        })
        // Cacher le bouton de soumission du formulaire
        this.refCtnBoutonSubmit.classList.add('cache');
    },
    debuterQuiz: function () { 
        this.refIntro.classList.add('cache');
        this.afficherQuestion(quiz.intNoQuestion);

    },
    afficherQuestion: function (numeroQuestion) {
        this.intNoQuestion = numeroQuestion;
        this.refArrQuestions[numeroQuestion].classList.remove('cache');

        const refCtnBouton = document.createElement('p');
        refCtnBouton.classList.add('ctnBouton');

        refCtnBouton.innerHTML = ' <button class="bouton" type="submit" disabled>Valider ma réponse</button>';

        this.refArrQuestions[numeroQuestion].appendChild(refCtnBouton);

        refCtnBouton.querySelector('.bouton').addEventListener('click', this.validerReponse.bind(this));
    
    },
    validerReponse: function (idReponse) {
        console.log('validerReponse');

        const refReponse = document.querySelector('input[name=Q' + (this.intNoQuestion + 1) + ']:checked');
        const strReponse = refReponse.id;

        if (objJSON.bonnesReponses[this.intNoQuestion] === strReponse) {
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').innerHTML = objJSON.retroactions.positive;

        console.log(refReponse);
        refReponse.closest('li').querySelector('input+label').classList.add('bonneReponse');

        this.intNbBonnesReponses++;}else{
            this.refArrQuestions[this.intNoQuestion]  
            .querySelector('.question__retroaction').innerHTML = objJSON.retroactions.negative;

            refReponse.closest('li').querySelector('input+label').classList.add('mauvaiseReponse');

            const refQuestion = this.refArrQuestions[this.intNoQuestion];
            refQuestion.querySelector('#' + objJSON.bonnesReponses[this.intNoQuestion] + '+label').classList.add('bonneReponse');

        }

        this.refArrQuestions[this.intNoQuestion].querySelector('.bouton').remove();
        this.refArrQuestions[this.intNoQuestion].querySelectorAll('input[type=radio]').forEach(function (refInput) {
            refInput.disabled = true;
        });
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('slideUp');

        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.question__explication').innerHTML = objJSON.explications['Q' + (this.intNoQuestion + 1)];
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__explication').className = 'question__explication tada';

        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton')
            .innerHTML += '<button type="button" class="ctnBouton__bouton">Passer à la question suivante</button>';

            this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child').className = 'ctnBouton__bouton rubberBand';

            this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child')
            .addEventListener('click', this.questionSuivante.bind(this));

        
    },
    
    questionSuivante: function () {
        this.refArrQuestions[this.intNoQuestion].classList.add('cache');
        this.afficherQuestion(this.intNoQuestion + 1);
    },

    afficherResultats: function () {
      
        
    }
    
    }



    

