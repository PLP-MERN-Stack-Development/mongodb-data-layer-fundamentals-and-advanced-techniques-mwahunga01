// queries.js

// ------------------------------------------------------------------
// Task 2: Basic CRUD
// ------------------------------------------------------------------

// 1. Find all books in a specific genre 
db.books.find({ genre: "Science Fiction" }).pretty();

// 2. Find books published after a certain year 
db.books.find({ published_year: { $gt: 2000 } }).pretty();

// 3. Find books by a specific author 
db.books.find({ author: "J.K. Rowling" }).pretty();

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "Dune" },
  { $set: { price: 17.99 } }
);
printjson(db.books.findOne({ title: "Dune" }));   // verify

// 5. Delete a book by its title
db.books.deleteOne({ title: "1984" });
print("Remaining books:", db.books.countDocuments());

// ------------------------------------------------------------------
// Task 3: Advanced Queries
// ------------------------------------------------------------------

// 1. Books in stock AND published after 2010
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { title: 1, author: 1, price: 1, _id: 0 }
).pretty();

// 2. Projection + Sorting (price )
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: 1 }).pretty();

// 3. Sorting DESC
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: -1 }).pretty();

// 4. Pagination – page 1 (5 books), skip 0
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).limit(5).skip(0).pretty();

// Page 2
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
).limit(5).skip(5).pretty();

// ------------------------------------------------------------------
// Task 4: Aggregation Pipelines
// ------------------------------------------------------------------

// 1. Average price by genre
db.books.aggregate([
  { $group: {
      _id: "$genre",
      avgPrice: { $avg: "$price" }
  }},
  { $project: {
      genre: "$_id",
      avgPrice: { $round: ["$avgPrice", 2] },
      _id: 0
  }}
]);

// 2. Author with the most books
db.books.aggregate([
  { $group: {
      _id: "$author",
      count: { $sum: 1 }
  }},
  { $sort: { count: -1 } },
  { $limit: 1 },
  { $project: { author: "$_id", booksCount: "$count", _id: 0 } }
]);

// 3. Group by publication decade
db.books.aggregate([
  {
    $bucket: {
      groupBy: "$published_year",
      boundaries: [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030],
      default: "Other",
      output: {
        count: { $sum: 1 }
      }
    }
  },
  {
    $project: {
      decade: {
        $concat: [
          { $toString: "$_id" },
          "s"
        ]
      },
      count: 1,
      _id: 0
    }
  }
]);

// ------------------------------------------------------------------
// Task 5: Indexing + explain()
// ------------------------------------------------------------------

// Create indexes
db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: 1 });

// Explain without index (title search)
print("=== Without index (title) ===");
db.books.find({ title: "Dune" }).explain("executionStats");

// Explain with index
print("=== With index (title) ===");
db.books.find({ title: "Dune" }).hint({ title: 1 }).explain("executionStats");

// Compound index demo
print("=== Compound index (author + year) ===");
db.books.find({ author: "J.K. Rowling", published_year: { $gt: 1990 } })
        .hint({ author: 1, published_year: 1 })
        .explain("executionStats");
