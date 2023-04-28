/**
 * TIM - QUIZ
 * @author: Raphaël Labbé-Latreille;
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
        "Q1": "Avant de passer d’une couleur à une autre, il faut enlever la peinture du pinceau. Pour cela, il est nécessaire de tremper celui-ci dans un verre d’eau. Sans cela, le pinceau va durcir et il sera plus dur de travailler avec.",
        "Q2": "En effet, la majorité (même s’il existe des solutions et des exception) des peintures dites « acryliques » ne collera pas aux surfaces autre que le bois. Pour pouvoir travailler sur des matériaux comme le plastique, il est possible d’appliquer une couche de primer d’apprêt avant de le peinturer.",
        "Q3": "Cet outil porte plusieurs noms. Le seul nom qui ne s’applique pas est le paint-gun, qui désigne les armes à feu qui tire des minutions de peinture."
    },
    "bonnesReponses": [
        "Q1B",
        "Q2A",
        "Q3D"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Vous auriez pu faire mieux. Je vous suggère ..",
        "note33": "Vous auriez pu faire mieux. Je vous suggère ..",
        "note66": "Bravo, vous avez une bonne connaissance générale de ...",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    }
};
document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {
    // console.log(btnRadio);
    btnRadio.addEventListener('click', function (e) {
        // Activer le bouton de validation
        e.target.closest('.question').querySelector('.ctnBouton__bouton').disabled = false;
    });
});


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');
    /* initier le quiz */
    quiz.initierQuiz();
});
/* Objet Quiz */
const quiz = {
    /* Valeurs Globalles*/
    refSubmitButton : document.getElementById("button_submit"),
    refIntro: document.querySelector('.introduction'),
    refArrQuestions: document.querySelectorAll('.question'),
    
    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        // Afficher l'intro  
        //this.refIntro.classList.remove("cache");
        this.refIntro.classList.remove("cache");

        // Créer le bouton pour démarrer le quiz
        const refBoutonStart = document.createElement('button');
        refBoutonStart.textContent = 'Démarrer le quiz';
        refBoutonStart.classList.add("bouton_départ")
        this.refIntro.appendChild(refBoutonStart);

        // Ajouter un écouteur d'événement au bouton
        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        this.refArrQuestions.forEach(function (refQuestion) {
            // console.log(refQuestion.classList);
            refQuestion.classList.add('cache');
        })
        // Cacher le bouton de soumission du formulaire
        //this.refSubmitButton.classList.add("cache")
    },
    afficherQuestion: function (numeroQuestion) {
        console.log(this.intNoQuestion);
        //Disparait la question précédente
        //this.refArrQuestions[numeroQuestion-1].classList.add('cache')
        //Apparait la question
        this.refArrQuestions[numeroQuestion].classList.remove('cache');

        // Créer un paragraphe
        const refBoutonReponse = document.createElement('p');
        refBoutonReponse.classList.add('boutonReponse');
        // Y ajouter le bouton de validation de la question 
        refBoutonReponse.innerHTML = '<button type="button" disabled class="ctnBouton__bouton">Valider ma réponse</button>';
        this.refArrQuestions[numeroQuestion].appendChild(refBoutonReponse);
        // Ajouter un écouteur d'événement au bouton
        refBoutonReponse.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind());
    },
    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refIntro.classList.add('cache');
        // Afficher la première question
        this.afficherQuestion(0); 
    },
    validerReponse: function () {
        console.log(quiz.intNoQuestion);
        
        const refReponse = document.querySelector('input[name=Q'+(quiz.intNoQuestion+1)+']:checked');
        const refBlocReponse = document.querySelector('input[type=radio]:checked ~ .etiquette');
        const refCubeReponse = document.querySelector('input[type=radio]:checked ~ .checkmark');
        console.log(refReponse)
        console.log(refBlocReponse)
        let strReponse = refReponse.id
        

        if (strReponse == objJSON.bonnesReponses[quiz.intNoQuestion]){
            document.getElementById("retroaction_reponse").innerText=objJSON.retroactions.positive;
            
        } else {
            refBlocReponse.classList.add("mauvaise_reponse") 
            refCubeReponse.classList.add("mauvaise_reponse")
            
        }
        document.getElementById("retroaction_explication").innerText=objJSON.explications.Q1;
    },
    afficherResultats: function () { }
}
