const myLibrary = [];
let nextBookId = 0;

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

const cancelBtn = document.querySelector('#cancelBtn');
cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const table = document.querySelector('#libraryTable');
    popUpForm.style.display = 'none';
    table.style.display = 'block';
    clearInputs();

});

const popUpForm = document.querySelector('#popUpForm');

// book class
class Book {
    constructor(title, author, pages, read) {
        console.log('using class inistead of function');
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = (read === true) ? 'read' : 'not read';
        this.id = nextBookId++;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}. ${this.id}`;
    }

}

// adds book object values to myLibrary array and to table
function addBookToLibrary(book) {
    myLibrary.push(book);
    addBookToTable(book);
};

// creates new Book object
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

// checks true or false value if read checkbox has been clicked
function toggleRead() {
    let isRead = false;
    const readCheckbox = document.querySelector('#read');
    isRead = readCheckbox.checked;
    return isRead;
};

// clear all user inputs in pop-up form once add button has been clicked
function clearInputs() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
};

// creates table rows and adds book values to table
function addBookToTable(book) {
    const table = document.querySelector('#libraryTable');
    const newRow = table.insertRow();

    const titleCell = newRow.insertCell(0);
    const authorCell = newRow.insertCell(1);
    const pagesCell = newRow.insertCell(2);
    const readCell = newRow.insertCell(3);
    const removeCell = newRow.insertCell(4);
    const readBtnCell = newRow.insertCell(5);

    const readBtn = readButton(book);
    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    readCell.textContent = book.read;
    removeCell.appendChild(removeButton(book.id));
    readBtnCell.appendChild(readBtn);
};

//fetches remove button id and removes book based on array position
function removeBook(removeBtn) {
    const bookId = parseInt(removeBtn.getAttribute('data-book-id'));
    const indexToRemove = myLibrary.findIndex(book => book.id === bookId);
    if (indexToRemove !== -1) {
        myLibrary.splice(indexToRemove, 1);
        updateTable();
    }
};

// creates remove book button for each book in table and attaches the array position as id to remove button
function removeButton(bookId) {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove book';
    removeBtn.setAttribute('data-book-id', bookId);
    removeBtn.addEventListener('click', () => removeBook(removeBtn));
    return removeBtn;
};

// deletes all rows and reads books
function updateTable() {
    const table = document.querySelector('#libraryTable');
    const rowCount = table.rows.length;
    for (let i = rowCount - 1; i >= 0; i--) {
        table.deleteRow(i);
    }

    for (let book of myLibrary) {
        addBookToTable(book);
    }
};

// adds clickable read book button to table if user decides they have read book after inputting book
function readButton(book) {
    const readBtn = document.createElement('button');
    if (book.read === 'not read') {
        readBtn.textContent = 'Read book';
    } else {
        readBtn.textContent = 'Unread book';
    }
    readBtn.setAttribute('read-button-id', book.id);
    readBtn.addEventListener('click', () => readBook(readBtn));
    return readBtn;
}

function readBook(readBtn) {
    const bookId = readBtn.getAttribute('read-button-id');
    if (myLibrary[bookId].read === 'read') {
        myLibrary[bookId].read = 'not read';
    } else if (myLibrary[bookId].read === 'not read') {
        myLibrary[bookId].read = 'read';
    }
    updateTable();
}