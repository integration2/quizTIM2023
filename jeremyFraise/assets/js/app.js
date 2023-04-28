/**
 * TIM - QUIZ
 * @author: Jeremy Fraser;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */

const objJSON = {
    "retroactions": {
        "positive": "Bonne réponse",
        "negative": "Mauvaise réponse"
    },
    "explications": {
        "Q1": "En effet, le réalisme n’est pas un principe fondamental de l’animation. Il s'agit en réalité d'une approche parmi tant d'autre du style de l'art. Le niveau de détails d’une oeuvre est lié au style et à l’atmosphère que l’artiste souhaite transmettre.",
        "Q2": "Explications de la question 2",
        "Q3": "Explications de la question 3"
    },
    "bonnesReponses": [
        "Q1D",
        "Q2D",
        "Q3A"
    ],
    "messages": {
        "note0": "Tu aurais pu faire mieux. Je te suggère de recommencer pour augmenter ton score",
        "note33": "Tu aurais pu faire mieux. Je te suggère de recommencer pour augmenter ton score",
        "note66": "Bravo, tu as une bonne connaissance générale de l'animation",
        "note100": "Félicitations, tu es un fin connaisseur !"
    }
};

/* Objet Quiz */

// Variables utiles pour les appels d'évènements
let intNumeroQuestion = 1;
let arrLabelChoixCourant = document.querySelectorAll("#question" + intNumeroQuestion + " .texteQuestion");
const arrQuestion = document.querySelectorAll(".question");
const arrLabelChoixTotal = document.querySelectorAll(".texteQuestion");
const arrChoixQuestion = document.querySelectorAll('.choixQuestion');
const arrDescriptionQuestion = document.querySelectorAll('.descriptionCache');

const quiz = {
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,
    arrPositionBonnesReponses: new Array(3, 3, 0),
    refDepart: document.querySelector('.depart'),
    // refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),
    refReponseChoisie: null,
    refLabelReponseChoisi: null,
    refResultat: document.querySelector('.resultat'),

    initierQuiz: function () {
        // Afficher l'intro  
        this.refDepart.classList.remove('cache');

        // Créer le bouton pour démarrer le quiz
        const refBoutonStart = document.createElement('button');
        refBoutonStart.textContent = 'Démarrer le quiz';
        refBoutonStart.classList.add('boutonDepart')
        this.refDepart.appendChild(refBoutonStart);

        // Ajouter un écouteur d'événement au bouton
        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        arrQuestion.forEach(function (refQuestion) {
            refQuestion.classList.add('cache');
        })
        // Cacher le bouton de soumission du formulaire
        // this.refCtnBoutonSubmit.classList.add('cache');
    },
    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refDepart.classList.add('cache');
        // Afficher la première question
        this.afficherQuestion();
    },
    afficherQuestion: function () {
        // Afficher la question
        arrQuestion[this.intNoQuestion].classList.remove('cache');
        // Créer un paragraphe
        const refCtnBouton = document.createElement('div');
        refCtnBouton.classList.add('ctnBouton');
        // Y ajouter le bouton de validation de la question 
        refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider ma réponse</button>';
        arrQuestion[this.intNoQuestion].appendChild(refCtnBouton);
        // Ajouter un écouteur d'événement au bouton
        refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
    },

    /**
     * Affiche l'image associé à la réponse sélectionner
     * @param {number} intNoRep 
     */
    selectionImage: function (intNoRep) {

        // Récupère le bouton de la question
        const refCtnBouton = document.querySelector(".ctnBouton__bouton");
        // Ajoute la classe visuallyhidden aux descriptions qui ne l'ont plus (ex: Après avoir changé de choix de réponse, la description de la réponse choisi auparavant sera caché.)
        for(let index = 0; index < arrDescriptionQuestion.length; index++) {
            if(arrDescriptionQuestion[index].classList != 'cache') {
                arrDescriptionQuestion[index].classList.add('cache');
            }
        }
        // Enlève la classe visuallyhidden à la description de l'input selectionné
        arrDescriptionQuestion[intNoRep].classList.remove('cache');
        // Récupère l'input de la réponse sélectionnée
        this.refReponseChoisie = arrChoixQuestion[intNoRep];
        this.refLabelReponseChoisi = arrLabelChoixTotal[intNoRep];
        // Active le bouton de validation
        refCtnBouton.disabled = false;
    },


    /**
     * 
     * @param {object} refBouton 
     */
    validerReponse: function (refBouton) {
        // À l'aide du intBonneReponseCourante qui recupère la position de la réponse correspondant à la question dans le arrPositionBonnesReponses, on cible le label de la réponse
        let intBonneReponseReponseCourante = this.arrPositionBonnesReponses[this.intNoQuestion];
        let refLabelBonneReponse = arrLabelChoixCourant[intBonneReponseReponseCourante];

        // Cible le bouton de la question
        const refBoutonCourant = refBouton.currentTarget;
       
        let strIdReponse = this.refReponseChoisie.id;
        let strQuestion = strIdReponse.substr(0,2);


        // Vérifie si l'utilisateur a déjà répondu et qu'il est prêt à poursuivre
        if(refBoutonCourant.innerText == "Poursuivre") {
            refBoutonCourant.remove();
            arrQuestion[this.intNoQuestion].classList.add("cache");
            this.intNoQuestion++;
            intNumeroQuestion++;
            // Si l'utilisateur est encore aux trois questions
            if(this.intNoQuestion < this.intNbQuestions) {
                arrLabelChoixCourant = document.querySelectorAll("#question" + intNumeroQuestion + " .texteQuestion");
                arrQuestion[this.intNoQuestion].classList.remove("cache");

                const refCtnBouton = document.createElement('div');
                refCtnBouton.classList.add('ctnBouton');
                // Y ajouter le bouton de validation de la question 
                refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider ma réponse</button>';
                arrQuestion[this.intNoQuestion].appendChild(refCtnBouton);
                // Ajouter un écouteur d'événement au bouton
                refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
            }
            // Sinon il a terminé
            else{
               this.afficherResultats();
            }

        }
        else{
            // Vérifie l'exactitude de la réponse
            if(strIdReponse === objJSON.bonnesReponses[this.intNoQuestion]) {
                // Ajoute la classe bonneReponse au label du choix sélectionné (this.refLabelReponseChoisi)
                this.refLabelReponseChoisi.classList.add('bonneReponse');
                // Dévoile les rétroactions
                document.querySelector('#question' + intNumeroQuestion + ' .messageBonneReponse').classList.remove('cache');
                document.querySelector('#question' + intNumeroQuestion + ' .messageBonneReponse h3').innerText = objJSON.retroactions.positive;
                document.querySelector('#question' + intNumeroQuestion + ' .messageBonneReponse p').innerText = objJSON.explications[strQuestion];

                this.intNbBonnesReponses++;
            }
            else {
                // Ajoute la classe mauvaiseReponse au choix sélectionné (this.refReponseChoisie) et dévoile la vrai réponse (refLabelBonneReponse)
                refLabelBonneReponse.classList.add('bonneReponse');
                this.refLabelReponseChoisi.classList.add('mauvaiseReponse');
                // Dévoile les rétroactions
                document.querySelector('#question' + intNumeroQuestion + ' .messageMauvaiseReponse').classList.remove('cache');
                document.querySelector('#question' + intNumeroQuestion + ' .messageMauvaiseReponse h3').innerText = objJSON.retroactions.negative;
                document.querySelector('#question' + intNumeroQuestion + ' .messageMauvaiseReponse p').innerText = objJSON.explications[strQuestion];
            };

            refBoutonCourant.innerText = "Poursuivre";
            let arrChoixCourant = document.querySelectorAll('.choixQuestion');
            
            for(let index = 0; index < arrChoixCourant.length; index++) {
                arrLabelChoixCourant[index].classList.remove('testeQuestion__etat');
                arrChoixCourant[index].checked = false;
                arrChoixCourant[index].disabled = true;
            };

        };

    },

    afficherResultats: function () {
        // Contenu
        this.refResultat.classList.remove("cache"); 
        const refConteneur = document.querySelector(".contenuResultat"); 

        
        const refH3Resultat = document.querySelector(".resultat__h3");
        const refRetroactionResultat = document.querySelector(".resultat__retroaction")

        const refSpanResultat = document.getElementById("resultatSur3");
        refSpanResultat.innerText = this.intNbBonnesReponses;

        switch(this.intNbBonnesReponses) {

            case 0:
                refH3Resultat.innerText = "Dommage"
                refRetroactionResultat.innerText = objJSON.messages.note0;
            break;

            case 1:
                refH3Resultat.innerText = "Zut"
                refRetroactionResultat.innerText = objJSON.messages.note33;
            break;

            case 2:
                refH3Resultat.innerText = "Presque"
                refRetroactionResultat.innerText = objJSON.messages.note66;
            break;

            case 3:
                refH3Resultat.innerText = "Bravo"
                refRetroactionResultat.innerText = objJSON.messages.note100;
            break;
        }

        // Reinitialisation des variables
        // intNumeroQuestion = ;
        // this.intNbBonnesReponses= ;
        // this.intNoQuestion = ;
        
        // Création d'un bouton pour recommencer le quiz
        const refCtnBoutonRecommencer = document.createElement('div');
        refCtnBoutonRecommencer.classList.add('ctnBoutonRecommencer');
        // Y ajouter le bouton de validation de la question 
        refCtnBoutonRecommencer.innerHTML = '<button type="button" class="ctnBoutonRecommencer__bouton">Recommencer le quiz</button>';
        // Ajouter un écouteur d'événement au bouton
        refConteneur.append(refCtnBoutonRecommencer);
        refCtnBoutonRecommencer.querySelector('.ctnBoutonRecommencer__bouton').addEventListener('click', this.reinitialiserQuiz.bind(this));

    },

    reinitialiserQuiz: function() {
        let arrChoixTotal = document.querySelectorAll('.choixQuestion');
        let arrLabelChoixTotal = document.querySelectorAll('.texteQuestion');
        console.log('Dans la fonction');
        intNumeroQuestion = 1;
        this.intNbBonnesReponses = 0;
        this.intNoQuestion = 0;

        this.refResultat.classList.add('cache');

        this.afficherQuestion();

        for(let intNoChoix = 0; intNoChoix < arrChoixTotal.length; intNoChoix++) {
            arrLabelChoixTotal[intNoChoix].classList.remove("bonneReponse");
            arrLabelChoixTotal[intNoChoix].classList.remove("mauvaiseReponse");
            arrLabelChoixTotal[intNoChoix].classList.add("texteQuestion__etat")
            arrChoixTotal[intNoChoix].disabled = false;   
        }



    },

    // empecherEnvoiFormulaire: function (e) {
    //     e.preventDevault();
    // },
    
    
};
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');
    /* initier le quiz */
    quiz.initierQuiz();
});
for(let index = 0; index < arrChoixQuestion.length; index++) {
    arrChoixQuestion[index].addEventListener('click', function() {
        quiz.selectionImage(index);
    });
};
// Corrigé please :(
// document.querySelector("form").addEventListener("submit", function() {
//     quiz.empecherEnvoiFormulaire(objEvenement);
// });
    

