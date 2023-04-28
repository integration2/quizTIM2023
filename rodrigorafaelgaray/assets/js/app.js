/**
 * TIM - QUIZ
 * @author: Rodrigo Garay;
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

/* Écouteurs d'événements */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');
    /* initier le quiz */
    quiz.initierQuiz();
});

document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {
    console.log(btnRadio);
    btnRadio.addEventListener('click', function (e) {
        // Activer le bouton de validation
        e.target.closest('.question').querySelector('.boutonValiderReponse').disabled = false;
        // quiz.setReponse(e.target.id);
    });
});

/* Objet Quiz */
const quiz = {
    // attributs qui sont des références vers les éléments du DOM
    refAcceuil: document.getElementById('accueil'),
    refArrQuestions: document.querySelectorAll('.question'),
    refCtnBoutonSubmit: document.querySelector('.boutonVoirLesResultatsConteneur'),
    refBoutonStart: document.querySelector('.bouton__acceuil'),

    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        // Afficher l'intro  
        // this.refAcceuil.classList.remove('cache');

        // Ajouter un écouteur d'événement au bouton
        console.log(this.refBoutonStart)
        this.refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        this.refArrQuestions.forEach(function (refQuestion) {
            refQuestion.classList.add('cache');
        })
        // Cacher le bouton de soumission du formulaire
        // this.refCtnBoutonSubmit.classList.add('cache');
    },
    demarrerQuiz: function () {
        // Cacher l'intro    
        this.refAcceuil.classList.add('cache');

        // Faire apparaître l'entête des questions
        document.querySelector('.questions__entete').classList.remove('visuallyhidden')

        // Afficher la première question
        this.afficherQuestion(quiz.intNoQuestion);
    },
    afficherQuestion: function (numeroQuestion) {
        const refCtnBoutonValider = document.querySelector('.boutonValiderReponseConteneur');

        // Mettre à jour le numéro de la question
        this.intNoQuestion = numeroQuestion;
        // Afficher la question
        this.refArrQuestions[numeroQuestion].classList.remove('cache');
        // Ajouter un écouteur d'événement au bouton
        refCtnBoutonValider.querySelector('.boutonValiderReponse').addEventListener('click', this.validerReponse.bind(this));
    },
    validerReponse: function (idReponse) {
        let reponseChoisi = document.querySelector('[type=radio]:checked')
        let bonneReponse = objJSON.bonnesReponses[this.intNoQuestion]
        const refFieldSetQuestionCourrante = document.getElementById("Q" + (this.intNoQuestion + 1))
        const refCtnBoutonValider = document.querySelector('.boutonValiderReponseConteneur');
        const refCtnBoutonProchaineQuestion = document.querySelector('.boutonQuestionSuivanteConteneur');
        const refRetroaction = refFieldSetQuestionCourrante.querySelector('.retroactionReponse');
        const refParapgrapheErreur = refFieldSetQuestionCourrante.querySelector('.explicationReponse');
        // console.log(reponseChoisi)
        // console.log(bonneReponse)

        // Cache le bouton valider réponse
        refCtnBoutonValider.querySelector(".boutonValiderReponse").classList.add("visuallyhidden");

        if (reponseChoisi.id == bonneReponse) {
            refRetroaction.innerText = objJSON.retroactions.positive;
        } else {
            refRetroaction.innerText = objJSON.retroactions.negative;
        }

        refParapgrapheErreur.innerText = objJSON.explications.Q1

        // Faire apparaître le bouton prochaine question
        refCtnBoutonProchaineQuestion.classList.remove("visuallyhidden")

    },
    prochaineQuestion: function () {
        // Cacher la question
        this.refArrQuestions[this.intNoQuestion].classList.add('cache');
        // Afficher la question suivante
        this.afficherQuestion(this.intNoQuestion + 1);
    },
    afficherResultats: function () {}
}

// Écouteur d'évenements pour les boutons valider
document.querySelectorAll('.boutonValiderReponse').forEach(function (btnValider) {
    btnValider.addEventListener('click', quiz.prochaineQuestion)
})