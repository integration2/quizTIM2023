/**
 * TIM - QUIZ
 * @author: Mathieu Beauregard;
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
        "Q1": "En effet, il y a 64 cases sur un jeu d’échec. Ceci permet d’avoir 4 897 256 positions différentes possibles seulement après 5 tours.",

        "Q2": "Le jeu est apparu vers 600 après J.-C. Le jeu arabe shatranj s'est développé à partir du jeu indien chaturanga, devenant le premier jeu d’échec identifiable",

        "Q3": "En effet, le roi peut se déplacer d’une seule case à la fois de n’importe quelle direction. Il devient une pièce importante vers la fin de la partie, mais faites attention de ne pas le mettre en danger!"
    },
    "bonnesReponses": [
        "Q1B",
        "Q2A",
        "Q3D"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Échec et mat... Vous auriez pu faire mieux." ,
        "note1": "Quelques gaffes, mais n'abandonnez pas!",
        "note2": "Bravo, vous avez une bonne connaissance générale des échecs",
        "note3": "Félicitations, vous êtes un fin connaisseur !"
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

/* Objet Quiz */
const quiz = {
    refIntro: document.querySelector('.introduction'),
    refArrQuestions: document.querySelectorAll('.question'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),

    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,
    debuterQuiz: function () {
        // Afficher l'intro  
        this.refIntro.classList.remove('cache');

        // Créer le bouton pour démarrer le quiz
        const refBoutonStart = document.createElement('button');
        refBoutonStart.textContent = 'Démarrer le quiz';
        refBoutonStart.classList.add("bouton_demarrer");
        document.querySelector(".conteneur_intro").appendChild(refBoutonStart);
        // Ajouter un écouteur d'événement au bouton
        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        this.refArrQuestions.forEach(function (refQuestion) {
            // console.log(refQuestion.classList);
            refQuestion.classList.add('cache');
        })
        // Cacher le bouton de soumission du formulaire
        this.refCtnBoutonSubmit.classList.add('cache');
    },
    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refIntro.classList.add('cache');
        // Afficher la première question
        this.afficherQuestion(quiz.intNoQuestion);
    },
    afficherQuestion: function (numeroQuestion) {
        // Si c'est la derniere question : activer la fonction afficherResultats
        if (this.intNoQuestion == this.intNbQuestions) {
            quiz.afficherResultats();
        } else {
            // afficher le numer de question
            const refVraiNombre = this.intNoQuestion + 1;
            const refCompteur = document.createElement('p');
            const refNumeroQuestion = document.createElement('p');
            refCompteur.innerHTML = '<img src="../dog_03/assets/images/question' + refVraiNombre +'.png">'
            refNumeroQuestion.innerHTML = "Question " + refVraiNombre + "/3"
            document.querySelector(".numero_question" + refVraiNombre).append(refCompteur);
            document.querySelector(".numero_question" + refVraiNombre).append(refNumeroQuestion);
            
            //Afficher le cochez la bonne reponse
            document.querySelectorAll(".cochez").forEach(function (refPara) {
                refPara.classList.remove('cache');
            });
            // Mettre à jour le numéro de la question
            this.intNoQuestion = numeroQuestion;

            // decocher la reponse coché 
            if (document.querySelector('[type=radio]:checked') != null) {
                document.querySelector('[type=radio]:checked').checked = false;
            }

            // cacher la question precedente
            if (numeroQuestion > 0) {
                this.refArrQuestions[numeroQuestion - 1].classList.add('cache');
            };

            // Afficher la question
            this.refArrQuestions[numeroQuestion].classList.remove('cache');

            // Créer un paragraphe
            const refCtnBouton = document.createElement('p');
            refCtnBouton.classList.add('ctnBouton');

            // Y ajouter le bouton de validation de la question 
            refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider ma réponse</button>';
            this.refArrQuestions[numeroQuestion].appendChild(refCtnBouton);

            // Ajouter un écouteur d'événement au bouton
            refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
        }
    },
    validerReponse: function (idReponse) {
        const refReponseSelection = document.querySelector('[type=radio]:checked');
        const refReponseSelectionName = refReponseSelection.name
        const refBonneReponse = objJSON.bonnesReponses[this.intNoQuestion];
        const refDiv = document.querySelector("div." + refReponseSelectionName);
        const refRetro = document.createElement('p');
        const refExplication = document.createElement('p');
        const refCtnBoutonNext = document.createElement('p');

        /* Creer le bouton continuer */
        refCtnBoutonNext.classList.add('ctnBoutonNext');
        // Y ajouter le bouton de validation de la question 
        refCtnBoutonNext.innerHTML = '<button type="button" class="ctnBouton__bouton">Prochaine question</button>';
        this.refArrQuestions[this.intNoQuestion].appendChild(refCtnBoutonNext);

        /* Augmenter de 1 le numero de la question */
        this.intNoQuestion++

        // Ajouter un écouteur d'événement au bouton
        refCtnBoutonNext.querySelector('.ctnBouton__bouton').addEventListener('click', function () {
            quiz.afficherQuestion(quiz.intNoQuestion);
        });

        /* Enlever le bouton valider */
        document.querySelector(".ctnBouton").remove();

        /*Donner les classe au retroactions*/
        refRetro.classList.add("retro");
        refExplication.classList.add("explication");

        /* Enlever le "chochez la bonne reponse" de la page */
        document.querySelectorAll(".cochez").forEach(function (refPara) {
            refPara.classList.add('cache');
        });

        /* Si bonne reponse = afficher le message et ajouter la classe */
        if (refReponseSelection.id == refBonneReponse) {
            refDiv.classList.add("bonne_reponse");
            refRetro.innerText = objJSON.retroactions.positive;
            refExplication.innerText = objJSON.explications[refReponseSelection.name];
            refDiv.append(refRetro);
            refDiv.append(refExplication);
            this.intNbBonnesReponses++;
            /* Si mauvaise reponse = afficher le message et ajouter la classe */
        } else {
            refDiv.classList.add("mauvaise_reponse");
            refRetro.innerText = objJSON.retroactions.negative;
            refExplication.innerText = objJSON.explications[refReponseSelection.name];
            refDiv.append(refRetro);
            refDiv.append(refExplication);
        }

    },
    afficherResultats: function () {
        const refParaResultat = document.createElement('p');
        const refParaMessage = document.createElement('p');
        const refDivEtoiles = document.querySelector(".ctnEtoiles");
        const refParaEtoiles = document.createElement('p');
        const refMessage = "note" + this.intNbBonnesReponses;
        // Afficher le resultat
        refParaResultat.innerHTML = objJSON.messages.resultatsDebut + " " + this.intNbBonnesReponses + "/" + this.intNbQuestions;
        refParaMessage.innerHTML = objJSON.messages[refMessage];
        //Afficher la section resultat
        document.querySelector(".section_resultat").classList.remove("cache");
        //Cacher la derniere question
        this.refArrQuestions[this.intNbQuestions - 1].classList.add('cache');
        // Ajouter le resultat et message au div
        document.querySelector(".ctnResultat").append(refParaResultat);
        document.querySelector(".ctnResultat").append(refParaMessage);
        // Ajouter le conteneur des images au deuxieme div
        refDivEtoiles.append(refParaEtoiles);
        refParaEtoiles.innerHTML = '<img src="../dog_03/assets/images/' + this.intNbBonnesReponses + 'Etoile.png" alt="' + this.intNbBonnesReponses + ' étoiles sur 3">'



    }
}