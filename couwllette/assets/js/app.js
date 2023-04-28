/**
 * TIM - QUIZ
 * @author: Cloé Ouellette;
 **/


const objJSON = {
    "retroactions": {
        "positive": "Bonne réponse!",
        "negative": "Mauvaise réponse!"
    },
    "explications": {
        "Q1": "Les murs des habitations au Portugal sont recouverts de carreaux de faïence pour protéger les murs de l’humidité, et leurs couleurs ont donné le surnom au Portugal : le pays bleu.",
        "Q2": "Le Portugal est situé à l’extrême sud-ouest de l’Europe et inclut les archipels de Madeira et des Açores dans l’Océan Atlantique. Açores, l’« Hawaii d’Europe ». Ce qui en fait un lieu unique, c’est son climat subtropical qui en fait un véritable jardin d’Eden, avec des étendues de nature paradisiaque, de grandes plages de sable noir, typique des paysages volcaniques qui vous rappelleront les cartes postales de Hawaï.",
        "Q3": "C'est un dessert portugais récemment popularisé dans le monde entier. La « pastel de nata » est un petit flan à pâte feuilletée tout droit venu de Lisbonne et plus précisément de Belem, une ancienne banlieue qui fait aujourd'hui partie de la ville"
    },
    "bonnesReponses": [
        "Q1A",
        "Q2B",
        "Q3B"
    ],
    "messages": {
        "resultatsDebut": "Vous avez obtenu un résultat de",
        "note0": "Oh...",
        "note33": "Vous auriez pu faire mieux.",
        "note66": "Bravo, vous avez une bonne connaissance générale.",
        "note100": "Félicitations !"
    }
};

const refIntro = document.querySelector('.introduction');
const arrQuestions = document.querySelectorAll('.question');
const refBtnResultat = document.querySelector('.btnValider');
const arrBtnRadios = document.querySelectorAll("input[type=radio]");
const btnValiderReponse = '<button class="button-validation" disabled type="button">VALIDER</button>';
const btnProchaineQuestion = '<button class="button-validation" type="button">PROCHAINE QUESTION</button>'

let intNoQuestion = 0;
const INT_NB_QUESTIONS = 3;
let intNbBonnesReponses = 0;

// bouton valider quiz
const refBtnValider = document.createElement('p');
refBtnValider.classList.add('p-bouton');
// bouton redémarrer quiz
const refBtnRedemarrer = document.createElement('p');
refBtnRedemarrer.classList.add('p-bouton');

//Écouteurs d'évenements
document.addEventListener('DOMContentLoaded', initialisation);
document.querySelectorAll('[type=radio]').forEach(function (btnRadio) {
    // console.log(btnRadio);
    btnRadio.addEventListener('click', function (e) {
        // Activer le bouton de validation
        e.target.closest('.question').querySelector('.button-validation').disabled = false;
    });
});



function initialisation() {
    document.querySelector('body').classList.add('js');

    //afficher Intro
    refIntro.classList.remove('cache');

    //créer bouton démarrer quiz
    const refBoutonStart = document.createElement('button');
    refBoutonStart.textContent = 'DÉMARRER';
    refBoutonStart.classList.add('button-demarrer');
    refIntro.appendChild(refBoutonStart);

    //ajouter ecouteur evenement sur btn démarrer
    refBoutonStart.addEventListener('click', demarrerQuiz.bind(this))

    //cacher les questions
    arrQuestions.forEach(function (refQuestion) {
        refQuestion.classList.add('cache');
    })

    //cacher bouton valider
    refBtnResultat.classList.add('cache');
}

function demarrerQuiz() {
    //cacher introduction
    refIntro.classList.add('cache');
    
    //afficher questions
    afficherQuestion(intNoQuestion);
}

function afficherQuestion(numeroQuestion) {

    console.log(numeroQuestion);

    intNoQuestion = numeroQuestion;
    
    arrQuestions[intNoQuestion].classList.remove('cache');
    arrQuestions[intNoQuestion].querySelector('.progression').classList.remove('visuallyhidden');

    //ajout bouton valider
    refBtnValider.innerHTML = btnValiderReponse;
    arrQuestions[intNoQuestion].appendChild(refBtnValider);

    refBtnValider.querySelector('button').addEventListener('click', validerReponse.bind(this));

}


function validerReponse(e) {

    intNoQuestion++;
    let strIdQuestion = "Q" + intNoQuestion;

    console.log(strIdQuestion);

    //savoir quel choix de reponse coché
    const strReponse = document.querySelector('input[name=Q' + intNoQuestion + ']:checked').id;
    console.log(strReponse);
    const strReponseCoche = document.querySelector('input[name=Q' + intNoQuestion + ']:checked');

    //si reponse cochée correspond à la bonne réponse

    //oui - incrementer reponse + ajout classe correct et animation + message 'erreur'
    //non - montrer bonne reponse (ajout classe reussi) + ajout classe incorrect et animation + message 'erreur'
    if (strReponse == objJSON.bonnesReponses[intNoQuestion - 1]) {
        intNbBonnesReponses++;
        strReponseCoche.classList.add('reussi');
        arrQuestions[intNoQuestion-1].querySelector('.erreur').classList.add('correct');
        arrQuestions[intNoQuestion-1].querySelector('.erreur').innerHTML = '<svg width="45" height="45" viewBox="0 0 45 45" class="rotateIn" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 42.1875C17.2786 42.1875 12.271 40.1133 8.57883 36.4212C4.88671 32.729 2.8125 27.7214 2.8125 22.5C2.8125 17.2786 4.88671 12.271 8.57883 8.57883C12.271 4.88671 17.2786 2.8125 22.5 2.8125C27.7214 2.8125 32.729 4.88671 36.4212 8.57883C40.1133 12.271 42.1875 17.2786 42.1875 22.5C42.1875 27.7214 40.1133 32.729 36.4212 36.4212C32.729 40.1133 27.7214 42.1875 22.5 42.1875ZM22.5 45C28.4674 45 34.1903 42.6295 38.4099 38.4099C42.6295 34.1903 45 28.4674 45 22.5C45 16.5326 42.6295 10.8097 38.4099 6.5901C34.1903 2.37053 28.4674 0 22.5 0C16.5326 0 10.8097 2.37053 6.5901 6.5901C2.37053 10.8097 0 16.5326 0 22.5C0 28.4674 2.37053 34.1903 6.5901 38.4099C10.8097 42.6295 16.5326 45 22.5 45Z" fill="#197B00"/><path d="M12.0517 26.9072C12.3747 26.7207 12.7585 26.6702 13.1188 26.7667C13.479 26.8632 13.7862 27.0989 13.9727 27.4219C14.8364 28.9191 16.0794 30.1623 17.5764 31.0263C19.0734 31.8904 20.7717 32.3448 22.5002 32.3438C24.2286 32.3448 25.9269 31.8904 27.4239 31.0263C28.9209 30.1623 30.1639 28.9191 31.0277 27.4219C31.1193 27.2607 31.242 27.1192 31.3885 27.0055C31.5351 26.8919 31.7027 26.8084 31.8817 26.7598C32.0607 26.7112 32.2475 26.6985 32.4314 26.7224C32.6153 26.7463 32.7927 26.8064 32.9533 26.8991C33.1139 26.9918 33.2546 27.1154 33.3672 27.2627C33.4799 27.41 33.5623 27.5782 33.6097 27.7575C33.6571 27.9368 33.6685 28.1237 33.6434 28.3074C33.6183 28.4912 33.5571 28.6681 33.4633 28.8281C32.3527 30.7529 30.7547 32.3511 28.8301 33.462C26.9056 34.5729 24.7223 35.1573 22.5002 35.1562C20.278 35.1573 18.0947 34.5729 16.1702 33.462C14.2456 32.3511 12.6476 30.7529 11.537 28.8281C11.3506 28.5051 11.3 28.1213 11.3965 27.7611C11.4931 27.4008 11.7287 27.0937 12.0517 26.9072ZM19.6877 18.2812C19.6877 20.61 18.4277 22.5 16.8752 22.5C15.3227 22.5 14.0627 20.61 14.0627 18.2812C14.0627 15.9525 15.3227 14.0625 16.8752 14.0625C18.4277 14.0625 19.6877 15.9525 19.6877 18.2812ZM30.9377 18.2812C30.9377 20.61 29.6777 22.5 28.1252 22.5C26.5727 22.5 25.3127 20.61 25.3127 18.2812C25.3127 15.9525 26.5727 14.0625 28.1252 14.0625C29.6777 14.0625 30.9377 15.9525 30.9377 18.2812Z" fill="#197B00"/></svg>' + objJSON.retroactions.positive;
    } else {
        strReponseCoche.classList.add('incorrect');
        document.getElementById(objJSON.bonnesReponses[intNoQuestion - 1]).classList.add('reussi');
        arrQuestions[intNoQuestion-1].querySelector('.erreur').classList.add('incorrect');
        arrQuestions[intNoQuestion-1].querySelector('.erreur').classList.add('shakeX');
        arrQuestions[intNoQuestion-1].querySelector('.erreur').innerHTML = '<svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">'
            + '<path d="M27.5 5.15625C23.0808 5.15625 18.7609 6.46669 15.0865 8.92185C11.4121 11.377 8.54822 14.8666 6.85708 18.9494C5.16593 23.0322 4.72345 27.5248 5.58559 31.8591C6.44773 36.1933 8.57576 40.1746 11.7006 43.2994C14.8254 46.4243 18.8067 48.5523 23.141 49.4144C27.4752 50.2766 31.9678 49.8341 36.0506 48.1429C40.1334 46.4518 43.623 43.5879 46.0782 39.9135C48.5333 36.2391 49.8438 31.9192 49.8438 27.5C49.8324 21.5776 47.4747 15.9009 43.2869 11.7131C39.0991 7.52532 33.4225 5.16761 27.5 5.15625ZM27.5 46.4063C23.7607 46.4063 20.1054 45.2974 16.9963 43.22C13.8871 41.1425 11.4639 38.1898 10.0329 34.7351C8.60194 31.2804 8.22754 27.479 8.95704 23.8116C9.68654 20.1441 11.4872 16.7754 14.1313 14.1313C16.7754 11.4872 20.1441 9.68653 23.8116 8.95703C27.479 8.22753 31.2805 8.60193 34.7351 10.0329C38.1898 11.4639 41.1425 13.8871 43.22 16.9963C45.2974 20.1054 46.4063 23.7607 46.4063 27.5C46.4006 32.5125 44.4068 37.3181 40.8625 40.8625C37.3181 44.4068 32.5125 46.4006 27.5 46.4063ZM17.1875 23.2031C17.1875 22.6932 17.3387 22.1948 17.622 21.7708C17.9053 21.3468 18.3079 21.0164 18.779 20.8212C19.2501 20.6261 19.7685 20.5751 20.2686 20.6745C20.7687 20.774 21.2281 21.0196 21.5886 21.3801C21.9492 21.7407 22.1947 22.2001 22.2942 22.7002C22.3937 23.2003 22.3426 23.7186 22.1475 24.1897C21.9524 24.6608 21.6219 25.0635 21.198 25.3468C20.774 25.63 20.2755 25.7813 19.7656 25.7813C19.0819 25.7813 18.4261 25.5096 17.9426 25.0261C17.4591 24.5426 17.1875 23.8869 17.1875 23.2031ZM32.6563 23.2031C32.6563 22.6932 32.8075 22.1948 33.0908 21.7708C33.374 21.3468 33.7767 21.0164 34.2478 20.8212C34.7189 20.6261 35.2372 20.5751 35.7374 20.6745C36.2375 20.774 36.6968 21.0196 37.0574 21.3801C37.418 21.7407 37.6635 22.2001 37.763 22.7002C37.8625 23.2003 37.8114 23.7186 37.6163 24.1897C37.4211 24.6608 37.0907 25.0635 36.6667 25.3468C36.2427 25.63 35.7443 25.7813 35.2344 25.7813C34.5506 25.7813 33.8949 25.5096 33.4114 25.0261C32.9279 24.5426 32.6563'
            + ' 23.8869 32.6563 23.2031ZM37.9199 36.9531C38.1464 37.3466 38.2081 37.8137 38.0913 38.2525C37.9746 38.6913 37.689 39.066 37.2969 39.2949C37.0379 39.4519 36.7403 39.5337 36.4375 39.5313C36.1355 39.537 35.8377 39.4599 35.5764 39.3085C35.315 39.157 35.1002 38.9368 34.9551 38.6719C34.1982 37.365 33.111 36.28 31.8025 35.5258C30.494 34.7715 29.0103 34.3745 27.5 34.3745C25.9897 34.3745 24.506 34.7715 23.1975 35.5258C21.8891 36.28 20.8019 37.365 20.0449 38.6719C19.9424 38.8856 19.7968 39.0758 19.6173 39.2305C19.4378 39.3853 19.2282 39.5012 19.0017 39.571C18.7752 39.6409 18.5367 39.6631 18.3012 39.6363C18.0657 39.6096 17.8383 39.5344 17.6332 39.4155C17.4282 39.2967 17.2499 39.1367 17.1097 38.9456C16.9694 38.7545 16.8702 38.5365 16.8183 38.3053C16.7663 38.074 16.7628 37.8345 16.8078 37.6018C16.8529 37.3691 16.9456 37.1483 17.0801 36.9531C18.136 35.1239 19.6548 33.6048 21.4839 32.5487C23.313 31.4926 25.3879 30.9365 27.5 30.9365C29.6121 30.9365 31.687 31.4926 33.5161 32.5487C35.3452 33.6048 36.864 35.1239 37.9199 36.9531Z"'
            + 'fill="#A30000"/></svg>' + objJSON.retroactions.negative;
    }

    //afficher message explicatif
    arrQuestions[intNoQuestion-1].querySelector('.message-retroaction').classList.remove('visuallyhidden');
    arrQuestions[intNoQuestion-1].querySelector('.message-retroaction').innerHTML = objJSON.explications[strIdQuestion];

    //désactiver boutons radios
    arrQuestions[intNoQuestion - 1].querySelectorAll('input[type=radio]').forEach(function (refInput) {
        console.log(refInput);
        refInput.disabled = true;
    });

    //enlever bouton valider
    arrQuestions[intNoQuestion - 1].querySelector('.button-validation').remove();

    //si intNoquestion < 3 = bouton 'prochaine question'
    //else = bouton 'afficher résultat'
    if(intNoQuestion<3){
        arrQuestions[intNoQuestion - 1].querySelector('.p-bouton').innerHTML = btnProchaineQuestion;
    } else{
        arrQuestions[intNoQuestion - 1].querySelector('.p-bouton').innerHTML = '<button class="button-validation" type="button">AFFICHER RÉSULTAT</button>';
    }

    
    //écouteur événement
    arrQuestions[intNoQuestion - 1].querySelector('.button-validation:last-child').addEventListener('click', questionSuivante.bind(this));


}

function questionSuivante() {
    arrQuestions[intNoQuestion - 1].classList.add('cache');

    if(intNoQuestion === INT_NB_QUESTIONS){
        afficherResultat();
    }else{
        afficherQuestion(intNoQuestion);
    }
    



}
function afficherResultat() {

    let intPourcentage = 100 / 3 * intNbBonnesReponses;
    
    const refResultat = document.createElement('section');
    refResultat.classList.add('afficherResultat');
    refResultat.innerHTML= '<div class="bkg-resultat"><div class="div-resultat-txt"><h2 class="h2Resultat">RÉSULTAT</h2><p class="p-resultat">'+ Math.round(intPourcentage)+'%</p></div></div>';
    document.querySelector('main').appendChild(refResultat);

    refBtnRedemarrer.innerHTML = '<button class="button-validation" type="button">RECOMMENCER</button>'
    document.querySelector('main').appendChild(refBtnRedemarrer);

    refBtnRedemarrer.querySelector('button').addEventListener('click', cacherResultat);
    refBtnRedemarrer.querySelector('button').addEventListener('click', initialisation);

}

function cacherResultat() {
    document.querySelector('.afficherResultat').classList.add('cache');
    refBtnRedemarrer.classList.add('cache');
    document.querySelector('.button-demarrer').classList.add('cache');
}