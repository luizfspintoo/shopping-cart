//inicialzar app (firebase)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-e181c-default-rtdb.firebaseio.com"
}

const app = initializeApp(appSettings);
const database = getDatabase(app)
const shoppingInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field") //campo de adicionar
const addButtonField = document.getElementById("add-button") //botão de adicionar
let shoppingList = document.getElementById("shopping-list") //Minha lista de items

addButtonField.addEventListener("click", function () {
  let inputValue = inputFieldEl.value
  //Insere um item na minha lista e no DB
  push(shoppingInDB, inputValue)
  clear()
})

//Atualiza Lista - Lista todos meus itens do DB através do array com loop(caso não haja mostra uma mensagem que não há items na lista)
onValue(shoppingInDB, function (snaphot) {
  if (snaphot.exists()) {
    let itemsArray = Object.entries(snaphot.val())
    clearList()
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i]
      let currentID = currentItem[0]
      let currentValue = currentItem[1]
      addItemList(currentItem)
    }
  } else {
    shoppingList.innerHTML = "Não há produtos na lista..."
  }
})

function clearList() {
  shoppingList.innerHTML = ""
}

function clear() {
  inputFieldEl.value = ""
}

function addItemList(item) {
  let itemID = item[0]
  let itemValue = item[1]
  //shoppingList.innerHTML += `<li>${items}</li>`
  let newItem = document.createElement("li")
  newItem.textContent = itemValue
  shoppingList.appendChild(newItem)

  newItem.addEventListener("dblclick", function () {
    if (confirm("Deseja excluir este produto?") == true) {
      alert("Item excluido com sucesso!")
      let itemExactInDB = ref(database, `shoppingList/${itemID}`)
      remove(itemExactInDB)
    }
  })
}
