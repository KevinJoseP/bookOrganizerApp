const myLibrary = {};


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
    // console.log(myLibrary);
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

function handleRemove(e)
{
    let dataKey = this.dataset.removeKey;

    const cells = document.querySelectorAll(`[data-key="${dataKey}"]`);

    if (cells.length == 1)
    {
        cells[0].remove();
    }
    
    delete(myLibrary[dataKey]);
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
    const delimiterDiv2 = document.createElement('div');
    const pageSection = document.createElement('div');
    const pageOrg = document.createElement('div');
    const totPagesDiv = document.createElement('div');
    const pagesReadDiv = document.createElement('div');
    const completionCont = document.createElement('div');
    const compBarBeforeDiv = document.createElement('div');
    const compBarDiv = document.createElement('div');
    const removeButt = document.createElement('button');
    const removeImg = document.createElement('img');
    const pageInput = document.createElement('input');
    
    cell.dataset.key = book.name.toUpperCase();
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
    compBarBeforeDiv.classList.add('comp-bar-before');
    compBarBeforeDiv.dataset.statusKey = book.name.toUpperCase();
    removeButt.classList.add('remove');
    removeButt.dataset.removeKey = book.name.toUpperCase();
    removeImg.classList.add('delete-icon');
    pageOrg.classList.add('page-organize');
    delimiterDiv2.classList.add('delimiter');
    removeImg.src = "./dustbin.svg";
    removeImg.alt = "delete icon";
    pageInput.classList.add('read-input');
    pageInput.type = "number";
    pageInput.value = book.completedPages;
    pageInput.dataset.inputKey = book.name.toUpperCase();
    pageInput.addEventListener('change', handleInputChange);


    nameDiv.innerText = book.name.toUpperCase();
    authorDiv.innerText = book.author;
    yearDiv.innerText = book.year;
    genreDiv.innerText = book.genre;
    delimiterDiv.innerText = "|";

    const pageText = document.createTextNode("Pages Read: ");
    delimiterDiv2.innerText = "|";
    totPagesDiv.innerText = "Total Pages: " + book.totalPages;
    pagesReadDiv.append(pageText);
    pagesReadDiv.append(pageInput);

    cell.append(nameDiv);
    cell.append(authorDiv);

    yearGroup.append(yearDiv);
    yearGroup.append(delimiterDiv);
    yearGroup.append(genreDiv);
    cell.append(yearGroup);

    pageOrg.append(totPagesDiv);
    pageOrg.append(delimiterDiv2);
    pageOrg.append(pagesReadDiv);

    pageSection.append(pageOrg);

    let percentCompletion = (Number(book.completedPages) / Number(book.totalPages))*100;
    // console.log(percentCompletion);
    compBarBeforeDiv.style.width = percentCompletion + "%";

    if(percentCompletion == 100)
    {
        compBarBeforeDiv.style.backgroundColor = "#00FF00"; 
    }

    completionCont.append(compBarBeforeDiv);
    completionCont.append(compBarDiv);
    pageSection.append(completionCont);
    cell.append(pageSection);

    removeButt.addEventListener('click', handleRemove);
    removeButt.append(removeImg);
    cell.append(removeButt);


    
    displayDiv.append(cell);

}

function displayLibrary()
{
    displayDiv.innerHTML ='';

    for(const key of Object.keys(myLibrary))
    {
        displayElem(myLibrary[key]);
    }
}


function handleForm(e)
{
    e.preventDefault();
    let errorMessages = [];

    if (Number(readPages.value) > Number(totPages.value))
    {
        errorMessages.push("Read pages cannot be greater than total number of pages");
        // console.log(readPages);
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
        // console.log(book);
        myLibrary[book.name.toUpperCase()] = book;
        clearFields();
        displayElem(book);
    }
}

function handleInputChange(e)
{
    console.log(e);
    let dataKey = this.dataset.inputKey;

    let lbook = myLibrary[dataKey];
    console.log(lbook);
    lbook.completedPages = this.value;
    

    const statusBar = document.querySelectorAll(`[data-status-key="${dataKey}"]`);
    if (statusBar.length == 1)
    {
        
        let percentCompletion = (Number(lbook.completedPages) / Number(lbook.totalPages))*100;
        statusBar[0].style.width = percentCompletion + "%";
    }
}


const btn = document.getElementById('add-book');
btn.addEventListener('click', handleAdd);

const closebtn = document.getElementById('close-btn');
closebtn.addEventListener('click', closeWindow);

const form = document.getElementById('form');
form.addEventListener('submit', handleForm);

const pageInputs = document.querySelectorAll('.read-input');
pageInputs.forEach(page => page.addEventListener('change', handleInputChange));

const btns = document.querySelectorAll('.remove');
btns.forEach(btn => btn.addEventListener('click', handleRemove))