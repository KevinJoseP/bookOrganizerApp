const myLibrary = [];


function Book(name, author, genre, year, totPages, complPages) 
{
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.year = year;
    this.totalPages = totPages;
    this.completedPages = complPages;
}

function addBookToLibrary(book) 
{

}

const bookWidget = document.getElementById('book-widget-cont-overlay');


function handleAdd(e)
{
    bookWidget.style.display = "flex";
}

function closeWindow(e)
{
    bookWidget.style.display = "none";
    console.log(myLibrary);
}


const bookName = document.getElementById('book-name');
const authorName = document.getElementById('author-name');
const genre = document.getElementById('genre-name');
const yearOfPublication = document.getElementById('year');
const totPages = document.getElementById('totPages');
const readPages = document.getElementById('readPages');
const error = document.getElementById('error');
const displayDiv = document.getElementById('display-grid');

function clearFields()
{
    bookName.value = "";
    authorName.value = "";
    genre.value = "";
    yearOfPublication.value = "";
    totPages.value = "";
    readPages.value = "";
    error.innerText = "";
}

function displayElem(book)
{
    const cell = document.createElement('div');
    const nameDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const yearDiv = document.createElement('div');
    const genreDiv = document.createElement('div');
    nameDiv.innerText = book.name;
    cell.append(nameDiv);
    cell.classList.add('display-cell');
    displayDiv.append(cell);

}

function displayLibrary()
{
    displayDiv.innerHTML ='';
    let i = 0;
    while ( i < myLibrary.length)
    {
        displayElem(myLibrary[i]);
    }
}


function handleForm(e)
{
    e.preventDefault();
    let errorMessages = [];

    if (Number(readPages.value) > Number(totPages.value))
    {
        errorMessages.push("Read pages cannot be greater than total number of pages");
        console.log(readPages);
    }
    if (errorMessages.length > 0)
    {
        e.preventDefault(); 
        error.innerText = errorMessages[0];
    }
    else
    {
        const book = new Book(bookName.value,
                            authorName.value,
                            genre.value,
                            yearOfPublication.value,
                            totPages.value,
                            readPages.value);
        console.log(book);
        myLibrary.push(book);
        clearFields();
        displayElem(book);
    }
}


const btn = document.getElementById('add-book');
btn.addEventListener('click', handleAdd);

const closebtn = document.getElementById('close-btn');
closebtn.addEventListener('click', closeWindow);

const form = document.getElementById('form');
form.addEventListener('submit', handleForm);
