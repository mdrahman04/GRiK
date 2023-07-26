//affects-sections
const sections = document.querySelectorAll('section');
    
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fadeInUp');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(callback, options);

sections.forEach(section => {
    observer.observe(section);
});
//end

//overlay
const checkbox = document.getElementById("check");
const overlay = document.querySelector(".overlay");

checkbox.addEventListener("change", function () {
    if (this.checked) {
        document.body.style.overflow = "hidden"; // Disable scrolling
        overlay.style.display = "block"; // Show the overlay
    } else {
        document.body.style.overflow = ""; // Enable scrolling
        overlay.style.display = "none"; // Hide the overlay
    }
});
//end

//quotes-displaying
// Rest of your code for the sections and overlay...

//quotes-displaying
const quotes = [
  "'The more that you read, the more things you will know. The more that you learn, the more places you'll go.' - Dr. Seuss",
  "'A room without books is like a body without a soul.' - Marcus Tullius Cicero",
  "'The only true wisdom is in knowing you know nothing.' - Socrates",
  "'Knowledge is power.' - Sir Francis Bacon",
  "'Reading is to the mind what exercise is to the body.' - Joseph Addison",
  "'The only way to do great work is to love what you do.' - Steve Jobs",
  "'Education is the most powerful weapon which you can use to change the world.' - Nelson Mandela",
  "'The more you know, the more you realize you know nothing.' - Aristotle",
  // Add more quotes here...
];

// Get a random quote
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

//Quote function in a self-invoking anonymous function
(function () {
  // Function to update the displayed quote
  function updateQuote() {
    const quoteElement = document.getElementById('quote');
    quoteElement.textContent = getRandomQuote();
  }

  // Update the quote initially on page load
  window.addEventListener('load', updateQuote);

  // Update the quote every 5 seconds
  setInterval(updateQuote, 5000);
})();
//end


// Function to fetch book data from the JSON file
function fetchBooks(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", "books.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var booksData = JSON.parse(xhr.responseText);
      var books = booksData.books;
      callback(books);
    }
  };
  xhr.send(null);
}

// Function to filter books based on search input
function filterBooks() {
  var searchInput = document.getElementById("search-input").value.toLowerCase();
  fetchBooks(function (books) {
    var filteredBooks = books.filter(function (book) {
      return (
        book.title.toLowerCase().includes(searchInput) ||
        book.author.toLowerCase().includes(searchInput)
      );
    });

    displayBooks(filteredBooks);
  });
}

// Function to display books in the DOM
function displayBooks(books) {
  var booksContainer = document.getElementById("books");
  booksContainer.innerHTML = ""; // Clear previous results

  if (books.length === 0) {
    booksContainer.innerHTML = "<p>No books found.</p>";
    return;
  }

  books.forEach(function (book) {
    var bookElement = document.createElement("div");
    bookElement.innerHTML =
      "<h3>" + book.title + "</h3>" + "<p>Author: " + book.author + "</p>" + "<a href='" + book.link + "' target='_blank'>Read Online</a>";
    booksContainer.appendChild(bookElement);
  });
}

// Attach event listener to the filter button
document
  .getElementById("filter-button")
  .addEventListener("click", filterBooks);

// Initial book display on page load
fetchBooks(function (books) {
  displayBooks(books);
});
