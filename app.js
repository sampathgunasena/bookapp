// Book classs: represents a book
class Book {
    constructor (title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


//UI class: handle UI tasks
class UI {
    static displayBooks () {
        /* const storedBooks = [
            {
                title: "Book One",
                author: "Author One",
                isbn: "111111"
            },
            {
                title: "Book Two",
                author: "Author Two",
                isbn: "222222"
            }
        ]; */

        const books = Store.getBooks();
        //const books = storedBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList (book) {
        const list = document.querySelector("#book-list"); //=========================
        const row = document.createElement("tr"); //======================================

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row); //==================================
    }

    static deleteBook (el) {
        if (el.classList.contains("delete")) { //=================================
            el.parentElement.parentElement.remove(); //============================================
        };
    }

    static showAlert (message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        //div.innerText = message;

        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        container.insertBefore(div, form);

        //Vanish in 3 secs.
        setTimeout (() => document.querySelector(".alert").remove(), 3000);
    }
 
    static clearFields () {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    };
}


//Store class: handles storage
class Store {
    static getBooks ()  {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books; 
    }

    static addBook (book) {
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem("books", JSON.stringify(books));
    }

    static removeBook (isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}

//Event: display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    //get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    if  (title === "" || author === "" || isbn === "") {
        UI.showAlert ("Please fill in all fields", "danger");
    } else {
        //Instantiate book
        const book = new Book(title, author, isbn);

        //Add book to UI
        UI.addBookToList(book);

        //Add book to store 
        Store.addBook(book);

        //Clear fields
        UI.clearFields();

        UI.showAlert ("Book added", "success");
    }

    
});

//Event: remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
    //REmove book from UI
    UI.deleteBook(e.target); //=================================================
    UI.showAlert ("Book deleted", "success");

    //Remove book from store
    SourceBuffer.removeBook(e.target.parentElement.previousElementSibling.textContent);
});