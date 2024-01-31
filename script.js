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

// Selecting the input field for the title
const title = document.querySelector("#title");
// Selecting the input field for the author
const author = document.querySelector("#author")
// Selecting the input field for the number of pages
const page = document.querySelector("#pages");
// Selecting the checkbox for indicating if the book has been read
const isRead = document.querySelector("#isRead");

// Adding an event listener for the form submission
addBookFrom.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission for now

    // Retrieve form values
    const titleValue = title.value.trim();
    const authorValue = author.value.trim();
    const pagesValue = +page.value; // Convert to integer
    const result = isRead.checked ? 'Read' : 'Not Read';
    
    // Check if form data is valid
    if (titleValue.trueLength() === 0 || authorValue.trueLength() === 0 || isNaN(pagesValue)) {
        alert("Please fill in all fields correctly!");
    } else {
        // Call addBookToLibrary function with form values
        // addBookToLibrary(titleValue, authorValue, pagesValue, result);
        
        // If all inputs are valid, close the popup
        addBookModule.classList.remove("active-module");
    }
});

// Define a custom method 'trueLength' on the String prototype
String.prototype.trueLength = function(){
    // Trim the string to remove leading and trailing whitespace
    // Return the length of the trimmed string
    return this.trim().length;
}
