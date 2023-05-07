import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://playground-65099-default-rtdb.firebaseio.com/"
} 

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shopppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonField = document.getElementById("add-button")

addButtonField.addEventListener("click", function(){
  let inputValue = inputFieldEl
  push(shopppingListInDB, inputValue)
  console.log(inputValue)
})
