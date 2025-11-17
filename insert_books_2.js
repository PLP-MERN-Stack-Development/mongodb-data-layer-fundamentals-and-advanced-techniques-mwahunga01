// insert_books.js


db.books.drop();   

db.books.insertMany([
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    genre: "Science Fiction",
    published_year: 1979,
    price: 12.99,
    in_stock: true,
    pages: 224,
    publisher: "Pan Books"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    published_year: 1965,
    price: 15.50,
    in_stock: true,
    pages: 412,
    publisher: "Chilton Books"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 9.99,
    in_stock: false,
    pages: 328,
    publisher: "Secker & Warburg"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    published_year: 1813,
    price: 7.25,
    in_stock: true,
    pages: 432,
    publisher: "T. Egerton"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    published_year: 1925,
    price: 10.75,
    in_stock: true,
    pages: 180,
    publisher: "Charles Scribner's Sons"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    published_year: 1960,
    price: 11.40,
    in_stock: true,
    pages: 281,
    publisher: "J. B. Lippincott"
  },
  {
    title: "The Catcher in the Rye",
    author: "J. D. Salinger",
    genre: "Classic",
    published_year: 1951,
    price: 8.99,
    in_stock: false,
    pages: 277,
    publisher: "Little, Brown and Company"
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    published_year: 1997,
    price: 14.99,
    in_stock: true,
    pages: 223,
    publisher: "Bloomsbury"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. TolkienFrom",
    genre: "Fantasy",
    published_year: 1954,
    price: 22.50,
    in_stock: true,
    pages: 1178,
    publisher: "George Allen & Unwin"
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    published_year: 2011,
    price: 18.00,
    in_stock: true,
    pages: 443,
    publisher: "Harper"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    published_year: 2018,
    price: 16.99,
    in_stock: true,
    pages: 320,
    publisher: "Avery"
  }
]);

print("Inserted", db.books.countDocuments(), "books");
