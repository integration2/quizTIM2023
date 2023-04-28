/**
 * TIM - QUIZ
 * @author: Lorie-Anne Côté;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Excellent, bonne réponse !",
        "negative": "Oups, ce n'est pas tout à fait cela!"
    },
    "explications": {
        "Q1": "Le sang est composé de plasma (~55%), de globules blancs et de plaquettes (1%) et d'érythrocytes (~44%). Le plasma est lui-même composé d'eau, d'hormones, de protéines, de sels et de lipides.",
        "Q2": "Les os, plus précisément la moelle osseuse rouge qui se retrouve à l'intérieur de certains os, produisent les cellules du sang à partir des cellules souches hématopoïétiques de la moelle rouge. Ce processus est nommé l'hématopoïèse.",
        "Q3": "O- est le donneur universel, car il ne contient aucun antigène. D'ailleurs, AB+ est le receveur universel. Il existe 8 groupes sanguins en tout: A+, A-, B+, B-, AB+, AB-, O+, O-. "
    },
    "bonnesReponses": [
        "Q1C",
        "Q2A",
        "Q3D"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": " Oups ! Peut-être avez besoin d'apprendre plus sur le sang. Visitez le site d'Héma Québec pour plus d'infos !",
        "note33": "Vous y étiez presque ! Si vous souhaitez approfondir vos connaissances sur le sujet, visitez le site d'Héma Québec. ",
        "note66": "Bravo, vous avez une bonne connaissance générale sur le sang ! Si vous souhaitez en apprendre plus, visitez le site d'Héma Québec. ",
        "note100": "Félicitations, vous avez la note parfaite ! Vous connaissez réellement le sujet !"
    }
};

/*******  Écouteurs d'événements *******/

//Lors du chargement de la page
window.addEventListener('load', function () {
    document.querySelector('body').classList.add('js');
    quiz.debuterQuiz();
});

//Sur chacun des boutons, événement click
/*document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {
    // console.log(btnRadio);
    btnRadio.addEventListener('click', function (e) {
        // Activer le bouton de validation
        e.target.closest('.ctnQuestionnaire').querySelector('.validerQuiz').disabled = false; //ctnBouton__bouton ??
    });
}); */

/*******  Objet Quiz  *******/

const quiz = {

    //attributs

    refAccueil: document.querySelector('.ctnAccueil'),
    refQuestions: document.querySelectorAll('.ctnQuestionnaire'),
    refBoutonValider: document.querySelector('.ctnValider'),
    intNbQuestions: 3,         //nombre total de question
    intNoQuestion: 0,          //numéro de question
    intNbBonnesReponses: 0,    //nombre de réponse correcte

    debuterQuiz: function () {

        this.refAccueil.classList.remove('cacher');         //Fait apparaitre l'intro qui est cachée normalement

        const refBoutonCommencer = document.createElement('button');
        refBoutonCommencer.classList.add("btnAccueil");              
        refBoutonCommencer.textContent = 'Démarrer le quiz >>';
        this.refAccueil.appendChild(refBoutonCommencer);

        refBoutonCommencer.addEventListener('click', this.demarrerQuiz.bind(this));

        this.refQuestions.forEach(function (refQuestion) {
            // console.log(refQuestion.classList);
            refQuestion.classList.add('cacher');
        })

         // Cacher le bouton de soumission du formulaire
        this.refBoutonValider.classList.add('cacher');

        console.log(this.intNoQuestion)
        
    },

    demarrerQuiz: function () {
          
        this.refAccueil.classList.add('cacher');

        this.afficherQuestion(quiz.intNoQuestion);
    },

    afficherQuestion: function (numeroQuestion) {
       
        // Mettre à jour le numéro de la question
        this.intNoQuestion = numeroQuestion;
        // Afficher la question
        this.refQuestions[numeroQuestion].classList.remove('cacher');
        // Créer un paragraphe
        this.refBoutonValider.classList.remove('cacher');
        // Ajouter un écouteur d'événement au bouton
        this.refBoutonValider.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this)); 

    },

    validerReponse: function (idReponse) {

        

    },

    afficherResultats: function () { }
}