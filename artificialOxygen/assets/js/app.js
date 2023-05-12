/**
 * TIM - QUIZ
 * @author: Lorie-Anne Côté;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Excellent, bonne réponse !",
        "negative": "Oups, ce n'est pas tout à fait cela!"
    },
    "explications": {
        "Q1": "Le sang est composé de plasma (~55%), de globules blancs et de plaquettes (1%) et d'érythrocytes (~44%). Le plasma est lui-même composé d'eau, d'hormones, de protéines, de sels et de lipides.",
        "Q2": "Les os, plus précisément la moelle osseuse rouge qui se retrouve à l'intérieur de certains os, produisent les cellules du sang à partir des cellules souches hématopoïétiques de la moelle rouge. Ce processus est nommé l'hématopoïèse.",
        "Q3": "O- est le donneur universel, car il ne contient aucun antigène. D'ailleurs, AB+ est le receveur universel. Il existe 8 groupes sanguins en tout: A+, A-, B+, B-, AB+, AB-, O+, O-. "
    },
    "bonnesReponses": [
        "Q1C",
        "Q2A",
        "Q3D"
    ],
    "messages": {
        "note0": " Oups ! Peut-être avez-vous besoin d'apprendre plus sur le sang ? Visitez le site d'Héma Québec pour plus d'infos sur le sang !",
        "note33": "Ne vous découragez pas ! Vous pouvez toujours réessayer. Si vous souhaitez approfondir vos connaissances sur le sujet, visitez le site d'Héma Québec. ",
        "note66": "Bravo, vous avez une bonne connaissance générale sur le sang ! Si vous souhaitez en apprendre plus, visitez le site d'Héma Québec. ",
        "note100": "Félicitations, vous avez la note parfaite ! Vous connaissez réellement le sujet ! Si vous souhaitez en apprendre encore plus, visitez le site d'Héma Québec.",
        "fin": "Merci d'avoir choisi de compléter ce quiz. Vous pouvez cliquez sur la bannière pour retourner faire d'autres quiz !  "
    }
};

/*******  Écouteurs d'événements *******/

//Lors du chargement de la page
window.addEventListener('load', function () {

    document.querySelector('body').classList.add('js');
    quiz.debuterQuiz();

});

//Sur chacun des boutons, événement click
document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {

    btnRadio.addEventListener('click', function (e) {

        e.target.closest('.ctnQuestionnaire').querySelector('.validerQuiz').disabled = false;
        e.target.closest('.ctnQuestionnaire').querySelector('.validerQuiz').classList.add("animInvite");

    });

});

/*******  Objet Quiz  *******/

const quiz = {

    //attributs

    refAccueil : document.querySelector('.ctnAccueil'),
    refQuestions : document.querySelectorAll('.ctnQuestionnaire'),
    refCtnValider : document.querySelector('.ctnValider'),
    refValiderQuiz : document.querySelector('[name=valider]'),

    intNbQuestions: 3,         //nombre total de question
    intNoQuestion: 0,          //numéro de question
    intNbBonnesReponses: 0,    //nombre de réponse correcte

    // Méthodes

    /**
     * Cache les questions ainsi que leur bouton valider, appelle la fonction demarrerQuiz lorsqu'on clique sur le bouton RefBoutonCommencer
     */
    debuterQuiz: function () {

        //Affiche le conteneur accueil
        this.refAccueil.classList.remove('cacher');    

        //Cache le bouton valider ma réponse associé à la version pauvre
        this.refValiderQuiz.classList.add('cacher');       

        //Crée un bouton personnalisé pour pouvoir débuter le quiz
        const refBoutonCommencer = document.createElement('button');
        refBoutonCommencer.setAttribute("type", "button");
        refBoutonCommencer.classList.add("btnAccueil");   
        refBoutonCommencer.classList.add("animInvite")           
        refBoutonCommencer.textContent = 'Démarrer le quiz';
        this.refAccueil.appendChild(refBoutonCommencer);

        //Appel de la fonction avec ce nouveau bouton
        refBoutonCommencer.addEventListener('click', this.demarrerQuiz.bind(this));

        //Cache les conteneurs des questions ainsi que leur composants
        this.refQuestions.forEach(function (refQuestion) {

            refQuestion.classList.add('cacher');

        })

        //....Cache le conteneur de la validation des réponses (version pauvre)
        this.refCtnValider.classList.add('cacher');
        
    },

    /**
     * Cache l'accueil/Introduction et appelle la fonction pour afficher la première question
     */
    demarrerQuiz: function () {
        
        //Cache l'accueil
        this.refAccueil.classList.add('cacher');

        //Appel de la fonction afficherQuestion
        this.afficherQuestion(quiz.intNoQuestion);
    },

    /**
     * Afficher la question courante et ses composantes (ex: bouton valider)
     */
    afficherQuestion: function () {        
        
        //Création d'un bouton personnalisé pour valider les réponses des questions
        const refBoutonValider = document.createElement('button');
        refBoutonValider.setAttribute("type", "button");
        refBoutonValider.classList.add('validerQuiz');
        refBoutonValider.textContent = 'Valider ma réponse';
        this.refQuestions[this.intNoQuestion].appendChild(refBoutonValider);
        refBoutonValider.addEventListener('click', this.validerReponse.bind(this));
        refBoutonValider.setAttribute("disabled", "");

   
        //Affichage de la bonne question
        this.refQuestions[this.intNoQuestion].classList.remove('cacher');

    },

    /**
     * Permet de vérifié si la réponse choisie par l'utilisateur est la bonne
     * @param {*} objEvent réfère au bouton valider ma réponse (refBoutonValider)
     */
    validerReponse: function (objEvent) {


        //Vérifié quel bouton radio est coché
        const refReponseChoisie = document.querySelector('input[name=Question' + (this.intNoQuestion + 1) + ']:checked'); //+1 car intNoQuestion est en retard d'un. Q0 + 1
   
        //Variable pour objJSON.bonnesReponses
        const objReponses = objJSON.bonnesReponses;

        //Variable pour objJSON.retroactions
        const objRetroactions = objJSON.retroactions;

        //Variable pour objJSON.explications
        const objExplications = objJSON.explications;

        //Variable pour afficher une rétroaction dans le bon emplacement
        const refRetroaction = document.getElementById('retroaction' + (this.intNoQuestion+ 1 ));

        //Cacher l'image de la question pour afficher l'image de la rétroaction explicative
        const refImgQuestion = this.refQuestions[this.intNoQuestion].querySelector('.imgQuestion');
        refImgQuestion.classList.add('cacher');

        //Afficher l'image de la rétroaction explicative
        const refImgRetro = this.refQuestions[this.intNoQuestion].querySelector('.imgRetro');
        refImgRetro.classList.add('imgQuestion');
        refImgRetro.classList.remove('cacher');

        //Si la réponses choisie par l'utilisateur est la même que la bonne réponse, rétro positive sinon rétro négative
        //On augmente aussi intBnBonnesRéponses si c'est la bonne réponse
        if (refReponseChoisie.id == objReponses[this.intNoQuestion]) {

            refRetroaction.innerText = objRetroactions.positive;

            refRetroaction.classList.add('vrai');

            this.intNbBonnesReponses ++;

        }else{

            refRetroaction.innerHTML = objRetroactions.negative;

            refRetroaction.classList.add('erreur');

        }

        //Cacher le bouton valider de la question affichée
        objEvent.currentTarget.classList.add("cacher"); 

        //Création d'un nouveau bouton personnalisé pour passer à la prochaine question
        const refBoutonSuivant = document.createElement('button');
        refBoutonSuivant.setAttribute("type", "button");
        refBoutonSuivant.classList.remove('cacher')
        refBoutonSuivant.classList.add('validerQuiz');              
        refBoutonSuivant.textContent = 'Prochaine question >>';
        this.refQuestions[this.intNoQuestion].appendChild(refBoutonSuivant);

        //Affichage d'un paragraphe explicatif (pour expliquer la bonne réponse)
        const refParaExplicatif = document.createElement('p');
        refParaExplicatif.innerText = objExplications["Q"+(this.intNoQuestion+1)];
        refRetroaction.append(refParaExplicatif);

        //Écouteur d'événement sur le bouton suivant pour passer à la prochaine question
        refBoutonSuivant.addEventListener('click', this.questionSuivante.bind(this));

        //Si on est rendu à la question 2 (donc la troisième question) on ne passe pas à la prochaine question
        // on va plutôt créer un nouveau bouton personnalisé pour afficher le résultat (appel de la fonction AfficherResultats)
        if(this.intNoQuestion == 2) {

            refBoutonSuivant.classList.add('cacher');
            const refBoutonResultat = document.createElement('button');
            refBoutonResultat.setAttribute("type", "button");
            refBoutonResultat.textContent= 'Voir mon résultat'
            refBoutonResultat.classList.add('validerQuiz');    
            this.refQuestions[this.intNoQuestion].appendChild(refBoutonResultat);

            refBoutonResultat.addEventListener('click', this.afficherResultats.bind(this));

        }

    },

    /**
     * Affiche le conteneur de la question suivante
     */
    questionSuivante: function () {


        //Si on n'est pas arrivé à la question 3 (intNoQuestion = 2) alors on continue d'afficher les prochaines questions
        if(this.intNoQuestion < 2){

        this.refQuestions[this.intNoQuestion].classList.add('cacher');

        console.log(this.intNoQuestion);
        
        this.intNoQuestion ++;

        this.afficherQuestion(); 

        }

    },

    /**
     * Affiche le conteneur de résultats...
     */
    afficherResultats: function () { 

        //On cache la question courante
        this.refQuestions[this.intNoQuestion].classList.add('cacher');

        //Variables pour construire la rétroaction finale (note finale, messages et remerciements)
        const refDivResultat = document.querySelector('.ctnResultats');
        refDivResultat.classList.add('ctnAccueil');

        const refParaResultat = document.createElement('p');
        refParaResultat.innerText = "Vous avez eu " + this.intNbBonnesReponses + " sur 3.";
        refDivResultat.prepend(refParaResultat);

        const refFin = document.createElement('p');
        refFin.innerHTML = objJSON.messages.fin;

        //Varaible pour créer une petite image décorative
        const refImageFin = document.createElement('img');
        refImageFin.setAttribute('src', 'assets/svgTimQuiz/SVG/accueil.svg');
        refImageFin.setAttribute('alt', 'Gouttes de sang')
        refImageFin.classList.add('imgAccueil');

        const refRetroResultat = document.createElement('p');
        
        //Si aucune bonne réponse... on affiche un message personnalisé
        if( this.intNbBonnesReponses == 0) {

            refRetroResultat.innerText = objJSON.messages.note0;
            refRetroResultat.classList.add('mauvaiseNote');
            refParaResultat.classList.add('mauvaiseNote');

        }

        //Si une bonne réponse... on affiche un message personnalisé
        if( this.intNbBonnesReponses == 1) {

            refRetroResultat.innerText = objJSON.messages.note33;
            refRetroResultat.classList.add('mauvaiseNote');
            refParaResultat.classList.add('mauvaiseNote');

        }

        //Si deux bonne réponses... on affiche un message personnalisé
        if( this.intNbBonnesReponses == 2) {

            refRetroResultat.innerText = objJSON.messages.note66;
            refRetroResultat.classList.add('bonneNote');
            refParaResultat.classList.add('bonneNote');

        }

        //Si trois bonnes réponses... on affiche un message personnalisé
        if( this.intNbBonnesReponses == 3) {

            refRetroResultat.innerText = objJSON.messages.note100;
            refRetroResultat.classList.add('bonneNote');
            refParaResultat.classList.add('bonneNote');

        }

        //Affichages des paragraphes (notes, messages, img)
        refParaResultat.append(refRetroResultat);
        refDivResultat.append(refImageFin);
        refDivResultat.append(refFin);

    }
}