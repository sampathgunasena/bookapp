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
        const storedBooks = [
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
        ];

        const books = storedBooks;

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList (book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);
    }
}


//Store class: handles storage

//Event: display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    //get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //Instantiate book
    const book = new Book(title, author, isbn);
    console.log(book);
});

//Event: remove a book