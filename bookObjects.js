const booksWrapper = document.getElementById("books-wrapper");
const newBookButton = document.getElementById("new-book");
const updateButtons = document.querySelectorAll(".update");

let myLibrary = [new Book("hee", "haw", '4234', true)]

function Book(title = "", author = "", pages = 0, haveRead = false){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = haveRead;
}

//Add book to library
function addBookToLibrary() {
    let title = prompt("What is the title of the book?");
    let author = prompt("What is the name of the author?");
    let pages = prompt("How many pages are in the book?");
    let hasRead = undefined;
    while (hasRead === undefined){
        let read = prompt("Have you read this book? (y/n)");
        if (read === 'y'){
            hasRead = true;
            break;
        }else if (read === 'n'){
            hasRead = false;
            break;
        }
    }

    const newBook = new Book(title, author, pages, hasRead);
    
    myLibrary.push(newBook);

    updateDOM();
}


//Update the DOM
function updateDOM(){
    //Remove all books 
    while (booksWrapper.lastChild){
        booksWrapper.removeChild(booksWrapper.lastChild)
    }
    //create all books again
    let index = 0;
    myLibrary.map(book => {
        //Create book wrapper
        let bookWrapperDiv = document.createElement('div');
        bookWrapperDiv.classList.add('book-wrapper');
        bookWrapperDiv.dataset.index = index
        booksWrapper.appendChild(bookWrapperDiv);

        //add book to div
        const title = document.createElement('h2');
        title.textContent = "Title: " + book.title;
        title.classList.add('book-title');
        bookWrapperDiv.appendChild(title);

        const author = document.createElement('h2');
        author.textContent = "Author: " + book.author;
        author.classList.add('book-author');
        bookWrapperDiv.appendChild(author);
        
        const pages = document.createElement('h2');
        pages.textContent = "Pages: " + book.pages;
        pages.classList.add('book-pages');
        bookWrapperDiv.appendChild(pages);

        //Remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remove";
        bookWrapperDiv.appendChild(removeButton);

        removeButton.addEventListener('click', () => {
            bookWrapperDiv.remove();
            myLibrary.splice(removeButton.parentElement.dataset.index, 1);
        })

        //Read Status Button
        let readStatusText = function() {
            if (book.read){
                return "Read";
            } else {
                return "Not Read"
            }
        }
        const readStatusButton = document.createElement('button');
        readStatusButton.classList.add('read-status-button');
        readStatusButton.textContent = readStatusText();
        bookWrapperDiv.appendChild(readStatusButton);

        readStatusButton.addEventListener('click', () => {
            book.read = !book.read;
            updateDOM();
        })
        

        index += 1
    })
    
}

newBookButton.addEventListener('click', () => {
    addBookToLibrary();
})
updateDOM();