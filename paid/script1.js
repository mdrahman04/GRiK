document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");

  // Fetch the cart items data from local storage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Fetch the paid books data from the JSON file
  fetch("paid-books.json")
    .then((response) => response.json())
    .then((data) => {
      const paidBooks = data.books;

      // Filter the paid books based on the cart items
      const paidCartItems = cartItems.filter((cartItem) =>
        paidBooks.some((book) => book.title === cartItem.title)
      );

      displayCartItems(paidCartItems);
    })
    .catch((error) => {
      console.error("Error fetching paid books data:", error);
    });

  function displayCartItems(items) {
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    items.forEach((item) => {
      const cartItem = createCartItem(item);
      cartItemsContainer.appendChild(cartItem);
      subtotal += parseFloat(item.price);
    });

    const subtotalElement = document.createElement("h2");
    subtotalElement.textContent = "Subtotal: $" + subtotal.toFixed(2);
    subtotalElement.classList.add("subtotal");

    cartItemsContainer.appendChild(subtotalElement);
  }

  function createCartItem(item) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const bookDetails = document.createElement("div");
    bookDetails.classList.add("book-details");

    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = item.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = "By " + item.author;

    const bookPrice = document.createElement("p");
    bookPrice.classList.add("book-price");
    bookPrice.textContent = item.price;

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeItemFromCart(item);
      cartItem.remove();
      updateSubtotal();
    });

    bookDetails.appendChild(bookTitle);
    bookDetails.appendChild(bookAuthor);
    cartItem.appendChild(bookDetails);
    cartItem.appendChild(bookPrice);
    cartItem.appendChild(removeButton);

    return cartItem;
  }

  function removeItemFromCart(item) {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.title !== item.title
    );

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  }

  function updateSubtotal() {
    const subtotalElement = document.querySelector(".subtotal");
    const cartItems = Array.from(document.querySelectorAll(".cart-item"));

    let subtotal = 0;
    cartItems.forEach((cartItem) => {
      const price = parseFloat(
        cartItem.querySelector(".book-price").textContent.replace("$", "")
      );
      subtotal += price;
    });

    subtotalElement.textContent = "Subtotal: $" + subtotal.toFixed(2);
  }

  function addCartItem(item) {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.title === item.title
    );
    if (existingItem) {
      // Book already exists in cart
      // You can display an error message or prevent adding the duplicate book
      console.log("This book is already in the cart.");
      return;
    }

    cartItems.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    const cartItem = createCartItem(item);
    cartItemsContainer.appendChild(cartItem);

    updateSubtotal();

    // Store the purchased book information in localStorage
    const purchasedBooks = JSON.parse(localStorage.getItem("purchasedBooks")) || [];
    purchasedBooks.push(item);
    localStorage.setItem("purchasedBooks", JSON.stringify(purchasedBooks));

    // Redirect the user to the thank you page
    window.location.href = "thank-you.html";
  }

  // Attach the addCartItem function to the window object
  window.addCartItem = addCartItem;
});


document.addEventListener("DOMContentLoaded", function () {
  const proceedToPaymentButton = document.getElementById("proceed-to-payment");
  proceedToPaymentButton.addEventListener("click", proceedToPayment);

  function proceedToPayment() {
    // Retrieve the cart items and calculate the total payment amount
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalPrice = cartItems.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );

    // Save the purchased books data to local storage
    const paidBooks = JSON.parse(localStorage.getItem("paidBooks")) || [];
    const purchasedBooks = cartItems.filter((cartItem) =>
      paidBooks.some((book) => book.title === cartItem.title)
    );
    localStorage.setItem("purchasedBooks", JSON.stringify(purchasedBooks));

    // Simulate a payment request to the demo payment gateway
    simulatePayment(totalPrice);
  }

  function simulatePayment(totalPrice) {
    // Display a loading spinner or message to indicate the payment process
    console.log("Processing payment...");

    // Simulate a delay to mimic the payment process
    setTimeout(function () {
      // Payment is successful
      console.log("Payment successful. Total amount paid: $" + totalPrice.toFixed(2));

      // Redirect the user to the thank you page or perform any other necessary actions
      window.location.href = "thank-you.html";
    }, 2000);
  }
});
