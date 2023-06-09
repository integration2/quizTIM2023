/**
 * TIM - QUIZ
 * @author: Prénom Nom;
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
        "Q1": "La Suède se situe en Europe du Nord entre la Norvège et la Finlande.",
        "Q2": "Ce pays est le Pérou. Il se situe à l’ouest de l’Amérique du Sud, à côté du Brésil",
        "Q3": "La Mongolie se trouve au nord de la Chine."
    },
    "bonnesReponses": [
        "Q1C",
        "Q2B",
        "Q3A"
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
    
    quiz.initierQuiz();
});



document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {
    // console.log(btnRadio);
    btnRadio.addEventListener('click', function (e) {
        // Activer le bouton de validation
        e.target.closest('.question').querySelector('.ctnBouton__bouton').disabled = false;
        // quiz.setReponse(e.target.id);
    });
});


/* Objet Quiz */
const quiz = {
    refAccueil: document.querySelector('.accueil'),
    refArrQuestions: document.querySelectorAll('.question'),
    refBoutonSoumettreResultat: document.querySelector('.boutonRésultat'),

    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,


    initierQuiz: function () {
    /* Afficher l'accueil */
    this.refAccueil.classList.remove('cache');

    /* Bouton départ du quiz */
    const refBoutonDepart = document.createElement('button');
    refBoutonDepart.innerHTML = `<svg class="iconePlanete" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="cheminSVG" d="M51.1394 8.86063C48.3683 6.06211 45.0715 3.83869 41.4385 2.31812C37.8055 0.797545 33.9079 0.00978385 29.9695 9.05588e-05C26.0312 -0.00960273 22.1297 0.758963 18.4893 2.26163C14.8488 3.76431 11.5412 5.97147 8.75632 8.75632C5.97147 11.5412 3.76431 14.8488 2.26163 18.4893C0.758963 22.1297 -0.00960273 26.0312 9.05588e-05 29.9695C0.00978385 33.9079 0.797546 37.8055 2.31812 41.4385C3.83869 45.0715 6.06211 48.3683 8.86063 51.1394C11.6317 53.9379 14.9285 56.1613 18.5615 57.6819C22.1945 59.2025 26.0921 59.9902 30.0305 59.9999C33.9688 60.0096 37.8703 59.241 41.5107 57.7384C45.1512 56.2357 48.4588 54.0285 51.2437 51.2437C54.0285 48.4588 56.2357 45.1512 57.7384 41.5107C59.241 37.8703 60.0096 33.9688 59.9999 30.0305C59.9902 26.0921 59.2025 22.1945 57.6819 18.5615C56.1613 14.9285 53.9379 11.6317 51.1394 8.86063ZM4.37491 30C4.37395 27.7321 4.67466 25.4741 5.26912 23.2854C6.24874 25.3942 7.67147 27.2159 8.63908 29.3794C9.88964 32.1608 13.2476 31.3894 14.7304 33.8264C16.0463 35.9899 14.641 38.7259 15.6259 40.9894C16.3413 42.6324 18.0283 42.9914 19.1921 44.1926C20.3812 45.4044 20.3559 47.0647 20.5374 48.6449C20.7422 50.5016 21.0744 52.3419 21.5317 54.153C21.5317 54.1663 21.5317 54.181 21.5424 54.1944C11.5553 50.6869 4.37491 41.1669 4.37491 30ZM30 55.6251C28.5689 55.6246 27.1404 55.505 25.7292 55.2674C25.7438 54.9057 25.7505 54.5681 25.7865 54.3332C26.1109 52.2111 27.1732 50.1357 28.6066 48.5475C30.0227 46.9806 31.9633 45.9209 33.1591 44.1432C34.3309 42.4082 34.6819 40.0725 34.1988 38.0452C33.4874 35.0503 29.4181 34.0506 27.2239 32.4264C25.9627 31.4921 24.8403 30.048 23.184 29.9306C22.4206 29.8772 21.7813 30.0414 21.0245 29.8465C20.3305 29.6663 19.786 29.2926 19.0466 29.3901C17.6653 29.5716 16.7937 31.0477 15.3096 30.8475C13.9016 30.6593 12.4508 29.011 12.1305 27.6697C11.7194 25.9454 13.0834 25.3861 14.5449 25.2327C15.1548 25.1686 15.8395 25.0992 16.4254 25.3234C17.1968 25.609 17.5612 26.3644 18.2538 26.7461C19.5524 27.4588 19.8154 26.3204 19.6165 25.1673C19.3189 23.4402 18.9719 22.7369 20.512 21.5477C21.5798 20.7283 22.4926 20.1357 22.3218 18.6636C22.2204 17.7987 21.7466 17.4077 22.1884 16.5468C22.5233 15.8915 23.4429 15.3003 24.0422 14.9092C25.589 13.9002 30.6687 13.975 28.5933 11.1509C27.9834 10.3221 26.8583 8.84061 25.7905 8.63775C24.4559 8.3855 23.8633 9.87496 22.9331 10.5316C21.9721 11.2109 20.101 11.9824 19.1387 10.932C17.8441 9.51861 19.9969 9.05549 20.4733 8.06786C20.6936 7.60741 20.4733 6.96811 20.1023 6.36619C20.5837 6.16333 21.073 5.97514 21.5704 5.80164C21.8821 6.03186 22.2519 6.17053 22.6381 6.20203C23.531 6.26075 24.3732 5.77761 25.1526 6.38621C26.0174 7.05353 26.6407 7.89702 27.7885 8.10523C28.8989 8.30676 30.0747 7.65946 30.3497 6.52234C30.5165 5.831 30.3497 5.10095 30.1895 4.38692C35.1811 4.41564 40.0542 5.91052 44.2032 8.6858C43.9363 8.58436 43.6173 8.59637 43.2236 8.77922C42.4135 9.15559 41.2657 10.1139 41.1709 11.0641C41.0628 12.1425 42.6537 12.2947 43.4091 12.2947C44.5436 12.2947 45.6927 11.7875 45.327 10.4769C45.1682 9.90833 44.952 9.31708 44.6036 8.9594C45.441 9.54044 46.2432 10.1706 47.006 10.8466C46.994 10.8586 46.982 10.8693 46.97 10.8826C46.2012 11.6834 45.3083 12.3174 44.7825 13.2916C44.4114 13.9776 43.9937 14.3033 43.2423 14.4808C42.8286 14.5782 42.3561 14.6143 42.0091 14.8919C41.0428 15.6526 41.5927 17.4811 42.5083 18.0296C43.6654 18.7223 45.3817 18.3966 46.2546 17.4077C46.9366 16.6336 47.3383 15.2896 48.5648 15.2909C49.1048 15.2898 49.6236 15.5012 50.0089 15.8795C50.5161 16.4054 50.416 16.8965 50.5241 17.5531C50.715 18.7196 51.744 18.087 52.3699 17.4984C52.8262 18.3104 53.2379 19.1467 53.6031 20.0035C52.9144 20.9952 52.3672 22.0762 50.7109 20.9204C49.7193 20.2278 49.1094 19.2228 47.8642 18.9105C46.7764 18.6435 45.662 18.9212 44.5876 19.1067C43.3664 19.3189 41.9183 19.4123 40.9921 20.3372C40.0966 21.2287 39.6228 22.4219 38.6698 23.3175C36.8267 25.0525 36.0486 26.9463 37.2418 29.3994C38.3896 31.7577 40.7906 33.0376 43.3811 32.8695C45.9263 32.7 48.5702 31.2239 48.4968 34.9222C48.4701 36.2314 48.7437 37.1377 49.1454 38.3535C49.5178 39.4746 49.4924 40.561 49.5778 41.7181C49.6591 43.0731 49.8709 44.4171 50.2105 45.7314C47.8182 48.8115 44.7537 51.304 41.251 53.0187C37.7482 54.7334 33.8999 55.6249 30 55.6251Z" fill="#4DB857"/></svg>`;
    this.refAccueil.appendChild(refBoutonDepart);
    refBoutonDepart.classList.add('bouton');

    refBoutonDepart.addEventListener('click', this.demarrerQuiz.bind(this));
        

    /* Cacher les questions */
    this.refArrQuestions.forEach(function (refQuestion) {
        // console.log(refQuestion.classList);
        refQuestion.classList.add('cache');
    })
    
    /* Cacher le bouton soumettre */
    this.refBoutonSoumettreResultat.classList.add('cache');
    },

    


    demarrerQuiz: function (){
         // Cacher l'intro       
         this.refAccueil.classList.add('cache');
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
    
    validerReponse: function (idReponse) {
        console.log('validerReponse');

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
             .addEventListener('click', this.questionSuivante.bind(this));


     },

     questionSuivante: function () {
        // Cacher la question
        this.refArrQuestions[this.intNoQuestion].classList.add('cache');
        // Afficher la question suivante
        this.afficherQuestion(this.intNoQuestion + 1);
    },
    
    afficherResultats: function () {
        const refBoutonResultat = document.createElement('button');
        const refParagrapheResultat = document.querySelector(".texteResultat");
        const refSectionResultat = document.querySelector('.resultat');
        let intPourcentage = 100 / 3 * intNbBonnesReponses;

        if(this.intNoQuestions == 2){ 
            
            this.refArrQuestions[this.intNoQuestion].classList.add("cache");
            refSectionResultat.classList.remove('cache');
            refParagrapheResultat.innerHTML = `Vous avez un score de ${this.intNbBonnesReponses} /3`;

            refBoutonRecommencer.innerHTML = '<button class="boutonRecommencer" type="button">Recommencer le quiz</button>'
            document.querySelector('resultat').appendChild(refBoutonRecommencer);

            refBoutonRecommencer.querySelector('button').addEventListener('click', initialisation);
        }
     },
}


