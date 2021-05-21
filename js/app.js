const nomUtilisateur  = document.querySelector('#nomUtilisateur');
const btnLogin        = document.querySelector('#btnLogin');
const btnDéconnextion = document.querySelector('#btnDéconnextion');
const contenuWeb      = document.querySelector('#contenuWeb');
const text            = document.querySelector('#text');
const formulaire      = document.querySelector('#formulaire');



firebase.auth().onAuthStateChanged((user) => { //Définir un observateur d'état d'authentification et obtenir les données utilisateur. 
  if (user) {
    console.log(user)
    actionFermerSession()
    nomUtilisateur.innerHTML = user.displayName; //proprieté de l'objet 'user'
    chatContenu(user)

  } else {
    actionAcces()
    nomUtilisateur.innerHTML = 'I-Chat';
  }
});

const chatContenu = (user)=> {
  formulaire.addEventListener('submit', (e) =>{
    e.preventDefault();
    
  })
}

const actionAcces = ()=> {
  formulaire.classList.add('d-none'); 
  contenuWeb.innerHTML = `<p class="lead mt-5 text-center">Initialiser session</p>`

  btnLogin.addEventListener('click', async()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider)
    } catch (error) {
      console.log(error)
      
    }
  })
}

const actionFermerSession = ()=> {
  formulaire.classList.remove('d-none'); 
  btnDéconnextion.addEventListener('click', ()=>{
    firebase.auth().signOut()
  })


  }


