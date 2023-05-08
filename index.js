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
  push(shoppingInDB, inputValue) //insert
  addItemList(inputValue)
  clear()
})

//Update realtime
onValue(shoppingInDB, function(snaphot){
  let itemsListDB = Object.values(snaphot.val())

  // for(let i = 0; i < itemsListDB.length; i++){
  //   //console.log(itemsListDB[i])
  // }
})

function clear(){
  inputFieldEl.value = ""
}

function addItemList(items) {
  shoppingList.innerHTML += `<li>${items}</li>`
}
