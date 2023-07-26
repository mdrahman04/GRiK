document.addEventListener("DOMContentLoaded",
function () {
  const purchasedBooksContainer = document.getElementById("purchased-books");

  // Fetch purchased books data from local storage
  const purchasedBooks = JSON.parse(localStorage.getItem("cartItems")) || [];

  console.log("Retrieved Purchased Books from Local Storage:", purchasedBooks); //console.log statement
  
  setTimeout(function () {
      localStorage.removeItem("cartItems");
    }, 5000);
  
  // Fetch the paid books data from the JSON file
  fetch("paid-books.json")
    .then((response) => response.json())
    .then((data) => {
      const paidBooks = data.books;

      console.log("Fetched Paid Books:", paidBooks); // Added console.log statement

      // Match the purchased books with the paid books to get the complete information
      const purchasedBooksData = purchasedBooks.map((purchasedBook) => {
        const matchedBook = paidBooks.find(
          (book) => book.title.toLowerCase() === purchasedBook.title.toLowerCase()
        );
        return matchedBook ? { ...purchasedBook, ...matchedBook } : purchasedBook;
      });

      console.log("Purchased Books Data:", purchasedBooksData); // Added console.log statement

      displayPurchasedBooks(purchasedBooksData);
    })
    .catch((error) => {
      console.error("Error fetching paid books data:", error);
    });

  function displayPurchasedBooks(books) {
    console.log("Displaying Purchased Books:", books); // Added console.log statement

    books.forEach((book) => {
      const purchasedBook = createPurchasedBook(book);
      purchasedBooksContainer.appendChild(purchasedBook);
    });
  }

  function createPurchasedBook(book) {
    const purchasedBookElement = document.createElement("div");
    purchasedBookElement.classList.add("purchased-book");

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = "By " + book.author;

    const bookLink = document.createElement("a");
    bookLink.textContent = "Read";
    bookLink.href = book.link;

    purchasedBookElement.appendChild(bookTitle);
    purchasedBookElement.appendChild(bookAuthor);
    purchasedBookElement.appendChild(bookLink);

    return purchasedBookElement;
  }
});
