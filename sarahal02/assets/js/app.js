/**
 * TIM - QUIZ
 * @author: Sarah Al Mahsani;
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
        "q1": "Au sens large, l'Antiquité grecque s'étend de l'époque des palais minoens, au XVIe siècle av. J.-C., et se prolonge jusqu'à la période romaine, soit au IIIe siècle.",
        "q2": "La famille grecque est formée par un mariage entre deux personnes de condition libre, les esclaves ne pouvant fonder une famille, le maître pouvant séparer des parents et enfants non libres s'il le souhaite. Le mariage est en général une affaire privée, négociée entre l'époux et le père de la future épouse, qui sont la plupart du temps issus d'un même milieu social.",
        "q3": "L'acropole d'Athènes est un plateau rocheux calcaire s'élevant au centre de la ville d'Athènes à laquelle elle a longtemps servi de citadelle, de l'Athènes antique à l'occupation ottomane, ainsi que de sanctuaire religieux durant l'Antiquité."
    },
    "bonnesReponses": [
        "q1_option2",
        "q2_option3",
        "q3_option3"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Je vous suggère de faire plus de recherche sur la Grèce Antique !",
        "note33": "Vous auriez pu faire mieux... ",
        "note66": "Bravo, vous avez une bonne connaissance générale de la Grèce Antique.",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    }
};

/*Écouteurs d'événements*/

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
    refIntro: document.querySelector('.quiz_accueil'),
    refArrQuestions: document.querySelectorAll('.question'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),
    refResultat: document.querySelector('.quiz_resultat'),

    intNoQuestion:0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function(){
        this.refIntro.classList.remove('cache');
        const refBoutonStart = document.createElement('button');
        refBoutonStart.textContent = 'Démarrer le quiz';
        this.refIntro.appendChild(refBoutonStart);

        //écouteur événement

        refBoutonStart.addEventListener('click', this.debuterQuiz.bind(this));

        //cacher questions

        this.refArrQuestions.forEach(function(refQuestion){
            refQuestion.classList.add('cache');
        })

        //cacher boutton soumission
        this.refCtnBoutonSubmit.classList.add('cache');
    },
    debuterQuiz: function () {
        //cacher intro
        this.refIntro.classList.add('cache');
        //affche premiere question
        this.afficherQuestion(quiz.intNoQuestion);
    },
    afficherQuestion:function(numeroQuestion){
        //mettre a jour numéro question
        this.intNoQuestion = numeroQuestion;

        //afficher question
        this.refArrQuestions[numeroQuestion].classList.remove('cache');
        
        //créer paragraphe 
        const refCtnBouton = document.createElement('p');
        refCtnBouton.classList.add('ctnBouton');

        //ajouter bouton de validation
        refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled>Valider ma réponse</button>';
        
        this.refArrQuestions[numeroQuestion].appendChild(refCtnBouton);

        //écouteur événement
        refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
    },
    validerReponse: function () { 
        //aller chercher la réponse avec selecteur d'après numéro de question
        const refReponse = document.querySelector('input[name=q' + (this.intNoQuestion + 1) + ']:checked');
        const strReponse = refReponse.id; 

        const refImageRetroaction = document.querySelector('.q'+(this.intNoQuestion+1) + '_img')
        refImageRetroaction.src = 'assets/images/question' + (this.intNoQuestion+1) + "_reponse_table_2x.jpg";

        //vérifier si réponse bonne
        if (objJSON.bonnesReponses[this.intNoQuestion] === strReponse) {
            console.log(strReponse);
            // Afficher la rétroaction positive
            this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').innerHTML = objJSON.retroactions.positive;
            // Changer l'apparence de la bonne réponse
            console.log(refReponse);
            refReponse.closest('li').querySelector('input').classList.add('bonneReponse');
            
            // Incrémenter le nombre de bonnes réponses
            this.intNbBonnesReponses++;
        } else {
            // rétroaction négative
            this.refArrQuestions[this.intNoQuestion]
                .querySelector('.question__retroaction').innerHTML = objJSON.retroactions.negative;
            // Changer l'apparence de la mauvaise réponse 
            refReponse.closest('li').querySelector('input').classList.add('mauvaiseReponse');
            // Changer l'apparence de la bonne réponse
            const refQuestion = this.refArrQuestions[this.intNoQuestion];
            refQuestion.querySelector('#' + objJSON.bonnesReponses[this.intNoQuestion]).classList.add('bonneReponse');
        }

        //supprimer bouton valider réponse
        this.refArrQuestions[this.intNoQuestion].querySelector('.ctnBouton__bouton').remove();
        // Désactiver les boutons radios de la question courante
        this.refArrQuestions[this.intNoQuestion].querySelectorAll('input').forEach(function (refInput) {
            refInput.disabled = true;
        })
        
        //ajouter animation 
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__retroaction').classList.add('slideUp');
        
        // Afficher l'explication
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.question__explication').innerHTML = objJSON.explications['q' + (this.intNoQuestion + 1)];
        this.refArrQuestions[this.intNoQuestion].querySelector('.question__explication').className = 'question__explication tada';

        // Afficher le bouton pour passer à la question suivante
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton')
            .innerHTML +='<button type="button" class="ctnBouton__bouton">Suivant</button>';

        // Ajouter une animation au bouton
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child').className = 'ctnBouton__bouton rubberBand';

        // Ajouter un écouteur d'événement au bouton
        this.refArrQuestions[this.intNoQuestion]
            .querySelector('.ctnBouton__bouton:last-child')
            .addEventListener('click', this.questionSuivante.bind(this));

    },

    questionSuivante: function(){
        // Cacher la question
        this.refArrQuestions[this.intNoQuestion].classList.add('cache');
        // Afficher la question suivante

        if (this.intNoQuestion +1 == this.intNbQuestions){
            this.afficherResultats();
        }else{
           this.afficherQuestion(this.intNoQuestion + 1); 
        }
    },

    afficherResultats: function () {
        this.refResultat.classList.remove('cache');

        const refBoutonRecommencer = document.createElement('button');
        refBoutonRecommencer.textContent = 'Recommencer le quiz';
        this.refResultat.appendChild(refBoutonRecommencer);

        const paragrapheFinal = this.refResultat.querySelector('.p_resultat');
        console.log(paragrapheFinal.innerHTML);

        // Application des notes
        if (this.intNbBonnesReponses === 0){
            paragrapheFinal.innerHTML = objJSON.messages.resultatsDebut+ " " + this.intNbBonnesReponses + " sur 3 questions" + " . " + objJSON.messages.note0;
        }
        else if (this.intNbBonnesReponses === 1){
            paragrapheFinal.innerHTML = objJSON.messages.resultatsDebut +  " " + this.intNbBonnesReponses + ". " + objJSON.messages.note33;
        }
        else if (this.intNbBonnesReponses === 2){
            paragrapheFinal.innerHTML = objJSON.messages.resultatsDebut + " " + this.intNbBonnesReponses + ". " + objJSON.messages.note66;
        }
        else{
            paragrapheFinal.innerHTML = objJSON.messages.resultatsDebut +  " " + this.intNbBonnesReponses + ". " + objJSON.messages.note100;
        }


    }
}