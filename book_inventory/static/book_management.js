"use strict";

// Function to navigate to add book screen
const launchAddScreen = () => {
	window.location.href = "/addScreen"
}

// Function to navigate to home screen
const launchHomeScreen = () => {
	window.location.href = "/"
}

// Navigate to update book screen
const launchUpdateScreen = () =>{
	window.location.href = "/updateScreen"
}

// Navigate to Search screen

const launchSearchScreen = () =>{
	window.location.href = "/searchScreen"
}

// Function to save data entered by user for add book pageX
const addBookData = () =>{
	const btitle = document.getElementById("book_title").value
	const aname = document.getElementById("author_name").value
	
	// reading existing books data
	const books = JSON.parse(sessionStorage.getItem("books") || "[]");
	
	// adding the current book details
	const newBookData = {
		id: books.length +1,
		title: btitle,
		author: aname
	};
	
	// appending the new book details to existing data 
	books.push(newBookData);
	sessionStorage.setItem("books", JSON.stringify(books));
};

// Displaying complete book details on homepage

const displayAllBooks = () =>{
	const table = document.getElementById("booksTable");
	
	
	const books = JSON.parse(sessionStorage.getItem("books") || "[]");
	
	while (table.rows.length > 1) table.deleteRow(1);

	
	//populate table
	for (const b of books){
		const row = table.insertRow();
		row.insertCell().textContent = b.id;
		row.insertCell().textContent = b.title;
		row.insertCell().textContent = b.author;
	}
};

// Function to update a book

const updateBookById = (bookID, updatedTitle, updatedAuthor)=> {
	const books = JSON.parse(sessionStorage.getItem("books") || "[]");
	
	const index = books.findIndex(b => b.id === bookID);
	
	if (index == -1){
		alert("Book not found");
		return;
	}
	books[index].title = updatedTitle
	books[index].author = updatedAuthor;
	
	sessionStorage.setItem("books", JSON.stringify(books));
};

// Function to delete book with max book id

const deleteBookById = () =>{
	const books = JSON.parse(sessionStorage.getItem("books") || "[]");
	
	const maxID = Math.max(...books.map(b => b.id));
	
	const updatedBooksList = books.filter(b => b.id !== maxID);
	
	sessionStorage.setItem("books", JSON.stringify(updatedBooksList));
	
	displayAllBooks();
	
};

// displaying search results
const displaySearchResults = (results) => {
  const table = document.getElementById("booksTable");

  while (table.rows.length > 1) table.deleteRow(1);

  if (results.length === 0) {
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 3;
    cell.textContent = "No books found";
    return;
  }

  for (const b of results) {
    const row = table.insertRow();
    row.insertCell().textContent = b.id;
    row.insertCell().textContent = b.title;
    row.insertCell().textContent = b.author;
  }
};

// Function to search for a book based on title or author

const searchBook = (btitle, aname) => {
  const books = JSON.parse(sessionStorage.getItem("books") || "[]");

  const title = btitle.trim().toLowerCase();
  const author = aname.trim().toLowerCase();

  const results = books.filter(b =>
    (title && b.title.toLowerCase().includes(title)) ||
    (author && b.author.toLowerCase().includes(author))
  );

  return results;
};
