/**
 * TIM - QUIZ
 * @author: Antoine Labarre;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bonne Réponse! Tu es le ou la meilleur(e)!",
        "negative": "Mauvaise réponse! Tu es nul!"
    },
    "explications": {
        "Q1": "Meilleur personnage du jeu! Joël Miller est le personnage principal du jeu vidéo The Last of Us. Il est le personnage que nous contrôlons durant toute l’aventure.",
        "Q2": "Les claqueurs sont des infectés d’un champignon appelé le Cordyceps, c’est pour cette raison qu’ils ont une tête de champignon.",
        "Q3": "Le voyage dure trois saisons: l’automne, l’hiver et le printemps. Donc du mois de septembre 2033 au mois d’avril 2034."
    },
    "bonnesReponses": [
        "Q1C",
        "Q2B",
        "Q3A",
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de: ",
        "note0": " 0 sur 3. Tu es un amateur !",
        "note33": "1 sur 3. Tu peux faire mieux.",
        "note66": "2 sur 3. Bonne note.",
        "note100": "3 sur 3. Félicitations, vous êtes un fin connaisseur !"
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
        e.target.closest('.question').querySelector('.valide').disabled = false;
        // quiz.setReponse(e.target.id);
    });
});

/* Objet Quiz */
const quiz = {
    refIntro: document.querySelector(".introduction"),
    refArrQuestion: document.querySelectorAll(".question"),
    refCtnBoutonSubmit: document.querySelectorAll(".ctnBoutonSubmit"),
    refResultat: document.querySelector(".resultat"), 

    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,
    
    initierQuiz: function () {
        // Afficher l'intro  
        this.refIntro.classList.remove('cache');

        // Créer le bouton pour démarrer le quiz
        const refBoutonStart = document.createElement('button');
        refBoutonStart.classList.add("commencer");
        refBoutonStart.innerHTML = 'Commencer le quiz';
        this.refIntro.appendChild(refBoutonStart);

        // Ajouter un écouteur d'événement au bouton
        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // // Cacher les questions
        // this.refArrQuestion.forEach(function (refQuestion) {
        //     // console.log(refQuestion.classList);
        //     refQuestion.classList.add('cache');
        // })
        // // Cacher le bouton de soumission du formulaire
        // this.refCtnBoutonSubmit.classList.add('cache');
    },
    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refIntro.classList.add('cache');
        // Afficher la première question
        this.afficherQuestion();
    },
    afficherQuestion: function () {
        console.log(this.refArrQuestion[this.intNoQuestion]);
        // Mettre à jour le numéro de la question
        //this.intNoQuestion = numeroQuestion;
        // Afficher la question
        document.getElementById("Q" + (this.intNoQuestion + 1)).classList.remove('cache');
        //this.refArrQuestion[numeroQuestion]
        // Créer un paragraphe
        const refCtnBouton = document.createElement('p');
        refCtnBouton.classList.add("ctnBouton");
        // Y ajouter le bouton de validation de la question 
        refCtnBouton.innerHTML = '<button type="button" class="valide">Valider mon choix</button>';
        this.refArrQuestion[this.intNoQuestion].appendChild(refCtnBouton);
        // Ajouter un écouteur d'événement au bouton
        refCtnBouton.querySelector('.valide').addEventListener('click', this.validerReponse.bind(this));
    },
    validerReponse: function () {
        console.log('validerReponse');

        // Aller chercher la réponse (checked) en construisant le sélecteur d'après le no de question 
        const refReponse = document.querySelector('input[name=Q' + (this.intNoQuestion + 1) + ']:checked');
        const strReponse = refReponse.id;
        // const refRetroaction = document.getElementsByClassName(".question__retroaction"); 
        
        console.log(this.refArrQuestion[this.intNoQuestion]);
        const refRetroaction = this.refArrQuestion[this.intNoQuestion].querySelector('.question__retroaction');
        console.log(refRetroaction);

        // Vérifier si la réponse est correcte 
        if (objJSON.bonnesReponses[this.intNoQuestion] === strReponse) {
            // Afficher la rétroaction positive
            refRetroaction.innerHTML = objJSON.retroactions.positive;
            // Changer l'apparence de la bonne réponse
            console.log(refReponse);
            refReponse.closest('li').querySelector('input:checked+label').classList.add('bonnesReponses');

            // Incrémenter le nombre de bonnes réponses
            this.intNbBonnesReponses++;
        } else {
            // Afficher la rétroaction négative
            refRetroaction.innerHTML = objJSON.retroactions.negative;
            // Changer l'apparence de la mauvaise réponse 
            refReponse.closest('li').querySelector('input:checked+label').classList.add('mauvaisesReponses');
            // Changer l'apparence de la bonne réponse
            console.log(objJSON.bonnesReponses[this.intNoQuestion]);
            document.querySelector(`#${objJSON.bonnesReponses[this.intNoQuestion]}+label`).classList.add('bonnesReponses');
            // const refQuestion = refRetroaction;
            // refReponse.closest('li').querySelector('#' + objJSON.bonnesReponses[this.intNoQuestion] + '+label').classList.add('bonneReponse');

        }

        // Supprimer le bouton Valider la réponse
        this.refArrQuestion[this.intNoQuestion].querySelector('.valide').remove();
        // Désactiver les boutons radios de la question courante
        this.refArrQuestion[this.intNoQuestion].querySelectorAll('input[type=radio]').forEach(function (refInput) {
            refInput.disabled = true;
        });

        // Ajouter animation au paragraphe de rétroaction
        this.refArrQuestion[this.intNoQuestion].querySelector('.question__retroaction').classList.add('slideUp');
        // Afficher l'explication
        this.refArrQuestion[this.intNoQuestion].querySelector('.question__explication').innerHTML = objJSON.explications['Q' + (this.intNoQuestion + 1)];
        this.refArrQuestion[this.intNoQuestion].querySelector('.question__explication').className = 'question__explication tada';

        // Afficher le bouton pour passer à la question suivante
        this.refArrQuestion[this.intNoQuestion]
            .querySelector('.ctnBouton')
            .innerHTML += '<button type="button" class="ctnBouton__bouton">Passer à la question suivante</button>';

        // Ajouter une animation au bouton
        this.refArrQuestion[this.intNoQuestion].querySelector('.ctnBouton__bouton:last-child').className = 'ctnBouton__bouton rubberBand';

        // Ajouter un écouteur d'événement au bouton
        this.refArrQuestion[this.intNoQuestion].querySelector('.ctnBouton__bouton:last-child').addEventListener('click', this.questionSuivante.bind(this));

    },
    questionSuivante: function () {
        
        if(this.intNoQuestion == 2){
            this.afficherResultats();
        }

        // Cacher la question
        this.refArrQuestion[this.intNoQuestion].classList.add('cache');
        // Afficher la question suivante
        this.intNoQuestion = this.intNoQuestion + 1;
        this.afficherQuestion();

        
    },

    afficherResultats: function () { 
        // Afficher les résultats
        this.refArrQuestion[this.intNoQuestion].classList.add('cache');
        this.refResultat.classList.remove("cache");
        
        this.refResultat.querySelector('.resultat__debut').innerHTML = objJSON.messages.resultatsDebut;
        this.refResultat.querySelector('.resultat__debut').className = 'resultat__debut';

        if(this.intNbBonnesReponses == 0){
            this.refResultat.querySelector('.note').innerHTML = objJSON.messages.note0;
            this.refResultat.querySelector('.note').className = 'note';
        }
        
        if(this.intNbBonnesReponses == 1){
            this.refResultat.querySelector('.note').innerHTML = objJSON.messages.note33;
            this.refResultat.querySelector('.note').className = 'note';
        }

        if(this.intNbBonnesReponses == 2){
            this.refResultat.querySelector('.note').innerHTML = objJSON.messages.note66;
            this.refResultat.querySelector('.note').className = 'note';
        }

        if(this.intNbBonnesReponses == 3){
            this.refResultat.querySelector('.note').innerHTML = objJSON.messages.note100;
            this.refResultat.querySelector('.note').className = 'note';
        }
    }
}