/**
 * TIM - QUIZ
 * @author: Léa Marois;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
const objJSON = {
    "retroactions": {
        "positive": "Nat20! Tu as réussi ton jet d’intelligence!",
        "negative": "Nat1. Tu as manqué ton jet d’intelligence."
    },
    "explications": {
        "Q1": "Le d20 est utilisé à chaque fois qu’on veut savoir si une tentative est réussite comme des attaques, des jets de sauvegarde, des vérifications de compétence et les vérifications de capacité. Dans le jeu lorsqu’on roule un 20 naturellement on réussit ce qu’on veut faire (la plupart du temps) et lorsqu’on qu’on roule un 1 naturellement on échoue. Le d6 est le dé principalement utilisé dans d’autres systèmes de jeux comme GURPS, mais le d20 est utilisé dans la plupart des systèmes de jeux.",
        "Q2": "Le druide et le ranger sont dans le livret de règles de base et l’artificier avait été ajouté dans le livret de Tasha’s Cauldron of Everything. Le shaman n’est pas une classe officielle des éditeurs du jeu, elle a été créée par la communauté D&D.",
        "Q3": "Le Beholder est une créature super intelligente qui est décrite comme une sphère avec plusieurs yeux. Contrairement à plusieurs autres créatures de D&D, le Beholder est une création originale.",
    },
    "bonnesReponses": [
        "Q1D",
        "Q2C",
        "Q3A"
    ],
    "messages": {
        "resultatsDebut": {
            "mauvaiseNote": "Ouch! Vous avez eu",
            "bonneNote": "Félicitation! Vous avez eu"
        },
        "note0": "C'est pas grave, ça arrive. Si vous êtes plus intéressé, vous pouvez lire les livres officiels de DnD, ou même regarder des vidéos en ligne. Je vous suggère grandement d'en apprendre plus, le jeu il est super intéressant et tout le monde peut y jouer.",
        "note33": "C'est pas grave, ça arrive. Si vous êtes plus intéressé, vous pouvez lire les livres officiels de DnD, ou même regarder des vidéos en ligne. Je vous suggère grandement d'en apprendre plus, le jeu est super intéressant et tout le monde peut y jouer.",
        "note66": "Bravo, vous avez de bonnes connaissances générales de dungeons et dragon. Y avez vous déjà joué?",
        "note100": "Vous êtes un fin connaisseur !"
    },
    "captionQuestion": {
        "Q1": ["Le d6", "Le d8", "Le d10", "Le d20"],
        "Q2": ["Artificier", "Ranger", "Shaman", "Druide"],
        "Q3": ["Beholder", "Tarrasque", "Mimic", "Lich"]
    }
};

/* Écouteurs d'événements */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('body').classList.add('js');
    /* initier le quiz */
    quiz.initierQuiz();
});

/* Remove Disabled */
for (let i = 1; i <= 3; i++) {
    document.querySelector(`#Q${i}`).addEventListener('change', function(){
        document.querySelector(`#Q${i} .btnValider`).disabled = false
   })
};

/* Objet Quiz */
const quiz = {

    refIntro: document.querySelector('#intro'),
    refArrQuestions: document.querySelectorAll('.fieldQuestion'),
    refCtnBoutonSubmit: document.querySelector('.ctnBoutonSubmit'),

    // attributs pour gérer la progression du quiz
    intNoQuestion: 0,
    intNbQuestions: 3,
    intNbBonnesReponses: 0,

    initierQuiz: function () {
        // Afficher l'intro  
        this.refIntro.classList.remove('cache');

        // Créer le bouton pour démarrer le quiz
        const refCtnBoutonStart = document.createElement('div');
        refCtnBoutonStart.classList.add("sectionBouton")
        refCtnBoutonStart.innerHTML = "<span class='questionRetro textBouton'>Rouler l&#39;initiative!</span><button type='submit' class='btnDemarrerQuiz backgroundBouton boutonPetit'>Démarrer le quiz!</button>"
        this.refIntro.appendChild(refCtnBoutonStart)

        // Ajouter un écouteur d'événement au bouton
        let refBoutonStart = document.querySelector('.btnDemarrerQuiz')
        refBoutonStart.addEventListener('click', this.demarrerQuiz.bind(this));

        // Cacher les questions
        this.refArrQuestions.forEach(function (refQuestion) {
            refQuestion.classList.add('cache');
        });

        // Cacher le bouton de soumission du formulaire
        this.refCtnBoutonSubmit.classList.add('cache');
    },

    demarrerQuiz: function () {
        // Cacher l'intro       
        this.refIntro.classList.add('cache');

        // Afficher la première question
        this.afficherQuestion();
    },

    afficherQuestion: function () {

        // cacher les questions précédente après avoir répondu
        if (this.intNoQuestion > 0) {
            this.refArrQuestions[this.intNoQuestion-1].classList.add('cache');
        }

        // Afficher la question
        this.refArrQuestions[this.intNoQuestion].classList.remove('cache');

        // Créer le paragraphe pour le bouton
        const refCtnBouton = document.createElement('div');
        refCtnBouton.classList.add('sectionBouton');

        // Y ajouter le bouton de validation de la question 
        refCtnBouton.innerHTML = '<span class="questionRetro textBouton">Êtes vous sûr?</span> <button type="button" class="btnValider backgroundBouton boutonPetit" disabled>Vérifier réponse</button>';
        this.refArrQuestions[this.intNoQuestion].appendChild(refCtnBouton);

        // Ajouter un écouteur d'événement au bouton
        refCtnBouton.querySelector('.btnValider').addEventListener('click', this.validerReponse.bind(this));
    },

    // Au clique du bouton Valider réponse
    validerReponse: function () {
        // Vérifier si la réponse est correcte

        // Ul qui contient les réponses de la question actuelle
        let choixReponses = document.querySelector(`#Q${this.intNoQuestion+1} .choixReponses`)
        // La bonne réponse dans objet JSON
        let bonneReponseJSON = objJSON.bonnesReponses[this.intNoQuestion]
        // Le html de la bonne reponse
        let refBonneReponseHTML = document.querySelector(`#${bonneReponseJSON}`)
        // La liste de input de la question actuelle
        let arrQuestions = document.querySelectorAll(`#Q${this.intNoQuestion+1} input`)

        // Cacher les choix de réponse actuelle
        choixReponses.classList.add('cache')

        // Créer Contenant de la Retroaction 
        const refCtnRetro = document.createElement('div')
        refCtnRetro.classList.add('ctnRetro')
        // Y ajouter sont contenu
        refCtnRetro.innerHTML = '<div class="retroImg"> <div class="retroImg--mauvaiseResponse"></div>  <div class="retroImg--bonneResponse"></div></div>  <div class="retroText"> <h3 class="questionRetro retroTitre"></h3> <hr> <p class="retroText--text"></p></div>'
        this.refArrQuestions[this.intNoQuestion].insertBefore(refCtnRetro, this.refArrQuestions[this.intNoQuestion].children[2])

        // Déclaration des refférence du contenu de la rétroaction
        let refRetroImgMauvaiseRep = document.querySelector(`#Q${this.intNoQuestion+1} .retroImg--mauvaiseResponse`)
        let refRetroImgBonneRep = document.querySelector(`#Q${this.intNoQuestion+1} .retroImg--bonneResponse`)
        let refRetroTitre = document.querySelector(`#Q${this.intNoQuestion+1} .retroTitre`)
        let refRetroTexte = document.querySelector(`#Q${this.intNoQuestion+1} .retroText--text`)
        let refRetroHr = document.querySelector(`#Q${this.intNoQuestion+1} .retroText hr`)

        // Aller rechercher le innerHTML de la bonne réponse de la question
        let innerHtmlBonneReponse = document.querySelector(`label[for=${objJSON.bonnesReponses[this.intNoQuestion]}]`)
        
        // Aller chercher l'explication de la bonne reponse dans l'objet JSON avec une variable qui change à chaque question
        let JSONbonneReponse = `Q${this.intNoQuestion+1}`
        let JSONExplication = objJSON.explications[JSONbonneReponse]

        // Si la caption était vide lors de la question ajouter la caption pour la rétroaction
        for (let i = 0; i < arrQuestions.length; i++) {
        const element = arrQuestions[i];
            let refCaptionReponse = document.querySelector(`#${element.id}+label .caption`)
                
            if (refCaptionReponse.innerHTML == '') {
                refCaptionReponse.innerHTML = objJSON.captionQuestion[`Q${this.intNoQuestion+1}`][i]
            }
        }

        // Ajouter l'explication
        refRetroTexte.innerText = JSONExplication
        // Ajouter innerHTML du input de la bonne réponse dans la rétroaction
        refRetroImgBonneRep.innerHTML = innerHtmlBonneReponse.innerHTML

        /* Changer le visuel de la rétroaction si tu as une bonne reponse ou un mauvaise */
        // Si la bonne réponse est checked au clique du bouton
        if (refBonneReponseHTML.checked == true) {
            // Ajouter la rétroaction postive
            refRetroTitre.innerText = objJSON.retroactions.positive
            // Changer la couleur du hr
            refRetroHr.classList.add('hrBonneResponse')

            //incrémenter le nombre de bonnes réponses
            this.intNbBonnesReponses = this.intNbBonnesReponses+1

            // Si la bonne réponse n'est pas checked au clique du bouton
        } else {
            // Ajouter la rétroaction negative
            refRetroTitre.innerText = objJSON.retroactions.negative
            // Changer la couleur du hr
            refRetroHr.classList.add('hrMauvaiseResponse')

            // Aller chercher la mauvaise réponse selectionner en passant à travers chaque réponse pour voir si elle est checked
            for (let i = 0; i < arrQuestions.length; i++) {
                const element = arrQuestions[i];

                // Aller chercher le innerHTML de la mauvaise réponse
                let innerHtmlMauvaiseReponse = document.querySelector(`#${element.id}+label`)

                // Si l'element (qui est la mauvaise réponse) est checked, ajouter le innerHTML de la mauvaise réponse dans la rétroaction
                if (element.checked == true) {
                    refRetroImgMauvaiseRep.innerHTML = innerHtmlMauvaiseReponse.innerHTML
                }
            }
        }


        /* Changer le boutons */

        // Enlever le bouton Valider
        let refSectionBouton = document.querySelector(`#Q${this.intNoQuestion+1} .sectionBouton`)
        refSectionBouton.remove()

        // Si on est à la dernière question, faire apparaitre le bouton submit
        if (this.intNoQuestion == this.intNbQuestions-1)  {
            this.refCtnBoutonSubmit.classList.remove('cache')
        
            // Sinon créer le nouveau bouton
        } else {
            // Créer un contenant pour le nouveau bouton
        const refCtnBouton = document.createElement('div');
        refCtnBouton.classList.add('sectionBouton');

        // Y ajouter le bouton de validation de la question 
        refCtnBouton.innerHTML = '<span class="questionRetro textBouton">Prêt pour le prochain défi?</span> <button type="button" class="btnProchain backgroundBouton boutonPetit">Prochaine question!</button>';
        this.refArrQuestions[this.intNoQuestion].appendChild(refCtnBouton);

        // Incrémenter le Numéro de la question
        this.intNoQuestion = this.intNoQuestion+1

        // Ajouter un écouteur d'événement au bouton
        refCtnBouton.querySelector('.btnProchain').addEventListener('click', this.afficherQuestion.bind(this));        
        }

    },

    // Au clique du bouton submit
    afficherResultats: function () {

        // Cacher la question actuelle (Dernière question)
        let refQuestion = document.querySelector(`#Q${this.intNoQuestion+1}`)
        refQuestion.classList.add('cache')
        // Cacher le bouton Submit
        let refBtnSubmit = document.querySelector(`.ctnBoutonSubmit`)
        refBtnSubmit.classList.add('cache')

        // Créer la section résultat
        const refCtnResultat = document.createElement('div')
        refCtnResultat.classList.add('ctnResultat')
        refCtnResultat.innerHTML = '<div class="retroText"><h3 class="questionRetro resultat"></h3> <hr> <p class="textResultat"></p></div>'
        document.querySelector('form').append(refCtnResultat)

        // Reférence de la du résultat et du message de résultat
        let refResultat = document.querySelector('.resultat')
        let refResultatText = document.querySelector('.textResultat')

        // Si le nombres de bonnes réponses est plus que 1
        if (this.intNbBonnesReponses > 1) {
            refResultat.innerText = `${objJSON.messages.resultatsDebut.bonneNote} ${this.intNbBonnesReponses} bonnes réponses sur ${this.intNbQuestions}.`

            if (this.intNbBonnesReponses == 2) {
                refResultatText.innerText = objJSON.messages.note66
            } else {
                refResultatText.innerText = objJSON.messages.note100
            }
            // Si le nombres de bonnes réponses est moins ou égal que 1
        } else {
            refResultat.innerText = `${objJSON.messages.resultatsDebut.mauvaiseNote} ${this.intNbBonnesReponses} bonne réponse sur ${this.intNbQuestions}.`
            
            if (this.intNbBonnesReponses == 0) {
                refResultatText.innerText = objJSON.messages.note0
            } else {
                refResultatText.innerText = objJSON.messages.note33
            }
        }
        

    }

}



document.querySelector('form').addEventListener('submit', function(e){
    // Prevent Default du bouton submit
    e.preventDefault()
    // Afficher le resultat lors du clique du bouton submit
    quiz.afficherResultats();
})


