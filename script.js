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
    const yearGroup = document.createElement('div');
    const delimiterDiv = document.createElement('div');
    const pageSection = document.createElement('div');
    const totPagesDiv = document.createElement('div');
    const pagesReadDiv = document.createElement('div');
    const completionCont = document.createElement('div');
    const compBarDiv = document.createElement('div');
    

    cell.classList.add('display-cell');
    nameDiv.classList.add('book-name');
    authorDiv.classList.add('author-name');
    yearGroup.classList.add('year-genre-grouping');
    yearDiv.classList.add('year');
    delimiterDiv.classList.add('delimiter');
    genreDiv.classList.add('genre');
    pageSection.classList.add('pages-section');
    totPagesDiv.classList.add('total-pages');
    pagesReadDiv.classList.add('pages-read');
    completionCont.classList.add('completion');
    compBarDiv.classList.add('comp-bar');


    nameDiv.innerText = book.name;
    authorDiv.innerText = book.author;
    yearDiv.innerText = book.year;
    genreDiv.innerText = book.genre;
    delimiterDiv.innerText = "|";
    totPagesDiv.innerText = "Total Pages: " + book.totalPages;
    pagesReadDiv.innerText = "Pages Read: " + book.completedPages;

    cell.append(nameDiv);
    cell.append(authorDiv);

    yearGroup.append(yearDiv);
    yearGroup.append(delimiterDiv);
    yearGroup.append(genreDiv);
    cell.append(yearGroup);

    pageSection.append(totPagesDiv);
    pageSection.append(pagesReadDiv);
    cell.append(pageSection);
    
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
