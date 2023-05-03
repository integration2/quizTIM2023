/**
 * TIM - QUIZ
 * @author: Ugo Nanini;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bravo, c'est une bonne réponse !",
        "negative": "Désolé, ce n'est pas la bonne réponse"
    },
    "explications": {
        "Q1": "C'est en 1985 que Windows 1.0 fait sa première apparition. Il deviendra rapidement le système le plus utilisé au monde.",
        "Q2": "Paul Allen est un visionnaire dans le domaine de la micro-informatique qui a travaillé avec Bill Gates la société Microsoft.",
        "Q3": "Les deux premières versions majeures de Windows utilisaient des icônes de 32x32 pixels sans couleurs. Avec l'évolution de la technologie, de la couleur, une meilleure résolution, des ajustements de taille et des améliorations de design ont été ajoutés à celles-ci."
    },
    "bonnesReponses": [
        "Q1D",
        "Q2A",
        "Q3D"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Le point positif de ce résultat est que vous n'allez pas faire pire.",
        "note33": "Vous devrez faire plus d'effort la prochaine fois.",
        "note66": "Bravo, vous avez presque atteint la note parfaite.",
        "note100": "Félicitations, un vrai professionnel de Windows!"
    }
};

/* Écouteurs d'événements */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');
    /* initier le quiz */
    quiz.debuterQuiz();
});

document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {
    // console.log(btnRadio);
    btnRadio.addEventListener('click', function (e) {
        // Activer le bouton de validation
        e.target.closest('.question').querySelector('.ctnBouton__bouton').disabled = false;
    });
});

// /* Objet Quiz */
const quiz = {
    refIntro: document.querySelector(".intro"),
    refArrQuestions: document.querySelectorAll(".question"),
    refBtnSubmit: document.querySelector(".ctnBoutonSubmit"),
    refIntroContent: document.querySelector(".introduction"),

    intNoQuestion: 0,
    intNbrQuestions: 3,
    intNbrBonnesReponses: 3,

    debuterQuiz: function () {
        this.refIntro.classList.remove('cache');

        const refBoutonCommencer = document.createElement("button");
        refBoutonCommencer.textContent = "Démarrer le Quiz";
        refBoutonCommencer.classList.add("btnCommencer");
        this.refIntroContent.appendChild(refBoutonCommencer);

        refBoutonCommencer.addEventListener('click', this.demarrerQuiz.bind(this));

        this.refArrQuestions.forEach(function (refQuestion) {
            refQuestion.classList.add('cache');
        })
    },
    demarrerQuiz: function() {
        this.refIntro.classList.add("cache");
        this.afficherQuestion(quiz.intNoQuestion);
    },
    afficherQuestion: function (numeroQuestion) {
        this.intNoQuestion = numeroQuestion;
        this.refArrQuestions[numeroQuestion].classList.remove("cache");
        const refBouton = document.createElement("p");
        refBouton.classList.add("ctnBouton");
        refBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider ma réponse</button>';
        this.refArrQuestions[numeroQuestion].appendChild(refBouton);
        refBouton.querySelector(".ctnBouton__bouton").addEventListener('click', this.validerReponse.bind(this));
    },
    validerReponse: function (idReponse) {},
    afficherResultats: function () {}
}