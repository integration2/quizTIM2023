// Ceci es un essaie, je l'ai laisse au cas ou je voudrais retravailler dessus

const objJSON = {
  retroactions: {
    positive: "Bravo, c’est une bonne réponse !",
    negative: "Désolé, ce n’est pas la bonne réponse",
  },
  explications: {
    q1: "King of the Hill est une sitcom animée américaine créée par Mike Judge et Greg Daniels pour la Fox Broadcasting Company.La série a été initialement diffusée du 12 janvier 1997 au 6 mai 2010 et se concentre sur les collines, une famille américaine dans la ville fictive d'Arlen, au Texas, ainsi que leurs voisins, collègues, parents, camarades de classe, amis, et connaissances.",
    q2: "Explications de la question 2",
    q3: "Explications de la question 3",
  },
  bonnesReponses: ["Q1A", "Q2D", "Q3B"],
  messages: {
    resultatsDebut: "Vous avez obtenu un résultat de",
    note0: "Vous auriez pu faire mieux. Je vous suggère ..",
    note33: "Vous auriez pu faire mieux. Je vous suggère ..",
    note66: "Bravo, vous avez une bonne connaissance générale de ...",
    note100: "Félicitations, vous êtes un fin connaisseur !",
  },
};

//compteur de reponse
let nbrBonneReponse = 0;

//eventlister pour valider reponse
const btnValiderReponse1 = document.getElementById("btnValiderReponse1");
const btnValiderReponse2 = document.getElementById("btnValiderReponse2");
const btnValiderReponse3 = document.getElementById("btnValiderReponse3");
btnValiderReponse1.addEventListener("click", validerReponse);
btnValiderReponse2.addEventListener("click", validerReponse);
btnValiderReponse3.addEventListener("click", validerReponse);

//prog du btnCommencer, il affichera la question 1
const btnCommencerQuiz = document.getElementById("btnCommencerQuiz");
btnCommencerQuiz.addEventListener("click", commencerQuiz);

function commencerQuiz() {
  //changement du display de flex a none, dans ce cas ci
  // la classe "cacher" entre en conflit avec le dflex.
  const accueil = document.querySelector(".accueil");
  accueil.style.display = "none";

  //Enleve les classes "cacher" des img en bordure
  const backgroundCote = document.querySelector(".background-cote");
  backgroundCote.classList.remove("cacher");

  const form = document.querySelector(".form");
  form.classList.remove("cacher");

  const q1 = document.querySelector(".q1");
  q1.classList.remove("cacher");
}

function validerBtnRadio() {
  for (let i = 0; i <= 3; i++) {
    let btnValiderReponse = document.getElementById(`btnValiderReponse${i}`);
    const radios = document.querySelectorAll(`input[name="reponse-q${i}"]`);

    let checked = false;
    for (const radio of radios) {
      if (radio.checked) {
        checked = true;
        break;
      }
    }

    if (checked) {
      btnValiderReponse.disabled = false;
      btnValiderReponse.classList.add("btn");
      btnValiderReponse.classList.remove("btnDisabled");
    }
  }
}

function validerReponse() {
  const options = document.querySelectorAll('input[name="reponse-q1"]');
  console.log(options);
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      const reponse = options[i].nextElementSibling.getAttribute("data-reponse");

      if (reponse === "correct") {
        document.getElementById("q1").classList.add("cacher");
        document.getElementById("correction").classList.remove("cacher");
        nbrBonneReponse++;
        return true;
      } else {
        document.getElementById("q1").classList.add("cacher");
        return false;
      }
    }
  }
}
console.log(nbrBonneReponse);
