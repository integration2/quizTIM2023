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
    });
});

/* Objet Quiz */
const quiz = {
    // attributs qui sont des références vers les éléments du DOM
    refIntro: document.querySelector('.introduction'),
    refArrQuestions: document.querySelectorAll('.question'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),
    // Ajout de la classe Active sur les boutons
    refBoutonActif: document.querySelectorAll(".choixReponses__images"),


    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    /**
     * Fonction pour initialiser le quiz
     */
    initierQuiz: function () {
        // Afficher l'intro  
        this.refIntro.classList.remove('cache');

        // Création d'un bouton pour démarrer le quiz 
        const refBoutonStart = document.createElement('button');

        refBoutonStart.classList.add('bouton__commencer');
        refBoutonStart.innerHTML = '<img src="assets/images/btn/SVG/btn_commencer.svg" alt="bouton permettant de commencer le quiz"></img>';
        this.refIntro.appendChild(refBoutonStart);

        // Ajouter un écouteur d'événement au bouton commencer le quiz
        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        this.refArrQuestions.forEach(function (refQuestion) {
            // console.log(refQuestion.classList);
            refQuestion.classList.add('cache');
        })
        // Cache le bouton de soumission du formulaire
        this.refCtnBoutonSubmit.classList.add('cache');

        // Cache la section incluant ma structure HTML 
        let refReponsesHtml = document.querySelector(".reponse__section");
        //console.log (refReponsesHtml);
        refReponsesHtml.classList.add('cache');
    },

    /**
     * Fonction pour démarrer le quiz
     */
    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refIntro.classList.add('cache');
        // Afficher la première question
        this.afficherQuestion();
        
    },

    /**
     * Fonction pour afficher les questions du quiz
     */
    afficherQuestion: function () {
        
        // Afficher la question
        this.refArrQuestions[this.intNoQuestion].classList.remove('cache');

        // cache ma zone de rétroaction
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction--grid').classList.add('cache');

        // Création d'un élément div incluant mon bouton pour vérifier la réponse
        const refCtnBouton = document.createElement('div');
        refCtnBouton.className = "ctnBouton";
        refCtnBouton.innerHTML = '<button class="ctnBouton__bouton" type="button" disabled> <img src="assets/images/btn/SVG/btn_verifier.svg" alt="bouton permettant de valider la réponse"></button>';

        this.refArrQuestions[this.intNoQuestion].appendChild(refCtnBouton);

        // Ajouter un écouteur d'événement au bouton vérifier réponse
        refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));

        // Création d'une boucle pour enlever la classe active aux boutons réponse
        for (let intCpt = 0; intCpt < this.refBoutonActif.length; intCpt++){
            //console.log("test boucle for ACTIVE");
            this.refBoutonActif[intCpt].classList.remove('active');
            this.refBoutonActif[intCpt].addEventListener('click', this.activerClasseActive.bind(this));
        }
    },

    /**
     * Fonction pour valider la réponse
     */
    validerReponse: function () {

        // Aller chercher la réponse (checked) en construisant le sélecteur d'après le no de question 
        const refReponse = document.querySelector('input[name=Q' + (this.intNoQuestion + 1) + ']:checked');
        const strReponse = refReponse.id;

        // Je fais à nouveau apparaitre la zone pour la rétroaction
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction--grid').classList.remove('cache');

        // Vérifier si la réponse est correcte 
        if (objJSON.bonnesReponses[this.intNoQuestion] === strReponse) {

            // Afficher la rétroaction positive
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').innerHTML = objJSON.retroactions.positive;
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('question__retroaction--ImageBravo');

            // Supprime les choix de réponses + image question
            this.refArrQuestions[this.intNoQuestion].querySelector('.choixReponses').remove();
            this.refArrQuestions[this.intNoQuestion].querySelector('.questionImages2').remove();
            this.refArrQuestions[this.intNoQuestion].querySelector('.questionBlocGrid2').remove();
           
            // Incrémenter le nombre de bonnes réponses
            this.intNbBonnesReponses++;

        } else {
            // Afficher la rétroaction négative
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').innerHTML = objJSON.retroactions.negative;
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('question__retroaction--ImageDesole');
            
            // Supprime les choix de réponses + image question
            this.refArrQuestions[this.intNoQuestion].querySelector('.choixReponses').remove();
            this.refArrQuestions[this.intNoQuestion].querySelector('.questionImages2').remove();
            this.refArrQuestions[this.intNoQuestion].querySelector('.questionBlocGrid2').remove();

        }

        // Supprimer le bouton Valider la réponse 
        this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton').remove();
        // Désactiver les boutons radios de la question courante
        this.refArrQuestions[this.intNoQuestion].querySelectorAll('input[type=radio]').forEach(function (refInput) {
            refInput.disabled = true;
        });

        // Ajouter animation au paragraphe de rétroaction (pas encore gérer faute de temps :/)
        //this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('slideUp');

        // Afficher l'explication
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__explication').innerHTML = objJSON.explications['Q' + (this.intNoQuestion + 1)];

        // Création d'une div incluant un bouton
        const refCtnBouton = document.createElement('div');
        refCtnBouton.className = "ctnBouton";


        // Mise en place d'une alternative pour afficher le score final
        if(this.intNoQuestion >=2){
            // Si j'atteint ma dernière question alors je propose d'afficher le résultat
            console.log('derniere question');
            this.refCtnBoutonSubmit.classList.add('cache');
            refCtnBouton.innerHTML += '<button class="ctnBouton__bouton" type="button"> <img src="assets/images/btn/SVG/btn_resultat.svg" alt="bouton permettant de vérifier notre résultat"></button>';
            refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.afficherResultats.bind(this));

            this.refArrQuestions[this.intNoQuestion].appendChild(refCtnBouton);
        
        }else{
            // Sinon je laisse le bouton "question suivante" afin de terminer le quiz
            refCtnBouton.innerHTML += '<button class="ctnBouton__bouton" type="button"> <img src="assets/images/btn/SVG/btn_suivante.svg" alt="bouton permettant de passer à la question suivante"></button>';
            
            refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.questionSuivante.bind(this));

            this.refArrQuestions[this.intNoQuestion].appendChild(refCtnBouton);
        }

    },

    /**
     * Fonction permettant de passer à la question suivante
     */
    questionSuivante: function () {
        // Cacher la question précédente
        this.refArrQuestions[this.intNoQuestion].classList.add('cache');
        //console.log("je cache ma question precedente" + this.refArrQuestions[this.intNoQuestion] );

        // Enlève les retroactions et les explications liées à la précedente question
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').remove();
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__explication').remove();

        // Incrémente la question 
        this.intNoQuestion = this.intNoQuestion +1;
        // Afficher la question suivante
        this.afficherQuestion();
    },

    /**
     * Active la classe active à la sélection de la réponse
     * @param {FocusEvent} objEvenement 
     */
    activerClasseActive: function(objEvenement){
        //console.log('je rentre dans ma fonction activer classe active');

        const refCibleBoutonActif = objEvenement.currentTarget;
        //console.log(refCibleBoutonActif);
        //console.log("this" + this);
        
        for (let intCpt = 0; intCpt < this.refBoutonActif.length; intCpt++){
            //console.log("test boucle for ACTIVE");
            this.refBoutonActif[intCpt].classList.remove('active');
            
        }
        refCibleBoutonActif.classList.add('active');
    },

    /**
     * Fonction pour afficher les résultats et connaitre son score
     */
    afficherResultats: function () { 
    let intPourcentage = 100 / 3 * this.intNbBonnesReponses;
    
    const refResultat = document.createElement('section');
    refResultat.classList.add('afficherResultat');
    refResultat.innerHTML= '<div class="resultat__section"><div class="div-resultat-txt"><p class="p-resultat">'+ objJSON.messages.resultatsDebut +' '+ Math.round(intPourcentage)+'%</p></div></div>';
    document.querySelector('main').appendChild(refResultat);

    this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').remove();
    this.refArrQuestions[this.intNoQuestion].querySelector('.question__explication').remove();
    this.refArrQuestions[this.intNoQuestion].querySelector('.questionBlocGrid1').remove();
    this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton').remove();

    this.refCtnBoutonSubmit.classList.add('cache');
    },

}

/**
 * Écouteurs d'événements pour la soumission
 */
document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()
    quiz.afficherResultats();
})