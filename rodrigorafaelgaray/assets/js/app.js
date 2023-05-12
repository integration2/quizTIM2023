/**
 * TIM - QUIZ
 * @author: Rodrigo Garay (rodrigorafaelgaray);
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo, c’est une bonne réponse!",
        "negative": "Dommage, ce n’est pas la bonne réponse."
    },
    "explications": {
        "Q1": "Presque tous les oiseaux se rassemblent les uns contre les autres lorsqu’il fait froid ou lors d’une tempête. Les pingouins font même leur propre version de la vague lorsqu’ils se blottissent ensemble!",
        "Q2": "De nouvelles recherches ont révélé que le manchot empereur est capable de plonger à des profondeurs de plus de 500 m et de rester sous l’eau jusqu’à 27 minutes – plus profondément et plus longtemps que n’importe laquelle de ses congénères.",
        "Q3": "Les ours polaires sont carnivores et consomment principalement des phoques annelés et barbus, alors même si les deux espèces se rencontres beaucoup dans la nature, l’ours polaire ne sont pas prédateurs de pingouins."
    },
    "bonnesReponses": [
        "Q1B",
        "Q2D",
        "Q3C"
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
    btnRadio.addEventListener('click', function (e) {
        // Activer le bouton de validation
        e.target.closest('.question').querySelector('.ctnBouton__bouton').disabled = false;
    });
});

/* Objet Quiz */
const quiz = {
    // attributs qui sont des références vers les éléments du DOM
    refAcceuil: document.getElementById('accueil'),
    refArrQuestions: document.querySelectorAll('.question'),
    refCtnBoutonSubmit: document.querySelector('.boutonVoirLesResultatsConteneur'),
    refBoutonSubmit: document.querySelector('.boutonVoirLesResultats'),
    refResultat: document.getElementById("resultat"),
    refBoutonStart: document.querySelector('.bouton__acceuil'),

    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        // Ajouter un écouteur d'événement au bouton
        this.refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));
    },
    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refAcceuil.classList.add('visuallyhidden');
        // Affiche l'entête des questions
        document.querySelector(".questions__entete").classList.remove("visuallyhidden")
        // Afficher la première question
        this.afficherQuestion(quiz.intNoQuestion);
    },
    afficherQuestion: function (numeroQuestion) {
        // Mettre à jour le numéro de la question
        this.intNoQuestion = numeroQuestion;

        // Mettre à jour la barre de progression
        document.querySelector(".progressbar").classList.remove("progres__" + this.intNoQuestion - 1)
        document.querySelector(".progressbar").classList.add("progres__" + this.intNoQuestion)

        // Mettre à jour le texte de la barre de progression
        document.querySelector(".section__barre-de-progression__texte").innerText = "Question " + (this.intNoQuestion + 1) + " / 3";

        // Afficher la question
        this.refArrQuestions[numeroQuestion].classList.remove('visuallyhidden');


        // Créer un paragraphe
        const refCtnBouton = document.createElement('p');
        refCtnBouton.classList.add('ctnBouton');
        // Y ajouter le bouton de validation de la question 
        refCtnBouton.innerHTML = `
        <button class="ctnBouton__bouton" disabled="disabled">
        <span>Valider ma réponse</span> 
        <svg width="246" height="72" viewBox="0 0 246 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 6.5H236C240.694 6.5 244.5 10.3056 244.5 15V62C244.5 66.6944 240.694 70.5 236 70.5H17C12.3056 70.5 8.5 66.6944 8.5 62V15C8.5 10.3056 12.3056 6.5 17 6.5Z" fill="#1F487A" stroke="#5381BB" stroke-width="3"/>
            <path d="M10 1.5H225C229.694 1.5 233.5 5.30558 233.5 10V55C233.5 59.6944 229.694 63.5 225 63.5H10C5.30558 63.5 1.5 59.6944 1.5 55V10C1.5 5.30558 5.30558 1.5 10 1.5Z" fill="url(#paint0_linear_280_150)" stroke="#5381BB" stroke-width="3"/>
            <defs>
            <linearGradient id="paint0_linear_280_150" x1="34" y1="1.98979e-05" x2="235" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0.208333" stop-color="white"/>
            <stop offset="1" stop-color="#D6ECFC"/>
            </linearGradient>
            </defs>
        </svg>                                
        </button>`;
        this.refArrQuestions[numeroQuestion].appendChild(refCtnBouton);
        // Ajouter un écouteur d'événement au bouton
        refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));

    },
    validerReponse: function () {

        // Aller chercher la réponse (checked) en construisant le sélecteur d'après le no de question 
        const refReponse = document.querySelector('input[name=Q' + (this.intNoQuestion + 1) + ']:checked');
        const strReponse = refReponse.id;

        const refFieldSetQuestionCourrante = document.getElementById("Q" + (this.intNoQuestion + 1))
        const refParapgrapheErreur = refFieldSetQuestionCourrante.querySelector('.explicationReponse');

        const refArrIconeResultat = document.querySelectorAll(".resultat__reponse__element__icone");

        // Vérifier si la réponse est correcte 
        if (objJSON.bonnesReponses[this.intNoQuestion] === strReponse) {
            // Afficher la rétroaction positive
            this.refArrQuestions[this.intNoQuestion].querySelector('.retroactionReponse').innerHTML = objJSON.retroactions.positive;
            this.refArrQuestions[this.intNoQuestion].querySelector('.retroactionReponse').classList.add("bonne-reponse")

            // Changer la source de l'icone de la reponse a la section resultat
            refArrIconeResultat[this.intNoQuestion].src = "assets/images/crochet.svg"

            // Changer l'apparence de la bonne réponse
            refReponse.closest('li').querySelector('label > img').classList.add('bonneReponseBorder');

            // Incrémenter le nombre de bonnes réponses
            this.intNbBonnesReponses++;
        } else {
            // Afficher la rétroaction négative
            this.refArrQuestions[this.intNoQuestion].querySelector('.retroactionReponse').innerHTML = objJSON.retroactions.negative;
            this.refArrQuestions[this.intNoQuestion].querySelector('.retroactionReponse').classList.add("mauvaise-reponse")

            // Changer la source de l'icone de la reponse a la section resultat
            refArrIconeResultat[this.intNoQuestion].src = "assets/images/x.svg"

            // // Changer l'apparence de la mauvaise réponse 
            refReponse.closest('li').querySelector('label > img').classList.add('mauvaiseReponseBorder');

            // // Changer l'apparence de la bonne réponse
            refBonneReponse = document.getElementById(objJSON.bonnesReponses[this.intNoQuestion])
            console.log(refBonneReponse)
            refBonneReponse.closest('li').querySelector('label > img').classList.add('bonneReponseBorder');

        }

        // Cacher le bouton Valider la réponse
        this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton__bouton').classList.add("visuallyhidden");
        // Désactiver les boutons radios de la question courante
        this.refArrQuestions[this.intNoQuestion].querySelectorAll('input[type=radio]').forEach(function (refInput) {
            refInput.disabled = true;
        });

        // Afficher l'explication
        refParapgrapheErreur.innerText = objJSON.explications["Q" + (this.intNoQuestion + 1)];

        // Si on est rendu à la dernière question, faire apparaître le bouton "Voir les résultat"
        if (this.intNoQuestion == 2) {
            this.refCtnBoutonSubmit.classList.remove("visuallyhidden");

            this.refBoutonSubmit.addEventListener("click", this.afficherResultats.bind(this));
        } else {
            // Afficher le bouton pour passer à la question suivante
            this.refArrQuestions[this.intNoQuestion].querySelector(".boutonQuestionSuivanteConteneur").classList.remove("visuallyhidden");

            // Ajouter un écouteur d'événement au bouton
            this.refArrQuestions[this.intNoQuestion].querySelector('.boutonQuestionSuivante:last-child').addEventListener('click', this.questionSuivante.bind(this));
        }

    },
    questionSuivante: function () {
        // Cacher la question
        this.refArrQuestions[this.intNoQuestion].classList.add('visuallyhidden');

        // Afficher la question suivante
        this.afficherQuestion(this.intNoQuestion + 1);
    },

    afficherResultats: function () {
        refTotalReponse = document.querySelector(".resultat__reponse__total")

        // Cacher l'entête des questions
        document.querySelector(".questions__entete").classList.add("visuallyhidden")

        // Cacher la question
        this.refArrQuestions[this.intNoQuestion].classList.add('visuallyhidden');

        //Cacher le bouton Voir les resultats
        this.refCtnBoutonSubmit.classList.add("visuallyhidden");

        //Afficher la section resultats
        this.refResultat.classList.remove("visuallyhidden")

        // Afficher le nombre de bonne réponses
        switch (this.intNbBonnesReponses) {
            case 1:
                refTotalReponse.innerText += " 1 / 3"
                break;
            case 2:
                refTotalReponse.innerText += " 2 / 3"
                break;
            case 3:
                refTotalReponse.innerText += " 3 / 3 !!!"
                break;
            default:
                refTotalReponse.innerText += " 0 / 3"
                break;
        }
    }
}

quiz.initierQuiz();

// Prevent défault du formulaire
const quizForm = document.querySelector('main');

quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
});