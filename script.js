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
        addBookToLibrary(titleValue, authorValue, pagesValue, result);
        
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

const myLibrary = []; // Array to store the book objects

// Book constructor function to create book objects
function Book(title, author, pages, result) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = result;
}

let newBook; // Variable to store the newly created book object

// Function to add a book to the library
function addBookToLibrary(title, author, pages, result) {
    // Check if there's already a book with the same title (case-insensitive)
    const isDuplicate = myLibrary.some(item => item.title.toLowerCase() === title.toLowerCase());

    if (isDuplicate) {
        // Display an alert if a book with the same title already exists
        alert("A book with this title already exists.");
        return; // Exit the function to prevent duplicate addition
    }

    // Create a new Book object with the provided information
    newBook = new Book(title, author, pages, result);
    // Add the new book object to the library array
    myLibrary.push(newBook);
    // Call the function to create a card for the new book
    createCardBook();
}

const bookGrid = document.querySelector("#bookGrid");

// Function to create a new card for a book
function createCardBook() {
    // Create DOM elements for the card components
    const div = document.createElement("div");
    const titleName = document.createElement("p");
    const authorName = document.createElement("p");
    const numberPage = document.createElement("p");
    const btnGroup = document.createElement("div");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    // Set attributes and classes for the elements
    div.setAttribute("class", "book-card");
    btnGroup.setAttribute("class", "button-group");
    readBtn.setAttribute("id", "readBtn");
    removeBtn.setAttribute("id", "removeBtn");
    removeBtn.classList.add("btn");

    // Add specific class based on the read status of the book
    if (newBook["read"] === "Not Read") {
        readBtn.classList.add("btn-light-red");
    }
    readBtn.classList.add("btn", "btn-light-green");

    // Set text content for the elements
    titleName.textContent = newBook["title"];
    authorName.textContent = newBook["author"];
    numberPage.textContent = newBook["pages"];
    readBtn.textContent = newBook["read"];
    removeBtn.textContent = "Remove";

    // Append elements to the DOM
    bookGrid.appendChild(div);
    div.appendChild(titleName);
    div.appendChild(authorName);
    div.appendChild(numberPage);
    div.appendChild(btnGroup);
    btnGroup.appendChild(readBtn);
    btnGroup.appendChild(removeBtn);

    // Add event listeners for buttons
    readBtn.addEventListener("click", () => {
        readOptionChange(readBtn);
    });
    removeBtn.addEventListener("click", () => {
        removeBookCard(removeBtn);
    });
}

/**
 * Function to toggle the read status of a book and update the button style and text accordingly.
 * @param {HTMLButtonElement} readBtn - The button element representing the read status.
 */
function readOptionChange(readBtn) {
    // Check if the button has the class indicating it's currently marked as "Read"
    if (readBtn.classList.contains("btn-light-green")) {
        // Replace the class to switch to "Not Read" style
        readBtn.classList.replace("btn-light-green", "btn-light-red");
        // Update the button text to reflect the change
        readBtn.textContent = "Not Read";
    } else {
        // Replace the class to switch to "Read" style
        readBtn.classList.replace("btn-light-red", "btn-light-green");
        // Update the button text to reflect the change
        readBtn.textContent = "Read";
    }
}

/**
 * Function to remove the book card from the DOM when the remove button is clicked.
 * @param {HTMLButtonElement} removeBtn - The button element triggering the removal of the card.
 */
function removeBookCard(removeBtn) {
    // Find the parent element of the remove button, which is the button group, and then navigate up to the book card
    const cardToRemove = removeBtn.parentElement.parentElement;
    
    // Remove the book card from the DOM
    cardToRemove.remove();
}
