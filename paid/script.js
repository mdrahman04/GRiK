document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const filterButton = document.getElementById("filter-button");
  const booksContainer = document.getElementById("books-container");

  let booksData = [];
  let cartItems = [];

  // Fetch the book data from paid-books.json
  fetch("paid-books.json")
    .then((response) => response.json())
    .then((data) => {
      booksData = data.books;
      displayBooks(booksData);
    })
    .catch((error) => console.log(error));

  // Retrieve cart items from localStorage
  if (localStorage.getItem("cartItems")) {
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
  }

  // Display books on the page
  function displayBooks(books) {
    booksContainer.innerHTML = "";

    books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.title;

      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = "By " + book.author;

      const bookPrice = document.createElement("p");
      bookPrice.textContent = book.price;

      const addToCartButton = document.createElement("button");
      addToCartButton.textContent = "Add to Cart";

      addToCartButton.addEventListener("click", function () {
        addToCart(book);
      });

      bookCard.appendChild(bookTitle);
      bookCard.appendChild(bookAuthor);
      bookCard.appendChild(bookPrice);
      bookCard.appendChild(addToCartButton);

      booksContainer.appendChild(bookCard);

      // Check if the book is already in the cart and disable the "Add to Cart" button
      const isInCart = cartItems.some((item) => item.title === book.title);
      if (isInCart) {
        addToCartButton.disabled = true;
        addToCartButton.textContent = "Added to Cart";
      }
    });

    if (books.length === 0) {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "Book not found";
      noResultsMessage.classList.add("no-results");
      booksContainer.appendChild(noResultsMessage);
    }
  }

  // Filter books based on search input
  filterButton.addEventListener("click", function () {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredBooks = booksData.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
      );
    });

    displayBooks(filteredBooks);
  });

  // Add book to cart
  function addToCart(book) {
    const existingBook = cartItems.find((item) => item.title === book.title);
    if (!existingBook) {
      cartItems.push(book);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert("Successful. Click on CART from the menu and you will be redirected");
      displayBooks(booksData); // Update the book display to disable the "Add to Cart" button
    }
  }
});
