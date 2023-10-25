//Variabler
let newTodoEl = document.getElementById("newtodo");
let newTodoButtonEl = document.getElementById("newtodobutton");
let messageEl = document.getElementById("message");
let todoListEl = document.getElementById("todolist");
let clearButtonEl = document.getElementById("clearbutton");
let i; //variabel för for loop
//Händelsehanterare
newTodoEl.addEventListener("keyup", checkInput, false);
newTodoButtonEl.addEventListener("click", addItem, false);
clearButtonEl.addEventListener("click", clearStorage, false);
window.onload = init;
//start funktion när sidan laddas
function init() {
    //inaktivera lägg till knappen
    newTodoButtonEl.disabled = true;
    //laddar in sparat listan
    loadStorage(); 
}
//kontrollera det som skrivs i text ruta
function checkInput() {
    let input = newTodoEl.value;
    //kontrollerar antal bokstäver som skrivs in med hjälp av loop
    if (input.length > 4) {
        messageEl.innerHTML = "";
        newTodoButtonEl.disabled = false;
    } else {
        messageEl.innerHTML = "måste innehålla minst 5 tecken!";
        newTodoButtonEl.disabled = true;
    }
}
//lägga till sak i att göra lista
function addItem() {
    //skapar nytt article element av den text som skrivs in
    let input = newTodoEl.value;
    let newEl = document.createElement("article")
    let newTextNode = document.createTextNode(input);
    newEl.appendChild(newTextNode);
    newEl.className = "item";
    //lägger till i listan
    todoListEl.appendChild(newEl);
    //lägger till klickhanterare som tar bort det man klickar på i detta element.
    newEl.addEventListener("click", function (e) {
        e.target.remove();
    });
    //raderar inputfält efter att det lagts till och gör så att det inte går att klicka på knappen och lägga till tomt fält
    newTodoEl.value = "";
    newTodoButtonEl.disabled = true;
    //anropar lagring
    saveItem();
}
//spara att göra listan 
function saveItem() {
    //läs in att göra listan
    let items = document.getElementsByClassName("item");
    //skapa en array
    let tempArr = [];
    //loopa igenom listan och sparar till temporär array
    for (i = 0; i < items.length; i++) {
        tempArr.push(items[i].innerHTML);
    }
    //konverterar array till JSON-sträng
    let jsonStr = JSON.stringify(tempArr);
    //lagrar i webbstorage som textsträng
    localStorage.setItem("items", jsonStr);
}
//läs in att göra lista
function loadStorage() {
    //läs in från webbstorage och konvertera jSON till array
    let items = JSON.parse(localStorage.getItem("items"));
    //loopa igenoom array
    for (i = 0; i < items.length; i++) {
        //skapar nytt article element av den text som skrivs in
        let newEl = document.createElement("article")
        let newTextNode = document.createTextNode(items[i]);
        newEl.appendChild(newTextNode);
        newEl.className = "item";
        //lägger till i listan
        todoListEl.appendChild(newEl);
        //klickhanterare som tar bort det man klickar på från webbstorage 
        newEl.addEventListener("click", function (e) {
            e.target.remove();
            //lagra listan på nytt utan det borttagna element
            saveItem();
            //uppdaterar array i localstorage utan borttagna element
            localStorage.removeItem("item");
        });
    }
}
//rensa lista med knapp
function clearStorage() {
    localStorage.clear();
    todoListEl.innerHTML = '';
}
