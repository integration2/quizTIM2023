/**
 * TIM - QUIZ
 * @author: Sarah Dufour;
 * Version : 1.05;
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
        "Q1": "Il s’agit du Roi Arthur envoyé dans une mission divine.",
        "Q2": "Ce n'est qu'autre que le Saint Graal que le roi part à la recherche depuis le début du long métrage. Il passera devant un fort français, des villageois grincheux, un chevalier noir et même un lapin carnivole. Le tout, avec beaucoup d'humour!",
        "Q3": "Dans le long métrage, un des chevaliers demande à Arthur : - Mais comment le saviez-vous mon roi? - Il y a beaucoup de chose que vous devez savoir lorsque vous êtes un roi. Alors que deux paysans, au début du film, lui ont appris cette fameuse information alors qu'ils s'indignait de l'état déplorable de son royaume."
    },
    "bonnesReponses": [
        "Q1B",
        "Q2D",
        "Q3C"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Quel Dommage! C'était le roi Arthur! Le film représente , d'une façon humoristique, la croisade du roi à la recherche d'un artéfact chrétien d'une grande valeur.(Réessayé!)",
        "note33": "Si vous connaissez si bien le film, vous savez ou vous allez finiiiiiiir! (Réesssayé!)",
        "note66": "SI PROCHE, maaiiiiiis c'est le vide qui vous attend (Réessayé!)",
        "note100": "Félicitations, votre récompense : C'est le vieux qui se fait éjecter dans le vide!"
    }
};

/* Ecouteur d'Evenements */

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');

    quiz.initierQuiz();
});

document.querySelectorAll('[type=radio').forEach(function (btnRadio){

    btnRadio.addEventListener('click', function (e) {

        e.target.closest('.question').querySelector('.ctnBouton__bouton').disabled = false;
    });
});

/* Objet Quiz */
const quiz = {

    // Attribut Reference pour element du DOM

    refIntro: document.querySelector('.introduction'),
    refArrQuestions: document.querySelectorAll('.question'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),
    refConclusion: document.getElementById('resultat'),
    

    // Atribut Progression

    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () { 

    // Afficher l'intro

    this.refIntro.classList.remove('cache');

    //Creer le bouton demarer

    const refBoutonStart = document.createElement('button');
    refBoutonStart.textContent = "Debuter le quiz" ;
    this.refIntro.appendChild(refBoutonStart);

    // Ecouteur pour le bouton
    refBoutonStart.addEventListener('click', this.debuterQuiz.bind(this));

    // Cacher les questions
    this.refArrQuestions.forEach(function (refQuestion){

        refQuestion.classList.add('cache');
    })

    // Cacher le bouton de soumission du formulaire

    this.refCtnBoutonSubmit.classList.add('cache');

    } ,

    // Debuter le quiz tada!!//

    debuterQuiz: function () {
        //Cacher l'intro

        this.refIntro.classList.add('cache');

        //Question 1 --- Afficher ---

        this.afficherQuestion(quiz.intNoQuestion);
        
     },

    afficherQuestion: function (numeroQuestion) {

        this.intNoQuestion = numeroQuestion;

        //Afficher la question

        this.refArrQuestions[numeroQuestion].classList.remove('cache');

        //Paragraphe pour le bouton validation

        const refCtnBouton = document.createElement('p');
        refCtnBouton.classList.add('ctnBouton');
        // Bouton
        refCtnBouton.innerHTML = '<button type="button" class="ctnBouton__bouton" disabled> Valider </button>';
        this.refArrQuestions[numeroQuestion].appendChild(refCtnBouton);

        // Ecouteur

        refCtnBouton.querySelector('.ctnBouton__bouton').addEventListener('click', this.validerReponse.bind(this));
    },
    validerReponse: function (e) { 
        //Cacher les boutons radio
        this.refArrQuestions[this.intNoQuestion].querySelector('ul').classList.add('cache');
        
        //Incrementer le Numero Question 
        this.intNoQuestion = this.intNoQuestion + 1
        
        let strIdQuestion = "Q" + this.intNoQuestion;
        
        const strReponse = document.querySelector('input[name=Q' + this.intNoQuestion + ']:checked').id;
        const strReponseCoche = document.querySelector('input[name=Q' + this.intNoQuestion+ ']:checked');

        //Enlever le bouton Valider

        this.refArrQuestions[this.intNoQuestion - 1].querySelector('.ctnBouton').remove();


        //Si La bonne reponse est cocher : Retroaction Positive + Changer question
        //Sinon Mauvaise reponse : Retro Negative

        if (strReponse == objJSON.bonnesReponses[this.intNoQuestion - 1]) {

            this.intNbBonnesReponses = this.intNbBonnesReponses +1
            
            this.refArrQuestions[this.intNoQuestion-1].querySelector('.Reponse__Retroaction').innerHTML = "<p>" + objJSON.retroactions.positive + "</p>" + "<p>" + objJSON.explications[strIdQuestion] + " </p>"

        } else {

            
            this.refArrQuestions[this.intNoQuestion-1].querySelector('.Reponse__Retroaction').innerHTML = "<p>" + objJSON.retroactions.negative + "</p>" + "<p>" + objJSON.explications[strIdQuestion] + " </p>"
        }

        if(this.intNoQuestion < 3){
            this.refArrQuestions[this.intNoQuestion - 1].querySelector('.p-bouton').innerHTML = '<button class="button-validation" type="button"> Prochaine Question </button>';
        } else{
            this.refArrQuestions[this.intNoQuestion - 1].querySelector('.p-bouton').innerHTML = '<button class="button-validation" type="button">Afficher le Resultat</button>';
        }
        
        this.refArrQuestions[this.intNoQuestion - 1].querySelector('.p-bouton').addEventListener('click', this.questionSuivante.bind(this));
    },

    questionSuivante: function () {

        this.refArrQuestions[this.intNoQuestion - 1].classList.add('cache');

        if(this.intNoQuestion === this.intNbQuestions){
            this.afficherResultats();
        }else{
            this.afficherQuestion(this.intNoQuestion);
        }
    },
 
    afficherResultats: function () { 

    let intResultat = this.intNbBonnesReponses
    const refIdResultatFinal = document.querySelector('.resultat__score')
    const refIdRetroaction = document.querySelector('.resultat__retroaction')

    //Afficher le Div Resultat

    this.refConclusion.classList.remove('cache')

    //Afficher le resultat

    refIdResultatFinal.innerHTML = intResultat + " Bonne(s) Reponse(s)"

    if (intResultat == 0) {

        refIdRetroaction.innerHTML = objJSON.messages.note0
    }
    if (intResultat == 1) {
        
        refIdRetroaction.innerHTML = objJSON.messages.note33
    }
    if (intResultat == 2) {

        refIdRetroaction.innerHTML = objJSON.messages.note66
    }
    if (intResultat == 3) {

        refIdRetroaction. innerHTML = objJSON.messages.note100
    }

    }
}