const nomUtilisateur  = document.querySelector('#nomUtilisateur');
const btnLogin        = document.querySelector('#btnLogin');
const btnDéconnextion = document.querySelector('#btnDéconnextion');
const contenuWeb      = document.querySelector('#contenuWeb');
const text            = document.querySelector('#text');
const formulaire      = document.querySelector('#formulaire');

firebase.auth().onAuthStateChanged((user) => { //Définir un observateur d'état d'authentification et obtenir les données utilisateur. 
  if (user) {
    contenuWeb.innerHTML= ''; //pour netoyer dès que l'utilisateur est detecté
    console.log(user)
    actionFermerSession()
    nomUtilisateur.innerHTML = user.displayName; //proprieté de l'objet 'user' (acces avec clg de user)
    chatContenu(user)

  } else {
    actionAcces()
    nomUtilisateur.innerHTML = 'I-Chat';
  }
});

const chatContenu = (user)=> {
  formulaire.addEventListener('submit', (e) =>{
    e.preventDefault();
    let contenu = text.value.trim() //trim elimine les espaces vides
    console.log(contenu) //on lit ce qu'utilisateur a ecrit dans l'input
    if(contenu == ''){  // s'il n'a rien ecrit on sort de la fonction (return)
      console.log('text vide');      
      return 
    }
    firebase.firestore().collection('chat').add({ // sinon on crée un objet pour garder ce qu'il a ecrit en 'chat'
      text: text.value, //on garde le texte
      uid : user.uid,   //on garde l'id du client qui vient de l'objet 'user'
      date: Date.now()  //object date de js
    }).then(res => {  // on a besoin d'une reponse donc on utilise then
      console.log('texto agregado a firestore') // on verifie si tout est OK, si c'est ajouté a firestore 
    })
    
    text.value = ''; 

  })

  firebase.firestore().collection("chat").orderBy('date')  // pour capter en temp reelle les chats
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") { //quand on ecrit
                console.log("Ajoute chat: ", change.doc.data());
            }
              if(user.uid === change.doc.data().uid)//si l'info qui vient de notre base de donnés est égal à l'utilisateur enregistré 
              { 
                contenuWeb.innerHTML += //on ajoute cet element html au côté droit (text-end)
                `<div class="text-end"><span class="badge bg-primary">${change.doc.data().text}</span></div>`
              } else {
                contenuWeb.innerHTML += //on ajoute cet element html au côté gauche (text-start)
                `<div class="text-start"><span class="badge bg-secondary">${change.doc.data().text}</span></div>`
              }

              contenuWeb.scrollTop = contenuWeb.scrollHeight //pour controler l'hauteur de notre scroll et bouger l'ecran en accord les mmessages 


            if (change.type === "modified") {
                console.log("Modifie chat: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Elimine chat: ", change.doc.data());
            }
        });
    });

}

const actionAcces = ()=> {
  formulaire.classList.add('d-none'); 
  contenuWeb.innerHTML = `<p class="lead px-3 text-center text-warning bg-black d-inline-flex">Initialiser session</p>`

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


