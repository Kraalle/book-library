/*
1. page opens up with title new book option
2. clicking add book brings up add title, author, pages, read
3. When all text is filled, I need input values to be grabbed, turned into and object, then added to library
4. Once added to library I need to display values in a table
*/


const myLibrary = [];
let nextBookId = 1;

// Button event listeners
const newBtn = document.querySelector("#newBtn");
newBtn.addEventListener('click', () => {
    popUpForm.style.display = 'block';
    const table = document.querySelector('#libraryTable')
    table.style.display = 'none';
});

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    createBook();
    const table = document.querySelector('#libraryTable')
    table.style.display = 'block';
});


const popUpForm = document.querySelector('#popUpForm');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = (read === true) ? 'read' : 'not read';
    this.id = nextBookId++;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}. ${this.id}`
    };
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    addBookToTable(book);
};

function createBook() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = toggleRead();
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    clearInputs();
    popUpForm.style.display = 'none';
};

function toggleRead() {
    let isRead = false;
    const readCheckbox = document.querySelector('#read');
    isRead = readCheckbox.checked;
    return isRead;
};

function clearInputs() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
};

function addBookToTable(book) {
    const table = document.querySelector('#libraryTable');
    const newRow = table.insertRow();

    const titleCell = newRow.insertCell(0);
    const authorCell = newRow.insertCell(1);
    const pagesCell = newRow.insertCell(2);
    const readCell = newRow.insertCell(3);
    
    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    readCell.textContent = book.read;


};