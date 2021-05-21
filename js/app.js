const nomUtilisateur  = document.querySelector('#nomUtilisateur');
const btnLogin        = document.querySelector('#btnLogin');
const btnDéconnextion = document.querySelector('#btnDéconnextion');
const contenuWeb      = document.querySelector('#bcontenuWeb');
const text            = document.querySelector('#text');
const formulaire      = document.querySelector('#formulaire');



firebase.auth().onAuthStateChanged((user) => { //Définir un observateur d'état d'authentification et obtenir les données utilisateur. 
  if (user) {
    actionFermerSession()
  } else {
    actionAcces()
  }
});

const actionFermerSession = ()=> {

  }

const actionAcces = ()=> {
  
}
