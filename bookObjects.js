const booksWrapper = document.getElementById("books-wrapper");
const updateButtons = document.querySelectorAll(".update");

const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const readInput = document.getElementById("read");
const submitButton = document.getElementById("submit-button");

class Book {
    constructor(title = "", author = "", pages = 0, haveRead = false){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = haveRead;
    }
    
}

let myLibrary = [new Book("hee", "haw", '4234', true), new Book("The Hobbit", "J.R.R. Tolkien", 421, true), new Book("The Lord of the Rings: The Fellowship of the Ring", "J.R.R. Tolkien", 637, true)]



//Add book to library
function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookHasBeenRead) {
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = bookPages.value;
    let hasRead = bookHasBeenRead.value;
    let read;

    if (hasRead === "haveRead"){
        read = true;
    }else{
        read = false;
    }

    const newBook = new Book(title, author, pages, read);
    
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
        const bookWrapperDiv = document.createElement('div');
        bookWrapperDiv.classList.add('book-wrapper');
        bookWrapperDiv.dataset.index = index
        booksWrapper.appendChild(bookWrapperDiv);

        


        //add book to div
        const title = document.createElement('div');
        title.textContent = book.title;
        title.classList.add('book-title');
        bookWrapperDiv.appendChild(title);

        const author = document.createElement('div');
        author.textContent = "Author: " + book.author;
        author.classList.add('book-author');
        bookWrapperDiv.appendChild(author);
        
        const pages = document.createElement('div');
        pages.textContent = "Pages: " + book.pages;
        pages.classList.add('book-pages');
        bookWrapperDiv.appendChild(pages);

        //Buttons Wrapper
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons-wrapper');
        bookWrapperDiv.appendChild(buttonsDiv);

        //Remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remove";
        buttonsDiv.appendChild(removeButton);

        removeButton.addEventListener('click', () => {
            bookWrapperDiv.remove();
            myLibrary.splice(removeButton.parentElement.parentElement.dataset.index, 1);
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
        buttonsDiv.appendChild(readStatusButton);

        readStatusButton.addEventListener('click', () => {
            book.read = !book.read;
            updateDOM();
        })
        

        index += 1
    })
    
}



submitButton.addEventListener("click", () => {
    if (titleInput.value && authorInput.value && pagesInput.value){
        addBookToLibrary(titleInput, authorInput, pagesInput, readInput);
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        readInput.value = "haveRead";
    }
})
updateDOM();