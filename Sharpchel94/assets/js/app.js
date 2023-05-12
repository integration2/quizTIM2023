/**
 * TIM - QUIZ
 * @author: Olivier Duclos;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Bonne Réponse !",
        "negative": "Mauvaise Réponse !"
    },
    "explications": {
        "Q1": "En effet, La création de la Ligue nationale de hockey date de 1917 à Montréal. Alors que le monde est plongé dans la Première Guerre mondiale, deux associations couvrent le hockey sur glace en Amérique du Nord : l'Association de hockey de la Côte du Pacifique et l'Association nationale de hockey.",
        "Q2": "En effet, selon le classement officiel de la LNH, Wayne Gretzky est au sommet avec 894 buts marquées.",
        "Q3": "En effet, Le premier masque de gardien était un masque d'escrime en fibres de verre revêtu en février 1927 par Elizabeth Graham, gardienne de l'équipe de hockey féminin de l'Université Queen's (Kingston, Ontario) essentiellement pour protéger ses dents. Cependant, ce n'est pas avant 1959 que le gardien du Canadiens de Montréal Jacques Plante utilisa une protection faciale de manière régulière. Le 1er novembre 1959, lors d'un match entre les Canadiens de Montréal et les Rangers de New York."
    },
    "bonnesReponses": [
        "Q1C",
        "Q2D",
        "Q3A"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Vous auriez pu faire mieux. Je vous suggère ..",
        "note33": "Vous auriez pu faire mieux. Je vous suggère ..",
        "note66": "Bravo, vous avez une bonne connaissance générale du hockey professionnel",
        "note100": "Félicitations, vous êtes un fin connaisseur du hockey professionnel!"
    }
};

/* Objet Quiz */
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
        e.target.closest('.question').querySelector('.ctnBouton__bouton').disabled = false;
    });
});

/* Objet Quiz */
const quiz = {
    // attributs qui sont des références vers les éléments du DOM
    refIntro: document.querySelector('.introduction'),
    refArrQuestions: document.querySelectorAll('.question'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),

    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        // Afficher l'intro  
        this.refIntro.classList.remove('cache');

        // Créer le bouton pour démarrer le quiz
        const refBoutonStart = document.createElement('button');
        refBoutonStart.textContent = 'COMMENCER';
        this.refIntro.appendChild(refBoutonStart);

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
        // Mettre à jour le numéro de la question
        this.intNoQuestion = numeroQuestion;
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

    },
    validerReponse: function () {
        console.log('validerReponse');

        // Aller chercher la réponse (checked) en construisant le sélecteur d'après le no de question 
        const refReponse = document.querySelector('input[name=Q' + (this.intNoQuestion + 1) + ']:checked');
        const strReponse = refReponse.id;

        // Vérifier si la réponse est correcte 
        if (objJSON.bonnesReponses[this.intNoQuestion] === strReponse) {
            // Afficher la rétroaction positive
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').innerHTML = objJSON.retroactions.positive;
            // Changer l'apparence de la bonne réponse
            console.log(refReponse);
            refReponse.closest('li').querySelector('input+label').classList.add('bonneReponse');
            // Incrémenter le nombre de bonnes réponses
            this.intNbBonnesReponses++;
        } else {
            // Afficher la rétroaction négative
            this.refArrQuestions[this.intNoQuestion]
                .querySelector('.question__retroaction').innerHTML = objJSON.retroactions.negative;
            // Changer l'apparence de la mauvaise réponse 
            refReponse.closest('li').querySelector('input+label').classList.add('mauvaiseReponse');
            // Changer l'apparence de la bonne réponse
            const refQuestion = this.refArrQuestions[this.intNoQuestion];
            refQuestion.querySelector('#' + objJSON.bonnesReponses[this.intNoQuestion] + '+label').classList.add('bonneReponse');

        }

        // Supprimer le bouton Valider la réponse
        this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton__bouton').remove();
        // Désactiver les boutons radios de la question courante
        this.refArrQuestions[this.intNoQuestion].querySelectorAll('input[type=radio]').forEach(function (refInput) {
            refInput.disabled = true;
        });

        // Ajouter animation au paragraphe de rétroaction
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('slideUp');
        // Afficher l'explication
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.question__explication').innerHTML = objJSON.explications['Q' + (this.intNoQuestion + 1)];
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__explication').className = 'question__explication tada';

        // Afficher le bouton pour passer à la question suivante
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton')
            .innerHTML += '<button type="button" class="ctnBouton__bouton">Passer à la question suivante</button>';

        // Ajouter une animation au bouton
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child').className = 'ctnBouton__bouton rubberBand';

        // Ajouter un écouteur d'événement au bouton
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child')
            .addEventListener('click', this.questionSuivante.bind(this))


    },
    questionSuivante: function () {
        console.log(this.intNoQuestion);
        // Cacher la question
        this.refArrQuestions[this.intNoQuestion].classList.add('cache');
        // Afficher la question suivante
        if (this.intNoQuestion + 1 == this.intNbQuestions) { 
            this.afficherResultats() 
        }
        else {
            this.afficherQuestion(this.intNoQuestion + 1);
        }
    },

    afficherResultats: function () {
        const Pourcentage = 100/3 * this.intNbBonnesReponses;
        const refResultat = document.createElement("div");
        refResultat.innerHTML = ' <picture class="logo"> <img src="assets/images/Logo.svg" alt="Logo Quiz" class="logoHockey"> </picture> <p class="texte__resultat">Résultat</p> <p class="pourcentage" >' + Math.round(Pourcentage) + "%" + '</p>'
        document.querySelector('main').append(refResultat);
    }
}