/**
 * TIM - QUIZ
 * @author: Prénom Nom;
 **/

/* Données du quiz - À ADAPTER SELON LES CONTENUS DU QUIZ */
/* CONSTRUIRE le tableau des bonneRéponses avec les identifiants 
des input[type=radio] */
document.querySelector('form').addEventListener('submit', empecherEnvoiForm);

function empecherEnvoiForm(objEvenement) {
    objEvenement.preventDefault();
}


const objJSON = {
    "retroactions": {
        "positive": "Bonne réponse!",
        "negative": "Oops! Mauvaise réponse"
    },
    "explications": {
        "Q": [
        "Quand un lapin est stressé, il tape de la patte arrière afin de créer un bruit fort. Cela arrive surtout lorsqu’il y un changement dans son environnement ou lorsqu’il se sent directement menacé. Parfois, un simple bruit un peu trop fort comme quelqu’un qui éternue ou les voisins qui font des travaux peut provoquer un lapin qui tape de la patte",
        "Le lapin blanc d'hotot est reconnaissable à sa couleur blanche et la marque noire autour de ses yeux. Il a rarement les oreilles qui tombent, un trait communément appelé  bélier ou “lop”. Il peut parfois être difficile d’identifier la race de son lapin et cela peut devenir encore plus compliqué avec les races mélangées.",
        "Bien que tous ces choix sont tous appréciés des lapins, rien ne les compare à une banane. Il est important de se rappeler qu’une banane contient beaucoup de sucre et peut si consommé en grande quantité, être dangereux pour la santé du lapin. Il faut donc ne pas trop en donner. comme en général les lapins adorent les bananes si vous voulez faire plaisir a votre compagnon vous pouvez la partager avec lui. Il est important de noter aussi que les carottes contiennent elles aussi beaucoup de sucre et doivent être aussi donné en quantité à limité. La laitue et les concombres sont totalement sécuritaires et font un excellent accompagnement pour le granulé et le foin que le lapin devrait déjà avoir."
        ]
    },
    "bonnesReponses": [
        "QA1",
        "QB3",
        "QC2"
    ],
    "messages": {
        "note0": "Oops, Peut-être seriez-vous mieux avec un chat plutôt qu'un lapin ?",
        "note33": "Vous auriez pu faire mieux, il va falloir attendre avant d'avoir un lapin",
        "note66": "Bravo, vous avez une bonne connaissance générale sur les lapins",
        "note100": "Félicitations, vous êtes un fin connaisseur !"
    },
};

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('body').classList = "js"
    quiz.initierQuiz();
})

document.querySelectorAll('.radio').forEach(function(item){
    item.addEventListener('click', function(e){ 
            if( e.currentTarget.name != "Q2"){
                 e.currentTarget.closest("div").classList = "question__box-disabeld"
                 e.currentTarget.closest('fieldset').querySelector ;
            }
        selectionBouton(e)
    })
})


function selectionBouton(e) {
    document.querySelectorAll('.question__box-disabeld').forEach(function(item){ item.classList = "question__box" });
    

    if( e.currentTarget.name != "Q2"){
    e.currentTarget.closest("div").classList = "question__box-disabeld"
    }

    document.querySelector('.ctnButton .bouton').classList.remove('disabled');
    document.querySelector('.ctnButton .bouton').disabled = false ;
}


/* Objet Quiz */
const quiz = {
    isAtReturn: false,
    intQuestion: 0 ,
    intBonneReponse: 0,
    initierQuiz: function() { 
        document.querySelector('.quiz').classList.add("hidden")
        document.getElementById("resultat").classList.add("hidden")
        document.querySelectorAll('fieldset').forEach(function(item){
            item.classList = "hidden";
        });

        const refBtnStart = document.createElement('button');
        refBtnStart.innerHTML = 'Commencer <img src="assets/images/arrow.svg" class="arrow" alt="">';
        refBtnStart.classList = "bouton";
        refBtnStart.addEventListener('click', this.debuterQuiz.bind(this) )
        document.querySelector('.text__intro').append(refBtnStart)

        document.getElementById("mainButton").addEventListener('click' , this.validerReponse.bind(this))
        document.getElementById("resultat").addEventListener("click", quiz.rejouer.bind(this));
    },

    debuterQuiz: function () {
        document.getElementById('introduction').classList = "hidden"

        document.getElementById("Q1").classList = ""
        document.querySelector('.quiz').classList.remove("hidden")
        document.getElementById('topSection').classList.remove("hidden")
        document.getElementById("mainButton").closest('div').classList.remove("hidden")
        document.getElementById('parti').innerText = "Question " + (this.intQuestion + 1) + "/3"
     },
     
    validerReponse: function () {
        let strReponse = document.querySelector('.radio:checked').id
        let refPart = "Q" + (this.intQuestion + 1)
        let refDiv = document.querySelector('.radio:checked+label').innerHTML
        
        document.getElementById('correctText').classList.remove('hidden')
        if(this.isAtReturn == false){
        document.getElementById("imgReturn").src = document.querySelector('#' + refPart + " img").src
        document.getElementById(refPart).classList = "hidden"
        document.getElementById("return").classList = ""
        document.querySelector('.right').classList.remove("hidden")
        if(strReponse == objJSON.bonnesReponses[this.intQuestion]){
            document.getElementById("correctText").innerText = document.querySelector('.radio:checked+label').innerHTML
            document.querySelector(".wrong").classList.add("hidden")
            this.intBonneReponse++
            if(this.intQuestion == 1){
                document.getElementById('correctText').innerText = "Bonne réponse!"
                document.getElementById("imgReturn").src = "assets/images/hotot_620.jpg"
            }
        } else {
            if(this.intQuestion == 1){
                document.querySelector(".wrong").classList.remove("hidden")
                document.getElementById("wrongText").innerText = "Oops! Mauvaise réponse"
                document.querySelector('.right').classList.add("hidden")
                document.getElementById("imgReturn").src = "assets/images/hotot_620.jpg"
            } else {
            document.querySelector(".wrong").classList.remove("hidden")
            document.getElementById('correctText').innerText =  document.getElementById(objJSON.bonnesReponses[this.intQuestion]).closest('div').childNodes[3].innerText
            document.getElementById('wrongText').innerText = document.querySelector('.radio:checked+label').innerHTML        }}

        document.getElementById("explication").innerText = objJSON.explications.Q[this.intQuestion]
        this.isAtReturn = !this.isAtReturn
        
        } else {
        document.getElementById("return").classList = "hidden"
        document.getElementById("Q" + (this.intQuestion + 1)).classList = "hidden"
        if(this.intQuestion < 2){
        document.getElementById("Q" + (this.intQuestion + 2)).classList = ""
        
        } else {
            document.getElementById('topSection').classList.add("hidden")
            this.afficherResultats()
        }

        document.querySelector('.radio:checked').checked = false;
        this.intQuestion++
        document.getElementById('parti').innerText = "Question " + (this.intQuestion + 1) + "/3"
        document.querySelector('.ctnButton .bouton').classList.add("disabled")
        this.isAtReturn = !this.isAtReturn
        }
        
     },
    afficherResultats: function () {
        let strMessage = "note" + (Math.floor(this.intBonneReponse/3 * 100))
        document.getElementById("mainButton").closest('div').classList.add("hidden")
        document.getElementById("resultat").classList.remove("hidden")
        

        document.getElementById("feedback").innerHTML = "Votre résultat est : </br>" + this.intBonneReponse + "/3 </br>" + objJSON.messages[strMessage];
     },
     rejouer: function(){
        this.intBonneReponse = 0;
        this.intQuestion = 0; 
        document.getElementById('resultat').classList.add('hidden');
        document.getElementById('introduction').classList.remove('hidden')
     }
}





