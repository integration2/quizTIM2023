/**
 * TIM - QUIZ
 * @author: Kim Dion;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo! Tu as la bonne réponse!",
        "negative": "Désolé, ce n’est pas la bonne réponse"
    },
    "explications": {
        "Q1": "Le Tyrsnosaures a vécu entre 67 et 66 millions d'année, ce qui veux dire qu'il a vécu a la fin du Crétacé",
        "Q2": "L’ère Mésozoïque s’est achevée par une extinction massive des dinosaures causée par une météorite. Elle a déclenché une phénoménale explosion, des éruptions volcaniques et un hiver planétaire.",
        "Q3": "Le Velociraptor pouvait atteindre jusqu’à 2 mètres de longueur."
    },
    "bonnesReponses": [
        "Q1C",
        "Q2C",
        "Q3B"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Vous auriez pu faire mieux. Je vous suggère de recommencer le quiz des dinosaures",
        "note33": "Vous auriez pu faire mieux. Je vous suggère de recommencer le quiz des dinosaures",
        "note66": "Bravo, vous avez une bonne connaissance générale sur les dinosaures",
        "note100": "Félicitations, vous êtes un fin connaisseur des dinosaures!"
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
        e.target.closest('.dinoQuestion').querySelector('.ctnBouton__bouton').disabled = false;
        // quiz.setReponse(e.target.id);
    });
});

/* Objet Quiz */
const quiz = {
    // attributs qui sont des références vers les éléments du DOM
    refIntro: document.querySelector('.intro'),
    refArrQuestions: document.querySelectorAll('.dinoQuestion'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),


    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        console.log(this.refArrQuestions)
        // Afficher l'intro  
        this.refIntro.classList.remove('cache');

        // Créer le bouton pour démarrer le quiz
        const refBoutonStart = document.createElement('button');
        refBoutonStart.innerHTML = 'Démarrer le quiz';
        this.refIntro.querySelector('.introduction__accroche').appendChild(refBoutonStart);

        // Ajouter un écouteur d'événement au bouton
        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        this.refArrQuestions.forEach(function (refQuestion) {
            // console.log(refQuestion.classList);
            refQuestion.classList.add('cache');
        })
        // Cacher le bouton de soumission du formulaire

        // this.refCtnBouton.classList.add('cache');
    },
    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refIntro.classList.add('cache');
        // Afficher la première question
        this.afficherQuestion(quiz.intNoQuestion);
    },
    afficherQuestion: function () {
        // Mettre à jour le numéro de la question
        // Afficher la question
        this.refArrQuestions[this.intNoQuestion].classList.remove('cache');
        console.log( this.refArrQuestions[this.intNoQuestion])
        // Créer un paragraphe
        const refCtnBouton = document.createElement('p');
        refCtnBouton.classList.add('ctnBouton');
        // Y ajouter le bouton de validation de la question 
        refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider</button>';
        this.refArrQuestions[this.intNoQuestion].appendChild(refCtnBouton);
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
        console.log("intNoQuestion: " + this.intNoQuestion);
        this.refArrQuestions[this.intNoQuestion].classList.add('cache');
        console.log("intNoQuestion: " + this.intNoQuestion);
        // Afficher la question suivante
        if(this.intNoQuestion +1 == this.intNbQuestions){

            this.afficherResultats();

        }else{
            this.intNoQuestion = this.intNoQuestion +1;
            this.afficherQuestion(this.intNoQuestion);
        }
    },

    afficherResultats: function () { 


        const refReponse = document.createElement("div");

        // refReponse.innerHTML = '<img class="logo" src="assets/images/logo.svg" alt="logo du site, les dinosaures"> <img class="dino" src="assets/images/stegosaurus.png"> +  objJSON.messages.resultatsDebut' ;

        // refReponse.innerHTML = '<button type="button" class="ctnBouton__bouton">Recommencer</button>'

        if(this.intNbBonnesReponses == 0){

            refReponse.innerHTML = '<img class="logo" src="assets/images/logo.svg" alt="logo du site, les dinosaures"> <img class="dino" src="assets/images/stegosaurus.png"> <br>'+  objJSON.messages.note0;


        }if(this.intNbBonnesReponses == 1){

            refReponse.innerHTML = '<img class="logo" src="assets/images/logo.svg" alt="logo du site, les dinosaures"> <img class="dino" src="assets/images/stegosaurus.png"> <br>'+  objJSON.messages.note33;

        }else if(this.intNbBonnesReponses == 2){

            refReponse.innerHTML = '<img class="logo" src="assets/images/logo.svg" alt="logo du site, les dinosaures"> <img class="dino" src="assets/images/stegosaurus.png"> <br>'+  objJSON.messages.note66;

        }else{

            refReponse.innerHTML = '<img class="logo" src="assets/images/logo.svg" alt="logo du site, les dinosaures"> <img class="dino" src="assets/images/stegosaurus.png"> <br>'+  objJSON.messages.note100;
        }
    

        refReponse.classList.add("resultat");
        refReponse.innerHTML += '<br> <button type="button" class="ctnBouton__bouton">Recommencer</button>'



        const refHTMLReponse = document.getElementById("reponse");
        refHTMLReponse.append(refReponse);

    }
}