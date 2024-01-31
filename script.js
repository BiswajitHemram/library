// date object footer copywrite
const copyrightDate = document.querySelector("#copyrightDate")
const date = new Date()
const year = date.getFullYear()
copyrightDate.textContent = year

// pop up from to add book
const addBookbtn = document.querySelector("#addBook")
const addBookModule = document.querySelector("#addBookModule")
const addBookFrom = document.querySelector("#addBookFrom")

addBookbtn.addEventListener("click", function(){
    addBookModule.classList.add("active-module")
})

addBookFrom.addEventListener("click", function(e) {
    // Prevent click events inside addBookFrom from reaching addBookModule
    e.stopPropagation();
});

addBookModule.addEventListener("click", function() {
    addBookModule.classList.remove("active-module");
});

// from input 
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const page = document.querySelector("pages");
const isRead = document.querySelector("#isRead");
let result;
isRead.addEventListener("change",function(){
    const isChecked = this.checked;
    result = isChecked ? 'on' : 'off';
})

addBookFrom.addEventListener("submit",function(event){
    if(title.value.trueLength() === 0 || author.value.trueLength() === 0){
        alert("Please write in Correct formate!");
        event.preventDefault();
    } else{
        // If all inputs are valid, close the popup
        addBookModule.classList.remove("active-module");
        event.preventDefault();
    }
});
// to check correct length of string
String.prototype.trueLength = function(){
    return this.trim().length
}