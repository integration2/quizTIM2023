/**
 * TIM - QUIZ
 * @author: Mathieu Thérien;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
document.getElementById("bouton__accueil").addEventListener("click", debuterQuiz);
document.getElementById("bouton__voirResultat").addEventListener("click", resultat);
document.getElementById("bouton__validerReponse").addEventListener("click", validation);
document.getElementById("bouton__prochaineQuestion").addEventListener("click", afficherQuestion);

document.getElementById("quiz-question").classList.add("visuallyhidden");
document.getElementById("resultat").classList.add("visuallyhidden");

const objJSON = {
    "retroactions": {
        "positive": "Bravo! Bonne réponse!",
        "negative": "Dommage c'est une mauvaise réponse."
    },
    "explications": {
        "Q1": "Dans le jeux Assassin’s Creed 3, le joueur contrôle l’assassin Connor Kenway qui devient le capitaine de l’Aquila à un certain moment du jeux. Les autres personnages proviennent de d’autre jeux de la saga, ils ne sont donc pas le capitaine de ce navire.",
        "Q2": "Il y a plusieurs fragments d’Eden, dont la pomme qui est la plus connue. Parmi ces fragments, il y a le bâton. Les autres armes de la question sont juste des armes normales. Ce qui n’est pas le cas des fragments d’Eden qui ont des pouvoirs spéciaux.",
        "Q3": "Le jeux avec la période historique la plus lointaine est Assassin’s Creed Odyssey. Assassin’s Creed 1 se passe dans la période historique la plus proche de notre temps. Ce jeu se déroule durant le Moyen-Âge. Ensuite, Assassin’s Creed Mirage se trouve à la 3e position de la période historique la plus ancienne. Pour finir, Assassin’s Creed Origin se trouve à la deuxième place, car il se déroule en 49 avant J-C et Odyssey en 431 avant J-C."
    },
    "bonnesReponses": [
        "Q1B",
        "Q2A",
        "Q3C"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Perdu pour cette fois, mais vous pouvez le refaire pour aller chercher un meilleur résultat.",
        "note33": "Vous avez eu 1 bonne réponse, penser à refaire le quiz pour avoir un meilleur résultat.",
        "note66": "Bravo, vous avez une bonne connaissance de Assassin's Creed. Recommencez le quiz si vous voulez avoir la note maximal!",
        "note100": "Félicitations, vous avez réussi parfaitement le quiz Assassin's Creed!"
    }
};

/* Objet Quiz */

let intNoQuestion = 0
let intNbQuestion = 3
let intNbBonneReponse = 0

const refBonneReponseQ1 = document.getElementById("boutonRadio1B");
const refBonneReponseQ2 = document.getElementById("boutonRadio2A");

const quiz = {
    debuterQuiz: function () { },
    validerReponse: function (idReponse) { },
    afficherResultats: function () { },

    
}

function debuterQuiz(){
    document.getElementById("quiz-question").classList.remove("visuallyhidden");
    document.getElementById("accueil").classList.add("visuallyhidden");
    
    document.getElementById("Q2__fieldset").classList.add("visuallyhidden");
    document.getElementById("Q3__fieldset").classList.add("visuallyhidden");
    document.getElementById("bouton__prochaineQuestion").classList.add("visuallyhidden");
    document.getElementById("bouton__voirResultat").classList.add("visuallyhidden");
    
}

function validation(e){
    document.getElementById("bouton__prochaineQuestion").classList.remove("visuallyhidden");
    console.log("valider")
    document.getElementById("bouton__validerReponse").classList.add("visuallyhidden");

    if(intNoQuestion == 2){
        document.getElementById("bouton__voirResultat").classList.remove("visuallyhidden");
        document.getElementById("bouton__prochaineQuestion").classList.add("visuallyhidden");
    }
    if(intNoQuestion == 0){
        if(refBonneReponseQ1.checked == true){
            console.log("bonne reponse");
            intNbBonneReponse++;
            document.getElementById("boutonRadio__Q1B").classList.add("bonneReponseImage");

        }else{
            console.log("mauvaise reponse")
            const arrMauvaiseReponse = document.querySelectorAll(".bouton__reponse");
            const arrMauvaiseReponseLabel = document.querySelectorAll(".boutonRadio");
            console.log(arrMauvaiseReponse)
            for (let strNumBtn = 0; strNumBtn < arrMauvaiseReponse.length; strNumBtn++) { 
                console.log(arrMauvaiseReponse[strNumBtn])
                if(arrMauvaiseReponse[strNumBtn].checked == true){
                    console.log("mauvais")
                    arrMauvaiseReponseLabel[strNumBtn].classList.add("mauvaiseReponseImage");  
                }             
                }
           
            
        }
    }
    if(intNoQuestion == 1){
        if(refBonneReponseQ2.checked == true){
            console.log("bonne reponse2")
            intNbBonneReponse++
            document.getElementById("boutonRadio__Q2A").classList.add("bonneReponseImage");
        }else{
            console.log("mauvaise reponse")
            const arrMauvaiseReponse = document.querySelectorAll(".bouton__reponse");
            const arrMauvaiseReponseLabel = document.querySelectorAll(".boutonRadio");
            console.log(arrMauvaiseReponse)
            for (let strNumBtn = 0; strNumBtn < arrMauvaiseReponse.length; strNumBtn++) { 
                console.log(arrMauvaiseReponse[strNumBtn])
                if(arrMauvaiseReponse[strNumBtn].checked == true){
                    console.log("mauvais")
                    arrMauvaiseReponseLabel[strNumBtn].classList.add("mauvaiseReponseImage");  
                }             
                }
        }
    }
}

function afficherQuestion(){
    console.log(intNoQuestion);
    intNoQuestion++
    console.log(intNoQuestion);
    if(intNoQuestion == 1){
        document.getElementById("Q1__fieldset").classList.add("visuallyhidden");
        document.getElementById("Q2__fieldset").classList.remove("visuallyhidden");
        
    }
    if(intNoQuestion == 2){
        document.getElementById("Q2__fieldset").classList.add("visuallyhidden");
        document.getElementById("Q3__fieldset").classList.remove("visuallyhidden");
    }
    document.getElementById("bouton__validerReponse").classList.remove("visuallyhidden");
    document.getElementById("bouton__prochaineQuestion").classList.add("visuallyhidden");
}

function resultat(){
    document.getElementById("quiz-question").classList.add("visuallyhidden");
    document.getElementById("resultat").classList.remove("visuallyhidden");
}