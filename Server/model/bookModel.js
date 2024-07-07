const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  book_name: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Book = mongoose.model(" bookSchema", bookSchema);
