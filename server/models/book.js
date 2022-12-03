const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   description: { type: String, required: false },
   url: { type: String, required: true},
   children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('Book', booktSchema);