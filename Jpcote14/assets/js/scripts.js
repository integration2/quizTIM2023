/**
 * TIM - QUIZ
 * @author: Jean-philippe Cote;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
  retroactions: {
    positive: "Bravo, c’est une bonne réponse !",
    negative: "Désolé, ce n’est pas la bonne réponse",
  },
  explications: {
    Q1: "King of the Hill est une sitcom animée américaine créée par Mike Judge et Greg Daniels pour la Fox Broadcasting Company.La série a été initialement diffusée du 12 janvier 1997 au 6 mai 2010 et se concentre sur les collines, une famille américaine dans la ville fictive d'Arlen, au Texas, ainsi que leurs voisins, collègues, parents, camarades de classe, amis, et connaissances.",
    Q2: "Et oui, le nouveau né de Clotaire Hill se nomme BH (Bon-Henri). Il se nomme ainsi pour souligner son dédain pour son autre fils Henri.",
    Q3: "Malgrés la version Québecoise, la ville de Saint-Irène (Arlen en anglais) se trouve au Texas.",
  },
  bonnesReponses: ["Q1A", "Q2D", "Q3B"],
  messages: {
    resultatsDebut: "Vous avez obtenu un résultat de",
    note0: "Vous auriez pu faire mieux. Je vous suggère ..",
    note33: "Vous auriez pu faire mieux. Je vous suggère ..",
    note66: "Bravo, vous avez une bonne connaissance générale de ...",
    note100: "Félicitations, vous êtes un fin connaisseur !",
  },
};

/* Écouteurs d'événements */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("body").classList.add("js");
  /* initier le quiz */
  quiz.initierQuiz();
});

document.querySelectorAll("[type=radio]").forEach(function (btnRadio) {
  btnRadio.addEventListener("click", function (e) {
    // Activer le bouton de validation
    e.target.closest(".question").querySelector(".ctnBouton__bouton").disabled = false;
    // quiz.setReponse(e.target.id);
  });
});

const quiz = {
  // attributs qui sont des références vers les éléments du DOM
  refIntro: document.querySelector(".accueil"),
  refArrQuestions: document.querySelectorAll(".question"),
  refCtnBoutonSubmit: document.querySelector(".ctnBoutonSubmit"),

  // attributs pour gérer la progression du quiz
  intNoQuestion: 0,
  intNbQuestions: 3,
  intNbBonnesReponses: 0,

  initierQuiz: function () {
    // Afficher l'intro
    this.refIntro.classList.remove("cacher");

    // Créer le bouton pour démarrer le quiz
    const refBoutonStart = document.createElement("button");
    refBoutonStart.innerHTML = "Démarrer le quiz";
    this.refIntro.querySelector(".accueil-droite").appendChild(refBoutonStart);

    //ajoute le css voulu au BTN
    refBoutonStart.classList.add("btn");

    // Ajouter un écouteur d'événement au bouton
    refBoutonStart.addEventListener("click", this.demarrerQuiz.bind(this));

    // Cacher les questions
    this.refArrQuestions.forEach(function (refQuestion) {
      refQuestion.classList.add("cacher");
    });
    // Cacher le bouton de soumission du formulaire
    this.refCtnBoutonSubmit.classList.add("cacher");
  },

  demarrerQuiz: function () {
    // Cacher l'intro
    this.refIntro.classList.add("cacher");
    // Afficher la première question
    this.afficherQuestion(quiz.intNoQuestion);
  },

  afficherQuestion: function (numeroQuestion) {
    // Mettre à jour le numéro de la question
    this.intNoQuestion = numeroQuestion;
    // Afficher la question
    this.refArrQuestions[numeroQuestion].classList.remove("cacher");

    //enleve la classe cacher sur le form
    document.querySelector("form").classList.remove("cacher");

    //Enleve les classes "cacher" des img en bordure
    const backgroundCote = document.querySelector(".background-cote");
    backgroundCote.classList.remove("cacher");

    // Créer un paragraphe
    const refCtnBouton = document.createElement("p");
    refCtnBouton.classList.add("ctnBouton");

    // Y ajouter le bouton de validation de la question
    refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider ma réponse</button>';
    this.refArrQuestions[numeroQuestion].appendChild(refCtnBouton);

    //ajout de la class BTN pour styler le nouveau btn
    document.querySelector(".ctnBouton__bouton").classList.add("btn");

    // Ajouter un écouteur d'événement au bouton
    refCtnBouton.querySelector(".ctnBouton__bouton").addEventListener("click", this.validerReponse.bind(this));
  },

  validerReponse: function () {
    // Aller chercher la réponse (checked) en construisant le sélecteur d'après le no de question
    console.log(this.intNoQuestion);
    const refReponse = document.querySelector("input[name=Q" + (this.intNoQuestion + 1) + "]:checked");
    const strReponse = refReponse.id;

    // Vérifier si la réponse est correcte
    if (objJSON.bonnesReponses[this.intNoQuestion] === strReponse) {
      // Afficher la rétroaction positive
      this.refArrQuestions[this.intNoQuestion].querySelector(".question__retroaction").innerHTML = objJSON.retroactions.positive;
      // Changer l'apparence de la bonne réponse
      refReponse.closest("li").querySelector("input+label").classList.add("bonneReponse");
      // Incrémenter le nombre de bonnes réponses
      this.intNbBonnesReponses++;
    } else {
      // Afficher la rétroaction négative
      this.refArrQuestions[this.intNoQuestion].querySelector(".question__retroaction").innerHTML = objJSON.retroactions.negative;
      // Changer l'apparence de la mauvaise réponse
      refReponse.closest("li").querySelector("input+label").classList.add("mauvaiseReponse");
      // Changer l'apparence de la bonne réponse
      const refQuestion = this.refArrQuestions[this.intNoQuestion];
      refQuestion.querySelector("#" + objJSON.bonnesReponses[this.intNoQuestion] + "+label").classList.add("bonneReponse");
    }

    // Supprimer le bouton Valider la réponse
    this.refArrQuestions[this.intNoQuestion].querySelector(".ctnBouton__bouton").remove();
    // Désactiver les boutons radios de la question courante
    this.refArrQuestions[this.intNoQuestion].querySelectorAll("input[type=radio]").forEach(function (refInput) {
      refInput.disabled = true;
    });

    // Afficher l'explication
    this.refArrQuestions[this.intNoQuestion].querySelector(".question__explication").innerHTML =
      objJSON.explications["Q" + (this.intNoQuestion + 1)];
    this.refArrQuestions[this.intNoQuestion].querySelector(".question__explication").className = "question__explication";

    // Afficher le bouton pour passer à la question suivante
    this.refArrQuestions[this.intNoQuestion].querySelector(".ctnBouton").innerHTML +=
      '<button type="button" class="ctnBouton__bouton">Passer à la question suivante</button>';

    // Ajouter le style css au bouton
    this.refArrQuestions[this.intNoQuestion].querySelector(".ctnBouton__bouton:last-child").className = "ctnBouton__bouton btn";

    if (this.intNoQuestion > 1) {
      this.refArrQuestions[this.intNoQuestion]
        .querySelector(".ctnBouton__bouton:last-child")
        .addEventListener("click", this.afficherResultats.bind(this));
    } else {
      this.refArrQuestions[this.intNoQuestion]
        .querySelector(".ctnBouton__bouton:last-child")
        .addEventListener("click", this.questionSuivante.bind(this));
    }
  },
  questionSuivante: function () {
    // Cacher la question
    this.refArrQuestions[this.intNoQuestion].classList.add("cacher");
    // Afficher la question suivante
    this.afficherQuestion(this.intNoQuestion + 1);
  },

  afficherResultats: function () {
    //supprimer la derneire question
    this.refArrQuestions[this.intNoQuestion].classList.add("cacher");

    // affiche la section score
    const refScore = document.querySelector(".section-score");
    refScore.classList.remove("cacher");

    //ajoute les classes "cacher" des img en bordure
    const backgroundCote = document.querySelector(".background-cote");
    backgroundCote.classList.remove("cacher");

    const scoreSurTrois = document.querySelector(".score-sur-3");
    scoreSurTrois.innerHTML = `Vous avez un score de ${this.intNbBonnesReponses} /3`;
  },
};
