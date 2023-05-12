/**
 * TIM - QUIZ
 * @author: Prénom Nom;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo, Vous avez eu une bonne réponse !",
        "negative": "Malheureusement, ce n’est pas la bonne réponse"
    },
    "explications": {
        "Q1": "Félix Leclerc est né au village de La Tuque, en Mauricie. C’est d’ailleurs ce petit coin du Québec qui seras le cadre de son tout premier roman « pieds nus dans l’aube » où il y raconte son enfance avec beaucoup de métaphores sur la nature qui l’a émerveillée durant ces temps insouciants.",
        "Q2": "Stephen King avait pour habitude d’empaler sur un seul clou toutes ses lettres de refus en guise de détermination. Malheureusement, il fut rejeté par le milieu littéraire pendant de nombreuses années avant qu’il ne lui soit accordé plus de crédit en 1990. Il est aujourd’hui l’écrivain d’horreur le plus connu au monde.",
        "Q3": "Haruki Murakami n’est pas l’auteur contemporain japonais le plus connu au monde pour rien. Lorsqu’il travaille sur un roman, il se lève à 4h du matin et travail de 5 à 6h. Une vraie machine à écrire !"
    },
    "bonnesReponses": [
        "Q1C",
        "Q2A",
        "Q3B"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Quel dommage... Recommencez ou faites de recherches !",
        "note33": "Vous auriez pu faire mieux. Réessayez.",
        "note66": "Bravo, vous avez une bonne connaissance générale sur les auteurs célèbres !",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
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
        e.target.closest('.questions').querySelector('.ctnBouton__bouton').disabled = false;
        // quiz.setReponse(e.target.id);
    });
});


/* Objet Quiz */
const quiz = {
    //Création des variables
    refAccueil : document.querySelector('.accueil'),
    refQuestions : document.querySelectorAll('.questions'),
    refBoutonValider : document.querySelector('.bouton__valider'),
    refBoutonCommencer : document.querySelector('.bouton__commencer'),

     // attributs pour gérer la progression du quiz
     intNoQuestion: 0,
     intNbQuestions: 3,
     intNbBonnesReponses: 0,

    initierQuiz: function () {
        //console.log('test')
        //Afficher l'accueil
        this.refAccueil.classList.remove('cache');
        //Ajouter un écouteur d'évènement au bouton commencer
        this.refBoutonCommencer.addEventListener('click', this.demarrerQuiz.bind(this));
        //Cacher les questions
        this.refQuestions.forEach(function (refQuestion) {
            // console.log(refQuestion.classList);
            refQuestion.classList.add('cache');
        })
        //Cacher le bouton de validation
        this.refBoutonValider.classList.add('cache'); 
     },
     demarrerQuiz: function () {
      
        //Cacher l'intro
        this.refAccueil.classList.add('cache');
        //Afficher la première question
        this.afficherQuestion();
     },
     afficherQuestion: function () {
        // Afficher la question
        this.refQuestions[this.intNoQuestion].classList.remove('cache');
        this.refBoutonCommencer.classList.add('cache');
         // Créer un paragraphe
         const refCtnBouton = document.createElement('p');
         refCtnBouton.classList.add('ctnBouton');
           // Y ajouter le bouton de validation de la question 
           refCtnBouton.innerHTML = '<button type="action" class="ctnBouton__bouton" disabled>Valider la réponse</button>'
           this.refQuestions[this.intNoQuestion].appendChild(refCtnBouton);
            // Ajouter un écouteur d'événement au bouton
        refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
    },

    validerReponse: function () { 
        console.log('reponse')
        //Aller chercher la réponse (checked), en construisant le sélecteur d'après le numéro de question.
        const refReponse = document.querySelector('input[name=Q' + (this.intNoQuestion + 1) + ']:checked');
        const strReponse = refReponse.id;
        //Vérifier la réponse
        if(objJSON.bonnesReponses[this.intNoQuestion]=== strReponse) {
            //Afficher rétroaction positive
            this.refQuestions[this.intNoQuestion].querySelector('.retroaction').innerHTML = objJSON.retroactions.positive;
            console.log('retroaction')
            //Changer l'apparence de la bonne réponse
            refReponse.closest('li').querySelector('input+label').classList.add('bonneReponse');
            //Incrémenter le nombre de bonnes réponses
            this.intNbBonnesReponses ++;
        }
        else {
            //Afficher la rétroaction négative
            this.refQuestions[this.intNoQuestion].querySelector('.retroaction').innerHTML = objJSON.retroactions.negative;
            //Changer l'apparence de la mauvaise réponse
            refReponse.closest('li').querySelector('input+label').classList.add('mauvaiseReponse');
        }
        //supprimer le bouton valider la réponse
        this.refQuestions[this.intNoQuestion].querySelector('.ctnBouton__bouton').remove();
        // Désactiver les boutons radios de la question courante
        this.refQuestions[this.intNoQuestion].querySelectorAll('input[type=radio]').forEach(function (refInput) {
            refInput.disabled = true;
        });
         // Ajouter animation au paragraphe de rétroaction
         this.refQuestions[this.intNoQuestion].querySelector('.retroaction').classList.add('slideUp');
          // Afficher l'explication
        this.refQuestions[this.intNoQuestion]
        .querySelector('.explication').innerHTML = objJSON.explications['Q' + (this.intNoQuestion + 1)];
    this.refQuestions[this.intNoQuestion].querySelector('.explication').className = 'explication tada';
     // Afficher le bouton pour passer à la question suivante
     this.refQuestions[this.intNoQuestion]
     .querySelector('.ctnBouton')
     .innerHTML += '<button type="button" class="ctnBouton__bouton">Question suivante</button>';
      // Ajouter une animation au bouton
      this.refQuestions[this.intNoQuestion]
      .querySelector('.ctnBouton__bouton:last-child').className = 'ctnBouton__bouton rubberBand';
        // Ajouter un écouteur d'événement au bouton
        this.refQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child')
            .addEventListener('click', this.questionSuivante.bind(this));
    },
    questionSuivante: function () {
        console.log('test')
        // Cacher la question
        this.refQuestions[this.intNoQuestion].classList.add('cache');
        // Incrémenter le numéro de question
        this.intNoQuestion++;
        // Afficher la question suivante
        this.afficherQuestion();
        
    },
    afficherResultats: function () {}
}