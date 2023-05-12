/**
 * TIM - QUIZ
 * @author: Raphae Mercier;
 **/
const objJSON = {
    "retroactions": {
        "positive": "Bravo, bonne réponse !",
        "negative": "Ah non! Dommage, meilleur chance la prochaine fois!"
    },
    "explications": {
        "Q1": "Les premiers clubs indépendants apparaissent à la fin des années 1800 ; en 1863, onze d'entre eux fondent the Football Association, chargée d'organiser la pratique du football en Angleterre.",
        "Q2": "Cristiano Ronaldo dos Santos Aveiro, couramment appelé Cristiano Ronaldo ou Ronaldo et surnommé CR7, né le 5 février 1985 à Funchal, est un footballeur international portugais qui évolue au poste d'attaquant à Al-Nassr FC. Considéré comme l'un des meilleurs footballeurs de l'histoire, il est avec Lionel Messi (avec qui il entretient une rivalité sportive) l’un des deux seuls à avoir remporté le Ballon d'or au moins cinq fois.",
        "Q3": "L’Argentine gagne la Coupe du monde de football 2022 face à la France au terme d’une finale folle. C’était le jour J pour l’équipe de France, qui défiait l’Argentine ce dimanche 18 décembre en finale de la Coupe du monde 2022 au Lusail Iconic Stadium au Qatar."
    },
    "bonnesReponses": [
        "Q1C",
        "Q2A",
        "Q3D"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Vous auriez pu faire mieux. Je vous suggère de refaire le quiz.",
        "note33": "Vous auriez pu faire mieux. Je vous suggère de lire sur le soccer.",
        "note66": "Bravo, vous avez une bonne connaissance générale du soccer!",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    }
};


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');
    
    quiz.initierQuiz();
});

document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {
    
    btnRadio.addEventListener('click', function (e) {
        
        e.target.closest('.question').querySelector('.ctnBouton__bouton').disabled = false;
        
    });
});

const quiz = {
    refIntro: document.querySelector('.introduction'),
    refArrQuestions: document.querySelectorAll('.question'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),


    
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        this.refIntro.classList.remove('cache');

        const refBoutonStart = document.createElement('p');
        refBoutonStart.classList.add('ctnBouton');
        refBoutonStart.innerHTML = '<button type="button">Démarrer le quiz</button>';
        this.refIntro.querySelector('.introduction__accroche').appendChild(refBoutonStart);

        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        this.refArrQuestions.forEach(function (refQuestion) {
            refQuestion.classList.add('cache');
        })
        this.refCtnBoutonSubmit.classList.add('cache');
    },
    demarrerQuiz: function () {   
        this.refIntro.classList.add('cache');
        this.afficherQuestion(quiz.intNoQuestion);
    },
    afficherQuestion: function (numeroQuestion) {
        
        this.intNoQuestion = numeroQuestion;
        
        this.refArrQuestions[numeroQuestion].classList.remove('cache');
        
        const refCtnBouton = document.createElement('p');
        refCtnBouton.classList.add('ctnBouton');
        
        refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider mon choix</button>';
        this.refArrQuestions[numeroQuestion].appendChild(refCtnBouton);
        
        refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
    },
    validerReponse: function () {

        
        const refReponse = document.querySelector('input[name=Q' + (this.intNoQuestion + 1) + ']:checked');
        const strReponse = refReponse.id;

        if (objJSON.bonnesReponses[this.intNoQuestion] === strReponse) {
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').innerHTML = objJSON.retroactions.positive;
            
            
            refReponse.closest('li').querySelector('input+label').classList.add('bonneReponse');
            this.intNbBonnesReponses++;
        } else {
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').innerHTML = objJSON.retroactions.negative;
            refReponse.closest('li').querySelector('input+label').classList.add('mauvaiseReponse');
            const refQuestion = this.refArrQuestions[this.intNoQuestion];
            refQuestion.querySelector('#' + objJSON.bonnesReponses[this.intNoQuestion] + '+label').classList.add('bonneReponse');

        }

        this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton__bouton').remove();
        
        this.refArrQuestions[this.intNoQuestion].querySelectorAll('input[type=radio]').forEach(function (refInput) {
            refInput.disabled = true;
        });

        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('slideUp');
        
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__explication').innerHTML = objJSON.explications['Q' + (this.intNoQuestion + 1)];
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__explication').className = 'question__explication tada';

        this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton').innerHTML += '<button type="button" class="ctnBouton__bouton">Passer à la question suivante</button>';

        this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton__bouton:last-child').className = 'ctnBouton__bouton rubberBand';

        this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton__bouton:last-child').addEventListener('click', this.questionSuivante.bind(this));

    },
    questionSuivante: function () {
        this.refArrQuestions[this.intNoQuestion].classList.add('cache');
        if(this.intNoQuestion === 2)
        {
            this.afficherResultat();
        }
        else
        {
            this.afficherQuestion(this.intNoQuestion + 1);
        }
        
    },
    afficherResultat: function() {

        const refBtnRecommencer = document.createElement('p');

        let pourcentage = 100 / 3 * this.intNbBonnesReponses;
        
        const refResultat = document.createElement('section');
        refResultat.classList.add('afficherResultat');
        refResultat.innerHTML= '<h2 classe="introduction__accroche">Votre score :</h2><h2>'+ Math.round(pourcentage)+'%</h2>';
        document.querySelector('main').appendChild(refResultat);

        if (Math.round(pourcentage) == 0) {
            refResultat.innerHTML= objJSON.explications[note0];
        }
        else if(Math.round(pourcentage) == 33)
        {
            refResultat.innerHTML= objJSON.explications[note33];
        }
        else if(Math.round(pourcentage) == 66)
        {
            refResultat.innerHTML= objJSON.explications[note66];
        }
        else
        {
            refResultat.innerHTML= objJSON.explications[note100];
        }
    
        refBtnRecommencer.innerHTML = '<button class="button-validation btn-recommencer introduction__accroche" type="button">Refaire le quiz</button>'
        document.querySelector('main').appendChild(refBtnRecommencer);
    
        refBtnRecommencer.querySelector('button').addEventListener('click', this.redemarrer);
        refBtnRecommencer.querySelector('button').addEventListener('click', this.initierQuiz);
    
    },
    redemarrer: function() {
        document.querySelector('.afficherResultat').classList.add('cache');
        document.querySelector('.btn-recommencer').classList.add('cache');
    }
}