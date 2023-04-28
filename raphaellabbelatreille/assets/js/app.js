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
    bonnesReponses: [
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
        console.log(quiz.refArrQuestions);
        //Disparait la question précédente
        //this.refArrQuestions[numeroQuestion-1].classList.add('cache')
        //Apparait la question
        for (let index = 0; index < quiz.refArrQuestions.length; index++) {
            quiz.refArrQuestions[index].classList.add("cache");
            console.log("question numéro "+ index + " caché")
            
        }
        console.log(numeroQuestion)
        this.refArrQuestions[quiz.intNoQuestion].classList.remove('cache');

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
        console.log("on valide")
        console.log(quiz.intNoQuestion);
        console.log(objJSON.bonnesReponses[quiz.intNoQuestion]);

        //Liste réponse 
        const refListeR = document.querySelector(".choix_Q"+(quiz.intNoQuestion+1));
        const arrR = refListeR.querySelectorAll("label")

        console.log(arrR)

        //Bonne réponse;
        const refBonneReponse = document.querySelector('label[for='+objJSON.bonnesReponses[quiz.intNoQuestion]+']')
        const refBlocBR = refBonneReponse.parentNode;
        const refCheckBR = refBlocBR.querySelector(".checkmark")
        const refEtiquetteBR = refBlocBR.querySelector(".etiquette")
        console.log(refBonneReponse)
        
        //Réponse émise;
        const refReponse = document.querySelector('input[name=Q'+(quiz.intNoQuestion+1)+']:checked');
        const refBlocR = refReponse.parentNode;
        const refCheckR = refBlocR.querySelector(".checkmark")
        const refEtiquetteR = refBlocR.querySelector(".etiquette")
        console.log(refReponse)
        let strReponse = refReponse.id
        console.log(strReponse)

        //Disable les input;
        for (let index = 0; index < arrR.length; index++) {
            const refLabel = arrR[index];
            const refInput = refLabel.querySelector("input")
            const refCheck = refLabel.querySelector(".checkmark");
            const refEtiquette = refLabel.querySelector(".etiquette")
            refCheck.classList.add("disable")
            refInput.disabled = true
            refEtiquette.classList.add("disable")
        }
        refListeR.parentNode.querySelector(".ctnBouton__bouton").disabled = true;
        
        //Comparer si bonne réponse ou non
        if (strReponse == objJSON.bonnesReponses[quiz.intNoQuestion]){
            document.getElementById("retroaction_reponse").innerText=objJSON.retroactions.positive;
            quiz.intNbBonnesReponses++
            
            
        } else {
            refCheckR.classList.add("mauvaise_reponse") ;
            refEtiquetteR.classList.add("mauvaise_reponse")
            
            
        }
        console.log( quiz.intNbBonnesReponses + "sur 3")
        refEtiquetteBR.classList.add("bonne_reponse")
        refCheckBR.classList.add("bonne_reponse")
        document.getElementById("retroaction_explication").innerText=objJSON.explications.Q1;

        quiz.pourContinuer(quiz.intNoQuestion);
    },
    pourContinuer: function(numeroQuestion) {
        console.log("on continue")

        const refBoutonContinuer = document.createElement('p');
        refBoutonContinuer.classList.add('boutonReponse');
        // Y ajouter le bouton de validation de la question 
        refBoutonContinuer.innerHTML = '<button type="button" class="Pour_continuer">Continuer à la prochaine question</button>';
        this.refArrQuestions[numeroQuestion].appendChild(refBoutonContinuer);
        // Ajouter un écouteur d'événement au bouton
        quiz.intNoQuestion++
        refBoutonContinuer.querySelector('.Pour_continuer').addEventListener('click', quiz.afficherQuestion.bind(this.intNoQuestion));
    },
    afficherResultats: function () { }
}
