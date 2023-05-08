//inicialzar app (firebase)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
  
const appSettings = {
  databaseURL: "https://realtime-database-e181c-default-rtdb.firebaseio.com"
}

const app = initializeApp(appSettings);
const database = getDatabase(app)
const shoppingInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field") //campo de adicionar
const addButtonField = document.getElementById("add-button") //botão de adicionar
let shoppingList = document.getElementById("shopping-list") //Minha lista de items

addButtonField.addEventListener("click", function(){
  let inputValue = inputFieldEl.value
  //Insere um item na minha lista e no DB
  push(shoppingInDB, inputValue) 
  clear()
})

//Atualiza Lista - Lista todos meus itens do DB através do array com loop
onValue(shoppingInDB, function(snaphot){
  let itemsArray = Object.values(snaphot.val())
    clearList()
    for(let i = 0; i < itemsArray.length; i++){
      addItemList(itemsArray[i])
    }
})

function clearList(){
  shoppingList.innerHTML = ""
}

function clear(){
  inputFieldEl.value = ""
}

function addItemList(items) {
  shoppingList.innerHTML += `<li>${items}</li>`
}
