/**
 * TIM - QUIZ
 * @author: Maxime Lebrun;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo, c’est une bonne réponse !",
        "negative": "Désolé, ce n’est pas la bonne réponse."
    },
    "explications": {
        "Q1": "Mars est la quatrième planète du Système solaire, en comptant à partir du Soleil. Les scientifiques pensent que toutes les planètes ont été créées il y a un peu plus de 4,5 milliards d'années. Au départ, le Système solaire était un grand nuage de gaz, de poussière et de glace. Celui-ci s'est aplati en un disque en rotation. Le Soleil est né en son centre et les planètes se sont formées à partir de particules qui se sont réunies le long d'anneaux dans le disque.",
        "Q2": "La ceinture principale d'astéroïdes (parfois simplement ceinture d'astéroïdes ou ceinture principalea) est une région du Système solaire située entre les orbites de Mars et de Jupiter. Elle contient un grand nombre d'astéroïdes. La ceinture d'astéroïdes est parfois précisée « ceinture d'astéroïdes principale » lorsqu'il s'agit de la distinguer d'autres ceintures analogues du Système solaire. Tous les astéroïdes de cette ceinture sont des petits corps du Système solaire, à l'exception de Cérès, qui est une planète naine.",
        "Q3": "Notre Système solaire s’est formé il y a environ 4,5 milliards d’années. Des chercheurs nous apprennent aujourd’hui que le processus a été étonnamment rapide. Il n’a fallu que 200.000 ans pour voir des planètes se mettre à orbiter autour de notre Soleil."
    },
    "bonnesReponses": [
        "Q1C",
        "Q2D",
        "Q3B"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "C'est un désastre ! Avec votre score de 0% je vous suggère d'utiliser google la prochaine fois ...",
        "note33": "Vous auriez pu faire mieux. Avec votre score de 33%, je vous devriez approfondir vos connaissances sur le système solaire et regardez des documentaires sur le système solaire afin de comprendre le monde qui nous entoure !",
        "note66": "Bravo ! Avec votre score de 66%, vous avez une bonne connaissance générale du système solaire !",
        "note100": "Félicitations, avec votre score de 100%, vous avez bel et bien écouté vos cours sur l'astronomie au secondaire !"
    }
};

/* Écouteurs d'événements */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');
    /* initier le quiz */
    quiz.initierQuiz();
});

document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {
    
    btnRadio.addEventListener('click', function (e) {
        // Activer le bouton de validation
        e.target.closest('.question').querySelector('.ctnBouton__bouton').disabled = false;
    });
});

/* Objet Quiz */
const quiz = {
    // attributs qui sont des références vers les éléments du DOM
    refIntro: document.querySelector('.introduction'),
    refArrQuestions: document.querySelectorAll('.question'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),
    refFinal: document.querySelector(".quiz__termine"),
    refParagrapheFinal: document.querySelector(".resultat__final"),

    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        // Afficher l'intro  
        this.refIntro.classList.remove('cache');

        // Créer le bouton pour démarrer le quiz
        const refCtnDemarrer = document.createElement('p');
        refCtnDemarrer.classList.add('ctn__Btn_Demarrer');
        refCtnDemarrer.innerHTML = '<button type="button" class="btn_demarrer">Commencer le quiz</button>';
        this.refIntro.appendChild(refCtnDemarrer);


        // Ajouter un écouteur d'événement au bouton
        refCtnDemarrer.querySelector(".btn_demarrer").addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        this.refArrQuestions.forEach(function (refQuestion) {
            
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
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('wobble');
        // Afficher l'explication
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.question__explication').innerHTML = objJSON.explications['Q' + (this.intNoQuestion + 1)];
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__explication').className = 'question__explication lightSpeedInLeft';

        if (this.intNoQuestion == 2){
            this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton').innerHTML += '<button type="button" class="ctnBouton__bouton">Voir mes résultats</button>';
        }else{
           this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton').innerHTML += '<button type="button" class="ctnBouton__bouton">Passer à la question suivante</button>'; 
        }
        // Afficher le bouton pour passer à la question suivante
        

        // Ajouter une animation au bouton
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child').className = 'ctnBouton__bouton jello';

        // Ajouter un écouteur d'événement au bouton
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child')
            .addEventListener('click', this.questionSuivante.bind(this));
    },
    questionSuivante: function () { 
       
        // Cacher la question
        this.refArrQuestions[this.intNoQuestion].classList.add('cache');
        // Afficher la question suivante
        
        if (this.intNoQuestion +1 == this.intNbQuestions){
            this.afficherResultats();
        }else{
           this.afficherQuestion(this.intNoQuestion + 1); 
        }
    },
    afficherResultats: function () { 

        // Afficher la section finale
        this.refFinal.classList.remove("cache");
        // Si la note est de 0, écrire le message de la note de 0% avec le message qui se trouve dans le JSON, sinon si le message pour la note de 33%, sinons si le message pour la note de 33%, sinon le message pour la note de 100% 
        if (this.intNbBonnesReponses === 0){
            this.refParagrapheFinal.innerText = objJSON.messages.resultatsDebut+ " " + this.intNbBonnesReponses + " sur 3 questions" + " . " + objJSON.messages.note0;
        }
        else if (this.intNbBonnesReponses === 1){
            this.refParagrapheFinal.innerText = objJSON.messages.resultatsDebut +  " " + this.intNbBonnesReponses + ". " + objJSON.messages.note33;
        }
        else if (this.intNbBonnesReponses === 2){
            this.refParagrapheFinal.innerText = objJSON.messages.resultatsDebut + " " + this.intNbBonnesReponses + ". " + objJSON.messages.note66;
        }
        else{
            this.refParagrapheFinal.innerText = objJSON.messages.resultatsDebut +  " " + this.intNbBonnesReponses + ". " + objJSON.messages.note100;
        }
    }
}