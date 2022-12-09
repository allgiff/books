const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
   name: { type: String, required: true },
   description: { type: String, required: false },
   imageUrl: { type: String, required: true},
   //children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('Book', bookSchema);